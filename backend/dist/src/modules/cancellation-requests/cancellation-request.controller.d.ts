import { CancellationRequestService } from "./cancellation-request.service";
import { CancellationRequestDto } from "./dto/create-cancellation-request.dto";
export declare class CancellationRequestController {
    private cancellationRequestService;
    constructor(cancellationRequestService: CancellationRequestService);
    createCancellationRequest(dto: CancellationRequestDto, req: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.CancellationRequestStatus;
        bookingId: string;
        tenantId: string;
        reason: string | null;
        approvedAt: Date | null;
        approvedBy: string | null;
        rejectionReason: string | null;
        releaseTime: Date | null;
        requestedAt: Date;
    }>;
    getMyRequest(req: any): Promise<{
        success: boolean;
        data: ({
            booking: {
                room: {
                    type: import(".prisma/client").$Enums.RoomType;
                    description: string | null;
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    deletedAt: Date | null;
                    name: string;
                    status: import(".prisma/client").$Enums.RoomStatus;
                    floor: number;
                    area: number;
                    rent: import("@prisma/client/runtime/library").Decimal;
                    deposit: import("@prisma/client/runtime/library").Decimal;
                    isAvailable: boolean;
                    occupiedFrom: Date | null;
                    occupiedUntil: Date | null;
                    availableAt: Date | null;
                    videoUrl: string | null;
                };
            } & {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                deletedAt: Date | null;
                moveInDate: Date | null;
                moveOutDate: Date | null;
                expiresAt: Date | null;
                userId: string;
                roomId: string;
                status: import(".prisma/client").$Enums.BookingStatus;
                startDate: Date;
                endDate: Date | null;
                checkoutDate: Date | null;
                bookingFee: import("@prisma/client/runtime/library").Decimal | null;
                bookingFeePaid: boolean;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.CancellationRequestStatus;
            bookingId: string;
            tenantId: string;
            reason: string | null;
            approvedAt: Date | null;
            approvedBy: string | null;
            rejectionReason: string | null;
            releaseTime: Date | null;
            requestedAt: Date;
        }) | null;
    }>;
    getPendingRequests(): Promise<{
        success: boolean;
        data: ({
            booking: {
                user: {
                    phone: string;
                    email: string | null;
                    password: string;
                    firstName: string;
                    lastName: string;
                    id: string;
                    role: import(".prisma/client").$Enums.UserRole;
                    isActive: boolean;
                    isApproved: boolean;
                    accountStatus: import(".prisma/client").$Enums.AccountStatus;
                    isEmailVerified: boolean;
                    isPhoneVerified: boolean;
                    emailVerifyToken: string | null;
                    createdAt: Date;
                    updatedAt: Date;
                    deletedAt: Date | null;
                };
                room: {
                    type: import(".prisma/client").$Enums.RoomType;
                    description: string | null;
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    deletedAt: Date | null;
                    name: string;
                    status: import(".prisma/client").$Enums.RoomStatus;
                    floor: number;
                    area: number;
                    rent: import("@prisma/client/runtime/library").Decimal;
                    deposit: import("@prisma/client/runtime/library").Decimal;
                    isAvailable: boolean;
                    occupiedFrom: Date | null;
                    occupiedUntil: Date | null;
                    availableAt: Date | null;
                    videoUrl: string | null;
                };
            } & {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                deletedAt: Date | null;
                moveInDate: Date | null;
                moveOutDate: Date | null;
                expiresAt: Date | null;
                userId: string;
                roomId: string;
                status: import(".prisma/client").$Enums.BookingStatus;
                startDate: Date;
                endDate: Date | null;
                checkoutDate: Date | null;
                bookingFee: import("@prisma/client/runtime/library").Decimal | null;
                bookingFeePaid: boolean;
            };
            tenant: {
                phone: string;
                email: string | null;
                password: string;
                firstName: string;
                lastName: string;
                id: string;
                role: import(".prisma/client").$Enums.UserRole;
                isActive: boolean;
                isApproved: boolean;
                accountStatus: import(".prisma/client").$Enums.AccountStatus;
                isEmailVerified: boolean;
                isPhoneVerified: boolean;
                emailVerifyToken: string | null;
                createdAt: Date;
                updatedAt: Date;
                deletedAt: Date | null;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.CancellationRequestStatus;
            bookingId: string;
            tenantId: string;
            reason: string | null;
            approvedAt: Date | null;
            approvedBy: string | null;
            rejectionReason: string | null;
            releaseTime: Date | null;
            requestedAt: Date;
        })[];
    }>;
    approveRequest(req: any, requestId: string): Promise<{
        success: boolean;
        message: string;
        data: {
            booking: {
                user: {
                    phone: string;
                    email: string | null;
                    password: string;
                    firstName: string;
                    lastName: string;
                    id: string;
                    role: import(".prisma/client").$Enums.UserRole;
                    isActive: boolean;
                    isApproved: boolean;
                    accountStatus: import(".prisma/client").$Enums.AccountStatus;
                    isEmailVerified: boolean;
                    isPhoneVerified: boolean;
                    emailVerifyToken: string | null;
                    createdAt: Date;
                    updatedAt: Date;
                    deletedAt: Date | null;
                };
                room: {
                    type: import(".prisma/client").$Enums.RoomType;
                    description: string | null;
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    deletedAt: Date | null;
                    name: string;
                    status: import(".prisma/client").$Enums.RoomStatus;
                    floor: number;
                    area: number;
                    rent: import("@prisma/client/runtime/library").Decimal;
                    deposit: import("@prisma/client/runtime/library").Decimal;
                    isAvailable: boolean;
                    occupiedFrom: Date | null;
                    occupiedUntil: Date | null;
                    availableAt: Date | null;
                    videoUrl: string | null;
                };
            } & {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                deletedAt: Date | null;
                moveInDate: Date | null;
                moveOutDate: Date | null;
                expiresAt: Date | null;
                userId: string;
                roomId: string;
                status: import(".prisma/client").$Enums.BookingStatus;
                startDate: Date;
                endDate: Date | null;
                checkoutDate: Date | null;
                bookingFee: import("@prisma/client/runtime/library").Decimal | null;
                bookingFeePaid: boolean;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.CancellationRequestStatus;
            bookingId: string;
            tenantId: string;
            reason: string | null;
            approvedAt: Date | null;
            approvedBy: string | null;
            rejectionReason: string | null;
            releaseTime: Date | null;
            requestedAt: Date;
        };
    }>;
    rejectRequest(req: any, requestId: string, body: {
        rejectionReason?: string;
    }): Promise<{
        success: boolean;
        message: string;
        data: {
            booking: {
                user: {
                    phone: string;
                    email: string | null;
                    password: string;
                    firstName: string;
                    lastName: string;
                    id: string;
                    role: import(".prisma/client").$Enums.UserRole;
                    isActive: boolean;
                    isApproved: boolean;
                    accountStatus: import(".prisma/client").$Enums.AccountStatus;
                    isEmailVerified: boolean;
                    isPhoneVerified: boolean;
                    emailVerifyToken: string | null;
                    createdAt: Date;
                    updatedAt: Date;
                    deletedAt: Date | null;
                };
                room: {
                    type: import(".prisma/client").$Enums.RoomType;
                    description: string | null;
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    deletedAt: Date | null;
                    name: string;
                    status: import(".prisma/client").$Enums.RoomStatus;
                    floor: number;
                    area: number;
                    rent: import("@prisma/client/runtime/library").Decimal;
                    deposit: import("@prisma/client/runtime/library").Decimal;
                    isAvailable: boolean;
                    occupiedFrom: Date | null;
                    occupiedUntil: Date | null;
                    availableAt: Date | null;
                    videoUrl: string | null;
                };
            } & {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                deletedAt: Date | null;
                moveInDate: Date | null;
                moveOutDate: Date | null;
                expiresAt: Date | null;
                userId: string;
                roomId: string;
                status: import(".prisma/client").$Enums.BookingStatus;
                startDate: Date;
                endDate: Date | null;
                checkoutDate: Date | null;
                bookingFee: import("@prisma/client/runtime/library").Decimal | null;
                bookingFeePaid: boolean;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.CancellationRequestStatus;
            bookingId: string;
            tenantId: string;
            reason: string | null;
            approvedAt: Date | null;
            approvedBy: string | null;
            rejectionReason: string | null;
            releaseTime: Date | null;
            requestedAt: Date;
        };
    }>;
}
