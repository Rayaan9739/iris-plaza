import { Injectable, NotFoundException, BadRequestException, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { Prisma } from "@prisma/client";
import { PrismaService } from "@/prisma/prisma.service";
import { CreateRoomDto, UpdateRoomDto } from "./dto/room.dto";
import { RoomType } from "./enums/room-type.enum";

type RuleRow = { room_id: string; rule: string };

const LEGACY_ROOM_TYPE_MAP: Record<string, RoomType> = {
  STUDIO: RoomType.ONE_BHK,
  SINGLE: RoomType.ONE_BHK,
  DOUBLE: RoomType.ONE_BHK,
  THREE_BHK: RoomType.TWO_BHK,
  SUITE: RoomType.PENTHOUSE,
  PENT_HOUSE: RoomType.PENTHOUSE,
};

@Injectable()
export class RoomsService {
  private readonly logger = new Logger(RoomsService.name);
  constructor(private prisma: PrismaService) {}

  private toStartOfUtcDay(date: Date) {
    return new Date(
      Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()),
    );
  }

  private normalizeRoomType(input: unknown): RoomType {
    const raw = String(input ?? "").trim();
    const normalized = raw.replace(/\s+/g, "_").toUpperCase();
    const mapped = LEGACY_ROOM_TYPE_MAP[normalized] ?? normalized;

    if (
      mapped === RoomType.ONE_BHK ||
      mapped === RoomType.TWO_BHK ||
      mapped === RoomType.PENTHOUSE
    ) {
      return mapped;
    }

    throw new BadRequestException(
      "Room type must be ONE_BHK, TWO_BHK, or PENTHOUSE",
    );
  }

  private parseSelectedMonthStart(month?: string) {
    if (!month) {
      return null;
    }

    const normalized = String(month).trim();
    const match = normalized.match(/^(\d{4})-(\d{2})$/);
    if (!match) {
      throw new BadRequestException("month must be in YYYY-MM format");
    }

    const year = Number(match[1]);
    const monthIndex = Number(match[2]) - 1;
    if (!Number.isFinite(year) || !Number.isFinite(monthIndex) || monthIndex < 0 || monthIndex > 11) {
      throw new BadRequestException("month must be in YYYY-MM format");
    }

    return new Date(Date.UTC(year, monthIndex, 1));
  }

  private roomSafeSelect = {
    id: true,
    name: true,
    type: true,
    description: true,
    floor: true,
    area: true,
    rent: true,
    deposit: true,
    status: true,
    isAvailable: true,
    occupiedFrom: true,
    occupiedUntil: true,
    videoUrl: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
    media: { orderBy: { createdAt: "asc" as const } },
    images: { orderBy: { order: "asc" as const } },
    amenities: { include: { amenity: true } },
  };

  private mapMediaToImageRows(media?: Array<{ type?: string; url?: string }>) {
    if (!media?.length) {
      return [];
    }

    return media
      .map((item, index) => {
        const url = String(item?.url || "").trim();
        if (!url) return null;
        const isVideo = String(item?.type || "").toLowerCase() === "video";

        return {
          url,
          order: index,
          caption: isVideo ? "ROOM_VIDEO" : undefined,
        };
      })
      .filter(Boolean) as Array<{
      url: string;
      order: number;
      caption?: string;
    }>;
  }

  private getPrimaryVideoUrl(media?: Array<{ type?: string; url?: string }>) {
    if (!media?.length) {
      return undefined;
    }

    const firstVideo = media.find(
      (item) =>
        String(item?.type || "").toLowerCase() === "video" &&
        String(item?.url || "").trim().length > 0,
    );

    return firstVideo ? String(firstVideo.url).trim() : undefined;
  }

  private normalizeMediaInput(
    media?: Array<{ type?: string; url?: string }>,
    images?: Array<{ url?: string }>,
    videoUrl?: string,
  ) {
    if (media?.length) {
      return media
        .map((item) => ({
          type:
            String(item?.type || "").toLowerCase() === "video"
              ? "video"
              : "image",
          url: String(item?.url || "").trim(),
        }))
        .filter((item) => item.url.length > 0);
    }

    const fromImages =
      images
        ?.map((img) => String(img?.url || "").trim())
        .filter(Boolean)
        .map((url) => ({ type: "image", url })) ?? [];

    const fromVideo = String(videoUrl || "").trim();
    if (fromVideo) {
      fromImages.push({ type: "video", url: fromVideo });
    }

    return fromImages;
  }

  private buildAmenityCreateInput(amenities?: string[]) {
    if (!amenities?.length) {
      return undefined;
    }

    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    const records = amenities
      .map((value) => String(value || "").trim())
      .filter(Boolean)
      .map((value) => {
        if (uuidRegex.test(value)) {
          return {
            amenity: {
              connect: { id: value },
            },
          };
        }

        return {
          amenity: {
            connectOrCreate: {
              where: { name: value },
              create: { name: value },
            },
          },
        };
      });

    return records.length ? { create: records } : undefined;
  }

  private async ensureRoomRulesTable() {
    try {
      await this.prisma.$executeRawUnsafe(`
        CREATE TABLE IF NOT EXISTS room_rules (
          id BIGSERIAL PRIMARY KEY,
          room_id TEXT NOT NULL,
          rule TEXT NOT NULL
        )
      `);

      await this.prisma.$executeRawUnsafe(`
        CREATE INDEX IF NOT EXISTS idx_room_rules_room_id
        ON room_rules(room_id)
      `);
    } catch (error) {
      console.error("Error ensuring room_rules table:", error);
      throw new Error(
        `Failed to create room_rules table: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }

  private async setRules(roomId: string, rules: string[]) {
    try {
      await this.ensureRoomRulesTable();

      await this.prisma.$executeRaw`
        DELETE FROM room_rules WHERE room_id = ${roomId}
      `;

      for (const rule of rules) {
        const trimmed = String(rule || "").trim();
        if (!trimmed) continue;

        await this.prisma.$executeRaw`
          INSERT INTO room_rules(room_id, rule)
          VALUES (${roomId}, ${trimmed})
        `;
      }
    } catch (error) {
      console.error("Error setting room rules for room", roomId, ":", error);
      // Rules are optional metadata; do not fail room create/update flows.
      return;
    }
  }

  private async getRulesByRoomIds(roomIds: string[]) {
    const map = new Map<string, string[]>();

    roomIds.forEach((id) => map.set(id, []));

    if (!roomIds.length) {
      return map;
    }

    try {
      await this.ensureRoomRulesTable();

      const rows = await this.prisma.$queryRaw<RuleRow[]>(
        Prisma.sql`SELECT room_id, rule FROM room_rules WHERE room_id IN (${Prisma.join(roomIds)})`,
      );

      rows.forEach((row) => {
        const list = map.get(row.room_id) ?? [];
        list.push(row.rule);
        map.set(row.room_id, list);
      });
    } catch (error) {
      console.error("Error reading room rules:", error);
      return map;
    }

    return map;
  }

  /**
   * Background job that runs periodically to refresh expired room occupancies.
   * This runs as a scheduled task instead of during GET requests.
   * Runs every 5 minutes.
   */
  @Cron(CronExpression.EVERY_5_MINUTES)
  async refreshExpiredOccupancies() {
    this.logger.log("Starting scheduled occupancy refresh...");
    const normalizedTodayUtc = this.toStartOfUtcDay(new Date());
    
    const maxRetries = 3;
    const retryDelay = 5000; // 5 seconds
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const result = await this.prisma.room.updateMany({
          where: {
            status: "OCCUPIED" as any,
            // Release only when today's UTC date is after occupiedUntil UTC date.
            occupiedUntil: { lt: normalizedTodayUtc },
          },
          data: {
            status: "AVAILABLE" as any,
            isAvailable: true,
            occupiedFrom: null,
            occupiedUntil: null,
          },
        });
        
        if (result.count > 0) {
          this.logger.log(`Successfully refreshed ${result.count} expired room occupancies`);
        } else {
          this.logger.log("No expired occupancies found");
        }
        return; // Success - exit the retry loop
        
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        this.logger.warn(`Occupancy refresh attempt ${attempt}/${maxRetries} failed: ${errorMessage}`);
        
        // Check if it's a connection error (P1001 is Prisma's connection error code)
        const isConnectionError = errorMessage.includes("P1001") || 
                                   errorMessage.includes("connection") ||
                                   errorMessage.includes("timeout");
        
        if (!isConnectionError || attempt === maxRetries) {
          // Non-connection error or max retries reached
          // Only log if it's not a connection error
          if (!isConnectionError) {
            this.logger.error("Occupancy refresh failed after all retries", error);
          }
          return;
        }
        
        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, retryDelay));
      }
    }
  }

  /**
   * Manually trigger occupancy refresh (for administrative use).
   * Uses the same error handling as the scheduled job.
   */
  async triggerOccupancyRefresh() {
    return this.refreshExpiredOccupancies();
  }

  async findAll() {
    try {
      const rooms = await this.prisma.room.findMany({
        where: { deletedAt: null },
        select: this.roomSafeSelect,
      });

      const rulesMap = await this.getRulesByRoomIds(
        rooms.map((room) => room.id),
      );

      return rooms.map((room) => ({
        ...room,
        rules: rulesMap.get(room.id) ?? [],
      }));
    } catch (error) {
      this.logger.error("Error fetching rooms:", error);
      return [];
    }
  }

  async findOne(id: string) {
    const room = await this.prisma.room.findUnique({
      where: { id },
      select: this.roomSafeSelect,
    });

    if (!room) {
      throw new NotFoundException("Room not found");
    }

    const rulesMap = await this.getRulesByRoomIds([room.id]);

    return {
      ...room,
      rules: rulesMap.get(room.id) ?? [],
    };
  }

  async create(createRoomDto: CreateRoomDto) {
    console.log("[ROOMS SERVICE CREATE] Received type:", createRoomDto.type);
    console.log("[ROOMS SERVICE CREATE] Full DTO:", JSON.stringify(createRoomDto));

    const payload: any = { ...(createRoomDto as any) };
    delete payload.existingMedia;

    const {
      amenities,
      rules,
      status: _status,
      media,
      // legacy fields (ignored if media provided)
      images,
      videoUrl,
      ...roomData
    } = payload;
    const normalizedType = this.normalizeRoomType(roomData.type);

    const data: any = {
      ...roomData,
      type: normalizedType as any,
      status: "AVAILABLE" as any,
      isAvailable: true,
      amenities: this.buildAmenityCreateInput(amenities),
    };

    if (media && media.length) {
      const mediaImageRows = this.mapMediaToImageRows(media);
      if (mediaImageRows.length) {
        data.images = { create: mediaImageRows };
      }
      data.videoUrl = this.getPrimaryVideoUrl(media) || null;
    } else {
      // fallback to legacy image/video fields
      const imageRows = [
        ...(images?.map((img) => ({
          url: img.url || "",
          order: img.order || 0,
          caption: img.caption || undefined,
        })) ?? []),
        ...(videoUrl
          ? [
              {
                url: videoUrl,
                order: 999,
                caption: "ROOM_VIDEO",
              },
            ]
          : []),
      ];
      if (imageRows.length) {
        data.images = { create: imageRows };
      }
      if (videoUrl) {
        data.videoUrl = videoUrl;
      }
    }

    try {
      const room = await this.prisma.room.create({ data });
      const mediaRows = this.normalizeMediaInput(media, images, videoUrl);
      if (mediaRows.length) {
        await this.prisma.roomMedia.createMany({
          data: mediaRows.map((item) => ({
            roomId: room.id,
            type: item.type,
            url: item.url,
          })),
        });
      }
      try {
        await this.setRules(room.id, rules ?? []);
      } catch (ruleError) {
        console.error("Error setting room rules:", ruleError);
        // Don't fail room creation if rules fail, log the error
      }
      return this.findOne(room.id);
    } catch (error) {
      console.error("Error creating room:", error);
      throw error;
    }
  }

  async update(id: string, updateRoomDto: UpdateRoomDto) {
    console.log("[ROOMS SERVICE UPDATE] Received type:", updateRoomDto.type);
    console.log("[ROOMS SERVICE UPDATE] Full DTO:", JSON.stringify(updateRoomDto));

    const payload: any = { ...(updateRoomDto as any) };
    delete payload.existingMedia;

    const {
      amenities,
      rules,
      status: _status,
      media,
      // legacy
      images,
      videoUrl,
      ...roomData
    } = payload;

    if (amenities) {
      await this.prisma.roomAmenity.deleteMany({ where: { roomId: id } });
    }

    const data: any = {
      ...roomData,
      amenities: this.buildAmenityCreateInput(amenities),
    };

    if (roomData.type !== undefined) {
      data.type = this.normalizeRoomType(roomData.type) as any;
    }

    if (media) {
      await this.prisma.roomImage.deleteMany({ where: { roomId: id } });
      const mediaImageRows = this.mapMediaToImageRows(media);
      data.videoUrl = this.getPrimaryVideoUrl(media) || null;
      if (mediaImageRows.length) {
        data.images = { create: mediaImageRows };
      }
    } else {
      if (images) {
        await this.prisma.roomImage.deleteMany({ where: { roomId: id } });
      }
      const imageRows = [
        ...(images?.map((img) => ({
          url: img.url || "",
          order: img.order || 0,
          caption: img.caption || undefined,
        })) ?? []),
        ...(videoUrl
          ? [
              {
                url: videoUrl,
                order: 999,
                caption: "ROOM_VIDEO",
              },
            ]
          : []),
      ];
      if (imageRows.length) {
        data.images = { create: imageRows };
      }
      if (videoUrl) {
        data.videoUrl = videoUrl;
      }
    }

    await this.prisma.room.update({ where: { id }, data });

    if (media || images || videoUrl !== undefined) {
      const mediaRows = this.normalizeMediaInput(media, images, videoUrl);
      await this.prisma.roomMedia.deleteMany({ where: { roomId: id } });
      if (mediaRows.length) {
        await this.prisma.roomMedia.createMany({
          data: mediaRows.map((item) => ({
            roomId: id,
            type: item.type,
            url: item.url,
          })),
        });
      }
    }

    if (rules) {
      await this.setRules(id, rules);
    }

    return this.findOne(id);
  }

  // soft delete from database - preferred method
  async remove(id: string) {
    try {
      const existingRoom = await this.prisma.room.findUnique({
        where: { id },
      });

      if (!existingRoom) {
        throw new NotFoundException(`Room with ID ${id} not found`);
      }

      if (existingRoom.deletedAt) {
        throw new BadRequestException("Room is already deleted");
      }

      return await this.prisma.room.update({
        where: { id },
        data: {
          deletedAt: new Date(),
          isAvailable: false,
        },
      });
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      this.logger.error(`Failed to delete room ${id}: ${errorMessage}`);
      throw new BadRequestException("Failed to delete room");
    }
  }

  // hard delete from database - throws error if room has related records
  async delete(id: string) {
    // Check if room has any bookings
    const bookings = await this.prisma.booking.findMany({
      where: { roomId: id },
    });
    
    if (bookings && bookings.length > 0) {
      // If bookings exist, use soft delete instead
      return this.prisma.room.update({
        where: { id },
        data: {
          deletedAt: new Date(),
          isAvailable: false,
        },
      });
    }
    
    // Only do hard delete if no bookings exist
    return this.prisma.room.delete({
      where: { id },
    });
  }

  async getAvailableRooms(selectedMonth?: string) {
    const selectedMonthStart = this.parseSelectedMonthStart(selectedMonth);
    const selectedMonthEndExclusive = selectedMonthStart
      ? new Date(
          Date.UTC(
            selectedMonthStart.getUTCFullYear(),
            selectedMonthStart.getUTCMonth() + 1,
            1,
          ),
        )
      : null;

    // Get ALL rooms (only exclude deleted)
    const rooms = await this.prisma.room.findMany({
      where: {
        deletedAt: null,
      },
      select: this.roomSafeSelect,
    });

    const rulesMap = await this.getRulesByRoomIds(rooms.map((room) => room.id));

    const now = new Date();
    const mappedRooms = rooms.map((room) => {
      // Compute availability status
      let availabilityStatus:
        | "AVAILABLE"
        | "RESERVED"
        | "OCCUPIED"
        | "MAINTENANCE" = String(room.status || "AVAILABLE").toUpperCase() as
        | "AVAILABLE"
        | "RESERVED"
        | "OCCUPIED"
        | "MAINTENANCE";
      let availableFrom: string | null = null;

      const occupiedUntilDate = room.occupiedUntil
        ? new Date(room.occupiedUntil)
        : null;

      if (
        occupiedUntilDate &&
        !Number.isNaN(occupiedUntilDate.getTime()) &&
        occupiedUntilDate > now
      ) {
        availabilityStatus = "OCCUPIED";
        availableFrom = occupiedUntilDate.toISOString();
      }

      return {
        ...room,
        availabilityStatus,
        availableFrom,
        // A room is considered selectable for a month if it becomes
        // available on/before that month's end.
        availableBy: occupiedUntilDate && occupiedUntilDate > now
          ? occupiedUntilDate.toISOString()
          : now.toISOString(),
        rules: rulesMap.get(room.id) ?? [],
      };
    });

    if (!selectedMonthEndExclusive) {
      return mappedRooms.map(({ availableBy: _availableBy, ...room }) => room);
    }

    return mappedRooms
      .filter((room) => {
        const availableByDate = new Date(room.availableBy);
        if (Number.isNaN(availableByDate.getTime())) return false;
        return availableByDate < selectedMonthEndExclusive;
      })
      .map(({ availableBy: _availableBy, ...room }) => room);
  }

  async findOccupiedRooms() {
    const rooms = await this.prisma.room.findMany({
      where: {
        deletedAt: null,
        status: "OCCUPIED" as any,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: this.roomSafeSelect,
    });

    const rulesMap = await this.getRulesByRoomIds(rooms.map((room) => room.id));

    return rooms.map((room) => ({
      ...room,
      rules: rulesMap.get(room.id) ?? [],
    }));
  }
}
