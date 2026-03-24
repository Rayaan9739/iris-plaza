import { BookingsService } from "./bookings.service";
import { CreateBookingDto } from "./dto/create-booking.dto";
export declare class BookingsController {
    private bookingsService;
    constructor(bookingsService: BookingsService);
    getMyBookings(req: any): Promise<({
        room: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            name: string;
            description: string | null;
            status: import(".prisma/client").$Enums.RoomStatus;
            type: import(".prisma/client").$Enums.RoomType;
            floor: number;
            area: number;
            rent: import("@prisma/client/runtime/library").Decimal;
            deposit: import("@prisma/client/runtime/library").Decimal;
            isAvailable: boolean;
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
                createdAt: Date;
                roomId: string;
                type: string;
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
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        moveInDate: Date | null;
        moveOutDate: Date | null;
        userId: string;
        expiresAt: Date | null;
        roomId: string;
        status: import(".prisma/client").$Enums.BookingStatus;
        startDate: Date;
        endDate: Date | null;
        checkoutDate: Date | null;
        bookingFee: import("@prisma/client/runtime/library").Decimal | null;
        bookingFeePaid: boolean;
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
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            name: string;
            description: string | null;
            status: import(".prisma/client").$Enums.RoomStatus;
            type: import(".prisma/client").$Enums.RoomType;
            floor: number;
            area: number;
            isAvailable: boolean;
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
                createdAt: Date;
                roomId: string;
                type: string;
                url: string;
            }[];
        };
        agreement: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.AgreementStatus;
            startDate: Date;
            endDate: Date;
            bookingId: string;
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
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        moveOutDate: Date | null;
        userId: string;
        expiresAt: Date | null;
        roomId: string;
        status: import(".prisma/client").$Enums.BookingStatus;
        startDate: Date;
        endDate: Date | null;
        checkoutDate: Date | null;
        bookingFee: import("@prisma/client/runtime/library").Decimal | null;
        bookingFeePaid: boolean;
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
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            name: string;
            description: string | null;
            status: import(".prisma/client").$Enums.RoomStatus;
            type: import(".prisma/client").$Enums.RoomType;
            floor: number;
            area: number;
            isAvailable: boolean;
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
                createdAt: Date;
                roomId: string;
                type: string;
                url: string;
            }[];
        };
    } | null>;
    findOne(id: string): Promise<{
        user: {
            dob: Date | null;
            phone: string;
            email: string | null;
            firstName: string;
            lastName: string;
            id: string;
            password: string | null;
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
            id: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            name: string;
            description: string | null;
            status: import(".prisma/client").$Enums.RoomStatus;
            type: import(".prisma/client").$Enums.RoomType;
            floor: number;
            area: number;
            rent: import("@prisma/client/runtime/library").Decimal;
            deposit: import("@prisma/client/runtime/library").Decimal;
            isAvailable: boolean;
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
                createdAt: Date;
                roomId: string;
                type: string;
                url: string;
            }[];
        };
        agreement: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.AgreementStatus;
            startDate: Date;
            endDate: Date;
            bookingId: string;
            agreementUrl: string | null;
            tenantSigned: boolean;
            tenantSignedAt: Date | null;
            adminSigned: boolean;
            adminSignedAt: Date | null;
            monthlyRent: import("@prisma/client/runtime/library").Decimal;
            securityDeposit: import("@prisma/client/runtime/library").Decimal;
        } | null;
        documents: {
            id: string;
            updatedAt: Date;
            deletedAt: Date | null;
            name: string;
            userId: string;
            status: import(".prisma/client").$Enums.DocumentStatus;
            type: import(".prisma/client").$Enums.DocumentType;
            bookingId: string | null;
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
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            description: string | null;
            roomId: string | null;
            status: import(".prisma/client").$Enums.PaymentStatus;
            type: import(".prisma/client").$Enums.PaymentType;
            month: string;
            bookingId: string | null;
            tenantId: string | null;
            rentCycleId: string | null;
            invoiceId: string | null;
            amount: import("@prisma/client/runtime/library").Decimal;
            rentAmount: import("@prisma/client/runtime/library").Decimal | null;
            paidAmount: import("@prisma/client/runtime/library").Decimal | null;
            pendingAmount: import("@prisma/client/runtime/library").Decimal | null;
            amountPaid: import("@prisma/client/runtime/library").Decimal | null;
            borrowedAmount: import("@prisma/client/runtime/library").Decimal | null;
            remainingAmount: import("@prisma/client/runtime/library").Decimal | null;
            paymentMethod: import(".prisma/client").$Enums.PaymentMethod | null;
            screenshotUrl: string | null;
            transactionId: string | null;
            transactionDate: Date | null;
            paymentDate: Date | null;
            gateway: import(".prisma/client").$Enums.PaymentGateway | null;
            gatewayOrderId: string | null;
            gatewayPaymentId: string | null;
            gatewaySignature: string | null;
            invoiceUrl: string | null;
        }[];
        rentCycles: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            year: number;
            status: import(".prisma/client").$Enums.RentCycleStatus;
            month: number;
            bookingId: string;
            amount: import("@prisma/client/runtime/library").Decimal;
            dueDate: Date;
            paidDate: Date | null;
            lateFee: import("@prisma/client/runtime/library").Decimal | null;
            lateFeeApplied: boolean;
        }[];
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
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        moveInDate: Date | null;
        moveOutDate: Date | null;
        userId: string;
        expiresAt: Date | null;
        roomId: string;
        status: import(".prisma/client").$Enums.BookingStatus;
        startDate: Date;
        endDate: Date | null;
        checkoutDate: Date | null;
        bookingFee: import("@prisma/client/runtime/library").Decimal | null;
        bookingFeePaid: boolean;
        bookingSource: import(".prisma/client").$Enums.BookingSource;
        brokerName: string | null;
    }>;
    create(req: any, body: CreateBookingDto): Promise<({
        user: {
            dob: Date | null;
            phone: string;
            email: string | null;
            firstName: string;
            lastName: string;
            id: string;
            password: string | null;
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
            id: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            name: string;
            description: string | null;
            status: import(".prisma/client").$Enums.RoomStatus;
            type: import(".prisma/client").$Enums.RoomType;
            floor: number;
            area: number;
            rent: import("@prisma/client/runtime/library").Decimal;
            deposit: import("@prisma/client/runtime/library").Decimal;
            isAvailable: boolean;
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
                createdAt: Date;
                roomId: string;
                type: string;
                url: string;
            }[];
        };
        documents: {
            id: string;
            updatedAt: Date;
            deletedAt: Date | null;
            name: string;
            userId: string;
            status: import(".prisma/client").$Enums.DocumentStatus;
            type: import(".prisma/client").$Enums.DocumentType;
            bookingId: string | null;
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
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        moveInDate: Date | null;
        moveOutDate: Date | null;
        userId: string;
        expiresAt: Date | null;
        roomId: string;
        status: import(".prisma/client").$Enums.BookingStatus;
        startDate: Date;
        endDate: Date | null;
        checkoutDate: Date | null;
        bookingFee: import("@prisma/client/runtime/library").Decimal | null;
        bookingFeePaid: boolean;
        bookingSource: import(".prisma/client").$Enums.BookingSource;
        brokerName: string | null;
    }) | null>;
    cancel(id: string): Promise<{
        room: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            name: string;
            description: string | null;
            status: import(".prisma/client").$Enums.RoomStatus;
            type: import(".prisma/client").$Enums.RoomType;
            floor: number;
            area: number;
            rent: import("@prisma/client/runtime/library").Decimal;
            deposit: import("@prisma/client/runtime/library").Decimal;
            isAvailable: boolean;
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
                createdAt: Date;
                roomId: string;
                type: string;
                url: string;
            }[];
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        moveInDate: Date | null;
        moveOutDate: Date | null;
        userId: string;
        expiresAt: Date | null;
        roomId: string;
        status: import(".prisma/client").$Enums.BookingStatus;
        startDate: Date;
        endDate: Date | null;
        checkoutDate: Date | null;
        bookingFee: import("@prisma/client/runtime/library").Decimal | null;
        bookingFeePaid: boolean;
        bookingSource: import(".prisma/client").$Enums.BookingSource;
        brokerName: string | null;
    }>;
    findAll(): Promise<({
        user: {
            dob: Date | null;
            phone: string;
            email: string | null;
            firstName: string;
            lastName: string;
            id: string;
            password: string | null;
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
            id: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            name: string;
            description: string | null;
            status: import(".prisma/client").$Enums.RoomStatus;
            type: import(".prisma/client").$Enums.RoomType;
            floor: number;
            area: number;
            rent: import("@prisma/client/runtime/library").Decimal;
            deposit: import("@prisma/client/runtime/library").Decimal;
            isAvailable: boolean;
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
                createdAt: Date;
                roomId: string;
                type: string;
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
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        moveInDate: Date | null;
        moveOutDate: Date | null;
        userId: string;
        expiresAt: Date | null;
        roomId: string;
        status: import(".prisma/client").$Enums.BookingStatus;
        startDate: Date;
        endDate: Date | null;
        checkoutDate: Date | null;
        bookingFee: import("@prisma/client/runtime/library").Decimal | null;
        bookingFeePaid: boolean;
        bookingSource: import(".prisma/client").$Enums.BookingSource;
        brokerName: string | null;
    })[]>;
    findPending(): Promise<({
        user: {
            dob: Date | null;
            phone: string;
            email: string | null;
            firstName: string;
            lastName: string;
            id: string;
            password: string | null;
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
            id: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            name: string;
            description: string | null;
            status: import(".prisma/client").$Enums.RoomStatus;
            type: import(".prisma/client").$Enums.RoomType;
            floor: number;
            area: number;
            rent: import("@prisma/client/runtime/library").Decimal;
            deposit: import("@prisma/client/runtime/library").Decimal;
            isAvailable: boolean;
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
                createdAt: Date;
                roomId: string;
                type: string;
                url: string;
            }[];
        };
        documents: {
            id: string;
            updatedAt: Date;
            deletedAt: Date | null;
            name: string;
            userId: string;
            status: import(".prisma/client").$Enums.DocumentStatus;
            type: import(".prisma/client").$Enums.DocumentType;
            bookingId: string | null;
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
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        moveInDate: Date | null;
        moveOutDate: Date | null;
        userId: string;
        expiresAt: Date | null;
        roomId: string;
        status: import(".prisma/client").$Enums.BookingStatus;
        startDate: Date;
        endDate: Date | null;
        checkoutDate: Date | null;
        bookingFee: import("@prisma/client/runtime/library").Decimal | null;
        bookingFeePaid: boolean;
        bookingSource: import(".prisma/client").$Enums.BookingSource;
        brokerName: string | null;
    })[]>;
    updateStatus(id: string, body: {
        status: string;
        comment?: string;
    }): Promise<{
        user: {
            dob: Date | null;
            phone: string;
            email: string | null;
            firstName: string;
            lastName: string;
            id: string;
            password: string | null;
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
            id: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            name: string;
            description: string | null;
            status: import(".prisma/client").$Enums.RoomStatus;
            type: import(".prisma/client").$Enums.RoomType;
            floor: number;
            area: number;
            rent: import("@prisma/client/runtime/library").Decimal;
            deposit: import("@prisma/client/runtime/library").Decimal;
            isAvailable: boolean;
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
                createdAt: Date;
                roomId: string;
                type: string;
                url: string;
            }[];
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        moveInDate: Date | null;
        moveOutDate: Date | null;
        userId: string;
        expiresAt: Date | null;
        roomId: string;
        status: import(".prisma/client").$Enums.BookingStatus;
        startDate: Date;
        endDate: Date | null;
        checkoutDate: Date | null;
        bookingFee: import("@prisma/client/runtime/library").Decimal | null;
        bookingFeePaid: boolean;
        bookingSource: import(".prisma/client").$Enums.BookingSource;
        brokerName: string | null;
    }>;
    approve(id: string): Promise<{
        user: {
            dob: Date | null;
            phone: string;
            email: string | null;
            firstName: string;
            lastName: string;
            id: string;
            password: string | null;
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
            id: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            name: string;
            description: string | null;
            status: import(".prisma/client").$Enums.RoomStatus;
            type: import(".prisma/client").$Enums.RoomType;
            floor: number;
            area: number;
            rent: import("@prisma/client/runtime/library").Decimal;
            deposit: import("@prisma/client/runtime/library").Decimal;
            isAvailable: boolean;
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
                createdAt: Date;
                roomId: string;
                type: string;
                url: string;
            }[];
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        moveInDate: Date | null;
        moveOutDate: Date | null;
        userId: string;
        expiresAt: Date | null;
        roomId: string;
        status: import(".prisma/client").$Enums.BookingStatus;
        startDate: Date;
        endDate: Date | null;
        checkoutDate: Date | null;
        bookingFee: import("@prisma/client/runtime/library").Decimal | null;
        bookingFeePaid: boolean;
        bookingSource: import(".prisma/client").$Enums.BookingSource;
        brokerName: string | null;
    }>;
    reject(id: string): Promise<{
        user: {
            dob: Date | null;
            phone: string;
            email: string | null;
            firstName: string;
            lastName: string;
            id: string;
            password: string | null;
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
            id: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            name: string;
            description: string | null;
            status: import(".prisma/client").$Enums.RoomStatus;
            type: import(".prisma/client").$Enums.RoomType;
            floor: number;
            area: number;
            rent: import("@prisma/client/runtime/library").Decimal;
            deposit: import("@prisma/client/runtime/library").Decimal;
            isAvailable: boolean;
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
                createdAt: Date;
                roomId: string;
                type: string;
                url: string;
            }[];
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        moveInDate: Date | null;
        moveOutDate: Date | null;
        userId: string;
        expiresAt: Date | null;
        roomId: string;
        status: import(".prisma/client").$Enums.BookingStatus;
        startDate: Date;
        endDate: Date | null;
        checkoutDate: Date | null;
        bookingFee: import("@prisma/client/runtime/library").Decimal | null;
        bookingFeePaid: boolean;
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
                createdAt: Date;
                updatedAt: Date;
                deletedAt: Date | null;
                name: string;
                description: string | null;
                status: import(".prisma/client").$Enums.RoomStatus;
                type: import(".prisma/client").$Enums.RoomType;
                floor: number;
                area: number;
                rent: import("@prisma/client/runtime/library").Decimal;
                deposit: import("@prisma/client/runtime/library").Decimal;
                isAvailable: boolean;
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
                    createdAt: Date;
                    roomId: string;
                    type: string;
                    url: string;
                }[];
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            moveInDate: Date | null;
            moveOutDate: Date | null;
            userId: string;
            expiresAt: Date | null;
            roomId: string;
            status: import(".prisma/client").$Enums.BookingStatus;
            startDate: Date;
            endDate: Date | null;
            checkoutDate: Date | null;
            bookingFee: import("@prisma/client/runtime/library").Decimal | null;
            bookingFeePaid: boolean;
            bookingSource: import(".prisma/client").$Enums.BookingSource;
            brokerName: string | null;
        };
        tenant: {
            dob: Date | null;
            phone: string;
            email: string | null;
            firstName: string;
            lastName: string;
            id: string;
            password: string | null;
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
        status: import(".prisma/client").$Enums.ExtensionRequestStatus;
        bookingId: string;
        tenantId: string;
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
                createdAt: Date;
                updatedAt: Date;
                deletedAt: Date | null;
                name: string;
                description: string | null;
                status: import(".prisma/client").$Enums.RoomStatus;
                type: import(".prisma/client").$Enums.RoomType;
                floor: number;
                area: number;
                rent: import("@prisma/client/runtime/library").Decimal;
                deposit: import("@prisma/client/runtime/library").Decimal;
                isAvailable: boolean;
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
                    createdAt: Date;
                    roomId: string;
                    type: string;
                    url: string;
                }[];
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            moveInDate: Date | null;
            moveOutDate: Date | null;
            userId: string;
            expiresAt: Date | null;
            roomId: string;
            status: import(".prisma/client").$Enums.BookingStatus;
            startDate: Date;
            endDate: Date | null;
            checkoutDate: Date | null;
            bookingFee: import("@prisma/client/runtime/library").Decimal | null;
            bookingFeePaid: boolean;
            bookingSource: import(".prisma/client").$Enums.BookingSource;
            brokerName: string | null;
        };
        tenant: {
            dob: Date | null;
            phone: string;
            email: string | null;
            firstName: string;
            lastName: string;
            id: string;
            password: string | null;
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
        status: import(".prisma/client").$Enums.ExtensionRequestStatus;
        bookingId: string;
        tenantId: string;
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
                dob: Date | null;
                phone: string;
                email: string | null;
                firstName: string;
                lastName: string;
                id: string;
                password: string | null;
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
                id: string;
                createdAt: Date;
                updatedAt: Date;
                deletedAt: Date | null;
                name: string;
                description: string | null;
                status: import(".prisma/client").$Enums.RoomStatus;
                type: import(".prisma/client").$Enums.RoomType;
                floor: number;
                area: number;
                rent: import("@prisma/client/runtime/library").Decimal;
                deposit: import("@prisma/client/runtime/library").Decimal;
                isAvailable: boolean;
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
                    createdAt: Date;
                    roomId: string;
                    type: string;
                    url: string;
                }[];
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            moveInDate: Date | null;
            moveOutDate: Date | null;
            userId: string;
            expiresAt: Date | null;
            roomId: string;
            status: import(".prisma/client").$Enums.BookingStatus;
            startDate: Date;
            endDate: Date | null;
            checkoutDate: Date | null;
            bookingFee: import("@prisma/client/runtime/library").Decimal | null;
            bookingFeePaid: boolean;
            bookingSource: import(".prisma/client").$Enums.BookingSource;
            brokerName: string | null;
        };
        tenant: {
            dob: Date | null;
            phone: string;
            email: string | null;
            firstName: string;
            lastName: string;
            id: string;
            password: string | null;
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
        status: import(".prisma/client").$Enums.ExtensionRequestStatus;
        bookingId: string;
        tenantId: string;
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
                createdAt: Date;
                updatedAt: Date;
                deletedAt: Date | null;
                name: string;
                description: string | null;
                status: import(".prisma/client").$Enums.RoomStatus;
                type: import(".prisma/client").$Enums.RoomType;
                floor: number;
                area: number;
                rent: import("@prisma/client/runtime/library").Decimal;
                deposit: import("@prisma/client/runtime/library").Decimal;
                isAvailable: boolean;
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
                    createdAt: Date;
                    roomId: string;
                    type: string;
                    url: string;
                }[];
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            moveInDate: Date | null;
            moveOutDate: Date | null;
            userId: string;
            expiresAt: Date | null;
            roomId: string;
            status: import(".prisma/client").$Enums.BookingStatus;
            startDate: Date;
            endDate: Date | null;
            checkoutDate: Date | null;
            bookingFee: import("@prisma/client/runtime/library").Decimal | null;
            bookingFeePaid: boolean;
            bookingSource: import(".prisma/client").$Enums.BookingSource;
            brokerName: string | null;
        };
        tenant: {
            dob: Date | null;
            phone: string;
            email: string | null;
            firstName: string;
            lastName: string;
            id: string;
            password: string | null;
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
        status: import(".prisma/client").$Enums.ExtensionRequestStatus;
        bookingId: string;
        tenantId: string;
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
                createdAt: Date;
                updatedAt: Date;
                deletedAt: Date | null;
                name: string;
                description: string | null;
                status: import(".prisma/client").$Enums.RoomStatus;
                type: import(".prisma/client").$Enums.RoomType;
                floor: number;
                area: number;
                rent: import("@prisma/client/runtime/library").Decimal;
                deposit: import("@prisma/client/runtime/library").Decimal;
                isAvailable: boolean;
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
                    createdAt: Date;
                    roomId: string;
                    type: string;
                    url: string;
                }[];
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            moveInDate: Date | null;
            moveOutDate: Date | null;
            userId: string;
            expiresAt: Date | null;
            roomId: string;
            status: import(".prisma/client").$Enums.BookingStatus;
            startDate: Date;
            endDate: Date | null;
            checkoutDate: Date | null;
            bookingFee: import("@prisma/client/runtime/library").Decimal | null;
            bookingFeePaid: boolean;
            bookingSource: import(".prisma/client").$Enums.BookingSource;
            brokerName: string | null;
        };
        tenant: {
            dob: Date | null;
            phone: string;
            email: string | null;
            firstName: string;
            lastName: string;
            id: string;
            password: string | null;
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
        status: import(".prisma/client").$Enums.ExtensionRequestStatus;
        bookingId: string;
        tenantId: string;
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
