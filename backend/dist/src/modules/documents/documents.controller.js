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
exports.DocumentsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const node_path_1 = require("node:path");
const node_fs_1 = require("node:fs");
const documents_service_1 = require("./documents.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
let DocumentsController = class DocumentsController {
    constructor(documentsService) {
        this.documentsService = documentsService;
    }
    async getMyDocuments(req) {
        return this.documentsService.findMyDocuments(req.user.userId);
    }
    async getMyDocumentsAlias(req) {
        return this.documentsService.findMyDocuments(req.user.userId);
    }
    async findOne(id) {
        return this.documentsService.findOne(id);
    }
    async uploadFile(file, req, _documentType) {
        if (!file) {
            throw new common_1.BadRequestException("File is required");
        }
        const host = req.get("host");
        const protocol = req.protocol;
        return {
            fileUrl: `${protocol}://${host}/uploads/verification/${file.filename}`,
            fileName: file.originalname,
            fileSize: file.size,
            mimeType: file.mimetype,
        };
    }
    async create(req, body) {
        return this.documentsService.create(req.user.userId, body);
    }
    async findAll() {
        return this.documentsService.findAll();
    }
    async findPending() {
        return this.documentsService.findPendingDocuments();
    }
    async updateStatus(id, body) {
        return this.documentsService.updateStatus(id, body.status, body.rejectReason);
    }
};
exports.DocumentsController = DocumentsController;
__decorate([
    (0, common_1.Get)("me"),
    (0, swagger_1.ApiOperation)({ summary: "Get my documents" }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "getMyDocuments", null);
__decorate([
    (0, common_1.Get)("my"),
    (0, swagger_1.ApiOperation)({ summary: "Get my documents (alias)" }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "getMyDocumentsAlias", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Get document by ID" }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)("upload/file"),
    (0, swagger_1.ApiOperation)({ summary: "Upload verification file" }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("file", {
        storage: (0, multer_1.diskStorage)({
            destination: (_req, _file, cb) => {
                const uploadDir = (0, node_path_1.join)(process.cwd(), "uploads", "verification");
                if (!(0, node_fs_1.existsSync)(uploadDir)) {
                    (0, node_fs_1.mkdirSync)(uploadDir, { recursive: true });
                }
                cb(null, uploadDir);
            },
            filename: (req, file, cb) => {
                const ext = (0, node_path_1.extname)(file.originalname).toLowerCase();
                const documentType = String(req.query.documentType || "")
                    .trim()
                    .toUpperCase();
                const prefix = documentType === "AADHAAR"
                    ? "aadhar"
                    : documentType === "COLLEGE_ID"
                        ? "id"
                        : documentType === "TENANT_PHOTO"
                            ? "tenant"
                            : "doc";
                const safe = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
                cb(null, `${prefix}_${safe}${ext}`);
            },
        }),
        fileFilter: (_req, file, cb) => {
            const allowed = new Set([".jpg", ".jpeg", ".png", ".pdf"]);
            const ext = (0, node_path_1.extname)(file.originalname).toLowerCase();
            cb(allowed.has(ext)
                ? null
                : new common_1.BadRequestException("Only jpg, jpeg, png, pdf are allowed"), allowed.has(ext));
        },
        limits: { fileSize: 5 * 1024 * 1024 },
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Query)("documentType")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Post)("upload"),
    (0, swagger_1.ApiOperation)({ summary: "Upload a document" }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)("admin/all"),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)("ADMIN"),
    (0, swagger_1.ApiOperation)({ summary: "Get all documents (Admin)" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)("admin/pending"),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)("ADMIN"),
    (0, swagger_1.ApiOperation)({ summary: "Get pending documents (Admin)" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "findPending", null);
__decorate([
    (0, common_1.Patch)("admin/:id/status"),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)("ADMIN"),
    (0, swagger_1.ApiOperation)({ summary: "Update document status (Admin)" }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "updateStatus", null);
exports.DocumentsController = DocumentsController = __decorate([
    (0, swagger_1.ApiTags)("Documents"),
    (0, common_1.Controller)("documents"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [documents_service_1.DocumentsService])
], DocumentsController);
//# sourceMappingURL=documents.controller.js.map