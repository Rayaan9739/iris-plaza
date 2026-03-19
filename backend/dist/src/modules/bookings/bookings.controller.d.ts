import { BookingsService } from "./bookings.service";
import { CreateBookingDto } from "./dto/create-booking.dto";
export declare class BookingsController {
    private bookingsService;
    constructor(bookingsService: BookingsService);
    getMyBookings(req: any): Promise<({
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
    })[]>;
    getMyBookingsAlias(req: any): Promise<{
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
            monthlyRent: import("@prisma/client/runtime/library").Decimal;
            securityDeposit: import("@prisma/client/runtime/library").Decimal;
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
        bookingFee: import("@prisma/client/runtime/library").Decimal | null;
        bookingFeePaid: boolean;
        expiresAt: Date | null;
        bookingSource: import(".prisma/client").$Enums.BookingSource;
        brokerName: string | null;
    } | null>;
    getMyActiveBooking(req: any): Promise<{
        id: string;
        roomId: string;
        status: import(".prisma/client").$Enums.BookingStatus;
    } | null>;
    getMyRoom(req: any): Promise<{
        bookingId: string;
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
            monthlyRent: import("@prisma/client/runtime/library").Decimal;
            securityDeposit: import("@prisma/client/runtime/library").Decimal;
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
            amount: import("@prisma/client/runtime/library").Decimal;
            rentAmount: import("@prisma/client/runtime/library").Decimal | null;
            paidAmount: import("@prisma/client/runtime/library").Decimal | null;
            pendingAmount: import("@prisma/client/runtime/library").Decimal | null;
            amountPaid: import("@prisma/client/runtime/library").Decimal | null;
            borrowedAmount: import("@prisma/client/runtime/library").Decimal | null;
            remainingAmount: import("@prisma/client/runtime/library").Decimal | null;
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
            amount: import("@prisma/client/runtime/library").Decimal;
            month: number;
            updatedAt: Date;
            year: number;
            dueDate: Date;
            paidDate: Date | null;
            lateFee: import("@prisma/client/runtime/library").Decimal | null;
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
        bookingFee: import("@prisma/client/runtime/library").Decimal | null;
        bookingFeePaid: boolean;
        expiresAt: Date | null;
        bookingSource: import(".prisma/client").$Enums.BookingSource;
        brokerName: string | null;
    }>;
    create(req: any, body: CreateBookingDto): Promise<({
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
    }) | null>;
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
    }>;
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
    })[]>;
    findPending(): Promise<({
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
    })[]>;
    updateStatus(id: string, body: {
        status: string;
        comment?: string;
    }): Promise<{
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
    }>;
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
    }>;
    createExtensionRequest(req: any, bookingId: string, body: {
        requestedCheckoutDate?: string;
        newMoveOutDate?: string;
    }): Promise<{
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
    approveExtensionRequest(id: string): Promise<{
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
    rejectExtensionRequest(id: string, body: {
        reason?: string;
    }): Promise<{
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
    checkExpiredCheckouts(): Promise<{
        bookingId: string;
        success: boolean;
        error?: string;
    }[]>;
}
