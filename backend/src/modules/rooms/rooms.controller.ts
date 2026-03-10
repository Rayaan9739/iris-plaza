import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  Request,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname, join } from "node:path";
import { existsSync, mkdirSync } from "node:fs";
import { RoomsService } from "./rooms.service";
import { CreateRoomDto, UpdateRoomDto } from "./dto/room.dto";
import { JwtAuthGuard } from "@/modules/auth/guards/jwt-auth.guard";
import { RolesGuard } from "@/common/guards/roles.guard";
import { Roles } from "@/common/decorators/roles.decorator";

@ApiTags("Rooms")
@Controller("rooms")
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get()
  @ApiOperation({ summary: "Get all rooms" })
  async findAll() {
    return this.roomsService.findAll();
  }

  @Get("available")
  @ApiOperation({ summary: "Get available rooms" })
  async getAvailableRooms() {
    return this.roomsService.getAvailableRooms();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get room by ID" })
  async findOne(@Param("id") id: string) {
    return this.roomsService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("ADMIN")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Create a new room (Admin only)" })
  @UseInterceptors(
    FileInterceptor("video", {
      storage: diskStorage({
        destination: (_req, _file, cb) => {
          const uploadDir = join(process.cwd(), "uploads", "videos");
          if (!existsSync(uploadDir)) {
            mkdirSync(uploadDir, { recursive: true });
          }
          cb(null, uploadDir);
        },
        filename: (_req, file, cb) => {
          const ext = extname(file.originalname).toLowerCase();
          const safe = Date.now() + "-" + Math.round(Math.random() * 1e9);
          cb(null, `${safe}${ext}`);
        },
      }),
      fileFilter: (_req, file, cb) => {
        const allowed = new Set([".mp4", ".mov", ".webm"]);
        const ext = extname(file.originalname).toLowerCase();
        cb(
          allowed.has(ext)
            ? null
            : new BadRequestException("Only mp4, mov, webm videos are allowed"),
          allowed.has(ext),
        );
      },
      limits: { fileSize: 100 * 1024 * 1024 },
    }),
  )
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: any,
    @Request() req: any,
  ) {
    if (file) {
      const host = req.get("host");
      const protocol = req.protocol;
      body.videoUrl = `${protocol}://${host}/uploads/videos/${file.filename}`;
    }

    // coerce numbers
    body.floor = Number(body.floor);
    body.area = Number(body.area);
    body.rent = Number(body.rent);
    body.deposit = Number(body.deposit);

    // normalize arrays keys if necessary
    if (body["amenities[]"]) {
      body.amenities = Array.isArray(body["amenities[]"])
        ? body["amenities[]"]
        : [body["amenities[]"]];
    }
    if (body["rules[]"]) {
      body.rules = Array.isArray(body["rules[]"])
        ? body["rules[]"]
        : [body["rules[]"]];
    }

    return this.roomsService.create(body as CreateRoomDto);
  }

  @Put(":id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("ADMIN")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Update a room (Admin only)" })
  async update(@Param("id") id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomsService.update(id, updateRoomDto);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("ADMIN")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Delete a room (Admin only)" })
  async remove(@Param("id") id: string) {
    return this.roomsService.remove(id);
  }
}
