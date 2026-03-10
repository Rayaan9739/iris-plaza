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
var AgreementsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgreementsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const pdf_lib_1 = require("pdf-lib");
const schedule_1 = require("@nestjs/schedule");
const cloudinary_service_1 = require("../../common/services/cloudinary.service");
let AgreementsService = AgreementsService_1 = class AgreementsService {
    constructor(prisma, cloudinaryService) {
        this.prisma = prisma;
        this.cloudinaryService = cloudinaryService;
        this.logger = new common_1.Logger(AgreementsService_1.name);
    }
    async generateRentalAgreement(bookingId) {
        const booking = await this.prisma.booking.findUnique({
            where: { id: bookingId },
            include: {
                user: true,
                room: true,
            },
        });
        if (!booking) {
            throw new common_1.NotFoundException("Booking not found");
        }
        const existingAgreement = await this.prisma.agreement.findUnique({
            where: { bookingId },
        });
        if (existingAgreement?.agreementUrl) {
            return existingAgreement.agreementUrl;
        }
        const pdfBytes = await this.createAgreementPdf(booking);
        const fileName = `agreement_${bookingId}.pdf`;
        let agreementUrl;
        try {
            const result = await this.cloudinaryService.uploadBuffer(pdfBytes, fileName, "iris-plaza/agreement");
            agreementUrl = result.secure_url;
        }
        catch (error) {
            console.error("Failed to upload agreement to Cloudinary:", error);
            throw new Error("Failed to generate rental agreement");
        }
        const agreementData = {
            bookingId,
            agreementUrl,
            status: "ACTIVE",
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
        }
        else {
            await this.prisma.agreement.create({
                data: agreementData,
            });
        }
        const documentData = {
            userId: booking.userId,
            bookingId,
            name: "Rental Agreement",
            type: "AGREEMENT",
            fileUrl: agreementUrl,
            fileName: fileName,
            status: "APPROVED",
        };
        const existingDocument = await this.prisma.document.findUnique({
            where: { id: `agreement-${bookingId}` },
        });
        if (existingDocument) {
            await this.prisma.document.update({
                where: { id: `agreement-${bookingId}` },
                data: documentData,
            });
        }
        else {
            await this.prisma.document.create({
                data: {
                    id: `agreement-${bookingId}`,
                    ...documentData,
                },
            });
        }
        return agreementUrl;
    }
    async createAgreementPdf(booking) {
        const pdfDoc = await pdf_lib_1.PDFDocument.create();
        const page = pdfDoc.addPage([595.28, 841.89]);
        const font = await pdfDoc.embedFont(pdf_lib_1.StandardFonts.Helvetica);
        const fontBold = await pdfDoc.embedFont(pdf_lib_1.StandardFonts.HelveticaBold);
        page.drawText("RENTAL AGREEMENT", {
            x: 180,
            y: 800,
            size: 20,
            font: fontBold,
            color: (0, pdf_lib_1.rgb)(0, 0, 0),
        });
        let y = 750;
        const lineHeight = 20;
        page.drawText(`This Rental Agreement is made on ${new Date().toLocaleDateString()} between:`, {
            x: 50,
            y,
            size: 12,
            font,
            color: (0, pdf_lib_1.rgb)(0, 0, 0),
        });
        y -= lineHeight * 1.5;
        page.drawText("LANDLORD/OWNER: Iris Plaza Management", {
            x: 50,
            y,
            size: 12,
            font: fontBold,
            color: (0, pdf_lib_1.rgb)(0, 0, 0),
        });
        y -= lineHeight * 1.5;
        page.drawText("TENANT:", {
            x: 50,
            y,
            size: 12,
            font: fontBold,
            color: (0, pdf_lib_1.rgb)(0, 0, 0),
        });
        y -= lineHeight;
        const tenantName = `${booking.user.firstName || ""} ${booking.user.lastName || ""}`.trim();
        page.drawText(`Name: ${tenantName}`, {
            x: 70,
            y,
            size: 11,
            font,
            color: (0, pdf_lib_1.rgb)(0, 0, 0),
        });
        y -= lineHeight;
        const tenantAddress = booking.user.address || "N/A";
        page.drawText(`Address: ${tenantAddress}`, {
            x: 70,
            y,
            size: 11,
            font,
            color: (0, pdf_lib_1.rgb)(0, 0, 0),
        });
        y -= lineHeight * 1.5;
        page.drawText("PROPERTY DETAILS:", {
            x: 50,
            y,
            size: 12,
            font: fontBold,
            color: (0, pdf_lib_1.rgb)(0, 0, 0),
        });
        y -= lineHeight;
        page.drawText(`Room: ${booking.room.name || "N/A"}`, {
            x: 70,
            y,
            size: 11,
            font,
            color: (0, pdf_lib_1.rgb)(0, 0, 0),
        });
        y -= lineHeight;
        page.drawText(`Floor: ${booking.room.floor || "N/A"}`, {
            x: 70,
            y,
            size: 11,
            font,
            color: (0, pdf_lib_1.rgb)(0, 0, 0),
        });
        y -= lineHeight;
        page.drawText(`Area: ${booking.room.area || "N/A"} sq ft`, {
            x: 70,
            y,
            size: 11,
            font,
            color: (0, pdf_lib_1.rgb)(0, 0, 0),
        });
        y -= lineHeight * 1.5;
        page.drawText("RENTAL TERMS:", {
            x: 50,
            y,
            size: 12,
            font: fontBold,
            color: (0, pdf_lib_1.rgb)(0, 0, 0),
        });
        y -= lineHeight;
        const moveInDate = booking.moveInDate || booking.startDate;
        const moveOutDate = booking.moveOutDate || booking.endDate;
        page.drawText(`Move-in Date: ${moveInDate ? new Date(moveInDate).toLocaleDateString() : "N/A"}`, {
            x: 70,
            y,
            size: 11,
            font,
            color: (0, pdf_lib_1.rgb)(0, 0, 0),
        });
        y -= lineHeight;
        page.drawText(`Agreement End Date: ${moveOutDate ? new Date(moveOutDate).toLocaleDateString() : "N/A"}`, {
            x: 70,
            y,
            size: 11,
            font,
            color: (0, pdf_lib_1.rgb)(0, 0, 0),
        });
        y -= lineHeight * 1.5;
        page.drawText("PAYMENT DETAILS:", {
            x: 50,
            y,
            size: 12,
            font: fontBold,
            color: (0, pdf_lib_1.rgb)(0, 0, 0),
        });
        y -= lineHeight;
        const rentAmount = Number(booking.room.rent || 0);
        page.drawText(`Monthly Rent: Rs ${rentAmount.toLocaleString("en-IN")}`, {
            x: 70,
            y,
            size: 11,
            font,
            color: (0, pdf_lib_1.rgb)(0, 0, 0),
        });
        y -= lineHeight;
        const depositAmount = Number(booking.room.deposit || 0);
        page.drawText(`Security Deposit: Rs ${depositAmount.toLocaleString("en-IN")}`, {
            x: 70,
            y,
            size: 11,
            font,
            color: (0, pdf_lib_1.rgb)(0, 0, 0),
        });
        y -= lineHeight * 2;
        page.drawText("TERMS AND CONDITIONS:", {
            x: 50,
            y,
            size: 12,
            font: fontBold,
            color: (0, pdf_lib_1.rgb)(0, 0, 0),
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
            if (y < 100)
                break;
            page.drawText(term, {
                x: 70,
                y,
                size: 10,
                font,
                color: (0, pdf_lib_1.rgb)(0, 0, 0),
            });
        }
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
        page.drawText("Generated by Iris Plaza", {
            x: 200,
            y: 30,
            size: 9,
            font,
            color: (0, pdf_lib_1.rgb)(0.5, 0.5, 0.5),
        });
        const pdfBytes = await pdfDoc.save();
        return Buffer.from(pdfBytes);
    }
    async findByBooking(bookingId) {
        return this.prisma.agreement.findUnique({
            where: { bookingId },
            include: { booking: { include: { user: true, room: true } } },
        });
    }
    async findByBookingWithUser(bookingId) {
        return this.prisma.agreement.findUnique({
            where: { bookingId },
            include: {
                booking: {
                    include: { user: true }
                }
            },
        });
    }
    async findMyAgreement(userId) {
        return this.prisma.agreement.findFirst({
            where: {
                booking: {
                    userId: userId,
                    status: {
                        in: ["APPROVED", "APPROVED_PENDING_PAYMENT"]
                    },
                },
                status: "ACTIVE",
                endDate: {
                    gt: new Date()
                }
            },
            include: {
                booking: true,
            },
        });
    }
    async create(bookingId, data) {
        return this.prisma.agreement.create({
            data: {
                bookingId,
                ...data,
            },
        });
    }
    async signAsTenant(bookingId) {
        return this.prisma.agreement.update({
            where: { bookingId },
            data: {
                tenantSigned: true,
                tenantSignedAt: new Date(),
                status: "PENDING_SIGNATURE",
            },
        });
    }
    async signAsAdmin(bookingId) {
        return this.prisma.agreement.update({
            where: { bookingId },
            data: {
                adminSigned: true,
                adminSignedAt: new Date(),
                status: "SIGNED",
            },
        });
    }
    async getAgreementUrl(bookingId) {
        const agreement = await this.prisma.agreement.findUnique({
            where: { bookingId },
        });
        return agreement?.agreementUrl || null;
    }
    async expireAgreements() {
        this.logger.log('Running scheduled task to expire agreements...');
        const now = new Date();
        const expiredAgreements = await this.prisma.agreement.findMany({
            where: {
                status: "ACTIVE",
                endDate: {
                    lte: now
                }
            },
            include: {
                booking: true
            }
        });
        for (const agreement of expiredAgreements) {
            await this.prisma.agreement.update({
                where: { id: agreement.id },
                data: {
                    status: "EXPIRED"
                }
            });
            await this.prisma.room.update({
                where: { id: agreement.booking.roomId },
                data: {
                    status: "AVAILABLE",
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
};
exports.AgreementsService = AgreementsService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_MIDNIGHT),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AgreementsService.prototype, "expireAgreements", null);
exports.AgreementsService = AgreementsService = AgreementsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        cloudinary_service_1.CloudinaryService])
], AgreementsService);
//# sourceMappingURL=agreements.service.js.map