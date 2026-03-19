import {
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { BookingSource, BookingStatus } from "@prisma/client";
import { PrismaService } from "@/prisma/prisma.service";
import { NotificationsService } from "@/modules/notifications/notifications.service";
import { EventEmitterService } from "@/common/services/event-emitter.service";
import { PaymentsService } from "@/modules/payments/payments.service";

@Injectable()
export class AdminService {
  private readonly activeTenantBookingStatuses: BookingStatus[] = [
    BookingStatus.APPROVED,
    BookingStatus.APPROVED_PENDING_PAYMENT,
  ];

  constructor(
    private prisma: PrismaService,
    private notificationsService: NotificationsService,
    private eventEmitter: EventEmitterService,
    private paymentsService: PaymentsService,
  ) {}

  private roomSafeSelect = {
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
    media: { orderBy: { createdAt: "asc" as const } },
    images: { orderBy: { order: "asc" as const } },
    amenities: { include: { amenity: true } },
  };

  private mapMaintenanceStatus(status: string) {
    const normalized = String(status || "").toUpperCase();
    if (normalized === "RESOLVED") return "APPROVED";
    if (normalized === "CLOSED") return "REJECTED";
    return "PENDING";
  }

  private normalizeBookingSource(
    bookingSource?: BookingSource | null,
  ): BookingSource {
    return bookingSource === BookingSource.BROKER
      ? BookingSource.BROKER
      : BookingSource.WALK_IN;
  }

  private normalizeBrokerName(
    bookingSource?: BookingSource | null,
    brokerName?: string | null,
  ): string | null {
    if (this.normalizeBookingSource(bookingSource) !== BookingSource.BROKER) {
      return null;
    }

    const normalizedBrokerName =
      typeof brokerName === "string" ? brokerName.trim() : "";
    return normalizedBrokerName || null;
  }

  async getDashboardStats() {
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    const [
      totalRooms,
      availableRooms,
      occupiedRooms,
      totalTenants,
      pendingBookings,
      pendingMaintenanceRequests,
      monthlyCompletedPayments,
    ] = await Promise.all([
      this.prisma.room.count({ where: { deletedAt: null } }),
      this.prisma.room.count({
        where: { deletedAt: null, status: "AVAILABLE", isAvailable: true },
      }),
      this.prisma.room.count({
        where: { deletedAt: null, isAvailable: false },
      }),
      // Count only tenants with active bookings (APPROVED or APPROVED_PENDING_PAYMENT)
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
        } as any,
      }),
    ]);

    const totalMonthlyRevenue = monthlyCompletedPayments.reduce(
      (sum, p: any) => {
        const paid = p?.amount ?? 0;
        return sum + Number(paid);
      },
      0,
    );

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

  async getAdminRoom(id: string) {
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
        throw new NotFoundException("Room not found");
      }

      return room;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error("Error fetching admin room:", error);
      throw error;
    }
  }

  async getAdminBookings() {
    const bookings = await this.prisma.booking.findMany({
      include: {
        user: true,
        room: { select: this.roomSafeSelect },
        documents: true,
        statusHistory: { orderBy: { createdAt: "desc" } },
      },
      orderBy: { createdAt: "desc" },
    });

    return bookings.map((booking) => {
      const bookingSource = this.normalizeBookingSource(booking.bookingSource);
      return {
        ...booking,
        bookingSource,
        brokerName: this.normalizeBrokerName(bookingSource, booking.brokerName),
      };
    });
  }

  async getAllTenants() {
    const approvedBookings = await this.prisma.booking.findMany({
      where: { status: { in: this.activeTenantBookingStatuses } },
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

  async getTenantById(tenantId: string) {
    // Find tenant with approved booking
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
      throw new NotFoundException("Tenant with active booking not found");
    }

    // Get tenant documents
    const documents = await this.prisma.document.findMany({
      where: { userId: tenantId },
      orderBy: { uploadedAt: "desc" },
    });
    const bookingSource = this.normalizeBookingSource(booking.bookingSource);
    const brokerName = this.normalizeBrokerName(
      bookingSource,
      booking.brokerName,
    );

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

  async removeTenant(userId: string) {
    const booking = await this.prisma.booking.findFirst({
      where: {
        userId,
        status: { in: this.activeTenantBookingStatuses },
      },
      include: { room: { select: this.roomSafeSelect }, user: true },
      orderBy: { createdAt: "desc" },
    });

    if (!booking) {
      throw new NotFoundException("Active tenant booking not found");
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
      } as any,
      orderBy: { createdAt: "desc" },
    });

    return payments.map((p: any) => ({
      ...p,
      tenantId: p.tenantId ?? p.userId,
      rentAmount: Number(p.rentAmount ?? p.amount ?? 0),
      paidAmount:
        p.paidAmount === null || p.paidAmount === undefined
          ? null
          : Number(p.paidAmount),
      pendingAmount: Number(p.pendingAmount ?? p.borrowedAmount ?? 0),
    }));
  }

  async markPaymentAsPaid(id: string, amountReceived?: number, note?: string, paymentMethod?: string) {
    const payment = await this.prisma.payment.findUnique({ where: { id } });
    if (!payment) {
      throw new NotFoundException("Payment not found");
    }

    const amount = Number(amountReceived ?? payment.rentAmount ?? payment.amount ?? 0);
    // Default to CASH if not specified
    const method = paymentMethod?.toUpperCase() === "UPI" ? "ONLINE" : "CASH";
    return this.paymentsService.adminMarkCashPayment(id, amount, note, method as "ONLINE" | "CASH");
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

  async approveDocument(id: string) {
    return this.prisma.document.update({
      where: { id },
      data: { status: "APPROVED", reviewedAt: new Date(), rejectReason: null },
    });
  }

  async rejectDocument(id: string) {
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

      return requests.map((req: any) => ({
        ...req,
        tenantName: req.tenant
          ? `${req.tenant.firstName || ""} ${req.tenant.lastName || ""}`.trim()
          : "Unknown",
        room: req.booking?.room || null,
        user: req.tenant,
        status: this.mapMaintenanceStatus(req.status),
      }));
    } catch (error) {
      console.error("Error fetching maintenance requests:", error);
      return [];
    }
  }

  async approveMaintenanceRequest(id: string, _amountToPayNow?: number) {
    try {
      const ticket = await this.prisma.maintenanceTicket.findUnique({
        where: { id },
        include: { tenant: true },
      });
      if (!ticket) {
        throw new NotFoundException("Maintenance request not found");
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
    } catch (error) {
      console.error("Error approving maintenance request:", error);
      throw error;
    }
  }

  async rejectMaintenanceRequest(id: string) {
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

  async approveTenant(userId: string) {
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

  async rejectTenant(userId: string) {
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

  async suspendTenant(userId: string) {
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
    
    // Get all completed payments for the current year
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

    // Group by month
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
}
