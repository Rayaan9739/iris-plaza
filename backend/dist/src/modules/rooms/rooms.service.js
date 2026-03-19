"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var RoomsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomsService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../../prisma/prisma.service");
const room_type_enum_1 = require("./enums/room-type.enum");
const LEGACY_ROOM_TYPE_MAP = {
    STUDIO: room_type_enum_1.RoomType.ONE_BHK,
    SINGLE: room_type_enum_1.RoomType.ONE_BHK,
    DOUBLE: room_type_enum_1.RoomType.ONE_BHK,
    THREE_BHK: room_type_enum_1.RoomType.TWO_BHK,
    SUITE: room_type_enum_1.RoomType.PENTHOUSE,
    PENT_HOUSE: room_type_enum_1.RoomType.PENTHOUSE,
};
let RoomsService = RoomsService_1 = class RoomsService {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(RoomsService_1.name);
        this.roomSafeSelect = {
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
            media: { orderBy: { createdAt: "asc" } },
            images: { orderBy: { order: "asc" } },
            amenities: { include: { amenity: true } },
        };
    }
    toStartOfUtcDay(date) {
        return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
    }
    normalizeRoomType(input) {
        const raw = String(input ?? "").trim();
        const normalized = raw.replace(/\s+/g, "_").toUpperCase();
        const mapped = LEGACY_ROOM_TYPE_MAP[normalized] ?? normalized;
        if (mapped === room_type_enum_1.RoomType.ONE_BHK ||
            mapped === room_type_enum_1.RoomType.TWO_BHK ||
            mapped === room_type_enum_1.RoomType.PENTHOUSE) {
            return mapped;
        }
        throw new common_1.BadRequestException("Room type must be ONE_BHK, TWO_BHK, or PENTHOUSE");
    }
    parseSelectedMonthStart(month) {
        if (!month) {
            return null;
        }
        const normalized = String(month).trim();
        const match = normalized.match(/^(\d{4})-(\d{2})$/);
        if (!match) {
            throw new common_1.BadRequestException("month must be in YYYY-MM format");
        }
        const year = Number(match[1]);
        const monthIndex = Number(match[2]) - 1;
        if (!Number.isFinite(year) || !Number.isFinite(monthIndex) || monthIndex < 0 || monthIndex > 11) {
            throw new common_1.BadRequestException("month must be in YYYY-MM format");
        }
        return new Date(Date.UTC(year, monthIndex, 1));
    }
    mapMediaToImageRows(media) {
        if (!media?.length) {
            return [];
        }
        return media
            .map((item, index) => {
            const url = String(item?.url || "").trim();
            if (!url)
                return null;
            const isVideo = String(item?.type || "").toLowerCase() === "video";
            return {
                url,
                order: index,
                caption: isVideo ? "ROOM_VIDEO" : undefined,
            };
        })
            .filter(Boolean);
    }
    getPrimaryVideoUrl(media) {
        if (!media?.length) {
            return undefined;
        }
        const firstVideo = media.find((item) => String(item?.type || "").toLowerCase() === "video" &&
            String(item?.url || "").trim().length > 0);
        return firstVideo ? String(firstVideo.url).trim() : undefined;
    }
    normalizeMediaInput(media, images, videoUrl) {
        if (media?.length) {
            return media
                .map((item) => ({
                type: String(item?.type || "").toLowerCase() === "video"
                    ? "video"
                    : "image",
                url: String(item?.url || "").trim(),
            }))
                .filter((item) => item.url.length > 0);
        }
        const fromImages = images
            ?.map((img) => String(img?.url || "").trim())
            .filter(Boolean)
            .map((url) => ({ type: "image", url })) ?? [];
        const fromVideo = String(videoUrl || "").trim();
        if (fromVideo) {
            fromImages.push({ type: "video", url: fromVideo });
        }
        return fromImages;
    }
    buildAmenityCreateInput(amenities) {
        if (!amenities?.length) {
            return undefined;
        }
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
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
    async ensureRoomRulesTable() {
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
        }
        catch (error) {
            console.error("Error ensuring room_rules table:", error);
            throw new Error(`Failed to create room_rules table: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
    async setRules(roomId, rules) {
        try {
            await this.ensureRoomRulesTable();
            await this.prisma.$executeRaw `
        DELETE FROM room_rules WHERE room_id = ${roomId}
      `;
            for (const rule of rules) {
                const trimmed = String(rule || "").trim();
                if (!trimmed)
                    continue;
                await this.prisma.$executeRaw `
          INSERT INTO room_rules(room_id, rule)
          VALUES (${roomId}, ${trimmed})
        `;
            }
        }
        catch (error) {
            console.error("Error setting room rules for room", roomId, ":", error);
            return;
        }
    }
    async getRulesByRoomIds(roomIds) {
        const map = new Map();
        roomIds.forEach((id) => map.set(id, []));
        if (!roomIds.length) {
            return map;
        }
        try {
            await this.ensureRoomRulesTable();
            const rows = await this.prisma.$queryRaw(client_1.Prisma.sql `SELECT room_id, rule FROM room_rules WHERE room_id IN (${client_1.Prisma.join(roomIds)})`);
            rows.forEach((row) => {
                const list = map.get(row.room_id) ?? [];
                list.push(row.rule);
                map.set(row.room_id, list);
            });
        }
        catch (error) {
            console.error("Error reading room rules:", error);
            return map;
        }
        return map;
    }
    async refreshExpiredOccupancies() {
        this.logger.log("Starting scheduled occupancy refresh...");
        const normalizedTodayUtc = this.toStartOfUtcDay(new Date());
        const maxRetries = 3;
        const retryDelay = 5000;
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                const result = await this.prisma.room.updateMany({
                    where: {
                        status: "OCCUPIED",
                        occupiedUntil: { lt: normalizedTodayUtc },
                    },
                    data: {
                        status: "AVAILABLE",
                        isAvailable: true,
                        occupiedFrom: null,
                        occupiedUntil: null,
                    },
                });
                if (result.count > 0) {
                    this.logger.log(`Successfully refreshed ${result.count} expired room occupancies`);
                }
                else {
                    this.logger.log("No expired occupancies found");
                }
                return;
            }
            catch (error) {
                const errorMessage = error instanceof Error ? error.message : String(error);
                this.logger.warn(`Occupancy refresh attempt ${attempt}/${maxRetries} failed: ${errorMessage}`);
                const isConnectionError = errorMessage.includes("P1001") ||
                    errorMessage.includes("connection") ||
                    errorMessage.includes("timeout");
                if (!isConnectionError || attempt === maxRetries) {
                    if (!isConnectionError) {
                        this.logger.error("Occupancy refresh failed after all retries", error);
                    }
                    return;
                }
                await new Promise(resolve => setTimeout(resolve, retryDelay));
            }
        }
    }
    async triggerOccupancyRefresh() {
        return this.refreshExpiredOccupancies();
    }
    async findAll() {
        try {
            const rooms = await this.prisma.room.findMany({
                where: { deletedAt: null },
                select: this.roomSafeSelect,
            });
            const rulesMap = await this.getRulesByRoomIds(rooms.map((room) => room.id));
            return rooms.map((room) => ({
                ...room,
                rules: rulesMap.get(room.id) ?? [],
            }));
        }
        catch (error) {
            this.logger.error("Error fetching rooms:", error);
            return [];
        }
    }
    async findOne(id) {
        const room = await this.prisma.room.findUnique({
            where: { id },
            select: this.roomSafeSelect,
        });
        if (!room) {
            throw new common_1.NotFoundException("Room not found");
        }
        const rulesMap = await this.getRulesByRoomIds([room.id]);
        return {
            ...room,
            rules: rulesMap.get(room.id) ?? [],
        };
    }
    async create(createRoomDto) {
        console.log("[ROOMS SERVICE CREATE] Received type:", createRoomDto.type);
        console.log("[ROOMS SERVICE CREATE] Full DTO:", JSON.stringify(createRoomDto));
        const payload = { ...createRoomDto };
        delete payload.existingMedia;
        const { amenities, rules, status: _status, media, images, videoUrl, ...roomData } = payload;
        const normalizedType = this.normalizeRoomType(roomData.type);
        const data = {
            ...roomData,
            type: normalizedType,
            status: "AVAILABLE",
            isAvailable: true,
            amenities: this.buildAmenityCreateInput(amenities),
        };
        if (media && media.length) {
            const mediaImageRows = this.mapMediaToImageRows(media);
            if (mediaImageRows.length) {
                data.images = { create: mediaImageRows };
            }
            data.videoUrl = this.getPrimaryVideoUrl(media) || null;
        }
        else {
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
            }
            catch (ruleError) {
                console.error("Error setting room rules:", ruleError);
            }
            return this.findOne(room.id);
        }
        catch (error) {
            console.error("Error creating room:", error);
            throw error;
        }
    }
    async update(id, updateRoomDto) {
        console.log("[ROOMS SERVICE UPDATE] Received type:", updateRoomDto.type);
        console.log("[ROOMS SERVICE UPDATE] Full DTO:", JSON.stringify(updateRoomDto));
        const payload = { ...updateRoomDto };
        delete payload.existingMedia;
        const { amenities, rules, status: _status, media, images, videoUrl, ...roomData } = payload;
        if (amenities) {
            await this.prisma.roomAmenity.deleteMany({ where: { roomId: id } });
        }
        const data = {
            ...roomData,
            amenities: this.buildAmenityCreateInput(amenities),
        };
        if (roomData.type !== undefined) {
            data.type = this.normalizeRoomType(roomData.type);
        }
        if (media) {
            await this.prisma.roomImage.deleteMany({ where: { roomId: id } });
            const mediaImageRows = this.mapMediaToImageRows(media);
            data.videoUrl = this.getPrimaryVideoUrl(media) || null;
            if (mediaImageRows.length) {
                data.images = { create: mediaImageRows };
            }
        }
        else {
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
    async remove(id) {
        try {
            const existingRoom = await this.prisma.room.findUnique({
                where: { id },
            });
            if (!existingRoom) {
                throw new common_1.NotFoundException(`Room with ID ${id} not found`);
            }
            if (existingRoom.deletedAt) {
                throw new common_1.BadRequestException("Room is already deleted");
            }
            return await this.prisma.room.update({
                where: { id },
                data: {
                    deletedAt: new Date(),
                    isAvailable: false,
                },
            });
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException || error instanceof common_1.BadRequestException) {
                throw error;
            }
            const errorMessage = error instanceof Error ? error.message : String(error);
            this.logger.error(`Failed to delete room ${id}: ${errorMessage}`);
            throw new common_1.BadRequestException("Failed to delete room");
        }
    }
    async delete(id) {
        const bookings = await this.prisma.booking.findMany({
            where: { roomId: id },
        });
        if (bookings && bookings.length > 0) {
            return this.prisma.room.update({
                where: { id },
                data: {
                    deletedAt: new Date(),
                    isAvailable: false,
                },
            });
        }
        return this.prisma.room.delete({
            where: { id },
        });
    }
    async getAvailableRooms(selectedMonth) {
        const selectedMonthStart = this.parseSelectedMonthStart(selectedMonth);
        const selectedMonthEndExclusive = selectedMonthStart
            ? new Date(Date.UTC(selectedMonthStart.getUTCFullYear(), selectedMonthStart.getUTCMonth() + 1, 1))
            : null;
        const rooms = await this.prisma.room.findMany({
            where: {
                deletedAt: null,
            },
            select: this.roomSafeSelect,
        });
        const rulesMap = await this.getRulesByRoomIds(rooms.map((room) => room.id));
        const now = new Date();
        const mappedRooms = rooms.map((room) => {
            let availabilityStatus = String(room.status || "AVAILABLE").toUpperCase();
            let availableFrom = null;
            const occupiedUntilDate = room.occupiedUntil
                ? new Date(room.occupiedUntil)
                : null;
            if (occupiedUntilDate &&
                !Number.isNaN(occupiedUntilDate.getTime()) &&
                occupiedUntilDate > now) {
                availabilityStatus = "OCCUPIED";
                availableFrom = occupiedUntilDate.toISOString();
            }
            return {
                ...room,
                availabilityStatus,
                availableFrom,
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
            if (Number.isNaN(availableByDate.getTime()))
                return false;
            return availableByDate < selectedMonthEndExclusive;
        })
            .map(({ availableBy: _availableBy, ...room }) => room);
    }
    async findOccupiedRooms() {
        const rooms = await this.prisma.room.findMany({
            where: {
                deletedAt: null,
                status: "OCCUPIED",
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
};
exports.RoomsService = RoomsService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_5_MINUTES),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RoomsService.prototype, "refreshExpiredOccupancies", null);
exports.RoomsService = RoomsService = RoomsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RoomsService);
//# sourceMappingURL=rooms.service.js.map