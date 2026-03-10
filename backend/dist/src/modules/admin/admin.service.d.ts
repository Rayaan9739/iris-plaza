import { PrismaService } from "@/prisma/prisma.service";
import { NotificationsService } from "@/modules/notifications/notifications.service";
import { EventEmitterService } from "@/common/services/event-emitter.service";
import { PaymentsService } from "@/modules/payments/payments.service";
export declare class AdminService {
    private prisma;
    private notificationsService;
    private eventEmitter;
    private paymentsService;
    constructor(prisma: PrismaService, notificationsService: NotificationsService, eventEmitter: EventEmitterService, paymentsService: PaymentsService);
    private roomSafeSelect;
    private mapMaintenanceStatus;
    getDashboardStats(): Promise<{
        totalRooms: number;
        availableRooms: number;
        occupiedRooms: number;
        totalTenants: number;
        pendingBookingRequests: number;
        pendingMaintenanceRequests: number;
        totalMonthlyRevenue: number;
        rooms: {
            total: number;
            available: number;
            occupied: number;
        };
        tenants: {
            total: number;
        };
        bookings: {
            pending: number;
        };
        payments: {
            revenue: number;
        };
        maintenance: {
            openTickets: number;
        };
    }>;
    getAdminRooms(): Promise<{
        deletedAt: Date | null;
        status: import(".prisma/client").$Enums.RoomStatus;
        isAvailable: boolean;
        id: string;
        type: import(".prisma/client").$Enums.RoomType;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        floor: number;
        area: number;
        rent: import("@prisma/client/runtime/library").Decimal;
        deposit: import("@prisma/client/runtime/library").Decimal;
        occupiedFrom: Date | null;
        occupiedUntil: Date | null;
        videoUrl: string | null;
        amenities: ({
            amenity: {
                id: string;
                description: string | null;
                createdAt: Date;
                name: string;
                icon: string | null;
            };
        } & {
            id: string;
            roomId: string;
            amenityId: string;
        })[];
        images: {
            id: string;
            roomId: string;
            createdAt: Date;
            url: string;
            caption: string | null;
            isPrimary: boolean;
            order: number;
        }[];
        media: {
            id: string;
            roomId: string;
            type: string;
            createdAt: Date;
            url: string;
        }[];
    }[]>;
    getAdminBookings(): Promise<({
        user: {
            deletedAt: Date | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string | null;
            phone: string;
            password: string;
            role: import(".prisma/client").$Enums.UserRole;
            firstName: string;
            lastName: string;
            isActive: boolean;
            isApproved: boolean;
            accountStatus: import(".prisma/client").$Enums.AccountStatus;
            isEmailVerified: boolean;
            isPhoneVerified: boolean;
            emailVerifyToken: string | null;
        };
        room: {
            deletedAt: Date | null;
            status: import(".prisma/client").$Enums.RoomStatus;
            isAvailable: boolean;
            id: string;
            type: import(".prisma/client").$Enums.RoomType;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            floor: number;
            area: number;
            rent: import("@prisma/client/runtime/library").Decimal;
            deposit: import("@prisma/client/runtime/library").Decimal;
            occupiedFrom: Date | null;
            occupiedUntil: Date | null;
            videoUrl: string | null;
            amenities: ({
                amenity: {
                    id: string;
                    description: string | null;
                    createdAt: Date;
                    name: string;
                    icon: string | null;
                };
            } & {
                id: string;
                roomId: string;
                amenityId: string;
            })[];
            images: {
                id: string;
                roomId: string;
                createdAt: Date;
                url: string;
                caption: string | null;
                isPrimary: boolean;
                order: number;
            }[];
            media: {
                id: string;
                roomId: string;
                type: string;
                createdAt: Date;
                url: string;
            }[];
        };
        statusHistory: {
            status: import(".prisma/client").$Enums.BookingStatus;
            id: string;
            bookingId: string;
            createdAt: Date;
            comment: string | null;
            changedBy: string | null;
        }[];
        documents: {
            deletedAt: Date | null;
            status: import(".prisma/client").$Enums.DocumentStatus;
            id: string;
            userId: string;
            bookingId: string | null;
            type: import(".prisma/client").$Enums.DocumentType;
            updatedAt: Date;
            name: string;
            fileUrl: string;
            fileName: string | null;
            fileSize: number | null;
            mimeType: string | null;
            rejectReason: string | null;
            verifiedBy: string | null;
            verifiedAt: Date | null;
            uploadedAt: Date;
            reviewedAt: Date | null;
        }[];
    } & {
        deletedAt: Date | null;
        status: import(".prisma/client").$Enums.BookingStatus;
        id: string;
        userId: string;
        roomId: string;
        createdAt: Date;
        updatedAt: Date;
        startDate: Date;
        endDate: Date | null;
        moveInDate: Date | null;
        moveOutDate: Date | null;
        checkoutDate: Date | null;
        bookingFee: import("@prisma/client/runtime/library").Decimal | null;
        bookingFeePaid: boolean;
        expiresAt: Date | null;
    })[]>;
    getAllTenants(): Promise<{
        id: string;
        bookingId: string;
        userId: string;
        name: string;
        phone: string;
        email: string | null;
        room: {
            deletedAt: Date | null;
            status: import(".prisma/client").$Enums.RoomStatus;
            isAvailable: boolean;
            id: string;
            type: import(".prisma/client").$Enums.RoomType;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            floor: number;
            area: number;
            rent: import("@prisma/client/runtime/library").Decimal;
            deposit: import("@prisma/client/runtime/library").Decimal;
            occupiedFrom: Date | null;
            occupiedUntil: Date | null;
            videoUrl: string | null;
            amenities: ({
                amenity: {
                    id: string;
                    description: string | null;
                    createdAt: Date;
                    name: string;
                    icon: string | null;
                };
            } & {
                id: string;
                roomId: string;
                amenityId: string;
            })[];
            images: {
                id: string;
                roomId: string;
                createdAt: Date;
                url: string;
                caption: string | null;
                isPrimary: boolean;
                order: number;
            }[];
            media: {
                id: string;
                roomId: string;
                type: string;
                createdAt: Date;
                url: string;
            }[];
        };
        moveInDate: Date | null;
        rent: import("@prisma/client/runtime/library").Decimal;
        status: import(".prisma/client").$Enums.BookingStatus;
        user: {
            deletedAt: Date | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string | null;
            phone: string;
            password: string;
            role: import(".prisma/client").$Enums.UserRole;
            firstName: string;
            lastName: string;
            isActive: boolean;
            isApproved: boolean;
            accountStatus: import(".prisma/client").$Enums.AccountStatus;
            isEmailVerified: boolean;
            isPhoneVerified: boolean;
            emailVerifyToken: string | null;
        };
    }[]>;
    getTenantById(tenantId: string): Promise<{
        id: string;
        name: string;
        phone: string;
        email: string | null;
        status: import(".prisma/client").$Enums.BookingStatus;
        booking: {
            id: string;
            status: import(".prisma/client").$Enums.BookingStatus;
            moveInDate: Date | null;
            moveOutDate: Date | null;
            startDate: Date;
            endDate: Date | null;
        };
        room: {
            id: string;
            name: string;
            floor: number;
            rent: import("@prisma/client/runtime/library").Decimal;
            deposit: import("@prisma/client/runtime/library").Decimal;
        };
        agreement: {
            id: string;
            url: string | null;
            status: import(".prisma/client").$Enums.AgreementStatus;
            startDate: Date;
            endDate: Date;
            monthlyRent: import("@prisma/client/runtime/library").Decimal;
            securityDeposit: import("@prisma/client/runtime/library").Decimal;
        } | null;
        documents: {
            id: string;
            type: import(".prisma/client").$Enums.DocumentType;
            url: string;
        }[];
    }>;
    removeTenant(userId: string): Promise<{
        success: boolean;
    }>;
    getAdminPayments(): Promise<any[]>;
    markPaymentAsPaid(id: string, amountReceived?: number, note?: string, paymentMethod?: string): Promise<any>;
    getAdminDocuments(): Promise<({
        booking: ({
            room: {
                deletedAt: Date | null;
                status: import(".prisma/client").$Enums.RoomStatus;
                isAvailable: boolean;
                id: string;
                type: import(".prisma/client").$Enums.RoomType;
                description: string | null;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                floor: number;
                area: number;
                rent: import("@prisma/client/runtime/library").Decimal;
                deposit: import("@prisma/client/runtime/library").Decimal;
                occupiedFrom: Date | null;
                occupiedUntil: Date | null;
                videoUrl: string | null;
                amenities: ({
                    amenity: {
                        id: string;
                        description: string | null;
                        createdAt: Date;
                        name: string;
                        icon: string | null;
                    };
                } & {
                    id: string;
                    roomId: string;
                    amenityId: string;
                })[];
                images: {
                    id: string;
                    roomId: string;
                    createdAt: Date;
                    url: string;
                    caption: string | null;
                    isPrimary: boolean;
                    order: number;
                }[];
                media: {
                    id: string;
                    roomId: string;
                    type: string;
                    createdAt: Date;
                    url: string;
                }[];
            };
        } & {
            deletedAt: Date | null;
            status: import(".prisma/client").$Enums.BookingStatus;
            id: string;
            userId: string;
            roomId: string;
            createdAt: Date;
            updatedAt: Date;
            startDate: Date;
            endDate: Date | null;
            moveInDate: Date | null;
            moveOutDate: Date | null;
            checkoutDate: Date | null;
            bookingFee: import("@prisma/client/runtime/library").Decimal | null;
            bookingFeePaid: boolean;
            expiresAt: Date | null;
        }) | null;
        user: {
            deletedAt: Date | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string | null;
            phone: string;
            password: string;
            role: import(".prisma/client").$Enums.UserRole;
            firstName: string;
            lastName: string;
            isActive: boolean;
            isApproved: boolean;
            accountStatus: import(".prisma/client").$Enums.AccountStatus;
            isEmailVerified: boolean;
            isPhoneVerified: boolean;
            emailVerifyToken: string | null;
        };
    } & {
        deletedAt: Date | null;
        status: import(".prisma/client").$Enums.DocumentStatus;
        id: string;
        userId: string;
        bookingId: string | null;
        type: import(".prisma/client").$Enums.DocumentType;
        updatedAt: Date;
        name: string;
        fileUrl: string;
        fileName: string | null;
        fileSize: number | null;
        mimeType: string | null;
        rejectReason: string | null;
        verifiedBy: string | null;
        verifiedAt: Date | null;
        uploadedAt: Date;
        reviewedAt: Date | null;
    })[]>;
    approveDocument(id: string): Promise<{
        deletedAt: Date | null;
        status: import(".prisma/client").$Enums.DocumentStatus;
        id: string;
        userId: string;
        bookingId: string | null;
        type: import(".prisma/client").$Enums.DocumentType;
        updatedAt: Date;
        name: string;
        fileUrl: string;
        fileName: string | null;
        fileSize: number | null;
        mimeType: string | null;
        rejectReason: string | null;
        verifiedBy: string | null;
        verifiedAt: Date | null;
        uploadedAt: Date;
        reviewedAt: Date | null;
    }>;
    rejectDocument(id: string): Promise<{
        deletedAt: Date | null;
        status: import(".prisma/client").$Enums.DocumentStatus;
        id: string;
        userId: string;
        bookingId: string | null;
        type: import(".prisma/client").$Enums.DocumentType;
        updatedAt: Date;
        name: string;
        fileUrl: string;
        fileName: string | null;
        fileSize: number | null;
        mimeType: string | null;
        rejectReason: string | null;
        verifiedBy: string | null;
        verifiedAt: Date | null;
        uploadedAt: Date;
        reviewedAt: Date | null;
    }>;
    getMaintenanceRequests(): Promise<any>;
    approveMaintenanceRequest(id: string, amountToPayNow?: number): Promise<{
        status: string;
        id: string;
        tenantId: string;
        bookingId: string | null;
        description: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        category: string;
        requestedAmount: import("@prisma/client/runtime/library").Decimal | null;
        priority: import(".prisma/client").$Enums.TicketPriority;
        resolvedAt: Date | null;
        resolution: string | null;
    }>;
    rejectMaintenanceRequest(id: string): Promise<{
        status: string;
        id: string;
        tenantId: string;
        bookingId: string | null;
        description: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        category: string;
        requestedAmount: import("@prisma/client/runtime/library").Decimal | null;
        priority: import(".prisma/client").$Enums.TicketPriority;
        resolvedAt: Date | null;
        resolution: string | null;
    }>;
    getPendingVerifications(): Promise<{
        documents: ({
            booking: {
                deletedAt: Date | null;
                status: import(".prisma/client").$Enums.BookingStatus;
                id: string;
                userId: string;
                roomId: string;
                createdAt: Date;
                updatedAt: Date;
                startDate: Date;
                endDate: Date | null;
                moveInDate: Date | null;
                moveOutDate: Date | null;
                checkoutDate: Date | null;
                bookingFee: import("@prisma/client/runtime/library").Decimal | null;
                bookingFeePaid: boolean;
                expiresAt: Date | null;
            } | null;
            user: {
                deletedAt: Date | null;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                email: string | null;
                phone: string;
                password: string;
                role: import(".prisma/client").$Enums.UserRole;
                firstName: string;
                lastName: string;
                isActive: boolean;
                isApproved: boolean;
                accountStatus: import(".prisma/client").$Enums.AccountStatus;
                isEmailVerified: boolean;
                isPhoneVerified: boolean;
                emailVerifyToken: string | null;
            };
        } & {
            deletedAt: Date | null;
            status: import(".prisma/client").$Enums.DocumentStatus;
            id: string;
            userId: string;
            bookingId: string | null;
            type: import(".prisma/client").$Enums.DocumentType;
            updatedAt: Date;
            name: string;
            fileUrl: string;
            fileName: string | null;
            fileSize: number | null;
            mimeType: string | null;
            rejectReason: string | null;
            verifiedBy: string | null;
            verifiedAt: Date | null;
            uploadedAt: Date;
            reviewedAt: Date | null;
        })[];
        bookings: ({
            user: {
                deletedAt: Date | null;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                email: string | null;
                phone: string;
                password: string;
                role: import(".prisma/client").$Enums.UserRole;
                firstName: string;
                lastName: string;
                isActive: boolean;
                isApproved: boolean;
                accountStatus: import(".prisma/client").$Enums.AccountStatus;
                isEmailVerified: boolean;
                isPhoneVerified: boolean;
                emailVerifyToken: string | null;
            };
            room: {
                deletedAt: Date | null;
                status: import(".prisma/client").$Enums.RoomStatus;
                isAvailable: boolean;
                id: string;
                type: import(".prisma/client").$Enums.RoomType;
                description: string | null;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                floor: number;
                area: number;
                rent: import("@prisma/client/runtime/library").Decimal;
                deposit: import("@prisma/client/runtime/library").Decimal;
                occupiedFrom: Date | null;
                occupiedUntil: Date | null;
                videoUrl: string | null;
                amenities: ({
                    amenity: {
                        id: string;
                        description: string | null;
                        createdAt: Date;
                        name: string;
                        icon: string | null;
                    };
                } & {
                    id: string;
                    roomId: string;
                    amenityId: string;
                })[];
                images: {
                    id: string;
                    roomId: string;
                    createdAt: Date;
                    url: string;
                    caption: string | null;
                    isPrimary: boolean;
                    order: number;
                }[];
                media: {
                    id: string;
                    roomId: string;
                    type: string;
                    createdAt: Date;
                    url: string;
                }[];
            };
            documents: {
                deletedAt: Date | null;
                status: import(".prisma/client").$Enums.DocumentStatus;
                id: string;
                userId: string;
                bookingId: string | null;
                type: import(".prisma/client").$Enums.DocumentType;
                updatedAt: Date;
                name: string;
                fileUrl: string;
                fileName: string | null;
                fileSize: number | null;
                mimeType: string | null;
                rejectReason: string | null;
                verifiedBy: string | null;
                verifiedAt: Date | null;
                uploadedAt: Date;
                reviewedAt: Date | null;
            }[];
        } & {
            deletedAt: Date | null;
            status: import(".prisma/client").$Enums.BookingStatus;
            id: string;
            userId: string;
            roomId: string;
            createdAt: Date;
            updatedAt: Date;
            startDate: Date;
            endDate: Date | null;
            moveInDate: Date | null;
            moveOutDate: Date | null;
            checkoutDate: Date | null;
            bookingFee: import("@prisma/client/runtime/library").Decimal | null;
            bookingFeePaid: boolean;
            expiresAt: Date | null;
        })[];
        tenants: ({
            tenantProfile: {
                id: string;
                userId: string;
                createdAt: Date;
                updatedAt: Date;
                moveInDate: Date | null;
                moveOutDate: Date | null;
                dateOfBirth: Date | null;
                gender: string | null;
                occupation: string | null;
                companyName: string | null;
                monthlyIncome: import("@prisma/client/runtime/library").Decimal | null;
                emergencyName: string | null;
                emergencyPhone: string | null;
                emergencyRelation: string | null;
                kycStatus: string;
                kycVerifiedAt: Date | null;
            } | null;
        } & {
            deletedAt: Date | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string | null;
            phone: string;
            password: string;
            role: import(".prisma/client").$Enums.UserRole;
            firstName: string;
            lastName: string;
            isActive: boolean;
            isApproved: boolean;
            accountStatus: import(".prisma/client").$Enums.AccountStatus;
            isEmailVerified: boolean;
            isPhoneVerified: boolean;
            emailVerifyToken: string | null;
        })[];
    }>;
    approveTenant(userId: string): Promise<{
        deletedAt: Date | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string | null;
        phone: string;
        password: string;
        role: import(".prisma/client").$Enums.UserRole;
        firstName: string;
        lastName: string;
        isActive: boolean;
        isApproved: boolean;
        accountStatus: import(".prisma/client").$Enums.AccountStatus;
        isEmailVerified: boolean;
        isPhoneVerified: boolean;
        emailVerifyToken: string | null;
    }>;
    rejectTenant(userId: string): Promise<{
        deletedAt: Date | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string | null;
        phone: string;
        password: string;
        role: import(".prisma/client").$Enums.UserRole;
        firstName: string;
        lastName: string;
        isActive: boolean;
        isApproved: boolean;
        accountStatus: import(".prisma/client").$Enums.AccountStatus;
        isEmailVerified: boolean;
        isPhoneVerified: boolean;
        emailVerifyToken: string | null;
    }>;
    suspendTenant(userId: string): Promise<{
        deletedAt: Date | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string | null;
        phone: string;
        password: string;
        role: import(".prisma/client").$Enums.UserRole;
        firstName: string;
        lastName: string;
        isActive: boolean;
        isApproved: boolean;
        accountStatus: import(".prisma/client").$Enums.AccountStatus;
        isEmailVerified: boolean;
        isPhoneVerified: boolean;
        emailVerifyToken: string | null;
    }>;
    getMonthlyRevenue(): Promise<{
        month: string;
        revenue: number;
    }[]>;
    getOccupancyData(): Promise<{
        totalRooms: number;
        occupiedRooms: number;
        availableRooms: number;
        occupancyRate: number;
    }>;
}
