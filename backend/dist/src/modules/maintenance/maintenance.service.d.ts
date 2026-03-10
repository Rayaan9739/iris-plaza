import { PrismaService } from "@/prisma/prisma.service";
import { NotificationsService } from "@/modules/notifications/notifications.service";
import { EventEmitterService } from "@/common/services/event-emitter.service";
import { CreateMaintenanceDto } from "./dto/create-maintenance.dto";
export declare class MaintenanceService {
    private prisma;
    private notificationsService;
    private eventEmitter;
    constructor(prisma: PrismaService, notificationsService: NotificationsService, eventEmitter: EventEmitterService);
    private mapMaintenanceStatus;
    findMyTickets(userId: string): Promise<any[]>;
    create(userId: string, dto: CreateMaintenanceDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        status: import(".prisma/client").$Enums.TicketStatus;
        title: string;
        bookingId: string | null;
        tenantId: string;
        category: string;
        requestedAmount: import("@prisma/client/runtime/library").Decimal | null;
        priority: import(".prisma/client").$Enums.TicketPriority;
        resolvedAt: Date | null;
        resolution: string | null;
    }>;
    findOne(id: string): Promise<{
        [x: string]: never;
        [x: number]: never;
        [x: symbol]: never;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        status: import(".prisma/client").$Enums.TicketStatus;
        title: string;
        bookingId: string | null;
        tenantId: string;
        category: string;
        requestedAmount: import("@prisma/client/runtime/library").Decimal | null;
        priority: import(".prisma/client").$Enums.TicketPriority;
        resolvedAt: Date | null;
        resolution: string | null;
    }>;
    updateStatus(id: string, status: string, resolution?: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        status: import(".prisma/client").$Enums.TicketStatus;
        title: string;
        bookingId: string | null;
        tenantId: string;
        category: string;
        requestedAmount: import("@prisma/client/runtime/library").Decimal | null;
        priority: import(".prisma/client").$Enums.TicketPriority;
        resolvedAt: Date | null;
        resolution: string | null;
    }>;
    findAll(): Promise<({
        [x: string]: never;
        [x: number]: never;
        [x: symbol]: never;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        status: import(".prisma/client").$Enums.TicketStatus;
        title: string;
        bookingId: string | null;
        tenantId: string;
        category: string;
        requestedAmount: import("@prisma/client/runtime/library").Decimal | null;
        priority: import(".prisma/client").$Enums.TicketPriority;
        resolvedAt: Date | null;
        resolution: string | null;
    })[]>;
    approveRequest(ticketId: string): Promise<{
        [x: string]: never;
        [x: number]: never;
        [x: symbol]: never;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        status: import(".prisma/client").$Enums.TicketStatus;
        title: string;
        bookingId: string | null;
        tenantId: string;
        category: string;
        requestedAmount: import("@prisma/client/runtime/library").Decimal | null;
        priority: import(".prisma/client").$Enums.TicketPriority;
        resolvedAt: Date | null;
        resolution: string | null;
    }>;
    private applyMoneyReduction;
    rejectRequest(ticketId: string, reason?: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        status: import(".prisma/client").$Enums.TicketStatus;
        title: string;
        bookingId: string | null;
        tenantId: string;
        category: string;
        requestedAmount: import("@prisma/client/runtime/library").Decimal | null;
        priority: import(".prisma/client").$Enums.TicketPriority;
        resolvedAt: Date | null;
        resolution: string | null;
    }>;
}
