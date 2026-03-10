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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const node_path_1 = require("node:path");
const node_fs_1 = require("node:fs");
const rooms_service_1 = require("./rooms.service");
const room_dto_1 = require("./dto/room.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
let RoomsController = class RoomsController {
    constructor(roomsService) {
        this.roomsService = roomsService;
    }
    async findAll() {
        return this.roomsService.findAll();
    }
    async getAvailableRooms() {
        return this.roomsService.getAvailableRooms();
    }
    async findOne(id) {
        return this.roomsService.findOne(id);
    }
    async create(file, body, req) {
        if (file) {
            const host = req.get("host");
            const protocol = req.protocol;
            body.videoUrl = `${protocol}://${host}/uploads/videos/${file.filename}`;
        }
        body.floor = Number(body.floor);
        body.area = Number(body.area);
        body.rent = Number(body.rent);
        body.deposit = Number(body.deposit);
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
        return this.roomsService.create(body);
    }
    async update(id, updateRoomDto) {
        return this.roomsService.update(id, updateRoomDto);
    }
    async remove(id) {
        return this.roomsService.remove(id);
    }
};
exports.RoomsController = RoomsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: "Get all rooms" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RoomsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)("available"),
    (0, swagger_1.ApiOperation)({ summary: "Get available rooms" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RoomsController.prototype, "getAvailableRooms", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Get room by ID" }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RoomsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)("ADMIN"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: "Create a new room (Admin only)" }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("video", {
        storage: (0, multer_1.diskStorage)({
            destination: (_req, _file, cb) => {
                const uploadDir = (0, node_path_1.join)(process.cwd(), "uploads", "videos");
                if (!(0, node_fs_1.existsSync)(uploadDir)) {
                    (0, node_fs_1.mkdirSync)(uploadDir, { recursive: true });
                }
                cb(null, uploadDir);
            },
            filename: (_req, file, cb) => {
                const ext = (0, node_path_1.extname)(file.originalname).toLowerCase();
                const safe = Date.now() + "-" + Math.round(Math.random() * 1e9);
                cb(null, `${safe}${ext}`);
            },
        }),
        fileFilter: (_req, file, cb) => {
            const allowed = new Set([".mp4", ".mov", ".webm"]);
            const ext = (0, node_path_1.extname)(file.originalname).toLowerCase();
            cb(allowed.has(ext)
                ? null
                : new common_1.BadRequestException("Only mp4, mov, webm videos are allowed"), allowed.has(ext));
        },
        limits: { fileSize: 100 * 1024 * 1024 },
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], RoomsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(":id"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)("ADMIN"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: "Update a room (Admin only)" }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, room_dto_1.UpdateRoomDto]),
    __metadata("design:returntype", Promise)
], RoomsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)("ADMIN"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: "Delete a room (Admin only)" }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RoomsController.prototype, "remove", null);
exports.RoomsController = RoomsController = __decorate([
    (0, swagger_1.ApiTags)("Rooms"),
    (0, common_1.Controller)("rooms"),
    __metadata("design:paramtypes", [rooms_service_1.RoomsService])
], RoomsController);
//# sourceMappingURL=rooms.controller.js.map