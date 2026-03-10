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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingsService = void 0;
const common_1 = require("@nestjs/common");
const library_1 = require("@prisma/client/runtime/library");
const prisma_service_1 = require("../../prisma/prisma.service");
const notifications_service_1 = require("../notifications/notifications.service");
const agreements_service_1 = require("../agreements/agreements.service");
const event_emitter_service_1 = require("../../common/services/event-emitter.service");
let BookingsService = class BookingsService {
    constructor(prisma, notificationsService, agreementsService, eventEmitter) {
        this.prisma = prisma;
        this.notificationsService = notificationsService;
        this.agreementsService = agreementsService;
        this.eventEmitter = eventEmitter;
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
            amenities: { include: { amenity: true } },
            images: { orderBy: { order: "asc" } },
        };
    }
    toOptionalNumber(value) {
        if (value === null || value === undefined)
            return null;
        if (typeof value === "string" && value.trim() === "")
            return null;
        const parsed = Number(value);
        return Number.isFinite(parsed) ? parsed : null;
    }
    monthKey(date) {
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    }
    computeNextRentDueDate(moveInDate, fromDate = new Date()) {
        const anchorDay = moveInDate.getDate();
        const year = fromDate.getFullYear();
        const month = fromDate.getMonth();
        const thisMonthLastDay = new Date(year, month + 1, 0).getDate();
        const thisMonthDue = new Date(year, month, Math.min(anchorDay, thisMonthLastDay));
        if (thisMonthDue > fromDate) {
            return thisMonthDue;
        }
        const nextMonthLastDay = new Date(year, month + 2, 0).getDate();
        return new Date(year, month + 1, Math.min(anchorDay, nextMonthLastDay));
    }
    async notifyAllAdmins(title, message) {
        const admins = await this.prisma.user.findMany({
            where: { role: "ADMIN", isActive: true },
            select: { id: true },
        });
        for (const admin of admins) {
            await this.notificationsService.create(admin.id, {
                type: "PUSH",
                title,
                message,
            });
        }
    }
    async findAll() {
        return this.prisma.booking.findMany({
            include: {
                user: true,
                room: { select: this.roomSafeSelect },
                statusHistory: { orderBy: { createdAt: "desc" } },
            },
        });
    }
    async findMyBookings(userId) {
        return this.prisma.booking.findMany({
            where: {
                userId,
                status: { in: ["APPROVED", "APPROVED_PENDING_PAYMENT", "PENDING_APPROVAL", "VERIFICATION_PENDING"] }
            },
            include: {
                room: { select: this.roomSafeSelect },
                statusHistory: { orderBy: { createdAt: "desc" } },
            },
        });
    }
    async findMyApprovedBooking(userId) {
        const booking = await this.prisma.booking.findFirst({
            where: {
                userId,
                status: { in: ["APPROVED", "APPROVED_PENDING_PAYMENT"] },
            },
            include: {
                room: {
                    select: this.roomSafeSelect,
                },
                statusHistory: { orderBy: { createdAt: "desc" } },
                agreement: true,
            },
            orderBy: { createdAt: "desc" },
        });
        if (!booking) {
            return null;
        }
        return {
            ...booking,
            bookingId: booking.id,
            moveInDate: booking.moveInDate ?? booking.startDate,
            room: {
                ...booking.room,
                rent: Number(booking.room?.rent ?? 0),
                deposit: Number(booking.room?.deposit ?? 0),
            },
            agreement: booking.agreement,
        };
    }
    async findOne(id) {
        const booking = await this.prisma.booking.findUnique({
            where: { id },
            include: {
                user: true,
                room: { select: this.roomSafeSelect },
                documents: true,
                agreement: true,
                payments: true,
                rentCycles: true,
                statusHistory: { orderBy: { createdAt: "desc" } },
            },
        });
        if (!booking) {
            throw new common_1.NotFoundException("Booking not found");
        }
        return booking;
    }
    async create(input) {
        console.log("BOOKING SERVICE CREATE INPUT:", input);
        const { userId, roomId, moveInDate, moveOutDate, } = input;
        if (!userId || !roomId || !moveInDate) {
            console.error("BOOKING VALIDATION FAILED:", { userId, roomId, moveInDate });
            throw new common_1.BadRequestException("userId, roomId and moveInDate are required");
        }
        const startDate = new Date(String(moveInDate));
        if (Number.isNaN(startDate.getTime())) {
            throw new common_1.BadRequestException("Invalid moveInDate");
        }
        if (!moveOutDate) {
            throw new common_1.BadRequestException("moveOutDate is required");
        }
        const parsedCheckoutDate = new Date(moveOutDate);
        if (Number.isNaN(parsedCheckoutDate.getTime())) {
            throw new common_1.BadRequestException("Invalid moveOutDate");
        }
        if (parsedCheckoutDate <= startDate) {
            throw new common_1.BadRequestException("moveOutDate must be after moveInDate");
        }
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw new common_1.BadRequestException("User not found");
        }
        const room = await this.prisma.room.findUnique({
            where: { id: roomId },
            select: {
                id: true,
                name: true,
                status: true,
                isAvailable: true,
                rent: true,
                deposit: true,
            },
        });
        if (!room) {
            throw new common_1.BadRequestException("Room not found");
        }
        const internalRent = Number(room.rent ?? 0);
        const internalDeposit = Number(room.deposit ?? 0);
        const booking = await this.prisma.booking.create({
            data: {
                userId,
                roomId,
                startDate,
                moveInDate: startDate,
                endDate: parsedCheckoutDate,
                moveOutDate: parsedCheckoutDate,
                checkoutDate: parsedCheckoutDate,
                status: "PENDING_APPROVAL",
                expiresAt: null,
                statusHistory: {
                    create: {
                        status: "PENDING_APPROVAL",
                        comment: `Booking request submitted (rent ${internalRent}, deposit ${internalDeposit}). Waiting for admin approval.`,
                    },
                },
            },
            include: { room: { select: this.roomSafeSelect }, user: true },
        });
        await this.notifyAllAdmins("New booking request", `New booking request received for room ${room.name}.`);
        return this.prisma.booking.findUnique({
            where: { id: booking.id },
            include: {
                room: { select: this.roomSafeSelect },
                user: true,
                documents: true,
                statusHistory: { orderBy: { createdAt: "desc" } },
            },
        });
    }
    async updateStatus(id, status, comment, changedBy) {
        const booking = await this.findOne(id);
        const normalizedStatus = String(status || "").toUpperCase();
        const currentStatus = String(booking.status || "").toUpperCase();
        const allowedTransitions = {
            PENDING_APPROVAL: ["APPROVED", "APPROVED_PENDING_PAYMENT", "REJECTED", "CANCELLED"],
            PENDING: ["APPROVED", "APPROVED_PENDING_PAYMENT", "REJECTED", "CANCELLED"],
            VERIFICATION_PENDING: ["APPROVED", "APPROVED_PENDING_PAYMENT", "REJECTED", "CANCELLED"],
            APPROVED_PENDING_PAYMENT: ["APPROVED", "REJECTED", "CANCELLED"],
            APPROVED: ["EXPIRED", "CANCELLED"],
            REJECTED: [],
            CANCELLED: [],
            EXPIRED: [],
        };
        if (!allowedTransitions[currentStatus]?.includes(normalizedStatus)) {
            throw new common_1.BadRequestException(`Invalid status transition from ${currentStatus} to ${normalizedStatus}`);
        }
        const updateData = { status: normalizedStatus };
        if (normalizedStatus === "APPROVED") {
            const occupiedFrom = booking.moveInDate ?? booking.startDate;
            const occupiedUntil = booking.moveOutDate ?? booking.checkoutDate ?? booking.endDate ?? null;
            await this.prisma.room.update({
                where: { id: booking.roomId },
                data: {
                    status: "OCCUPIED",
                    isAvailable: false,
                    occupiedFrom,
                    occupiedUntil,
                },
            });
            await this.prisma.user.update({
                where: { id: booking.userId },
                data: { accountStatus: "ACTIVE" },
            });
            await this.notificationsService.create(booking.userId, {
                type: "PUSH",
                title: "Booking Approved",
                message: "Your booking has been approved by the admin. Your room is now ready for move-in.",
            });
            try {
                const agreementUrl = await this.agreementsService.generateRentalAgreement(booking.id);
                await this.notificationsService.create(booking.userId, {
                    type: "PUSH",
                    title: "Rental Agreement Generated",
                    message: "Your rental agreement has been generated. You can download it from the Documents section.",
                });
            }
            catch (error) {
                console.error("Failed to generate rental agreement:", error);
            }
        }
        if (normalizedStatus === "APPROVED_PENDING_PAYMENT") {
            await this.notificationsService.create(booking.userId, {
                type: "PUSH",
                title: "Booking Approved",
                message: "Your booking request is approved. Please complete the initial payment (Deposit + First month rent) to confirm your occupancy.",
            });
            const bookingWithRoom = await this.prisma.booking.findUnique({
                where: { id: booking.id },
                include: {
                    room: { select: { rent: true, deposit: true } },
                },
            });
            if (!bookingWithRoom) {
                throw new common_1.NotFoundException("Booking not found");
            }
            const depositAmount = Number(bookingWithRoom.room.deposit ?? 0);
            const rentAmount = Number(bookingWithRoom.room.rent ?? 0);
            const month = this.monthKey(new Date());
            const existingDeposit = await this.prisma.payment.findFirst({
                where: {
                    bookingId: booking.id,
                    userId: booking.userId,
                    type: "DEPOSIT",
                    month,
                },
            });
            if (!existingDeposit) {
                await this.prisma.payment.create({
                    data: {
                        userId: booking.userId,
                        tenantId: booking.userId,
                        roomId: booking.roomId,
                        bookingId: booking.id,
                        month,
                        amount: new library_1.Decimal(depositAmount),
                        rentAmount: new library_1.Decimal(depositAmount),
                        pendingAmount: new library_1.Decimal(depositAmount),
                        paidAmount: new library_1.Decimal(0),
                        amountPaid: new library_1.Decimal(0),
                        borrowedAmount: new library_1.Decimal(0),
                        type: "DEPOSIT",
                        status: "PENDING",
                        paymentMethod: "ONLINE",
                        description: "Deposit due on booking approval",
                    },
                });
            }
            const dueDate = this.computeNextRentDueDate(booking.moveInDate ?? booking.startDate);
            const dueMonth = this.monthKey(dueDate);
            const existingRent = await this.prisma.payment.findFirst({
                where: {
                    bookingId: booking.id,
                    userId: booking.userId,
                    type: "RENT",
                    month: dueMonth,
                },
            });
            if (!existingRent) {
                await this.prisma.payment.create({
                    data: {
                        userId: booking.userId,
                        tenantId: booking.userId,
                        roomId: booking.roomId,
                        bookingId: booking.id,
                        month: dueMonth,
                        amount: new library_1.Decimal(rentAmount),
                        rentAmount: new library_1.Decimal(rentAmount),
                        pendingAmount: new library_1.Decimal(0),
                        paidAmount: new library_1.Decimal(0),
                        amountPaid: new library_1.Decimal(0),
                        borrowedAmount: new library_1.Decimal(0),
                        type: "RENT",
                        status: "PENDING",
                        paymentMethod: "ONLINE",
                        description: `Monthly rent due by ${dueDate.toISOString()}`,
                    },
                });
            }
        }
        if (normalizedStatus === "REJECTED" || normalizedStatus === "CANCELLED") {
            await this.prisma.room.update({
                where: { id: booking.roomId },
                data: {
                    status: "AVAILABLE",
                    isAvailable: true,
                    occupiedFrom: null,
                    occupiedUntil: null,
                },
            });
            updateData.expiresAt = new Date();
            if (normalizedStatus === "REJECTED") {
                await this.notificationsService.create(booking.userId, {
                    type: "PUSH",
                    title: "Booking Rejected",
                    message: "Your booking request was rejected.",
                });
            }
        }
        if (normalizedStatus === "EXPIRED") {
            await this.prisma.room.update({
                where: { id: booking.roomId },
                data: {
                    status: "AVAILABLE",
                    isAvailable: true,
                    occupiedFrom: null,
                    occupiedUntil: null,
                },
            });
        }
        const updated = await this.prisma.booking.update({
            where: { id },
            data: updateData,
            include: { room: { select: this.roomSafeSelect }, user: true },
        });
        await this.prisma.bookingStatusHistory.create({
            data: {
                bookingId: id,
                status: normalizedStatus,
                comment,
                changedBy,
            },
        });
        this.eventEmitter.emitBookingUpdated(booking.userId, id, normalizedStatus, {
            roomId: booking.roomId,
            comment,
        });
        this.eventEmitter.emitDashboardUpdate(booking.userId, {
            bookingUpdated: true,
            status: normalizedStatus,
        });
        return updated;
    }
    async cancel(id) {
        const booking = await this.findOne(id);
        if (["APPROVED", "REJECTED", "CANCELLED"].includes(booking.status)) {
            throw new common_1.BadRequestException("Cannot cancel this booking");
        }
        const updated = await this.prisma.booking.update({
            where: { id },
            data: { status: "CANCELLED" },
            include: { room: { select: this.roomSafeSelect } },
        });
        await this.prisma.room.update({
            where: { id: booking.roomId },
            data: {
                status: "AVAILABLE",
                isAvailable: true,
                occupiedFrom: null,
                occupiedUntil: null,
            },
        });
        await this.prisma.bookingStatusHistory.create({
            data: {
                bookingId: id,
                status: "CANCELLED",
                comment: "Booking cancelled",
            },
        });
        return updated;
    }
    async findPendingBookings() {
        return this.prisma.booking.findMany({
            where: { status: { in: ["PENDING", "PENDING_APPROVAL", "VERIFICATION_PENDING"] } },
            include: {
                user: true,
                room: { select: this.roomSafeSelect },
                documents: true,
            },
        });
    }
    async approve(id) {
        return this.updateStatus(id, "APPROVED", "Booking request approved by admin.");
    }
    async reject(id) {
        const booking = await this.findOne(id);
        const updated = await this.updateStatus(id, "REJECTED", "Booking rejected by admin");
        await this.prisma.user.update({
            where: { id: booking.userId },
            data: { accountStatus: "REJECTED", isApproved: false },
        });
        return updated;
    }
    async checkExpiredCheckouts() {
        const expiredBookings = await this.prisma.booking.findMany({
            where: {
                status: "APPROVED",
                checkoutDate: { lte: new Date() },
            },
        });
        const results = [];
        for (const booking of expiredBookings) {
            try {
                const updated = await this.updateStatus(booking.id, "EXPIRED", "Booking completed at move-out date", "system");
                this.eventEmitter.emitBookingExpired(booking.userId, booking.id, {
                    roomId: booking.roomId,
                    checkoutDate: booking.checkoutDate,
                });
                results.push({ bookingId: booking.id, success: true });
            }
            catch (error) {
                results.push({
                    bookingId: booking.id,
                    success: false,
                    error: String(error),
                });
            }
        }
        return results;
    }
    async createExtensionRequest(userId, bookingId, requestedCheckoutDate) {
        const booking = await this.findOne(bookingId);
        if (booking.userId !== userId) {
            throw new common_1.BadRequestException("Unauthorized");
        }
        if (booking.status !== "APPROVED") {
            throw new common_1.BadRequestException("Cannot extend non-approved booking");
        }
        if (!booking.checkoutDate) {
            throw new common_1.BadRequestException("No checkout date set for this booking");
        }
        const newCheckoutDate = new Date(requestedCheckoutDate);
        if (Number.isNaN(newCheckoutDate.getTime())) {
            throw new common_1.BadRequestException("Invalid checkout date format");
        }
        if (newCheckoutDate <= booking.checkoutDate) {
            throw new common_1.BadRequestException("New checkout date must be after current checkout date");
        }
        const created = await this.prisma.extensionRequest.create({
            data: {
                bookingId,
                tenantId: userId,
                currentCheckoutDate: booking.checkoutDate,
                requestedCheckoutDate: newCheckoutDate,
            },
            include: {
                booking: { include: { room: { select: this.roomSafeSelect } } },
                tenant: true,
            },
        });
        await this.notifyAllAdmins("Extension request", "A tenant submitted a move-out extension request.");
        return created;
    }
    async approveExtensionRequest(extensionRequestId) {
        const extensionRequest = await this.prisma.extensionRequest.findUnique({
            where: { id: extensionRequestId },
            include: { booking: true },
        });
        if (!extensionRequest) {
            throw new common_1.NotFoundException("Extension request not found");
        }
        const updatedBooking = await this.prisma.booking.update({
            where: { id: extensionRequest.bookingId },
            data: {
                checkoutDate: extensionRequest.requestedCheckoutDate,
                moveOutDate: extensionRequest.requestedCheckoutDate,
                endDate: extensionRequest.requestedCheckoutDate,
            },
        });
        if (updatedBooking.status === "APPROVED") {
            await this.prisma.room.update({
                where: { id: updatedBooking.roomId },
                data: { occupiedUntil: extensionRequest.requestedCheckoutDate },
            });
        }
        const updated = await this.prisma.extensionRequest.update({
            where: { id: extensionRequestId },
            data: {
                status: "APPROVED",
                approvedAt: new Date(),
            },
            include: {
                booking: { include: { room: { select: this.roomSafeSelect } } },
                tenant: true,
            },
        });
        await this.notificationsService.create(extensionRequest.tenantId, {
            type: "PUSH",
            title: "Extension Approved",
            message: "Your extension request has been approved.",
        });
        this.eventEmitter.emitDashboardUpdate(extensionRequest.tenantId, {
            extensionDecision: "APPROVED",
        });
        return updated;
    }
    async rejectExtensionRequest(extensionRequestId, reason) {
        const extensionRequest = await this.prisma.extensionRequest.findUnique({
            where: { id: extensionRequestId },
        });
        if (!extensionRequest) {
            throw new common_1.NotFoundException("Extension request not found");
        }
        const updated = await this.prisma.extensionRequest.update({
            where: { id: extensionRequestId },
            data: {
                status: "REJECTED",
                rejectionReason: reason,
            },
            include: {
                booking: { include: { room: { select: this.roomSafeSelect } } },
                tenant: true,
            },
        });
        const booking = await this.prisma.booking.update({
            where: { id: extensionRequest.bookingId },
            data: { status: "EXPIRED" },
        });
        await this.prisma.room.update({
            where: { id: booking.roomId },
            data: {
                status: "AVAILABLE",
                isAvailable: true,
                occupiedFrom: null,
                occupiedUntil: null,
            },
        });
        await this.notificationsService.create(extensionRequest.tenantId, {
            type: "PUSH",
            title: "Extension Rejected",
            message: "Your extension request was rejected. Please vacate as scheduled.",
        });
        this.eventEmitter.emitDashboardUpdate(extensionRequest.tenantId, {
            extensionDecision: "REJECTED",
        });
        return updated;
    }
    async getExtensionRequests(bookingId) {
        return this.prisma.extensionRequest.findMany({
            where: { bookingId },
            include: {
                booking: { include: { room: { select: this.roomSafeSelect } } },
                tenant: true,
            },
            orderBy: { createdAt: "desc" },
        });
    }
    async getPendingExtensionRequests() {
        return this.prisma.extensionRequest.findMany({
            where: { status: "PENDING" },
            include: {
                booking: {
                    include: { room: { select: this.roomSafeSelect }, user: true },
                },
                tenant: true,
            },
            orderBy: { createdAt: "asc" },
        });
    }
};
exports.BookingsService = BookingsService;
exports.BookingsService = BookingsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        notifications_service_1.NotificationsService,
        agreements_service_1.AgreementsService,
        event_emitter_service_1.EventEmitterService])
], BookingsService);
//# sourceMappingURL=bookings.service.js.map