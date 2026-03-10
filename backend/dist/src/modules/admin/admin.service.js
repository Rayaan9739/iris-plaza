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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const notifications_service_1 = require("../notifications/notifications.service");
const event_emitter_service_1 = require("../../common/services/event-emitter.service");
const payments_service_1 = require("../payments/payments.service");
let AdminService = class AdminService {
    constructor(prisma, notificationsService, eventEmitter, paymentsService) {
        this.prisma = prisma;
        this.notificationsService = notificationsService;
        this.eventEmitter = eventEmitter;
        this.paymentsService = paymentsService;
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
    mapMaintenanceStatus(status) {
        const normalized = String(status || "").toUpperCase();
        if (normalized === "RESOLVED")
            return "APPROVED";
        if (normalized === "CLOSED")
            return "REJECTED";
        return "PENDING";
    }
    async getDashboardStats() {
        const now = new Date();
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 1);
        const [totalRooms, availableRooms, occupiedRooms, totalTenants, pendingBookings, pendingMaintenanceRequests, monthlyCompletedPayments,] = await Promise.all([
            this.prisma.room.count({ where: { deletedAt: null } }),
            this.prisma.room.count({
                where: { deletedAt: null, status: "AVAILABLE", isAvailable: true },
            }),
            this.prisma.room.count({
                where: { deletedAt: null, status: "OCCUPIED", isAvailable: false },
            }),
            this.prisma.booking.count({
                where: { status: { in: ["APPROVED", "APPROVED_PENDING_PAYMENT"] } },
            }),
            this.prisma.booking.count({
                where: { status: { in: ["PENDING_APPROVAL", "VERIFICATION_PENDING"] } },
            }),
            this.prisma.maintenanceTicket.count({
                where: { status: { in: ["OPEN", "IN_PROGRESS"] } },
            }),
            this.prisma.payment.findMany({
                where: {
                    status: "COMPLETED",
                    createdAt: { gte: monthStart, lt: monthEnd },
                },
                select: {
                    amount: true,
                },
            }),
        ]);
        const totalMonthlyRevenue = monthlyCompletedPayments.reduce((sum, p) => {
            const paid = p?.amount ?? 0;
            return sum + Number(paid);
        }, 0);
        return {
            totalRooms,
            availableRooms,
            occupiedRooms,
            totalTenants,
            pendingBookingRequests: pendingBookings,
            pendingMaintenanceRequests,
            totalMonthlyRevenue,
            rooms: {
                total: totalRooms,
                available: availableRooms,
                occupied: occupiedRooms,
            },
            tenants: { total: totalTenants },
            bookings: { pending: pendingBookings },
            payments: { revenue: totalMonthlyRevenue },
            maintenance: { openTickets: pendingMaintenanceRequests },
        };
    }
    async getAdminRooms() {
        return this.prisma.room.findMany({
            where: { deletedAt: null },
            select: this.roomSafeSelect,
            orderBy: { createdAt: "desc" },
        });
    }
    async getAdminBookings() {
        return this.prisma.booking.findMany({
            include: {
                user: true,
                room: { select: this.roomSafeSelect },
                documents: true,
                statusHistory: { orderBy: { createdAt: "desc" } },
            },
            orderBy: { createdAt: "desc" },
        });
    }
    async getAllTenants() {
        const approvedBookings = await this.prisma.booking.findMany({
            where: { status: "APPROVED" },
            include: { user: true, room: { select: this.roomSafeSelect } },
            orderBy: { createdAt: "desc" },
        });
        return approvedBookings.map((booking) => ({
            id: booking.user.id,
            bookingId: booking.id,
            userId: booking.user.id,
            name: [booking.user.firstName, booking.user.lastName]
                .filter(Boolean)
                .join(" ")
                .trim(),
            phone: booking.user.phone,
            email: booking.user.email,
            room: booking.room,
            moveInDate: booking.moveInDate,
            rent: booking.room.rent,
            status: booking.status,
            user: booking.user,
        }));
    }
    async getTenantById(tenantId) {
        const booking = await this.prisma.booking.findFirst({
            where: {
                userId: tenantId,
                status: {
                    in: ["APPROVED", "APPROVED_PENDING_PAYMENT"]
                }
            },
            include: {
                user: true,
                room: { select: this.roomSafeSelect },
                agreement: true
            },
            orderBy: { createdAt: "desc" },
        });
        if (!booking) {
            throw new common_1.NotFoundException("Tenant with active booking not found");
        }
        const documents = await this.prisma.document.findMany({
            where: { userId: tenantId },
            orderBy: { uploadedAt: "desc" },
        });
        return {
            id: booking.user.id,
            name: [booking.user.firstName, booking.user.lastName]
                .filter(Boolean)
                .join(" ")
                .trim(),
            phone: booking.user.phone,
            email: booking.user.email,
            status: booking.status,
            booking: {
                id: booking.id,
                status: booking.status,
                moveInDate: booking.moveInDate,
                moveOutDate: booking.moveOutDate,
                startDate: booking.startDate,
                endDate: booking.endDate,
            },
            room: {
                id: booking.room.id,
                name: booking.room.name,
                floor: booking.room.floor,
                rent: booking.room.rent,
                deposit: booking.room.deposit,
            },
            agreement: booking.agreement ? {
                id: booking.agreement.id,
                url: booking.agreement.agreementUrl,
                status: booking.agreement.status,
                startDate: booking.agreement.startDate,
                endDate: booking.agreement.endDate,
                monthlyRent: booking.agreement.monthlyRent,
                securityDeposit: booking.agreement.securityDeposit,
            } : null,
            documents: documents.map(doc => ({
                id: doc.id,
                type: doc.type,
                url: doc.fileUrl,
            })),
        };
    }
    async removeTenant(userId) {
        const booking = await this.prisma.booking.findFirst({
            where: {
                userId,
                status: "APPROVED",
            },
            include: { room: { select: this.roomSafeSelect }, user: true },
            orderBy: { createdAt: "desc" },
        });
        if (!booking) {
            throw new common_1.NotFoundException("Active tenant booking not found");
        }
        return this.prisma.$transaction(async (tx) => {
            await tx.booking.update({
                where: { id: booking.id },
                data: { status: "CANCELLED" },
            });
            await tx.bookingStatusHistory.create({
                data: {
                    bookingId: booking.id,
                    status: "CANCELLED",
                    comment: "Tenant removed by admin",
                },
            });
            await tx.room.update({
                where: { id: booking.roomId },
                data: {
                    status: "AVAILABLE",
                    isAvailable: true,
                },
            });
            await tx.user.update({
                where: { id: userId },
                data: {
                    isApproved: false,
                    accountStatus: "SUSPENDED",
                },
            });
            return { success: true };
        });
    }
    async getAdminPayments() {
        const payments = await this.prisma.payment.findMany({
            select: {
                id: true,
                userId: true,
                bookingId: true,
                rentCycleId: true,
                amount: true,
                type: true,
                status: true,
                gateway: true,
                gatewayOrderId: true,
                gatewayPaymentId: true,
                gatewaySignature: true,
                description: true,
                invoiceUrl: true,
                createdAt: true,
                updatedAt: true,
                user: true,
                booking: { include: { room: { select: this.roomSafeSelect } } },
                rentCycle: true,
            },
            orderBy: { createdAt: "desc" },
        });
        return payments.map((p) => ({
            ...p,
            tenantId: p.tenantId ?? p.userId,
            rentAmount: Number(p.rentAmount ?? p.amount ?? 0),
            paidAmount: p.paidAmount === null || p.paidAmount === undefined
                ? null
                : Number(p.paidAmount),
            pendingAmount: Number(p.pendingAmount ?? p.borrowedAmount ?? 0),
        }));
    }
    async markPaymentAsPaid(id, amountReceived, note, paymentMethod) {
        const payment = await this.prisma.payment.findUnique({ where: { id } });
        if (!payment) {
            throw new common_1.NotFoundException("Payment not found");
        }
        const amount = Number(amountReceived ?? payment.rentAmount ?? payment.amount ?? 0);
        const method = paymentMethod?.toUpperCase() === "UPI" ? "ONLINE" : "CASH";
        return this.paymentsService.adminMarkCashPayment(id, amount, note, method);
    }
    async getAdminDocuments() {
        return this.prisma.document.findMany({
            include: {
                user: true,
                booking: {
                    include: { room: { select: this.roomSafeSelect } },
                },
            },
            orderBy: { uploadedAt: "desc" },
        });
    }
    async approveDocument(id) {
        return this.prisma.document.update({
            where: { id },
            data: { status: "APPROVED", reviewedAt: new Date(), rejectReason: null },
        });
    }
    async rejectDocument(id) {
        return this.prisma.document.update({
            where: { id },
            data: { status: "REJECTED", reviewedAt: new Date() },
        });
    }
    async getMaintenanceRequests() {
        const requests = await this.prisma.maintenanceTicket.findMany({
            include: {
                user: true,
            },
            orderBy: { createdAt: "desc" },
        });
        const approvedBookings = await this.prisma.booking.findMany({
            where: { status: "APPROVED" },
            include: { room: { select: this.roomSafeSelect } },
            orderBy: { createdAt: "desc" },
        });
        const roomByUser = new Map();
        approvedBookings.forEach((booking) => {
            if (!roomByUser.has(booking.userId)) {
                roomByUser.set(booking.userId, booking.room);
            }
        });
        return requests.map((req) => ({
            ...req,
            tenantId: req.tenantId ?? req.userId,
            room: roomByUser.get(req.userId) || null,
            status: this.mapMaintenanceStatus(req.status),
            requestedAmount: req.requestedAmount ? Number(req.requestedAmount) : null,
        }));
    }
    async approveMaintenanceRequest(id, amountToPayNow) {
        const ticket = await this.prisma.maintenanceTicket.findUnique({
            where: { id },
            include: { user: true },
        });
        if (!ticket) {
            throw new common_1.NotFoundException("Maintenance request not found");
        }
        const category = String(ticket.category || "")
            .trim()
            .replace(/\s+/g, "_")
            .toUpperCase();
        if (category !== "MONEY_REDUCTION") {
            const updated = await this.prisma.maintenanceTicket.update({
                where: { id },
                data: {
                    status: "RESOLVED",
                    resolvedAt: new Date(),
                    resolution: "Approved by admin",
                },
            });
            return {
                ...updated,
                status: this.mapMaintenanceStatus(updated.status),
            };
        }
        const ticketAny = ticket;
        const requestedAmount = Number(ticketAny.requestedAmount ?? 0);
        if (!requestedAmount || requestedAmount <= 0) {
            throw new common_1.BadRequestException("requestedAmount is required for MONEY_REDUCTION");
        }
        const tenantId = ticket.tenantId;
        if (!tenantId) {
            throw new common_1.BadRequestException("Ticket has no tenant assigned");
        }
        const approvedBooking = await this.prisma.booking.findFirst({
            where: { userId: tenantId, status: "APPROVED" },
            include: { room: { select: this.roomSafeSelect } },
            orderBy: { createdAt: "desc" },
        });
        if (!approvedBooking) {
            throw new common_1.BadRequestException("No active approved booking found for tenant");
        }
        const originalRent = Number(approvedBooking.room.rent || 0);
        if (originalRent <= 0) {
            throw new common_1.BadRequestException("Original room rent is invalid");
        }
        const effectivePayNow = Number(amountToPayNow);
        if (!Number.isFinite(effectivePayNow) || effectivePayNow <= 0) {
            throw new common_1.BadRequestException("amountToPayNow is required and must be > 0");
        }
        if (effectivePayNow > originalRent) {
            throw new common_1.BadRequestException("amountToPayNow cannot be greater than monthly rent");
        }
        const pendingAmount = Math.max(0, originalRent - effectivePayNow);
        const now = new Date();
        const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
        const next = new Date(now.getFullYear(), now.getMonth() + 1, 1);
        const nextMonth = `${next.getFullYear()}-${String(next.getMonth() + 1).padStart(2, "0")}`;
        const nextMonthRent = originalRent + pendingAmount;
        return this.prisma.$transaction(async (tx) => {
            const request = await tx.maintenanceTicket.update({
                where: { id },
                data: {
                    status: "RESOLVED",
                    resolvedAt: new Date(),
                    resolution: `Approved. amountToPayNow=${effectivePayNow}`,
                },
            });
            const existingPayment = await tx.payment.findFirst({
                where: {
                    userId: tenantId,
                    bookingId: approvedBooking.id,
                    type: "RENT",
                    month: currentMonth,
                },
                orderBy: { createdAt: "desc" },
            });
            if (existingPayment) {
                await tx.payment.update({
                    where: { id: existingPayment.id },
                    data: {
                        amount: originalRent,
                        amountPaid: null,
                        borrowedAmount: pendingAmount,
                        tenantId: ticketAny.userId ?? ticketAny.tenantId,
                        rentAmount: originalRent,
                        paidAmount: null,
                        pendingAmount,
                        status: "PENDING",
                        roomId: approvedBooking.roomId,
                        month: currentMonth,
                        description: `Money reduction approved. Pay now: ${effectivePayNow}, pending: ${pendingAmount}`,
                    },
                });
            }
            else {
                await tx.payment.create({
                    data: {
                        userId: tenantId,
                        tenantId: tenantId,
                        roomId: approvedBooking.roomId,
                        bookingId: approvedBooking.id,
                        amount: originalRent,
                        amountPaid: null,
                        borrowedAmount: pendingAmount,
                        rentAmount: originalRent,
                        paidAmount: null,
                        pendingAmount,
                        type: "RENT",
                        status: "PENDING",
                        gateway: "RAZORPAY",
                        month: currentMonth,
                        description: `Money reduction approved. Pay now: ${effectivePayNow}, pending: ${pendingAmount}`,
                    },
                });
            }
            const nextMonthPayment = await tx.payment.findFirst({
                where: {
                    userId: tenantId,
                    bookingId: approvedBooking.id,
                    type: "RENT",
                    month: nextMonth,
                },
                orderBy: { createdAt: "desc" },
            });
            if (nextMonthPayment) {
                await tx.payment.update({
                    where: { id: nextMonthPayment.id },
                    data: {
                        amount: nextMonthRent,
                        tenantId: tenantId,
                        rentAmount: nextMonthRent,
                        pendingAmount: 0,
                        borrowedAmount: 0,
                        roomId: approvedBooking.roomId,
                        month: nextMonth,
                        description: `Next month rent includes previous pending amount: ${pendingAmount}`,
                    },
                });
            }
            else {
                await tx.payment.create({
                    data: {
                        userId: tenantId,
                        tenantId: tenantId,
                        roomId: approvedBooking.roomId,
                        bookingId: approvedBooking.id,
                        amount: nextMonthRent,
                        amountPaid: null,
                        borrowedAmount: 0,
                        rentAmount: nextMonthRent,
                        paidAmount: null,
                        pendingAmount: 0,
                        type: "RENT",
                        status: "PENDING",
                        gateway: "RAZORPAY",
                        month: nextMonth,
                        description: `Next month rent includes previous pending amount: ${pendingAmount}`,
                    },
                });
            }
            await this.notificationsService.create(tenantId, {
                type: "PUSH",
                title: "Maintenance Decision",
                message: `Money reduction approved. Pay now ${effectivePayNow}. Pending ${pendingAmount} will be added to next month.`,
            });
            this.eventEmitter.emitDashboardUpdate(tenantId, {
                maintenanceDecision: "APPROVED",
            });
            return {
                ...request,
                status: this.mapMaintenanceStatus(request.status),
            };
        });
    }
    async rejectMaintenanceRequest(id) {
        const ticket = await this.prisma.maintenanceTicket.findUnique({
            where: { id },
        });
        const updated = await this.prisma.maintenanceTicket.update({
            where: { id },
            data: {
                status: "CLOSED",
                resolvedAt: new Date(),
                resolution: "Rejected by admin",
            },
        });
        if (ticket?.tenantId) {
            await this.notificationsService.create(ticket.tenantId, {
                type: "PUSH",
                title: "Maintenance Decision",
                message: "Your maintenance request was rejected.",
            });
            this.eventEmitter.emitDashboardUpdate(ticket.tenantId, {
                maintenanceDecision: "REJECTED",
            });
        }
        return {
            ...updated,
            status: this.mapMaintenanceStatus(updated.status),
        };
    }
    async getPendingVerifications() {
        const pendingDocuments = await this.prisma.document.findMany({
            where: { status: "PENDING" },
            include: { user: true, booking: true },
        });
        const pendingBookings = await this.prisma.booking.findMany({
            where: { status: { in: ["PENDING", "VERIFICATION_PENDING"] } },
            include: { user: true, room: { select: this.roomSafeSelect }, documents: true },
        });
        const pendingTenants = await this.prisma.user.findMany({
            where: {
                role: "TENANT",
                accountStatus: "PENDING",
            },
            include: { tenantProfile: true },
        });
        return {
            documents: pendingDocuments,
            bookings: pendingBookings,
            tenants: pendingTenants,
        };
    }
    async approveTenant(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new Error("User not found");
        }
        if (user.role !== "TENANT") {
            throw new Error("User is not a tenant");
        }
        return this.prisma.user.update({
            where: { id: userId },
            data: {
                isApproved: true,
                accountStatus: "ACTIVE",
            },
        });
    }
    async rejectTenant(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new Error("User not found");
        }
        if (user.role !== "TENANT") {
            throw new Error("User is not a tenant");
        }
        return this.prisma.user.update({
            where: { id: userId },
            data: {
                isApproved: false,
                accountStatus: "REJECTED",
            },
        });
    }
    async suspendTenant(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new Error("User not found");
        }
        return this.prisma.user.update({
            where: { id: userId },
            data: {
                isApproved: false,
                accountStatus: "SUSPENDED",
            },
        });
    }
    async getMonthlyRevenue() {
        const now = new Date();
        const currentYear = now.getFullYear();
        const payments = await this.prisma.payment.findMany({
            where: {
                status: "COMPLETED",
                createdAt: {
                    gte: new Date(currentYear, 0, 1),
                    lt: new Date(currentYear + 1, 0, 1),
                },
            },
            select: {
                amount: true,
                createdAt: true,
            },
        });
        const monthlyRevenue = Array.from({ length: 12 }, (_, i) => {
            const month = i;
            const monthPayments = payments.filter(p => {
                const paymentDate = new Date(p.createdAt);
                return paymentDate.getMonth() === month;
            });
            const total = monthPayments.reduce((sum, p) => sum + Number(p.amount), 0);
            return {
                month: new Date(currentYear, month, 1).toLocaleString("en-IN", { month: "short" }),
                revenue: total,
            };
        });
        return monthlyRevenue;
    }
    async getOccupancyData() {
        const [totalRooms, occupiedRooms] = await Promise.all([
            this.prisma.room.count({ where: { deletedAt: null } }),
            this.prisma.room.count({
                where: { deletedAt: null, status: "OCCUPIED", isAvailable: false },
            }),
        ]);
        const availableRooms = totalRooms - occupiedRooms;
        const occupancyRate = totalRooms > 0 ? Math.round((occupiedRooms / totalRooms) * 100) : 0;
        return {
            totalRooms,
            occupiedRooms,
            availableRooms,
            occupancyRate,
        };
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        notifications_service_1.NotificationsService,
        event_emitter_service_1.EventEmitterService,
        payments_service_1.PaymentsService])
], AdminService);
//# sourceMappingURL=admin.service.js.map