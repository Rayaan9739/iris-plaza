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
        title: string;
        createdAt: Date;
        status: import(".prisma/client").$Enums.TicketStatus;
        tenantId: string;
        bookingId: string | null;
        description: string;
        updatedAt: Date;
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
        title: string;
        createdAt: Date;
        status: import(".prisma/client").$Enums.TicketStatus;
        tenantId: string;
        bookingId: string | null;
        description: string;
        updatedAt: Date;
        category: string;
        requestedAmount: import("@prisma/client/runtime/library").Decimal | null;
        priority: import(".prisma/client").$Enums.TicketPriority;
        resolvedAt: Date | null;
        resolution: string | null;
    }>;
    updateStatus(id: string, status: string, resolution?: string): Promise<{
        id: string;
        title: string;
        createdAt: Date;
        status: import(".prisma/client").$Enums.TicketStatus;
        tenantId: string;
        bookingId: string | null;
        description: string;
        updatedAt: Date;
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
        title: string;
        createdAt: Date;
        status: import(".prisma/client").$Enums.TicketStatus;
        tenantId: string;
        bookingId: string | null;
        description: string;
        updatedAt: Date;
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
        title: string;
        createdAt: Date;
        status: import(".prisma/client").$Enums.TicketStatus;
        tenantId: string;
        bookingId: string | null;
        description: string;
        updatedAt: Date;
        category: string;
        requestedAmount: import("@prisma/client/runtime/library").Decimal | null;
        priority: import(".prisma/client").$Enums.TicketPriority;
        resolvedAt: Date | null;
        resolution: string | null;
    }>;
    rejectRequest(ticketId: string, reason?: string): Promise<{
        id: string;
        title: string;
        createdAt: Date;
        status: import(".prisma/client").$Enums.TicketStatus;
        tenantId: string;
        bookingId: string | null;
        description: string;
        updatedAt: Date;
        category: string;
        requestedAmount: import("@prisma/client/runtime/library").Decimal | null;
        priority: import(".prisma/client").$Enums.TicketPriority;
        resolvedAt: Date | null;
        resolution: string | null;
    }>;
}
