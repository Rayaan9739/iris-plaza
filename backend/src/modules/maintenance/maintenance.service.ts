import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "@/prisma/prisma.service";
import { NotificationsService } from "@/modules/notifications/notifications.service";
import { EventEmitterService } from "@/common/services/event-emitter.service";
import { CreateMaintenanceDto } from "./dto/create-maintenance.dto";

@Injectable()
export class MaintenanceService {
  constructor(
    private prisma: PrismaService,
    private notificationsService: NotificationsService,
    private eventEmitter: EventEmitterService,
  ) {}

  private mapMaintenanceStatus(status: string) {
    const normalized = String(status || "").toUpperCase();
    if (normalized === "RESOLVED") return "APPROVED";
    if (normalized === "CLOSED") return "REJECTED";
    return "PENDING";
  }

  async findMyTickets(userId: string) {
    try {
      const tickets = await this.prisma.maintenanceTicket.findMany({
        where: { tenantId: userId } as any,
        orderBy: { createdAt: "desc" },
      });

      // Map status to PENDING/APPROVED/REJECTED for frontend compatibility
      return tickets.map((ticket: any) => ({
        ...ticket,
        status: this.mapMaintenanceStatus(ticket.status),
        requestedAmount: ticket.requestedAmount
          ? Number(ticket.requestedAmount)
          : null,
      }));
    } catch (error: any) {
      console.error("Error fetching tickets:", error);
      // Return empty array instead of crashing
      return [];
    }
  }

  async create(userId: string, dto: CreateMaintenanceDto) {
    try {
      // Validate DTO
      if (!dto) {
        throw new BadRequestException("Invalid maintenance request data");
      }

      if (!dto.title || !dto.category) {
        throw new BadRequestException("title and category are required");
      }

      const normalizedCategory = String(dto.category || "")
        .trim()
        .replace(/\s+/g, "_")
        .toUpperCase();

      // Parse requestedAmount - set to null if not provided or not MONEY_REDUCTION
      let requestedAmount: number | null = null;
      if (normalizedCategory === "MONEY_REDUCTION") {
        const amount = Number(dto.requestedAmount);
        if (!Number.isFinite(amount) || amount <= 0) {
          throw new BadRequestException(
            "requestedAmount is required and must be a positive number for MONEY_REDUCTION category",
          );
        }
        requestedAmount = amount;
      }

      // Normalize priority to enum value
      const priorityStr = String(dto.priority || "MEDIUM").toUpperCase();
      const validPriorities = ["LOW", "MEDIUM", "HIGH", "URGENT"];
      const normalizedPriority = validPriorities.includes(priorityStr)
        ? priorityStr
        : "MEDIUM";

      // Build the ticket data - requestedAmount is only included for MONEY_REDUCTION
      let bookingId = dto.bookingId;
      if (normalizedCategory === "MONEY_REDUCTION" && !bookingId) {
        const approvedBooking = await this.prisma.booking.findFirst({
          where: { userId, status: "APPROVED" },
          orderBy: { createdAt: "desc" },
        });
        if (!approvedBooking) {
          throw new BadRequestException(
            "No active approved booking found for MONEY_REDUCTION request",
          );
        }
        bookingId = approvedBooking.id;
      }

      const ticketData: any = {
        title: dto.title,
        description: dto.description || "",
        category: normalizedCategory,
        tenantId: userId,
        priority: normalizedPriority,
        bookingId,
      };

      // Only add requestedAmount for MONEY_REDUCTION category
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
    } catch (error) {
      console.error("Error creating maintenance ticket:", error);
      throw error;
    }
  }

  async findOne(id: string) {
    const ticket = await this.prisma.maintenanceTicket.findUnique({
      where: { id },
      include: {
        tenant: true,
        booking: {
          include: {
            room: true,
          },
        },
      } as any,
    });
    if (!ticket) throw new NotFoundException("Ticket not found");
    return ticket;
  }

  async updateStatus(id: string, status: string, resolution?: string) {
    return this.prisma.maintenanceTicket.update({
      where: { id },
      data: {
        status: status as any,
        resolution,
        resolvedAt:
          status === "RESOLVED" || status === "CLOSED" ? new Date() : null,
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
      } as any,
      orderBy: { createdAt: "desc" },
    });
  }

  /**
   * Approve a maintenance request and apply money reduction if applicable
   */
  async approveRequest(ticketId: string) {
    const ticket = await this.prisma.maintenanceTicket.findUnique({
      where: { id: ticketId },
      include: {
        tenant: true,
        booking: {
          include: {
            room: true,
          },
        },
      } as any,
    });
    if (!ticket) throw new NotFoundException("Ticket not found");

    // Update ticket status to RESOLVED (approved)
    const updated = await this.prisma.maintenanceTicket.update({
      where: { id: ticketId },
      data: {
        status: "RESOLVED" as any,
        resolvedAt: new Date(),
      },
      include: {
        tenant: true,
        booking: {
          include: {
            room: true,
          },
        },
      } as any,
    });

    // If it's a money reduction request, apply it to the current month payment
    if (
      ticket.category === "MONEY_REDUCTION" &&
      ticket.requestedAmount &&
      ticket.bookingId
    ) {
      const tenantId = ticket.tenantId!;
      const bookingId = ticket.bookingId!;

      await this.applyMoneyReduction(
        tenantId,
        bookingId,
        Number(ticket.requestedAmount),
      );
    }

    return updated;
  }

  /**
   * Apply money reduction to current month payment and add to next month
   */
  private async applyMoneyReduction(
    tenantId: string,
    bookingId: string,
    reductionAmount: number,
  ) {
    const currentMonth = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}`;

    // Find current month payment
    const currentPayment = await this.prisma.payment.findFirst({
      where: {
        userId: tenantId,
        bookingId,
        month: currentMonth,
        type: "RENT" as any,
      } as any,
    });

    if (currentPayment) {
      const currentAmount = Number(currentPayment.amount || 0);
      const newAmount = Math.max(0, currentAmount - reductionAmount);
      const pendingAmount = reductionAmount;

      // Update current month payment with reduced amount
      await this.prisma.payment.update({
        where: { id: currentPayment.id },
        data: {
          amount: newAmount as any,
          pendingAmount: pendingAmount as any,
        } as any,
      });

      // Create or update next month payment to include pending amount
      const nextDate = new Date(
        new Date().getFullYear(),
        new Date().getMonth() + 1,
        1,
      );
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
            type: "RENT" as any,
          } as any,
        });

        if (nextPayment) {
          await this.prisma.payment.update({
            where: { id: nextPayment.id },
            data: {
              amount: nextPaymentAmount as any,
              pendingAmount: reductionAmount as any,
            } as any,
          });
        } else {
          await this.prisma.payment.create({
            data: {
              userId: tenantId,
              bookingId,
              month: nextMonth,
              amount: nextPaymentAmount as any,
              pendingAmount: reductionAmount as any,
              type: "RENT" as any,
              status: "PENDING" as any,
              description: `Monthly rent with pending reduction carry-over`,
            } as any,
          });
        }
      }
    }
  }

  /**
   * Reject a maintenance request
   */
  async rejectRequest(ticketId: string, reason?: string) {
    return this.prisma.maintenanceTicket.update({
      where: { id: ticketId },
      data: {
        status: "CLOSED" as any,
        resolution: reason,
        resolvedAt: new Date(),
      },
    });
  }
}
