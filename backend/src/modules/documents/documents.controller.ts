import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  UseGuards,
  Request,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Query,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname, join } from "node:path";
import { existsSync, mkdirSync } from "node:fs";
import { DocumentsService } from "./documents.service";
import { JwtAuthGuard } from "@/modules/auth/guards/jwt-auth.guard";
import { RolesGuard } from "@/common/guards/roles.guard";
import { Roles } from "@/common/decorators/roles.decorator";

@ApiTags("Documents")
@Controller("documents")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class DocumentsController {
  constructor(private documentsService: DocumentsService) {}

  @Get("me")
  @ApiOperation({ summary: "Get my documents" })
  async getMyDocuments(@Request() req: any) {
    return this.documentsService.findMyDocuments(req.user.userId);
  }

  @Get("my")
  @ApiOperation({ summary: "Get my documents (alias)" })
  async getMyDocumentsAlias(@Request() req: any) {
    return this.documentsService.findMyDocuments(req.user.userId);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get document by ID" })
  async findOne(@Param("id") id: string) {
    return this.documentsService.findOne(id);
  }

  @Post("upload/file")
  @ApiOperation({ summary: "Upload verification file" })
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: (_req, _file, cb) => {
          const uploadDir = join(process.cwd(), "uploads", "verification");
          if (!existsSync(uploadDir)) {
            mkdirSync(uploadDir, { recursive: true });
          }
          cb(null, uploadDir);
        },
        filename: (req, file, cb) => {
          const ext = extname(file.originalname).toLowerCase();
          const documentType = String(req.query.documentType || "")
            .trim()
            .toUpperCase();
          const prefix =
            documentType === "AADHAAR"
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
        const ext = extname(file.originalname).toLowerCase();
        cb(
          allowed.has(ext)
            ? null
            : new BadRequestException("Only jpg, jpeg, png, pdf are allowed"),
          allowed.has(ext),
        );
      },
      limits: { fileSize: 5 * 1024 * 1024 },
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Request() req: any,
    @Query("documentType") _documentType?: string,
  ) {
    if (!file) {
      throw new BadRequestException("File is required");
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

  @Post("upload")
  @ApiOperation({ summary: "Upload a document" })
  async create(
    @Request() req: any,
    @Body()
    body: {
      name: string;
      type: string;
      fileUrl: string;
      fileName?: string;
      fileSize?: number;
      mimeType?: string;
      bookingId?: string;
    },
  ) {
    return this.documentsService.create(req.user.userId, body);
  }

  // Admin endpoints
  @Get("admin/all")
  @UseGuards(RolesGuard)
  @Roles("ADMIN")
  @ApiOperation({ summary: "Get all documents (Admin)" })
  async findAll() {
    return this.documentsService.findAll();
  }

  @Get("admin/pending")
  @UseGuards(RolesGuard)
  @Roles("ADMIN")
  @ApiOperation({ summary: "Get pending documents (Admin)" })
  async findPending() {
    return this.documentsService.findPendingDocuments();
  }

  @Patch("admin/:id/status")
  @UseGuards(RolesGuard)
  @Roles("ADMIN")
  @ApiOperation({ summary: "Update document status (Admin)" })
  async updateStatus(
    @Param("id") id: string,
    @Body() body: { status: string; rejectReason?: string },
  ) {
    return this.documentsService.updateStatus(
      id,
      body.status,
      body.rejectReason,
    );
  }
}
