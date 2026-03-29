import { MaintenanceService } from "./maintenance.service";
import { CreateMaintenanceDto } from "./dto/create-maintenance.dto";
export declare class MaintenanceController {
    private maintenanceService;
    constructor(maintenanceService: MaintenanceService);
    getMyTickets(req: any): Promise<any[]>;
    getMyTicketsAlias(req: any): Promise<any[]>;
    create(req: any, dto: CreateMaintenanceDto): Promise<{
        id: string;
        bookingId: string | null;
        tenantId: string;
        status: import(".prisma/client").$Enums.TicketStatus;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        title: string;
        category: string;
        requestedAmount: import("@prisma/client/runtime/library").Decimal | null;
        priority: import(".prisma/client").$Enums.TicketPriority;
        resolvedAt: Date | null;
        resolution: string | null;
    }>;
    createRequestAlias(req: any, dto: CreateMaintenanceDto): Promise<{
        id: string;
        bookingId: string | null;
        tenantId: string;
        status: import(".prisma/client").$Enums.TicketStatus;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        title: string;
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
        bookingId: string | null;
        tenantId: string;
        status: import(".prisma/client").$Enums.TicketStatus;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        title: string;
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
        bookingId: string | null;
        tenantId: string;
        status: import(".prisma/client").$Enums.TicketStatus;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        title: string;
        category: string;
        requestedAmount: import("@prisma/client/runtime/library").Decimal | null;
        priority: import(".prisma/client").$Enums.TicketPriority;
        resolvedAt: Date | null;
        resolution: string | null;
    })[]>;
    updateStatus(id: string, body: {
        status: string;
        resolution?: string;
    }): Promise<{
        id: string;
        bookingId: string | null;
        tenantId: string;
        status: import(".prisma/client").$Enums.TicketStatus;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        title: string;
        category: string;
        requestedAmount: import("@prisma/client/runtime/library").Decimal | null;
        priority: import(".prisma/client").$Enums.TicketPriority;
        resolvedAt: Date | null;
        resolution: string | null;
    }>;
}
