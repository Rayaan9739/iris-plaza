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
exports.MaintenanceService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const notifications_service_1 = require("../notifications/notifications.service");
const event_emitter_service_1 = require("../../common/services/event-emitter.service");
let MaintenanceService = class MaintenanceService {
    constructor(prisma, notificationsService, eventEmitter) {
        this.prisma = prisma;
        this.notificationsService = notificationsService;
        this.eventEmitter = eventEmitter;
    }
    mapMaintenanceStatus(status) {
        const normalized = String(status || "").toUpperCase();
        if (normalized === "RESOLVED")
            return "APPROVED";
        if (normalized === "CLOSED")
            return "REJECTED";
        return "PENDING";
    }
    async findMyTickets(userId) {
        try {
            const tickets = await this.prisma.maintenanceTicket.findMany({
                where: { tenantId: userId },
                orderBy: { createdAt: "desc" },
            });
            return tickets.map((ticket) => ({
                ...ticket,
                status: this.mapMaintenanceStatus(ticket.status),
                requestedAmount: ticket.requestedAmount
                    ? Number(ticket.requestedAmount)
                    : null,
            }));
        }
        catch (error) {
            console.error("Error fetching tickets:", error);
            return [];
        }
    }
    async create(userId, dto) {
        try {
            if (!dto) {
                throw new common_1.BadRequestException("Invalid maintenance request data");
            }
            if (!dto.title || !dto.category) {
                throw new common_1.BadRequestException("title and category are required");
            }
            const normalizedCategory = String(dto.category || "")
                .trim()
                .replace(/\s+/g, "_")
                .toUpperCase();
            let requestedAmount = null;
            if (normalizedCategory === "MONEY_REDUCTION") {
                const amount = Number(dto.requestedAmount);
                if (!Number.isFinite(amount) || amount <= 0) {
                    throw new common_1.BadRequestException("requestedAmount is required and must be a positive number for MONEY_REDUCTION category");
                }
                requestedAmount = amount;
            }
            const priorityStr = String(dto.priority || "MEDIUM").toUpperCase();
            const validPriorities = ["LOW", "MEDIUM", "HIGH", "URGENT"];
            const normalizedPriority = validPriorities.includes(priorityStr)
                ? priorityStr
                : "MEDIUM";
            let bookingId = dto.bookingId;
            if (normalizedCategory === "MONEY_REDUCTION" && !bookingId) {
                const approvedBooking = await this.prisma.booking.findFirst({
                    where: { userId, status: "APPROVED" },
                    orderBy: { createdAt: "desc" },
                });
                if (!approvedBooking) {
                    throw new common_1.BadRequestException("No active approved booking found for MONEY_REDUCTION request");
                }
                bookingId = approvedBooking.id;
            }
            const ticketData = {
                title: dto.title,
                description: dto.description || "",
                category: normalizedCategory,
                tenantId: userId,
                priority: normalizedPriority,
                bookingId,
            };
            if (normalizedCategory === "MONEY_REDUCTION") {
                ticketData.requestedAmount = requestedAmount;
            }
            const created = await this.prisma.maintenanceTicket.create({
                data: ticketData,
            });
            const admins = await this.prisma.user.findMany({
                where: { role: "ADMIN", isActive: true },
                select: { id: true },
            });
            for (const admin of admins) {
                await this.notificationsService.create(admin.id, {
                    type: "PUSH",
                    title: "New maintenance request",
                    message: `New ${normalizedCategory} request from tenant.`,
                });
            }
            this.eventEmitter.emitDashboardUpdate(userId, { maintenanceCreated: true });
            return created;
        }
        catch (error) {
            console.error("Error creating maintenance ticket:", error);
            throw error;
        }
    }
    async findOne(id) {
        const ticket = await this.prisma.maintenanceTicket.findUnique({
            where: { id },
            include: {
                tenant: true,
                booking: {
                    include: {
                        room: true,
                    },
                },
            },
        });
        if (!ticket)
            throw new common_1.NotFoundException("Ticket not found");
        return ticket;
    }
    async updateStatus(id, status, resolution) {
        return this.prisma.maintenanceTicket.update({
            where: { id },
            data: {
                status: status,
                resolution,
                resolvedAt: status === "RESOLVED" || status === "CLOSED" ? new Date() : null,
            },
        });
    }
    async findAll() {
        return this.prisma.maintenanceTicket.findMany({
            include: {
                tenant: true,
                booking: {
                    include: {
                        room: true,
                    },
                },
            },
            orderBy: { createdAt: "desc" },
        });
    }
    async approveRequest(ticketId) {
        const ticket = await this.prisma.maintenanceTicket.findUnique({
            where: { id: ticketId },
            include: {
                tenant: true,
                booking: {
                    include: {
                        room: true,
                    },
                },
            },
        });
        if (!ticket)
            throw new common_1.NotFoundException("Ticket not found");
        const updated = await this.prisma.maintenanceTicket.update({
            where: { id: ticketId },
            data: {
                status: "RESOLVED",
                resolvedAt: new Date(),
            },
            include: {
                tenant: true,
                booking: {
                    include: {
                        room: true,
                    },
                },
            },
        });
        if (ticket.category === "MONEY_REDUCTION" &&
            ticket.requestedAmount &&
            ticket.bookingId) {
            const tenantId = ticket.tenantId;
            const bookingId = ticket.bookingId;
            await this.applyMoneyReduction(tenantId, bookingId, Number(ticket.requestedAmount));
        }
        return updated;
    }
    async applyMoneyReduction(tenantId, bookingId, reductionAmount) {
        const currentMonth = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}`;
        const currentPayment = await this.prisma.payment.findFirst({
            where: {
                userId: tenantId,
                bookingId,
                month: currentMonth,
                type: "RENT",
            },
        });
        if (currentPayment) {
            const currentAmount = Number(currentPayment.amount || 0);
            const newAmount = Math.max(0, currentAmount - reductionAmount);
            const pendingAmount = reductionAmount;
            await this.prisma.payment.update({
                where: { id: currentPayment.id },
                data: {
                    amount: newAmount,
                    pendingAmount: pendingAmount,
                },
            });
            const nextDate = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1);
            const nextMonth = `${nextDate.getFullYear()}-${String(nextDate.getMonth() + 1).padStart(2, "0")}`;
            const booking = await this.prisma.booking.findUnique({
                where: { id: bookingId },
                include: { room: true },
            });
            if (booking) {
                const nextRent = Number(booking.room.rent || 0);
                const nextPaymentAmount = nextRent + reductionAmount;
                const nextPayment = await this.prisma.payment.findFirst({
                    where: {
                        userId: tenantId,
                        bookingId,
                        month: nextMonth,
                        type: "RENT",
                    },
                });
                if (nextPayment) {
                    await this.prisma.payment.update({
                        where: { id: nextPayment.id },
                        data: {
                            amount: nextPaymentAmount,
                            pendingAmount: reductionAmount,
                        },
                    });
                }
                else {
                    await this.prisma.payment.create({
                        data: {
                            userId: tenantId,
                            bookingId,
                            month: nextMonth,
                            amount: nextPaymentAmount,
                            pendingAmount: reductionAmount,
                            type: "RENT",
                            status: "PENDING",
                            description: `Monthly rent with pending reduction carry-over`,
                        },
                    });
                }
            }
        }
    }
    async rejectRequest(ticketId, reason) {
        return this.prisma.maintenanceTicket.update({
            where: { id: ticketId },
            data: {
                status: "CLOSED",
                resolution: reason,
                resolvedAt: new Date(),
            },
        });
    }
};
exports.MaintenanceService = MaintenanceService;
exports.MaintenanceService = MaintenanceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        notifications_service_1.NotificationsService,
        event_emitter_service_1.EventEmitterService])
], MaintenanceService);
//# sourceMappingURL=maintenance.service.js.map