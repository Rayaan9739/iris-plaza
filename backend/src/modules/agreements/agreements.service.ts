import { Injectable, NotFoundException, Logger } from "@nestjs/common";
import { PrismaService } from "@/prisma/prisma.service";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { Cron, CronExpression } from "@nestjs/schedule";
import * as fs from "fs";
import * as path from "path";

@Injectable()
export class AgreementsService {
  private readonly logger = new Logger(AgreementsService.name);

  constructor(private prisma: PrismaService) {}

  async generateRentalAgreement(bookingId: string): Promise<string> {
    // Get booking with all required data
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        user: true,
        room: true,
      },
    });

    if (!booking) {
      throw new NotFoundException("Booking not found");
    }

    // Check if agreement already exists
    const existingAgreement = await this.prisma.agreement.findUnique({
      where: { bookingId },
    });

    if (existingAgreement?.agreementUrl) {
      return existingAgreement.agreementUrl;
    }

    // Create PDF
    const pdfBytes = await this.createAgreementPdf(booking);
    
    // Save to file
    const uploadsDir = path.join(process.cwd(), "uploads", "agreements");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const fileName = `agreement_${bookingId}.pdf`;
    const filePath = path.join(uploadsDir, fileName);
    fs.writeFileSync(filePath, pdfBytes);

    // Save or update agreement in database
    const agreementUrl = `/uploads/agreements/${fileName}`;
    
    const agreementData = {
      bookingId,
      agreementUrl,
      status: "ACTIVE" as any, // Set to ACTIVE when booking is approved
      startDate: booking.moveInDate || booking.startDate || new Date(),
      endDate: booking.moveOutDate || booking.endDate || new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      monthlyRent: booking.room.rent,
      securityDeposit: booking.room.deposit,
    };

    if (existingAgreement) {
      await this.prisma.agreement.update({
        where: { bookingId },
        data: agreementData,
      });
    } else {
      await this.prisma.agreement.create({
        data: agreementData,
      });
    }

    // Also store as a document for unified document system
    const documentData = {
      userId: booking.userId,
      bookingId,
      name: "Rental Agreement",
      type: "AGREEMENT" as any,
      fileUrl: agreementUrl,
      fileName: fileName,
      status: "APPROVED" as any,
    };
    
    // Check if document already exists
    const existingDocument = await this.prisma.document.findUnique({
      where: { id: `agreement-${bookingId}` },
    });
    
    if (existingDocument) {
      await this.prisma.document.update({
        where: { id: `agreement-${bookingId}` },
        data: documentData,
      });
    } else {
      await this.prisma.document.create({
        data: {
          id: `agreement-${bookingId}`,
          ...documentData,
        },
      });
    }

    return agreementUrl;
  }

  private async createAgreementPdf(booking: any): Promise<Buffer> {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595.28, 841.89]); // A4 size
    
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    // Title
    page.drawText("RENTAL AGREEMENT", {
      x: 180,
      y: 800,
      size: 20,
      font: fontBold,
      color: rgb(0, 0, 0),
    });

    // Agreement details
    let y = 750;
    const lineHeight = 20;

    // This Rental Agreement is made on...
    page.drawText(`This Rental Agreement is made on ${new Date().toLocaleDateString()} between:`, {
      x: 50,
      y,
      size: 12,
      font,
      color: rgb(0, 0, 0),
    });

    y -= lineHeight * 1.5;
    page.drawText("LANDLORD/OWNER: Iris Plaza Management", {
      x: 50,
      y,
      size: 12,
      font: fontBold,
      color: rgb(0, 0, 0),
    });

    y -= lineHeight * 1.5;
    page.drawText("TENANT:", {
      x: 50,
      y,
      size: 12,
      font: fontBold,
      color: rgb(0, 0, 0),
    });

    y -= lineHeight;
    const tenantName = `${booking.user.firstName || ""} ${booking.user.lastName || ""}`.trim();
    page.drawText(`Name: ${tenantName}`, {
      x: 70,
      y,
      size: 11,
      font,
      color: rgb(0, 0, 0),
    });

    y -= lineHeight;
    const tenantAddress = booking.user.address || "N/A";
    page.drawText(`Address: ${tenantAddress}`, {
      x: 70,
      y,
      size: 11,
      font,
      color: rgb(0, 0, 0),
    });

    y -= lineHeight * 1.5;
    page.drawText("PROPERTY DETAILS:", {
      x: 50,
      y,
      size: 12,
      font: fontBold,
      color: rgb(0, 0, 0),
    });

    y -= lineHeight;
    page.drawText(`Room: ${booking.room.name || "N/A"}`, {
      x: 70,
      y,
      size: 11,
      font,
      color: rgb(0, 0, 0),
    });

    y -= lineHeight;
    page.drawText(`Floor: ${booking.room.floor || "N/A"}`, {
      x: 70,
      y,
      size: 11,
      font,
      color: rgb(0, 0, 0),
    });

    y -= lineHeight;
    page.drawText(`Area: ${booking.room.area || "N/A"} sq ft`, {
      x: 70,
      y,
      size: 11,
      font,
      color: rgb(0, 0, 0),
    });

    y -= lineHeight * 1.5;
    page.drawText("RENTAL TERMS:", {
      x: 50,
      y,
      size: 12,
      font: fontBold,
      color: rgb(0, 0, 0),
    });

    y -= lineHeight;
    const moveInDate = booking.moveInDate || booking.startDate;
    const moveOutDate = booking.moveOutDate || booking.endDate;
    page.drawText(`Move-in Date: ${moveInDate ? new Date(moveInDate).toLocaleDateString() : "N/A"}`, {
      x: 70,
      y,
      size: 11,
      font,
      color: rgb(0, 0, 0),
    });

    y -= lineHeight;
    page.drawText(`Agreement End Date: ${moveOutDate ? new Date(moveOutDate).toLocaleDateString() : "N/A"}`, {
      x: 70,
      y,
      size: 11,
      font,
      color: rgb(0, 0, 0),
    });

    y -= lineHeight * 1.5;
    page.drawText("PAYMENT DETAILS:", {
      x: 50,
      y,
      size: 12,
      font: fontBold,
      color: rgb(0, 0, 0),
    });

    y -= lineHeight;
    const rentAmount = Number(booking.room.rent || 0);
    page.drawText(`Monthly Rent: Rs ${rentAmount.toLocaleString("en-IN")}`, {
      x: 70,
      y,
      size: 11,
      font,
      color: rgb(0, 0, 0),
    });

    y -= lineHeight;
    const depositAmount = Number(booking.room.deposit || 0);
    page.drawText(`Security Deposit: Rs ${depositAmount.toLocaleString("en-IN")}`, {
      x: 70,
      y,
      size: 11,
      font,
      color: rgb(0, 0, 0),
    });

    y -= lineHeight * 2;
    page.drawText("TERMS AND CONDITIONS:", {
      x: 50,
      y,
      size: 12,
      font: fontBold,
      color: rgb(0, 0, 0),
    });

    y -= lineHeight;
    const terms = [
      "1. The tenant agrees to pay rent on time every month.",
      "2. The security deposit will be refunded at the end of the agreement term.",
      "3. The tenant must maintain the room in good condition.",
      "4. Any damages beyond normal wear and tear will be deducted from the deposit.",
      "5. Either party must give 30 days notice before terminating this agreement.",
      "6. The landlord reserves the right to enter the room for maintenance with prior notice.",
    ];

    for (const term of terms) {
      y -= lineHeight;
      if (y < 100) break;
      page.drawText(term, {
        x: 70,
        y,
        size: 10,
        font,
        color: rgb(0, 0, 0),
      });
    }

    // Signature section
    y -= lineHeight * 2;
    page.drawText("SIGNATURES:", {
      x: 50,
      y,
      size: 12,
      font: fontBold,
    });

    y -= lineHeight * 2;
    page.drawText("_________________________", {
      x: 50,
      y,
      size: 11,
      font,
    });
    page.drawText("Landlord/Owner", {
      x: 50,
      y: y - 15,
      size: 10,
      font,
    });

    page.drawText("_________________________", {
      x: 350,
      y,
      size: 11,
      font,
    });
    page.drawText("Tenant", {
      x: 350,
      y: y - 15,
      size: 10,
      font,
    });

    // Footer
    page.drawText("Generated by Iris Plaza", {
      x: 200,
      y: 30,
      size: 9,
      font,
      color: rgb(0.5, 0.5, 0.5),
    });

    const pdfBytes = await pdfDoc.save();
    return Buffer.from(pdfBytes);
  }

  async findByBooking(bookingId: string) {
    return this.prisma.agreement.findUnique({
      where: { bookingId },
      include: { booking: { include: { user: true, room: true } } },
    });
  }

  async findByBookingWithUser(bookingId: string) {
    // This method returns the agreement with booking and user info for ownership verification
    return this.prisma.agreement.findUnique({
      where: { bookingId },
      include: { 
        booking: { 
          include: { user: true } 
        } 
      },
    });
  }

  async findMyAgreement(userId: string) {
    // Find agreement for the current user's approved booking that's still active
    return this.prisma.agreement.findFirst({
      where: {
        booking: {
          userId: userId, // Use booking's userId
          status: {
            in: ["APPROVED", "APPROVED_PENDING_PAYMENT"]
          },
        },
        status: "ACTIVE" as any, // Must be ACTIVE
        endDate: {
          gt: new Date() // Must not be expired
        }
      },
      include: {
        booking: true,
      },
    });
  }

  async create(
    bookingId: string,
    data: {
      startDate: Date;
      endDate: Date;
      monthlyRent: number;
      securityDeposit: number;
    },
  ) {
    return this.prisma.agreement.create({
      data: {
        bookingId,
        ...data,
      },
    });
  }

  async signAsTenant(bookingId: string) {
    return this.prisma.agreement.update({
      where: { bookingId },
      data: {
        tenantSigned: true,
        tenantSignedAt: new Date(),
        status: "PENDING_SIGNATURE",
      },
    });
  }

  async signAsAdmin(bookingId: string) {
    return this.prisma.agreement.update({
      where: { bookingId },
      data: {
        adminSigned: true,
        adminSignedAt: new Date(),
        status: "SIGNED",
      },
    });
  }

  async getAgreementUrl(bookingId: string): Promise<string | null> {
    const agreement = await this.prisma.agreement.findUnique({
      where: { bookingId },
    });
    return agreement?.agreementUrl || null;
  }

  // Expire agreements that have passed their end date and update room status
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async expireAgreements() {
    this.logger.log('Running scheduled task to expire agreements...');
    const now = new Date();
    
    // Find active agreements that have expired
    const expiredAgreements = await this.prisma.agreement.findMany({
      where: {
        status: "ACTIVE" as any,
        endDate: {
          lte: now
        }
      },
      include: {
        booking: true
      }
    });
    
    // Update each expired agreement and release the room
    for (const agreement of expiredAgreements) {
      // Update agreement status to EXPIRED
      await this.prisma.agreement.update({
        where: { id: agreement.id },
        data: {
          status: "EXPIRED" as any
        }
      });
      
      // Release the room
      await this.prisma.room.update({
        where: { id: agreement.booking.roomId },
        data: {
          status: "AVAILABLE" as any,
          isAvailable: true,
          occupiedFrom: null,
          occupiedUntil: null
        }
      });
    }
    
    this.logger.log(`Expired ${expiredAgreements.length} agreements`);
    
    return {
      expiredCount: expiredAgreements.length,
      agreements: expiredAgreements
    };
  }
}
