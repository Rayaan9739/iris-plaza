import { PrismaService } from '@/prisma/prisma.service';
import { NotificationType } from '@prisma/client';
export declare class NotificationsService {
    private prisma;
    constructor(prisma: PrismaService);
    findMyNotifications(userId: string): Promise<{
        type: import(".prisma/client").$Enums.NotificationType;
        title: string;
        id: string;
        createdAt: Date;
        userId: string;
        message: string;
        isRead: boolean;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        readAt: Date | null;
    }[]>;
    getUnreadCount(userId: string): Promise<number>;
    markAsRead(notificationId: string, userId: string): Promise<import(".prisma/client").Prisma.BatchPayload>;
    markAllAsRead(userId: string): Promise<import(".prisma/client").Prisma.BatchPayload>;
    create(userId: string, data: {
        type: NotificationType;
        title: string;
        message: string;
    }): Promise<{
        type: import(".prisma/client").$Enums.NotificationType;
        title: string;
        id: string;
        createdAt: Date;
        userId: string;
        message: string;
        isRead: boolean;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        readAt: Date | null;
    }>;
    sendNotification(userId: string, data: {
        type: NotificationType;
        title: string;
        message: string;
    }): Promise<{
        type: import(".prisma/client").$Enums.NotificationType;
        title: string;
        id: string;
        createdAt: Date;
        userId: string;
        message: string;
        isRead: boolean;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        readAt: Date | null;
    }>;
    sendBulkNotifications(userIds: string[], data: {
        type: NotificationType;
        title: string;
        message: string;
    }): Promise<import(".prisma/client").Prisma.BatchPayload>;
    notifyRentReminder(userId: string, dueDate: Date, amount: number): Promise<{
        type: import(".prisma/client").$Enums.NotificationType;
        title: string;
        id: string;
        createdAt: Date;
        userId: string;
        message: string;
        isRead: boolean;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        readAt: Date | null;
    }>;
    notifyRentOverdue(userId: string): Promise<{
        type: import(".prisma/client").$Enums.NotificationType;
        title: string;
        id: string;
        createdAt: Date;
        userId: string;
        message: string;
        isRead: boolean;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        readAt: Date | null;
    }>;
    notifyPaymentApproved(userId: string, amount: number, month: string): Promise<{
        type: import(".prisma/client").$Enums.NotificationType;
        title: string;
        id: string;
        createdAt: Date;
        userId: string;
        message: string;
        isRead: boolean;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        readAt: Date | null;
    }>;
    notifyPaymentRejected(userId: string, month: string): Promise<{
        type: import(".prisma/client").$Enums.NotificationType;
        title: string;
        id: string;
        createdAt: Date;
        userId: string;
        message: string;
        isRead: boolean;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        readAt: Date | null;
    }>;
    notifyDocumentApproved(userId: string, documentName: string): Promise<{
        type: import(".prisma/client").$Enums.NotificationType;
        title: string;
        id: string;
        createdAt: Date;
        userId: string;
        message: string;
        isRead: boolean;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        readAt: Date | null;
    }>;
    notifyDocumentRejected(userId: string, documentName: string, reason?: string): Promise<{
        type: import(".prisma/client").$Enums.NotificationType;
        title: string;
        id: string;
        createdAt: Date;
        userId: string;
        message: string;
        isRead: boolean;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        readAt: Date | null;
    }>;
    notifyMaintenanceUpdate(userId: string, ticketTitle: string, status: string): Promise<{
        type: import(".prisma/client").$Enums.NotificationType;
        title: string;
        id: string;
        createdAt: Date;
        userId: string;
        message: string;
        isRead: boolean;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        readAt: Date | null;
    }>;
    notifyAnnouncement(userId: string, title: string, message: string): Promise<{
        type: import(".prisma/client").$Enums.NotificationType;
        title: string;
        id: string;
        createdAt: Date;
        userId: string;
        message: string;
        isRead: boolean;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        readAt: Date | null;
    }>;
}
