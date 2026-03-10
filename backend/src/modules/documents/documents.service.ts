import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "@/prisma/prisma.service";

@Injectable()
export class DocumentsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.document.findMany({
      include: { user: true, booking: { include: { room: true } } },
    });
  }

  async findMyDocuments(userId: string) {
    return this.prisma.document.findMany({
      where: { userId },
      include: { booking: true },
    });
  }

  async findOne(id: string) {
    const document = await this.prisma.document.findUnique({
      where: { id },
      include: { user: true, booking: true },
    });
    if (!document) throw new NotFoundException("Document not found");
    return document;
  }

  async create(
    userId: string,
    data: {
      name: string;
      type: string;
      fileUrl: string;
      fileName?: string;
      fileSize?: number;
      mimeType?: string;
      bookingId?: string;
      status?: string;
    },
  ) {
    return this.prisma.document.create({
      data: {
        name: data.name,
        type: data.type as any,
        fileUrl: data.fileUrl,
        fileName: data.fileName,
        fileSize: data.fileSize,
        mimeType: data.mimeType,
        bookingId: data.bookingId,
        userId,
        status: (data.status || "SUBMITTED") as any,
      },
    });
  }

  async updateStatus(id: string, status: string, rejectReason?: string) {
    return this.prisma.document.update({
      where: { id },
      data: {
        status: status as any,
        rejectReason,
        reviewedAt: new Date(),
      },
    });
  }

  async findPendingDocuments() {
    return this.prisma.document.findMany({
      where: { status: "PENDING" as any },
      include: { user: true, booking: true },
    });
  }
}
