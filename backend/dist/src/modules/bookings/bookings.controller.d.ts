import { BookingsService } from "./bookings.service";
import { CreateBookingDto } from "./dto/create-booking.dto";
export declare class BookingsController {
    private bookingsService;
    constructor(bookingsService: BookingsService);
    getMyBookings(req: any): Promise<({
        room: {
            id: string;
            status: import(".prisma/client").$Enums.RoomStatus;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            deletedAt: Date | null;
            type: import(".prisma/client").$Enums.RoomType;
            description: string | null;
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
            bookingId: string;
            status: import(".prisma/client").$Enums.BookingStatus;
            createdAt: Date;
            comment: string | null;
            changedBy: string | null;
        }[];
    } & {
        id: string;
        status: import(".prisma/client").$Enums.BookingStatus;
        startDate: Date;
        endDate: Date | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        roomId: string;
        moveInDate: Date | null;
        moveOutDate: Date | null;
        checkoutDate: Date | null;
        bookingFee: import("@prisma/client/runtime/library").Decimal | null;
        bookingFeePaid: boolean;
        expiresAt: Date | null;
        deletedAt: Date | null;
    })[]>;
    getMyBookingsAlias(req: any): Promise<{
        bookingId: string;
        moveInDate: Date;
        room: {
            rent: number;
            deposit: number;
            id: string;
            status: import(".prisma/client").$Enums.RoomStatus;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            deletedAt: Date | null;
            type: import(".prisma/client").$Enums.RoomType;
            description: string | null;
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
            bookingId: string;
            agreementUrl: string | null;
            status: import(".prisma/client").$Enums.AgreementStatus;
            tenantSigned: boolean;
            tenantSignedAt: Date | null;
            adminSigned: boolean;
            adminSignedAt: Date | null;
            startDate: Date;
            endDate: Date;
            monthlyRent: import("@prisma/client/runtime/library").Decimal;
            securityDeposit: import("@prisma/client/runtime/library").Decimal;
            createdAt: Date;
            updatedAt: Date;
        } | null;
        statusHistory: {
            id: string;
            bookingId: string;
            status: import(".prisma/client").$Enums.BookingStatus;
            createdAt: Date;
            comment: string | null;
            changedBy: string | null;
        }[];
        id: string;
        status: import(".prisma/client").$Enums.BookingStatus;
        startDate: Date;
        endDate: Date | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        roomId: string;
        moveOutDate: Date | null;
        checkoutDate: Date | null;
        bookingFee: import("@prisma/client/runtime/library").Decimal | null;
        bookingFeePaid: boolean;
        expiresAt: Date | null;
        deletedAt: Date | null;
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
            status: import(".prisma/client").$Enums.RoomStatus;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            deletedAt: Date | null;
            type: import(".prisma/client").$Enums.RoomType;
            description: string | null;
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
            id: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
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
            status: import(".prisma/client").$Enums.RoomStatus;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            deletedAt: Date | null;
            type: import(".prisma/client").$Enums.RoomType;
            description: string | null;
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
            bookingId: string;
            agreementUrl: string | null;
            status: import(".prisma/client").$Enums.AgreementStatus;
            tenantSigned: boolean;
            tenantSignedAt: Date | null;
            adminSigned: boolean;
            adminSignedAt: Date | null;
            startDate: Date;
            endDate: Date;
            monthlyRent: import("@prisma/client/runtime/library").Decimal;
            securityDeposit: import("@prisma/client/runtime/library").Decimal;
            createdAt: Date;
            updatedAt: Date;
        } | null;
        statusHistory: {
            id: string;
            bookingId: string;
            status: import(".prisma/client").$Enums.BookingStatus;
            createdAt: Date;
            comment: string | null;
            changedBy: string | null;
        }[];
        documents: {
            id: string;
            bookingId: string | null;
            status: import(".prisma/client").$Enums.DocumentStatus;
            updatedAt: Date;
            name: string;
            userId: string;
            deletedAt: Date | null;
            type: import(".prisma/client").$Enums.DocumentType;
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
            bookingId: string | null;
            status: import(".prisma/client").$Enums.PaymentStatus;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            roomId: string | null;
            type: import(".prisma/client").$Enums.PaymentType;
            description: string | null;
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
            invoiceUrl: string | null;
        }[];
        rentCycles: {
            id: string;
            bookingId: string;
            status: import(".prisma/client").$Enums.RentCycleStatus;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            amount: import("@prisma/client/runtime/library").Decimal;
            month: number;
            year: number;
            dueDate: Date;
            paidDate: Date | null;
            lateFee: import("@prisma/client/runtime/library").Decimal | null;
            lateFeeApplied: boolean;
        }[];
    } & {
        id: string;
        status: import(".prisma/client").$Enums.BookingStatus;
        startDate: Date;
        endDate: Date | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        roomId: string;
        moveInDate: Date | null;
        moveOutDate: Date | null;
        checkoutDate: Date | null;
        bookingFee: import("@prisma/client/runtime/library").Decimal | null;
        bookingFeePaid: boolean;
        expiresAt: Date | null;
        deletedAt: Date | null;
    }>;
    create(req: any, body: CreateBookingDto): Promise<({
        user: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
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
            status: import(".prisma/client").$Enums.RoomStatus;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            deletedAt: Date | null;
            type: import(".prisma/client").$Enums.RoomType;
            description: string | null;
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
            bookingId: string;
            status: import(".prisma/client").$Enums.BookingStatus;
            createdAt: Date;
            comment: string | null;
            changedBy: string | null;
        }[];
        documents: {
            id: string;
            bookingId: string | null;
            status: import(".prisma/client").$Enums.DocumentStatus;
            updatedAt: Date;
            name: string;
            userId: string;
            deletedAt: Date | null;
            type: import(".prisma/client").$Enums.DocumentType;
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
        status: import(".prisma/client").$Enums.BookingStatus;
        startDate: Date;
        endDate: Date | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        roomId: string;
        moveInDate: Date | null;
        moveOutDate: Date | null;
        checkoutDate: Date | null;
        bookingFee: import("@prisma/client/runtime/library").Decimal | null;
        bookingFeePaid: boolean;
        expiresAt: Date | null;
        deletedAt: Date | null;
    }) | null>;
    cancel(id: string): Promise<{
        room: {
            id: string;
            status: import(".prisma/client").$Enums.RoomStatus;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            deletedAt: Date | null;
            type: import(".prisma/client").$Enums.RoomType;
            description: string | null;
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
        status: import(".prisma/client").$Enums.BookingStatus;
        startDate: Date;
        endDate: Date | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        roomId: string;
        moveInDate: Date | null;
        moveOutDate: Date | null;
        checkoutDate: Date | null;
        bookingFee: import("@prisma/client/runtime/library").Decimal | null;
        bookingFeePaid: boolean;
        expiresAt: Date | null;
        deletedAt: Date | null;
    }>;
    findAll(): Promise<({
        user: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
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
            status: import(".prisma/client").$Enums.RoomStatus;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            deletedAt: Date | null;
            type: import(".prisma/client").$Enums.RoomType;
            description: string | null;
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
            bookingId: string;
            status: import(".prisma/client").$Enums.BookingStatus;
            createdAt: Date;
            comment: string | null;
            changedBy: string | null;
        }[];
    } & {
        id: string;
        status: import(".prisma/client").$Enums.BookingStatus;
        startDate: Date;
        endDate: Date | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        roomId: string;
        moveInDate: Date | null;
        moveOutDate: Date | null;
        checkoutDate: Date | null;
        bookingFee: import("@prisma/client/runtime/library").Decimal | null;
        bookingFeePaid: boolean;
        expiresAt: Date | null;
        deletedAt: Date | null;
    })[]>;
    findPending(): Promise<({
        user: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
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
            status: import(".prisma/client").$Enums.RoomStatus;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            deletedAt: Date | null;
            type: import(".prisma/client").$Enums.RoomType;
            description: string | null;
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
            bookingId: string | null;
            status: import(".prisma/client").$Enums.DocumentStatus;
            updatedAt: Date;
            name: string;
            userId: string;
            deletedAt: Date | null;
            type: import(".prisma/client").$Enums.DocumentType;
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
        status: import(".prisma/client").$Enums.BookingStatus;
        startDate: Date;
        endDate: Date | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        roomId: string;
        moveInDate: Date | null;
        moveOutDate: Date | null;
        checkoutDate: Date | null;
        bookingFee: import("@prisma/client/runtime/library").Decimal | null;
        bookingFeePaid: boolean;
        expiresAt: Date | null;
        deletedAt: Date | null;
    })[]>;
    updateStatus(id: string, body: {
        status: string;
        comment?: string;
    }): Promise<{
        user: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
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
            status: import(".prisma/client").$Enums.RoomStatus;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            deletedAt: Date | null;
            type: import(".prisma/client").$Enums.RoomType;
            description: string | null;
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
        status: import(".prisma/client").$Enums.BookingStatus;
        startDate: Date;
        endDate: Date | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        roomId: string;
        moveInDate: Date | null;
        moveOutDate: Date | null;
        checkoutDate: Date | null;
        bookingFee: import("@prisma/client/runtime/library").Decimal | null;
        bookingFeePaid: boolean;
        expiresAt: Date | null;
        deletedAt: Date | null;
    }>;
    approve(id: string): Promise<{
        user: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
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
            status: import(".prisma/client").$Enums.RoomStatus;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            deletedAt: Date | null;
            type: import(".prisma/client").$Enums.RoomType;
            description: string | null;
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
        status: import(".prisma/client").$Enums.BookingStatus;
        startDate: Date;
        endDate: Date | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        roomId: string;
        moveInDate: Date | null;
        moveOutDate: Date | null;
        checkoutDate: Date | null;
        bookingFee: import("@prisma/client/runtime/library").Decimal | null;
        bookingFeePaid: boolean;
        expiresAt: Date | null;
        deletedAt: Date | null;
    }>;
    reject(id: string): Promise<{
        user: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
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
            status: import(".prisma/client").$Enums.RoomStatus;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            deletedAt: Date | null;
            type: import(".prisma/client").$Enums.RoomType;
            description: string | null;
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
        status: import(".prisma/client").$Enums.BookingStatus;
        startDate: Date;
        endDate: Date | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        roomId: string;
        moveInDate: Date | null;
        moveOutDate: Date | null;
        checkoutDate: Date | null;
        bookingFee: import("@prisma/client/runtime/library").Decimal | null;
        bookingFeePaid: boolean;
        expiresAt: Date | null;
        deletedAt: Date | null;
    }>;
    createExtensionRequest(req: any, bookingId: string, body: {
        requestedCheckoutDate?: string;
        newMoveOutDate?: string;
    }): Promise<{
        booking: {
            room: {
                id: string;
                status: import(".prisma/client").$Enums.RoomStatus;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                deletedAt: Date | null;
                type: import(".prisma/client").$Enums.RoomType;
                description: string | null;
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
            status: import(".prisma/client").$Enums.BookingStatus;
            startDate: Date;
            endDate: Date | null;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            roomId: string;
            moveInDate: Date | null;
            moveOutDate: Date | null;
            checkoutDate: Date | null;
            bookingFee: import("@prisma/client/runtime/library").Decimal | null;
            bookingFeePaid: boolean;
            expiresAt: Date | null;
            deletedAt: Date | null;
        };
        tenant: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
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
        bookingId: string;
        status: import(".prisma/client").$Enums.ExtensionRequestStatus;
        createdAt: Date;
        updatedAt: Date;
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
                status: import(".prisma/client").$Enums.RoomStatus;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                deletedAt: Date | null;
                type: import(".prisma/client").$Enums.RoomType;
                description: string | null;
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
            status: import(".prisma/client").$Enums.BookingStatus;
            startDate: Date;
            endDate: Date | null;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            roomId: string;
            moveInDate: Date | null;
            moveOutDate: Date | null;
            checkoutDate: Date | null;
            bookingFee: import("@prisma/client/runtime/library").Decimal | null;
            bookingFeePaid: boolean;
            expiresAt: Date | null;
            deletedAt: Date | null;
        };
        tenant: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
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
        bookingId: string;
        status: import(".prisma/client").$Enums.ExtensionRequestStatus;
        createdAt: Date;
        updatedAt: Date;
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
                id: string;
                createdAt: Date;
                updatedAt: Date;
                deletedAt: Date | null;
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
                status: import(".prisma/client").$Enums.RoomStatus;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                deletedAt: Date | null;
                type: import(".prisma/client").$Enums.RoomType;
                description: string | null;
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
            status: import(".prisma/client").$Enums.BookingStatus;
            startDate: Date;
            endDate: Date | null;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            roomId: string;
            moveInDate: Date | null;
            moveOutDate: Date | null;
            checkoutDate: Date | null;
            bookingFee: import("@prisma/client/runtime/library").Decimal | null;
            bookingFeePaid: boolean;
            expiresAt: Date | null;
            deletedAt: Date | null;
        };
        tenant: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
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
        bookingId: string;
        status: import(".prisma/client").$Enums.ExtensionRequestStatus;
        createdAt: Date;
        updatedAt: Date;
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
                status: import(".prisma/client").$Enums.RoomStatus;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                deletedAt: Date | null;
                type: import(".prisma/client").$Enums.RoomType;
                description: string | null;
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
            status: import(".prisma/client").$Enums.BookingStatus;
            startDate: Date;
            endDate: Date | null;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            roomId: string;
            moveInDate: Date | null;
            moveOutDate: Date | null;
            checkoutDate: Date | null;
            bookingFee: import("@prisma/client/runtime/library").Decimal | null;
            bookingFeePaid: boolean;
            expiresAt: Date | null;
            deletedAt: Date | null;
        };
        tenant: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
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
        bookingId: string;
        status: import(".prisma/client").$Enums.ExtensionRequestStatus;
        createdAt: Date;
        updatedAt: Date;
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
                status: import(".prisma/client").$Enums.RoomStatus;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                deletedAt: Date | null;
                type: import(".prisma/client").$Enums.RoomType;
                description: string | null;
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
            status: import(".prisma/client").$Enums.BookingStatus;
            startDate: Date;
            endDate: Date | null;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            roomId: string;
            moveInDate: Date | null;
            moveOutDate: Date | null;
            checkoutDate: Date | null;
            bookingFee: import("@prisma/client/runtime/library").Decimal | null;
            bookingFeePaid: boolean;
            expiresAt: Date | null;
            deletedAt: Date | null;
        };
        tenant: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
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
        bookingId: string;
        status: import(".prisma/client").$Enums.ExtensionRequestStatus;
        createdAt: Date;
        updatedAt: Date;
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
