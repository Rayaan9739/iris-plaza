import { PrismaService } from "@/prisma/prisma.service";
import { NotificationsService } from "@/modules/notifications/notifications.service";
import { EventEmitterService } from "@/common/services/event-emitter.service";
import { PaymentsService } from "@/modules/payments/payments.service";
export declare class AdminService {
    private prisma;
    private notificationsService;
    private eventEmitter;
    private paymentsService;
    private readonly activeTenantBookingStatuses;
    constructor(prisma: PrismaService, notificationsService: NotificationsService, eventEmitter: EventEmitterService, paymentsService: PaymentsService);
    private roomSafeSelect;
    private mapMaintenanceStatus;
    private normalizeBookingSource;
    private normalizeBrokerName;
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
        id: string;
        type: import(".prisma/client").$Enums.RoomType;
        createdAt: Date;
        name: string;
        deletedAt: Date | null;
        status: import(".prisma/client").$Enums.RoomStatus;
        isAvailable: boolean;
        description: string | null;
        updatedAt: Date;
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
                createdAt: Date;
                name: string;
                description: string | null;
                icon: string | null;
            };
        } & {
            id: string;
            roomId: string;
            amenityId: string;
        })[];
        images: {
            id: string;
            createdAt: Date;
            roomId: string;
            url: string;
            caption: string | null;
            isPrimary: boolean;
            order: number;
        }[];
        media: {
            id: string;
            type: string;
            createdAt: Date;
            roomId: string;
            url: string;
        }[];
    }[]>;
    getAdminRoom(id: string): Promise<{
        amenities: ({
            amenity: {
                id: string;
                createdAt: Date;
                name: string;
                description: string | null;
                icon: string | null;
            };
        } & {
            id: string;
            roomId: string;
            amenityId: string;
        })[];
        images: {
            id: string;
            createdAt: Date;
            roomId: string;
            url: string;
            caption: string | null;
            isPrimary: boolean;
            order: number;
        }[];
        media: {
            id: string;
            type: string;
            createdAt: Date;
            roomId: string;
            url: string;
        }[];
    } & {
        id: string;
        type: import(".prisma/client").$Enums.RoomType;
        createdAt: Date;
        name: string;
        deletedAt: Date | null;
        status: import(".prisma/client").$Enums.RoomStatus;
        isAvailable: boolean;
        description: string | null;
        updatedAt: Date;
        floor: number;
        area: number;
        rent: import("@prisma/client/runtime/library").Decimal;
        deposit: import("@prisma/client/runtime/library").Decimal;
        occupiedFrom: Date | null;
        occupiedUntil: Date | null;
        availableAt: Date | null;
        videoUrl: string | null;
    }>;
    getAdminBookings(): Promise<{
        bookingSource: import(".prisma/client").$Enums.BookingSource;
        brokerName: string | null;
        user: {
            id: string;
            createdAt: Date;
            deletedAt: Date | null;
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
            id: string;
            type: import(".prisma/client").$Enums.RoomType;
            createdAt: Date;
            name: string;
            deletedAt: Date | null;
            status: import(".prisma/client").$Enums.RoomStatus;
            isAvailable: boolean;
            description: string | null;
            updatedAt: Date;
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
                    createdAt: Date;
                    name: string;
                    description: string | null;
                    icon: string | null;
                };
            } & {
                id: string;
                roomId: string;
                amenityId: string;
            })[];
            images: {
                id: string;
                createdAt: Date;
                roomId: string;
                url: string;
                caption: string | null;
                isPrimary: boolean;
                order: number;
            }[];
            media: {
                id: string;
                type: string;
                createdAt: Date;
                roomId: string;
                url: string;
            }[];
        };
        statusHistory: {
            id: string;
            createdAt: Date;
            status: import(".prisma/client").$Enums.BookingStatus;
            bookingId: string;
            comment: string | null;
            changedBy: string | null;
        }[];
        documents: {
            id: string;
            userId: string;
            type: import(".prisma/client").$Enums.DocumentType;
            name: string;
            deletedAt: Date | null;
            status: import(".prisma/client").$Enums.DocumentStatus;
            bookingId: string | null;
            updatedAt: Date;
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
        id: string;
        userId: string;
        createdAt: Date;
        deletedAt: Date | null;
        status: import(".prisma/client").$Enums.BookingStatus;
        roomId: string;
        updatedAt: Date;
        startDate: Date;
        endDate: Date | null;
        moveInDate: Date | null;
        moveOutDate: Date | null;
        checkoutDate: Date | null;
        bookingFee: import("@prisma/client/runtime/library").Decimal | null;
        bookingFeePaid: boolean;
        expiresAt: Date | null;
    }[]>;
    getAllTenants(): Promise<{
        id: string;
        bookingId: string;
        userId: string;
        name: string;
        phone: string;
        email: string | null;
        room: {
            id: string;
            type: import(".prisma/client").$Enums.RoomType;
            createdAt: Date;
            name: string;
            deletedAt: Date | null;
            status: import(".prisma/client").$Enums.RoomStatus;
            isAvailable: boolean;
            description: string | null;
            updatedAt: Date;
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
                    createdAt: Date;
                    name: string;
                    description: string | null;
                    icon: string | null;
                };
            } & {
                id: string;
                roomId: string;
                amenityId: string;
            })[];
            images: {
                id: string;
                createdAt: Date;
                roomId: string;
                url: string;
                caption: string | null;
                isPrimary: boolean;
                order: number;
            }[];
            media: {
                id: string;
                type: string;
                createdAt: Date;
                roomId: string;
                url: string;
            }[];
        };
        moveInDate: Date | null;
        rent: import("@prisma/client/runtime/library").Decimal;
        status: import(".prisma/client").$Enums.BookingStatus;
        user: {
            id: string;
            createdAt: Date;
            deletedAt: Date | null;
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
            bookingSource: import(".prisma/client").$Enums.BookingSource;
            brokerName: string | null;
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
        user: {
            id: string;
            createdAt: Date;
            deletedAt: Date | null;
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
        booking: ({
            room: {
                id: string;
                type: import(".prisma/client").$Enums.RoomType;
                createdAt: Date;
                name: string;
                deletedAt: Date | null;
                status: import(".prisma/client").$Enums.RoomStatus;
                isAvailable: boolean;
                description: string | null;
                updatedAt: Date;
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
                        createdAt: Date;
                        name: string;
                        description: string | null;
                        icon: string | null;
                    };
                } & {
                    id: string;
                    roomId: string;
                    amenityId: string;
                })[];
                images: {
                    id: string;
                    createdAt: Date;
                    roomId: string;
                    url: string;
                    caption: string | null;
                    isPrimary: boolean;
                    order: number;
                }[];
                media: {
                    id: string;
                    type: string;
                    createdAt: Date;
                    roomId: string;
                    url: string;
                }[];
            };
        } & {
            id: string;
            userId: string;
            createdAt: Date;
            deletedAt: Date | null;
            status: import(".prisma/client").$Enums.BookingStatus;
            roomId: string;
            updatedAt: Date;
            startDate: Date;
            endDate: Date | null;
            moveInDate: Date | null;
            moveOutDate: Date | null;
            checkoutDate: Date | null;
            bookingFee: import("@prisma/client/runtime/library").Decimal | null;
            bookingFeePaid: boolean;
            expiresAt: Date | null;
            bookingSource: import(".prisma/client").$Enums.BookingSource;
            brokerName: string | null;
        }) | null;
    } & {
        id: string;
        userId: string;
        type: import(".prisma/client").$Enums.DocumentType;
        name: string;
        deletedAt: Date | null;
        status: import(".prisma/client").$Enums.DocumentStatus;
        bookingId: string | null;
        updatedAt: Date;
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
        id: string;
        userId: string;
        type: import(".prisma/client").$Enums.DocumentType;
        name: string;
        deletedAt: Date | null;
        status: import(".prisma/client").$Enums.DocumentStatus;
        bookingId: string | null;
        updatedAt: Date;
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
        id: string;
        userId: string;
        type: import(".prisma/client").$Enums.DocumentType;
        name: string;
        deletedAt: Date | null;
        status: import(".prisma/client").$Enums.DocumentStatus;
        bookingId: string | null;
        updatedAt: Date;
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
    getMaintenanceRequests(): Promise<any[]>;
    approveMaintenanceRequest(id: string, _amountToPayNow?: number): Promise<{
        status: string;
        id: string;
        title: string;
        createdAt: Date;
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
    rejectMaintenanceRequest(id: string): Promise<{
        status: string;
        id: string;
        title: string;
        createdAt: Date;
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
    getPendingVerifications(): Promise<{
        documents: ({
            user: {
                id: string;
                createdAt: Date;
                deletedAt: Date | null;
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
            booking: {
                id: string;
                userId: string;
                createdAt: Date;
                deletedAt: Date | null;
                status: import(".prisma/client").$Enums.BookingStatus;
                roomId: string;
                updatedAt: Date;
                startDate: Date;
                endDate: Date | null;
                moveInDate: Date | null;
                moveOutDate: Date | null;
                checkoutDate: Date | null;
                bookingFee: import("@prisma/client/runtime/library").Decimal | null;
                bookingFeePaid: boolean;
                expiresAt: Date | null;
                bookingSource: import(".prisma/client").$Enums.BookingSource;
                brokerName: string | null;
            } | null;
        } & {
            id: string;
            userId: string;
            type: import(".prisma/client").$Enums.DocumentType;
            name: string;
            deletedAt: Date | null;
            status: import(".prisma/client").$Enums.DocumentStatus;
            bookingId: string | null;
            updatedAt: Date;
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
                id: string;
                createdAt: Date;
                deletedAt: Date | null;
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
                id: string;
                type: import(".prisma/client").$Enums.RoomType;
                createdAt: Date;
                name: string;
                deletedAt: Date | null;
                status: import(".prisma/client").$Enums.RoomStatus;
                isAvailable: boolean;
                description: string | null;
                updatedAt: Date;
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
                        createdAt: Date;
                        name: string;
                        description: string | null;
                        icon: string | null;
                    };
                } & {
                    id: string;
                    roomId: string;
                    amenityId: string;
                })[];
                images: {
                    id: string;
                    createdAt: Date;
                    roomId: string;
                    url: string;
                    caption: string | null;
                    isPrimary: boolean;
                    order: number;
                }[];
                media: {
                    id: string;
                    type: string;
                    createdAt: Date;
                    roomId: string;
                    url: string;
                }[];
            };
            documents: {
                id: string;
                userId: string;
                type: import(".prisma/client").$Enums.DocumentType;
                name: string;
                deletedAt: Date | null;
                status: import(".prisma/client").$Enums.DocumentStatus;
                bookingId: string | null;
                updatedAt: Date;
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
            id: string;
            userId: string;
            createdAt: Date;
            deletedAt: Date | null;
            status: import(".prisma/client").$Enums.BookingStatus;
            roomId: string;
            updatedAt: Date;
            startDate: Date;
            endDate: Date | null;
            moveInDate: Date | null;
            moveOutDate: Date | null;
            checkoutDate: Date | null;
            bookingFee: import("@prisma/client/runtime/library").Decimal | null;
            bookingFeePaid: boolean;
            expiresAt: Date | null;
            bookingSource: import(".prisma/client").$Enums.BookingSource;
            brokerName: string | null;
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
            id: string;
            createdAt: Date;
            deletedAt: Date | null;
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
        id: string;
        createdAt: Date;
        deletedAt: Date | null;
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
        id: string;
        createdAt: Date;
        deletedAt: Date | null;
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
        id: string;
        createdAt: Date;
        deletedAt: Date | null;
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
