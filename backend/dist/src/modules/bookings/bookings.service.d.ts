import { BookingSource } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { PrismaService } from "@/prisma/prisma.service";
import { NotificationsService } from "@/modules/notifications/notifications.service";
import { AgreementsService } from "@/modules/agreements/agreements.service";
import { EventEmitterService } from "@/common/services/event-emitter.service";
export declare class BookingsService {
    private prisma;
    private notificationsService;
    private agreementsService;
    private eventEmitter;
    private readonly logger;
    constructor(prisma: PrismaService, notificationsService: NotificationsService, agreementsService: AgreementsService, eventEmitter: EventEmitterService);
    private roomSafeSelect;
    private toOptionalNumber;
    private toStartOfUtcDay;
    private normalizeDateInputUtc;
    private normalizeBookingSource;
    private normalizeBrokerName;
    private monthKey;
    private computeNextRentDueDate;
    private notifyAllAdmins;
    findAll(): Promise<({
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
            rent: Decimal;
            deposit: Decimal;
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
        bookingFee: Decimal | null;
        bookingFeePaid: boolean;
        expiresAt: Date | null;
        bookingSource: import(".prisma/client").$Enums.BookingSource;
        brokerName: string | null;
    })[]>;
    findMyBookings(userId: string): Promise<({
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
            rent: Decimal;
            deposit: Decimal;
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
        bookingFee: Decimal | null;
        bookingFeePaid: boolean;
        expiresAt: Date | null;
        bookingSource: import(".prisma/client").$Enums.BookingSource;
        brokerName: string | null;
    })[]>;
    findMyApprovedBooking(userId: string): Promise<{
        bookingId: string;
        moveInDate: Date;
        room: {
            rent: number;
            deposit: number;
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
        agreement: {
            id: string;
            createdAt: Date;
            status: import(".prisma/client").$Enums.AgreementStatus;
            bookingId: string;
            updatedAt: Date;
            startDate: Date;
            endDate: Date;
            agreementUrl: string | null;
            tenantSigned: boolean;
            tenantSignedAt: Date | null;
            adminSigned: boolean;
            adminSignedAt: Date | null;
            monthlyRent: Decimal;
            securityDeposit: Decimal;
        } | null;
        statusHistory: {
            id: string;
            createdAt: Date;
            status: import(".prisma/client").$Enums.BookingStatus;
            bookingId: string;
            comment: string | null;
            changedBy: string | null;
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
        moveOutDate: Date | null;
        checkoutDate: Date | null;
        bookingFee: Decimal | null;
        bookingFeePaid: boolean;
        expiresAt: Date | null;
        bookingSource: import(".prisma/client").$Enums.BookingSource;
        brokerName: string | null;
    } | null>;
    findOne(id: string): Promise<{
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
            rent: Decimal;
            deposit: Decimal;
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
        agreement: {
            id: string;
            createdAt: Date;
            status: import(".prisma/client").$Enums.AgreementStatus;
            bookingId: string;
            updatedAt: Date;
            startDate: Date;
            endDate: Date;
            agreementUrl: string | null;
            tenantSigned: boolean;
            tenantSignedAt: Date | null;
            adminSigned: boolean;
            adminSignedAt: Date | null;
            monthlyRent: Decimal;
            securityDeposit: Decimal;
        } | null;
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
        payments: {
            id: string;
            userId: string;
            type: import(".prisma/client").$Enums.PaymentType;
            createdAt: Date;
            status: import(".prisma/client").$Enums.PaymentStatus;
            tenantId: string | null;
            roomId: string | null;
            bookingId: string | null;
            rentCycleId: string | null;
            invoiceId: string | null;
            amount: Decimal;
            rentAmount: Decimal | null;
            paidAmount: Decimal | null;
            pendingAmount: Decimal | null;
            amountPaid: Decimal | null;
            borrowedAmount: Decimal | null;
            remainingAmount: Decimal | null;
            month: string;
            paymentMethod: import(".prisma/client").$Enums.PaymentMethod | null;
            screenshotUrl: string | null;
            transactionId: string | null;
            transactionDate: Date | null;
            paymentDate: Date | null;
            gateway: import(".prisma/client").$Enums.PaymentGateway | null;
            gatewayOrderId: string | null;
            gatewayPaymentId: string | null;
            gatewaySignature: string | null;
            description: string | null;
            invoiceUrl: string | null;
            updatedAt: Date;
        }[];
        rentCycles: {
            id: string;
            userId: string;
            createdAt: Date;
            status: import(".prisma/client").$Enums.RentCycleStatus;
            bookingId: string;
            amount: Decimal;
            month: number;
            updatedAt: Date;
            year: number;
            dueDate: Date;
            paidDate: Date | null;
            lateFee: Decimal | null;
            lateFeeApplied: boolean;
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
        bookingFee: Decimal | null;
        bookingFeePaid: boolean;
        expiresAt: Date | null;
        bookingSource: import(".prisma/client").$Enums.BookingSource;
        brokerName: string | null;
    }>;
    create(input: {
        userId: string;
        roomId?: string;
        moveInDate?: string;
        moveOutDate?: string;
        source?: BookingSource | string;
        bookingSource?: BookingSource | string;
        brokerName?: string | null;
    }): Promise<({
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
            rent: Decimal;
            deposit: Decimal;
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
        bookingFee: Decimal | null;
        bookingFeePaid: boolean;
        expiresAt: Date | null;
        bookingSource: import(".prisma/client").$Enums.BookingSource;
        brokerName: string | null;
    }) | null>;
    updateStatus(id: string, status: string, comment?: string, changedBy?: string): Promise<{
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
            rent: Decimal;
            deposit: Decimal;
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
        bookingFee: Decimal | null;
        bookingFeePaid: boolean;
        expiresAt: Date | null;
        bookingSource: import(".prisma/client").$Enums.BookingSource;
        brokerName: string | null;
    }>;
    cancel(id: string): Promise<{
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
            rent: Decimal;
            deposit: Decimal;
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
        bookingFee: Decimal | null;
        bookingFeePaid: boolean;
        expiresAt: Date | null;
        bookingSource: import(".prisma/client").$Enums.BookingSource;
        brokerName: string | null;
    }>;
    findPendingBookings(): Promise<({
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
            rent: Decimal;
            deposit: Decimal;
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
        bookingFee: Decimal | null;
        bookingFeePaid: boolean;
        expiresAt: Date | null;
        bookingSource: import(".prisma/client").$Enums.BookingSource;
        brokerName: string | null;
    })[]>;
    approve(id: string): Promise<{
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
            rent: Decimal;
            deposit: Decimal;
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
        bookingFee: Decimal | null;
        bookingFeePaid: boolean;
        expiresAt: Date | null;
        bookingSource: import(".prisma/client").$Enums.BookingSource;
        brokerName: string | null;
    }>;
    reject(id: string): Promise<{
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
            rent: Decimal;
            deposit: Decimal;
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
        bookingFee: Decimal | null;
        bookingFeePaid: boolean;
        expiresAt: Date | null;
        bookingSource: import(".prisma/client").$Enums.BookingSource;
        brokerName: string | null;
    }>;
    checkExpiredCheckouts(): Promise<{
        bookingId: string;
        success: boolean;
        error?: string;
    }[]>;
    createExtensionRequest(userId: string, bookingId: string, requestedCheckoutDate: string): Promise<{
        booking: {
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
                rent: Decimal;
                deposit: Decimal;
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
            bookingFee: Decimal | null;
            bookingFeePaid: boolean;
            expiresAt: Date | null;
            bookingSource: import(".prisma/client").$Enums.BookingSource;
            brokerName: string | null;
        };
        tenant: {
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
    } & {
        id: string;
        createdAt: Date;
        status: import(".prisma/client").$Enums.ExtensionRequestStatus;
        tenantId: string;
        bookingId: string;
        updatedAt: Date;
        currentCheckoutDate: Date;
        requestedCheckoutDate: Date;
        reason: string | null;
        approvedAt: Date | null;
        approvedBy: string | null;
        rejectionReason: string | null;
    }>;
    approveExtensionRequest(extensionRequestId: string): Promise<{
        booking: {
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
                rent: Decimal;
                deposit: Decimal;
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
            bookingFee: Decimal | null;
            bookingFeePaid: boolean;
            expiresAt: Date | null;
            bookingSource: import(".prisma/client").$Enums.BookingSource;
            brokerName: string | null;
        };
        tenant: {
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
    } & {
        id: string;
        createdAt: Date;
        status: import(".prisma/client").$Enums.ExtensionRequestStatus;
        tenantId: string;
        bookingId: string;
        updatedAt: Date;
        currentCheckoutDate: Date;
        requestedCheckoutDate: Date;
        reason: string | null;
        approvedAt: Date | null;
        approvedBy: string | null;
        rejectionReason: string | null;
    }>;
    rejectExtensionRequest(extensionRequestId: string, reason?: string): Promise<{
        booking: {
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
                rent: Decimal;
                deposit: Decimal;
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
            bookingFee: Decimal | null;
            bookingFeePaid: boolean;
            expiresAt: Date | null;
            bookingSource: import(".prisma/client").$Enums.BookingSource;
            brokerName: string | null;
        };
        tenant: {
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
    } & {
        id: string;
        createdAt: Date;
        status: import(".prisma/client").$Enums.ExtensionRequestStatus;
        tenantId: string;
        bookingId: string;
        updatedAt: Date;
        currentCheckoutDate: Date;
        requestedCheckoutDate: Date;
        reason: string | null;
        approvedAt: Date | null;
        approvedBy: string | null;
        rejectionReason: string | null;
    }>;
    getExtensionRequests(bookingId: string): Promise<({
        booking: {
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
                rent: Decimal;
                deposit: Decimal;
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
            bookingFee: Decimal | null;
            bookingFeePaid: boolean;
            expiresAt: Date | null;
            bookingSource: import(".prisma/client").$Enums.BookingSource;
            brokerName: string | null;
        };
        tenant: {
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
    } & {
        id: string;
        createdAt: Date;
        status: import(".prisma/client").$Enums.ExtensionRequestStatus;
        tenantId: string;
        bookingId: string;
        updatedAt: Date;
        currentCheckoutDate: Date;
        requestedCheckoutDate: Date;
        reason: string | null;
        approvedAt: Date | null;
        approvedBy: string | null;
        rejectionReason: string | null;
    })[]>;
    getPendingExtensionRequests(): Promise<({
        booking: {
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
                rent: Decimal;
                deposit: Decimal;
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
            bookingFee: Decimal | null;
            bookingFeePaid: boolean;
            expiresAt: Date | null;
            bookingSource: import(".prisma/client").$Enums.BookingSource;
            brokerName: string | null;
        };
        tenant: {
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
    } & {
        id: string;
        createdAt: Date;
        status: import(".prisma/client").$Enums.ExtensionRequestStatus;
        tenantId: string;
        bookingId: string;
        updatedAt: Date;
        currentCheckoutDate: Date;
        requestedCheckoutDate: Date;
        reason: string | null;
        approvedAt: Date | null;
        approvedBy: string | null;
        rejectionReason: string | null;
    })[]>;
}
