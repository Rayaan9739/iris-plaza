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
const client_1 = require("@prisma/client");
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
        this.activeTenantBookingStatuses = [
            client_1.BookingStatus.APPROVED,
            client_1.BookingStatus.APPROVED_PENDING_PAYMENT,
        ];
        this.roomTransfersTableReady = false;
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
            availableAt: true,
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
    normalizeBookingSource(bookingSource) {
        return bookingSource === client_1.BookingSource.BROKER
            ? client_1.BookingSource.BROKER
            : client_1.BookingSource.WALK_IN;
    }
    normalizeBrokerName(bookingSource, brokerName) {
        if (this.normalizeBookingSource(bookingSource) !== client_1.BookingSource.BROKER) {
            return null;
        }
        const normalizedBrokerName = typeof brokerName === "string" ? brokerName.trim() : "";
        return normalizedBrokerName || null;
    }
    toStartOfUtcDay(date) {
        return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
    }
    deriveRoomOccupancyState(occupiedUntil, currentStatus) {
        const normalizedCurrentStatus = String(currentStatus ?? "").toUpperCase();
        if (normalizedCurrentStatus === client_1.RoomStatus.MAINTENANCE) {
            return {
                status: client_1.RoomStatus.MAINTENANCE,
                isAvailable: false,
            };
        }
        if (normalizedCurrentStatus === client_1.RoomStatus.RESERVED) {
            return {
                status: client_1.RoomStatus.RESERVED,
                isAvailable: false,
            };
        }
        if (!occupiedUntil) {
            return {
                status: client_1.RoomStatus.AVAILABLE,
                isAvailable: true,
            };
        }
        const parsedOccupiedUntil = new Date(occupiedUntil);
        if (Number.isNaN(parsedOccupiedUntil.getTime()) ||
            parsedOccupiedUntil <= new Date()) {
            return {
                status: client_1.RoomStatus.AVAILABLE,
                isAvailable: true,
            };
        }
        return {
            status: client_1.RoomStatus.OCCUPIED,
            isAvailable: false,
        };
    }
    async applyOccupancyStateFromBookings(rooms) {
        if (!rooms.length) {
            return rooms;
        }
        return rooms.map((room) => {
            const derivedOccupancy = this.deriveRoomOccupancyState(room.occupiedUntil, room.status);
            return {
                ...room,
                status: derivedOccupancy.status,
                isAvailable: derivedOccupancy.isAvailable,
            };
        });
    }
    parseDateInput(value, fieldName) {
        if (value === undefined)
            return undefined;
        const trimmed = String(value).trim();
        if (!trimmed)
            return undefined;
        const parsed = new Date(trimmed);
        if (Number.isNaN(parsed.getTime())) {
            throw new common_1.BadRequestException(`${fieldName} must be a valid date`);
        }
        return parsed;
    }
    async ensureRoomTransfersTable(db = this.prisma) {
        if (this.roomTransfersTableReady) {
            return;
        }
        await db.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS room_transfers (
        id BIGSERIAL PRIMARY KEY,
        booking_id TEXT NOT NULL,
        user_id TEXT NOT NULL,
        from_room_id TEXT NOT NULL,
        to_room_id TEXT NOT NULL,
        effective_date TIMESTAMPTZ NOT NULL,
        desired_move_out_date TIMESTAMPTZ NULL,
        status TEXT NOT NULL DEFAULT 'PENDING',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `);
        await db.$executeRawUnsafe(`
      CREATE INDEX IF NOT EXISTS idx_room_transfers_effective_status
      ON room_transfers (effective_date, status)
    `);
        await db.$executeRawUnsafe(`
      CREATE INDEX IF NOT EXISTS idx_room_transfers_to_room_pending
      ON room_transfers (to_room_id, status)
    `);
        this.roomTransfersTableReady = true;
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
                where: { deletedAt: null, isAvailable: false },
            }),
            this.prisma.booking.count({
                where: { status: { in: this.activeTenantBookingStatuses } },
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
        console.log("🔍 getAdminRooms: Starting query...");
        try {
            const rooms = await this.prisma.room.findMany({
                where: { deletedAt: null },
                select: this.roomSafeSelect,
                orderBy: [
                    { floor: 'asc' },
                    { name: 'asc' }
                ],
            });
            const normalizedRooms = await this.applyOccupancyStateFromBookings(rooms);
            console.log("getAdminRooms: Found", normalizedRooms.length, "rooms");
            return normalizedRooms;
        }
        catch (error) {
            console.error("❌ getAdminRooms ERROR:", error);
            throw error;
        }
    }
    async getAdminRoom(id) {
        try {
            const room = await this.prisma.room.findUnique({
                where: { id },
                include: {
                    amenities: {
                        include: {
                            amenity: true
                        }
                    },
                    images: true,
                    media: true
                }
            });
            if (!room) {
                throw new common_1.NotFoundException("Room not found");
            }
            const [normalizedRoom] = await this.applyOccupancyStateFromBookings([room]);
            return normalizedRoom;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            console.error("Error fetching admin room:", error);
            throw error;
        }
    }
    async getAmenities() {
        return this.prisma.amenity.findMany({
            select: {
                id: true,
                name: true,
            },
            orderBy: {
                name: "asc",
            },
        });
    }
    async createAmenity(name) {
        const normalizedName = String(name || "").trim().replace(/\s+/g, " ");
        if (!normalizedName) {
            throw new common_1.BadRequestException("Amenity name is required");
        }
        try {
            return await this.prisma.amenity.create({
                data: { name: normalizedName },
                select: {
                    id: true,
                    name: true,
                },
            });
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError &&
                error.code === "P2002") {
                throw new common_1.BadRequestException("Amenity already exists");
            }
            throw error;
        }
    }
    async deleteAmenity(amenityId) {
        const normalizedAmenityId = String(amenityId || "").trim();
        if (!normalizedAmenityId) {
            throw new common_1.BadRequestException("Amenity ID is required");
        }
        const existingAmenity = await this.prisma.amenity.findUnique({
            where: { id: normalizedAmenityId },
            select: { id: true, name: true },
        });
        if (!existingAmenity) {
            throw new common_1.NotFoundException("Amenity not found");
        }
        await this.prisma.$transaction(async (tx) => {
            await tx.roomAmenity.deleteMany({
                where: { amenityId: normalizedAmenityId },
            });
            await tx.amenity.delete({
                where: { id: normalizedAmenityId },
            });
        });
        return {
            success: true,
            message: `Amenity "${existingAmenity.name}" deleted`,
        };
    }
    async getAdminBookings() {
        console.log("🔍 getAdminBookings: Starting query...");
        try {
            const bookings = await this.prisma.booking.findMany({
                include: {
                    user: true,
                    room: { select: this.roomSafeSelect },
                    documents: true,
                    statusHistory: { orderBy: { createdAt: "desc" } },
                },
                orderBy: { createdAt: "desc" },
            });
            console.log("✅ getAdminBookings: Found", bookings.length, "bookings");
            return bookings.map((booking) => {
                const bookingSource = this.normalizeBookingSource(booking.bookingSource);
                const derivedRoomOccupancy = booking.room
                    ? this.deriveRoomOccupancyState(booking.room.occupiedUntil, booking.room.status)
                    : null;
                return {
                    ...booking,
                    room: booking.room
                        ? {
                            ...booking.room,
                            status: derivedRoomOccupancy?.status ?? booking.room.status,
                            isAvailable: derivedRoomOccupancy?.isAvailable ?? booking.room.isAvailable,
                        }
                        : booking.room,
                    bookingSource,
                    brokerName: this.normalizeBrokerName(bookingSource, booking.brokerName),
                };
            });
        }
        catch (error) {
            console.error("❌ getAdminBookings ERROR:", error);
            throw error;
        }
    }
    async getAllTenants() {
        console.log("🔍 getAllTenants: Starting query...");
        try {
            const approvedBookings = await this.prisma.booking.findMany({
                where: { status: { in: this.activeTenantBookingStatuses } },
                include: { user: true, room: { select: this.roomSafeSelect } },
                orderBy: { createdAt: "desc" },
            });
            console.log("✅ getAllTenants: Found", approvedBookings.length, "tenants");
            return approvedBookings.map((booking) => {
                const bookingSource = this.normalizeBookingSource(booking.bookingSource);
                const brokerName = this.normalizeBrokerName(bookingSource, booking.brokerName);
                const derivedRoomOccupancy = booking.room
                    ? this.deriveRoomOccupancyState(booking.room.occupiedUntil, booking.room.status)
                    : null;
                return {
                    id: booking.user.id,
                    bookingId: booking.id,
                    userId: booking.user.id,
                    name: [booking.user.firstName, booking.user.lastName]
                        .filter(Boolean)
                        .join(" ")
                        .trim(),
                    phone: booking.user.phone,
                    email: booking.user.email,
                    room: booking.room
                        ? {
                            ...booking.room,
                            status: derivedRoomOccupancy?.status ?? booking.room.status,
                            isAvailable: derivedRoomOccupancy?.isAvailable ?? booking.room.isAvailable,
                        }
                        : booking.room,
                    moveInDate: booking.moveInDate,
                    rent: booking.room.rent,
                    status: booking.status,
                    user: booking.user,
                    bookingSource,
                    brokerName,
                };
            });
        }
        catch (error) {
            console.error("❌ getAllTenants ERROR:", error);
            throw error;
        }
    }
    async getTenantById(tenantId) {
        const booking = await this.prisma.booking.findFirst({
            where: {
                userId: tenantId,
                status: { in: this.activeTenantBookingStatuses },
            },
            select: {
                id: true,
                userId: true,
                status: true,
                startDate: true,
                endDate: true,
                moveInDate: true,
                moveOutDate: true,
                bookingSource: true,
                brokerName: true,
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
        const bookingSource = this.normalizeBookingSource(booking.bookingSource);
        const brokerName = this.normalizeBrokerName(bookingSource, booking.brokerName);
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
                bookingSource,
                brokerName,
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
                status: { in: this.activeTenantBookingStatuses },
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
                    occupiedFrom: null,
                    occupiedUntil: null,
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
    async updateTenant(userId, data) {
        const normalizedNewRent = data.newRent === undefined ? undefined : Number(data.newRent);
        if (normalizedNewRent !== undefined &&
            (!Number.isFinite(normalizedNewRent) || normalizedNewRent <= 0)) {
            throw new common_1.BadRequestException("Rent must be greater than 0");
        }
        const requestedRoomId = String(data.updateRoomId ?? data.newRoomId ?? "").trim();
        const parsedRoomChangeDate = this.parseDateInput(data.roomChangeDate, "roomChangeDate");
        const parsedExtendOccupiedUntil = this.parseDateInput(data.extendOccupiedUntil, "extendOccupiedUntil");
        console.log("UPDATE TENANT INPUT:", {
            userId,
            ...data,
            requestedRoomId,
            parsedRoomChangeDate,
            parsedExtendOccupiedUntil,
        });
        try {
            const booking = await this.prisma.booking.findFirst({
                where: {
                    userId,
                    status: { in: this.activeTenantBookingStatuses },
                },
                include: {
                    room: {
                        select: {
                            id: true,
                            name: true,
                            type: true,
                            floor: true,
                            area: true,
                            rent: true,
                            deposit: true,
                            status: true,
                            isAvailable: true,
                            occupiedFrom: true,
                            occupiedUntil: true,
                            availableAt: true,
                            videoUrl: true,
                        },
                    },
                    user: true,
                },
                orderBy: { createdAt: "desc" },
            });
            if (!booking) {
                throw new common_1.NotFoundException("Active tenant booking not found");
            }
            const currentRoomId = booking.roomId;
            if (!currentRoomId) {
                throw new common_1.BadRequestException("Current booking has no room assigned");
            }
            const targetRoomId = requestedRoomId || undefined;
            const isRoomChangeRequested = !!targetRoomId && targetRoomId !== currentRoomId;
            const todayUtc = this.toStartOfUtcDay(new Date());
            if (isRoomChangeRequested && !parsedRoomChangeDate) {
                throw new common_1.BadRequestException("roomChangeDate is required when assigning a different room");
            }
            await this.ensureRoomTransfersTable();
            const transactionResult = await this.prisma.$transaction(async (tx) => {
                if (data.firstName !== undefined ||
                    data.lastName !== undefined ||
                    data.phone !== undefined) {
                    const userUpdate = {};
                    if (data.firstName !== undefined)
                        userUpdate.firstName = data.firstName;
                    if (data.lastName !== undefined)
                        userUpdate.lastName = data.lastName;
                    if (data.phone !== undefined) {
                        const existingUser = await tx.user.findFirst({
                            where: {
                                phone: data.phone,
                                NOT: { id: userId },
                            },
                        });
                        if (existingUser) {
                            throw new common_1.BadRequestException("Phone number is already in use by another user");
                        }
                        userUpdate.phone = data.phone;
                    }
                    await tx.user.update({
                        where: { id: userId },
                        data: userUpdate,
                    });
                }
                if (data.bookingSource !== undefined) {
                    const normalizedSource = this.normalizeBookingSource(data.bookingSource || null);
                    const normalizedBrokerName = this.normalizeBrokerName(normalizedSource, data.brokerName);
                    await tx.booking.update({
                        where: { id: booking.id },
                        data: {
                            bookingSource: normalizedSource,
                            brokerName: normalizedBrokerName,
                        },
                    });
                }
                const currentOccupiedUntil = booking.moveOutDate ??
                    booking.endDate ??
                    booking.room?.occupiedUntil ??
                    null;
                const newDate = parsedExtendOccupiedUntil ?? currentOccupiedUntil;
                let finalMoveOutDate = newDate;
                if (parsedExtendOccupiedUntil !== undefined) {
                    const derivedCurrentRoomOccupancy = this.deriveRoomOccupancyState(newDate);
                    await tx.booking.update({
                        where: { id: booking.id },
                        data: {
                            moveOutDate: newDate ?? null,
                            endDate: newDate ?? null,
                        },
                    });
                    await tx.room.update({
                        where: { id: currentRoomId },
                        data: {
                            status: derivedCurrentRoomOccupancy.status,
                            isAvailable: derivedCurrentRoomOccupancy.isAvailable,
                            occupiedUntil: newDate ?? null,
                        },
                    });
                }
                if (isRoomChangeRequested && targetRoomId && parsedRoomChangeDate) {
                    const moveDateUtc = this.toStartOfUtcDay(parsedRoomChangeDate);
                    if (moveDateUtc < todayUtc) {
                        throw new common_1.BadRequestException("roomChangeDate cannot be in the past");
                    }
                    const targetRoom = await tx.room.findUnique({
                        where: { id: targetRoomId },
                        select: {
                            id: true,
                            name: true,
                            status: true,
                            isAvailable: true,
                            occupiedUntil: true,
                        },
                    });
                    if (!targetRoom) {
                        throw new common_1.NotFoundException("Target room not found");
                    }
                    const targetStatus = String(targetRoom.status || "").toUpperCase();
                    const targetOccupiedUntil = targetRoom.occupiedUntil
                        ? this.toStartOfUtcDay(new Date(targetRoom.occupiedUntil))
                        : null;
                    if (targetStatus === "OCCUPIED") {
                        if (!targetOccupiedUntil) {
                            throw new common_1.BadRequestException("Target room is occupied but has no occupied-until date configured");
                        }
                        if (moveDateUtc <= targetOccupiedUntil) {
                            throw new common_1.BadRequestException(`Target room is occupied until ${targetOccupiedUntil.toISOString().split("T")[0]}. Choose a later move date.`);
                        }
                    }
                    else if (targetStatus === "RESERVED") {
                        throw new common_1.BadRequestException("Target room is reserved. Please pick another room.");
                    }
                    const conflictingTransfers = await tx.$queryRaw `
            SELECT id
            FROM room_transfers
            WHERE to_room_id = ${targetRoomId}
              AND status = 'PENDING'
            LIMIT 1
          `;
                    if (conflictingTransfers.length > 0) {
                        throw new common_1.BadRequestException("Another pending future transfer is already assigned to this room");
                    }
                    const isImmediateTransfer = moveDateUtc <= todayUtc;
                    if (isImmediateTransfer) {
                        await tx.room.update({
                            where: { id: currentRoomId },
                            data: {
                                status: "AVAILABLE",
                                isAvailable: true,
                                occupiedFrom: null,
                                occupiedUntil: null,
                            },
                        });
                        await tx.room.update({
                            where: { id: targetRoomId },
                            data: {
                                status: "OCCUPIED",
                                isAvailable: false,
                                occupiedFrom: parsedRoomChangeDate,
                                occupiedUntil: finalMoveOutDate,
                                availableAt: null,
                            },
                        });
                        await tx.booking.update({
                            where: { id: booking.id },
                            data: {
                                roomId: targetRoomId,
                                moveInDate: parsedRoomChangeDate,
                                startDate: parsedRoomChangeDate,
                                moveOutDate: finalMoveOutDate,
                                endDate: finalMoveOutDate,
                            },
                        });
                        await tx.$executeRaw `
              DELETE FROM room_transfers
              WHERE booking_id = ${booking.id}
                AND status = 'PENDING'
            `;
                    }
                    else {
                        await tx.$executeRaw `
              DELETE FROM room_transfers
              WHERE booking_id = ${booking.id}
                AND status = 'PENDING'
            `;
                        await tx.$executeRaw `
              INSERT INTO room_transfers
                (booking_id, user_id, from_room_id, to_room_id, effective_date, desired_move_out_date, status, created_at, updated_at)
              VALUES
                (${booking.id}, ${userId}, ${currentRoomId}, ${targetRoomId}, ${parsedRoomChangeDate}, ${finalMoveOutDate}, 'PENDING', NOW(), NOW())
            `;
                        await tx.room.update({
                            where: { id: currentRoomId },
                            data: {
                                status: "OCCUPIED",
                                isAvailable: false,
                                occupiedUntil: parsedRoomChangeDate,
                            },
                        });
                        if (targetStatus === "AVAILABLE") {
                            await tx.room.update({
                                where: { id: targetRoomId },
                                data: {
                                    status: "RESERVED",
                                    isAvailable: false,
                                    availableAt: parsedRoomChangeDate,
                                },
                            });
                        }
                    }
                }
                if (normalizedNewRent !== undefined) {
                    const rentRoomId = isRoomChangeRequested && targetRoomId ? targetRoomId : currentRoomId;
                    await tx.room.update({
                        where: { id: rentRoomId },
                        data: { rent: normalizedNewRent },
                    });
                }
                return {
                    bookingId: booking.id,
                };
            }, {
                maxWait: 10000,
                timeout: 20000,
            });
            const [updatedUser, updatedBooking, pendingTransfers] = await Promise.all([
                this.prisma.user.findUnique({
                    where: { id: userId },
                }),
                this.prisma.booking.findUnique({
                    where: { id: transactionResult.bookingId },
                    include: {
                        room: {
                            select: {
                                id: true,
                                name: true,
                                type: true,
                                floor: true,
                                area: true,
                                rent: true,
                                deposit: true,
                                status: true,
                                isAvailable: true,
                                occupiedFrom: true,
                                occupiedUntil: true,
                                availableAt: true,
                                videoUrl: true,
                            },
                        },
                    },
                }),
                this.prisma.$queryRaw `
          SELECT id, booking_id, from_room_id, to_room_id, effective_date, status
          FROM room_transfers
          WHERE booking_id = ${transactionResult.bookingId}
            AND status = 'PENDING'
          ORDER BY effective_date ASC
          LIMIT 1
        `,
            ]);
            const scheduledTransfer = pendingTransfers[0]
                ? {
                    id: String(pendingTransfers[0].id),
                    bookingId: pendingTransfers[0].booking_id,
                    fromRoomId: pendingTransfers[0].from_room_id,
                    toRoomId: pendingTransfers[0].to_room_id,
                    effectiveDate: pendingTransfers[0].effective_date,
                    status: pendingTransfers[0].status,
                }
                : null;
            return {
                success: true,
                user: updatedUser,
                room: updatedBooking?.room,
                booking: updatedBooking,
                scheduledTransfer,
                message: scheduledTransfer
                    ? "Tenant updated. Room transfer has been scheduled."
                    : "Tenant updated successfully",
            };
        }
        catch (error) {
            console.error("REAL UPDATE TENANT ERROR:", error);
            throw error;
        }
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
        try {
            const requests = await this.prisma.maintenanceTicket.findMany({
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
            return requests.map((req) => ({
                ...req,
                tenantName: req.tenant
                    ? `${req.tenant.firstName || ""} ${req.tenant.lastName || ""}`.trim()
                    : "Unknown",
                room: req.booking?.room || null,
                user: req.tenant,
                status: this.mapMaintenanceStatus(req.status),
            }));
        }
        catch (error) {
            console.error("Error fetching maintenance requests:", error);
            return [];
        }
    }
    async approveMaintenanceRequest(id, _amountToPayNow) {
        try {
            const ticket = await this.prisma.maintenanceTicket.findUnique({
                where: { id },
                include: { tenant: true },
            });
            if (!ticket) {
                throw new common_1.NotFoundException("Maintenance request not found");
            }
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
        catch (error) {
            console.error("Error approving maintenance request:", error);
            throw error;
        }
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
                where: { deletedAt: null, isAvailable: false },
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