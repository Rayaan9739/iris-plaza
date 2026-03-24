import { AdminService } from "./admin.service";
import { RoomsService } from "@/modules/rooms/rooms.service";
import { BookingsService } from "@/modules/bookings/bookings.service";
import { CloudinaryService } from "@/common/services/cloudinary.service";
export declare class AdminController {
    private readonly adminService;
    private readonly roomsService;
    private readonly bookingsService;
    private readonly cloudinaryService;
    constructor(adminService: AdminService, roomsService: RoomsService, bookingsService: BookingsService, cloudinaryService: CloudinaryService);
    private executeAdminAction;
    getDashboard(): Promise<{
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
    getStats(): Promise<{
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
    getRooms(): Promise<{
        id: string;
        name: string;
        type: import(".prisma/client").$Enums.RoomType;
        description: string | null;
        floor: number;
        area: number;
        rent: import("@prisma/client/runtime/library").Decimal;
        deposit: import("@prisma/client/runtime/library").Decimal;
        status: import(".prisma/client").$Enums.RoomStatus;
        isAvailable: boolean;
        occupiedFrom: Date | null;
        occupiedUntil: Date | null;
        availableAt: Date | null;
        videoUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        amenities: ({
            amenity: {
                id: string;
                name: string;
                description: string | null;
                createdAt: Date;
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
    getRoom(id: string): Promise<{
        amenities: ({
            amenity: {
                id: string;
                name: string;
                description: string | null;
                createdAt: Date;
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
        name: string;
        type: import(".prisma/client").$Enums.RoomType;
        description: string | null;
        floor: number;
        area: number;
        rent: import("@prisma/client/runtime/library").Decimal;
        deposit: import("@prisma/client/runtime/library").Decimal;
        status: import(".prisma/client").$Enums.RoomStatus;
        isAvailable: boolean;
        occupiedFrom: Date | null;
        occupiedUntil: Date | null;
        availableAt: Date | null;
        videoUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }>;
    getAmenities(): Promise<{
        id: string;
        name: string;
    }[]>;
    createAmenity(body: {
        name?: string;
    }): Promise<{
        id: string;
        name: string;
    }>;
    deleteAmenity(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
    getBookings(): Promise<{
        room: {
            status: import(".prisma/client").$Enums.RoomStatus;
            isAvailable: boolean;
            id: string;
            name: string;
            type: import(".prisma/client").$Enums.RoomType;
            description: string | null;
            floor: number;
            area: number;
            rent: import("@prisma/client/runtime/library").Decimal;
            deposit: import("@prisma/client/runtime/library").Decimal;
            occupiedFrom: Date | null;
            occupiedUntil: Date | null;
            availableAt: Date | null;
            videoUrl: string | null;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            amenities: ({
                amenity: {
                    id: string;
                    name: string;
                    description: string | null;
                    createdAt: Date;
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
        bookingSource: import(".prisma/client").$Enums.BookingSource;
        brokerName: string | null;
        statusHistory: {
            id: string;
            status: import(".prisma/client").$Enums.BookingStatus;
            createdAt: Date;
            bookingId: string;
            comment: string | null;
            changedBy: string | null;
        }[];
        user: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            email: string | null;
            phone: string;
            password: string | null;
            dob: Date | null;
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
        documents: {
            id: string;
            name: string;
            type: import(".prisma/client").$Enums.DocumentType;
            status: import(".prisma/client").$Enums.DocumentStatus;
            updatedAt: Date;
            deletedAt: Date | null;
            userId: string;
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
        id: string;
        status: import(".prisma/client").$Enums.BookingStatus;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        roomId: string;
        userId: string;
        startDate: Date;
        endDate: Date | null;
        moveInDate: Date | null;
        moveOutDate: Date | null;
        checkoutDate: Date | null;
        bookingFee: import("@prisma/client/runtime/library").Decimal | null;
        bookingFeePaid: boolean;
        expiresAt: Date | null;
    }[]>;
    approveBooking(id: string): Promise<{
        room: {
            id: string;
            name: string;
            type: import(".prisma/client").$Enums.RoomType;
            description: string | null;
            floor: number;
            area: number;
            rent: import("@prisma/client/runtime/library").Decimal;
            deposit: import("@prisma/client/runtime/library").Decimal;
            status: import(".prisma/client").$Enums.RoomStatus;
            isAvailable: boolean;
            occupiedFrom: Date | null;
            occupiedUntil: Date | null;
            videoUrl: string | null;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            amenities: ({
                amenity: {
                    id: string;
                    name: string;
                    description: string | null;
                    createdAt: Date;
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
        user: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            email: string | null;
            phone: string;
            password: string | null;
            dob: Date | null;
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
        status: import(".prisma/client").$Enums.BookingStatus;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        roomId: string;
        userId: string;
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
    rejectBooking(id: string): Promise<{
        room: {
            id: string;
            name: string;
            type: import(".prisma/client").$Enums.RoomType;
            description: string | null;
            floor: number;
            area: number;
            rent: import("@prisma/client/runtime/library").Decimal;
            deposit: import("@prisma/client/runtime/library").Decimal;
            status: import(".prisma/client").$Enums.RoomStatus;
            isAvailable: boolean;
            occupiedFrom: Date | null;
            occupiedUntil: Date | null;
            videoUrl: string | null;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            amenities: ({
                amenity: {
                    id: string;
                    name: string;
                    description: string | null;
                    createdAt: Date;
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
        user: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            email: string | null;
            phone: string;
            password: string | null;
            dob: Date | null;
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
        status: import(".prisma/client").$Enums.BookingStatus;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        roomId: string;
        userId: string;
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
    getTenants(): Promise<{
        id: string;
        bookingId: string;
        userId: string;
        name: string;
        phone: string;
        email: string | null;
        room: {
            status: import(".prisma/client").$Enums.RoomStatus;
            isAvailable: boolean;
            id: string;
            name: string;
            type: import(".prisma/client").$Enums.RoomType;
            description: string | null;
            floor: number;
            area: number;
            rent: import("@prisma/client/runtime/library").Decimal;
            deposit: import("@prisma/client/runtime/library").Decimal;
            occupiedFrom: Date | null;
            occupiedUntil: Date | null;
            availableAt: Date | null;
            videoUrl: string | null;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            amenities: ({
                amenity: {
                    id: string;
                    name: string;
                    description: string | null;
                    createdAt: Date;
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
            updatedAt: Date;
            deletedAt: Date | null;
            email: string | null;
            phone: string;
            password: string | null;
            dob: Date | null;
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
        bookingSource: import(".prisma/client").$Enums.BookingSource;
        brokerName: string | null;
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
    updateTenant(userId: string, body: {
        firstName?: string;
        lastName?: string;
        phone?: string;
        updateRoomId?: string;
        newRoomId?: string;
        roomChangeDate?: string;
        extendOccupiedUntil?: string;
        newRent?: number;
        bookingSource?: string;
        brokerName?: string;
    }): Promise<{
        success: boolean;
        user: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            email: string | null;
            phone: string;
            password: string | null;
            dob: Date | null;
            role: import(".prisma/client").$Enums.UserRole;
            firstName: string;
            lastName: string;
            isActive: boolean;
            isApproved: boolean;
            accountStatus: import(".prisma/client").$Enums.AccountStatus;
            isEmailVerified: boolean;
            isPhoneVerified: boolean;
            emailVerifyToken: string | null;
        } | null;
        room: {
            id: string;
            name: string;
            type: import(".prisma/client").$Enums.RoomType;
            floor: number;
            area: number;
            rent: import("@prisma/client/runtime/library").Decimal;
            deposit: import("@prisma/client/runtime/library").Decimal;
            status: import(".prisma/client").$Enums.RoomStatus;
            isAvailable: boolean;
            occupiedFrom: Date | null;
            occupiedUntil: Date | null;
            availableAt: Date | null;
            videoUrl: string | null;
        } | undefined;
        booking: ({
            room: {
                id: string;
                name: string;
                type: import(".prisma/client").$Enums.RoomType;
                floor: number;
                area: number;
                rent: import("@prisma/client/runtime/library").Decimal;
                deposit: import("@prisma/client/runtime/library").Decimal;
                status: import(".prisma/client").$Enums.RoomStatus;
                isAvailable: boolean;
                occupiedFrom: Date | null;
                occupiedUntil: Date | null;
                availableAt: Date | null;
                videoUrl: string | null;
            };
        } & {
            id: string;
            status: import(".prisma/client").$Enums.BookingStatus;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            roomId: string;
            userId: string;
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
        scheduledTransfer: {
            id: string;
            bookingId: string;
            fromRoomId: string;
            toRoomId: string;
            effectiveDate: Date;
            status: string;
        } | null;
        message: string;
    }>;
    getPayments(): Promise<any[]>;
    markPaymentAsReceived(id: string, body: {
        amountReceived?: number;
        note?: string;
        paymentMethod?: string;
    }): Promise<any>;
    getDocuments(): Promise<({
        booking: ({
            room: {
                id: string;
                name: string;
                type: import(".prisma/client").$Enums.RoomType;
                description: string | null;
                floor: number;
                area: number;
                rent: import("@prisma/client/runtime/library").Decimal;
                deposit: import("@prisma/client/runtime/library").Decimal;
                status: import(".prisma/client").$Enums.RoomStatus;
                isAvailable: boolean;
                occupiedFrom: Date | null;
                occupiedUntil: Date | null;
                availableAt: Date | null;
                videoUrl: string | null;
                createdAt: Date;
                updatedAt: Date;
                deletedAt: Date | null;
                amenities: ({
                    amenity: {
                        id: string;
                        name: string;
                        description: string | null;
                        createdAt: Date;
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
            status: import(".prisma/client").$Enums.BookingStatus;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            roomId: string;
            userId: string;
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
        user: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            email: string | null;
            phone: string;
            password: string | null;
            dob: Date | null;
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
        name: string;
        type: import(".prisma/client").$Enums.DocumentType;
        status: import(".prisma/client").$Enums.DocumentStatus;
        updatedAt: Date;
        deletedAt: Date | null;
        userId: string;
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
    })[]>;
    approveDocument(id: string): Promise<{
        id: string;
        name: string;
        type: import(".prisma/client").$Enums.DocumentType;
        status: import(".prisma/client").$Enums.DocumentStatus;
        updatedAt: Date;
        deletedAt: Date | null;
        userId: string;
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
    }>;
    rejectDocument(id: string): Promise<{
        id: string;
        name: string;
        type: import(".prisma/client").$Enums.DocumentType;
        status: import(".prisma/client").$Enums.DocumentStatus;
        updatedAt: Date;
        deletedAt: Date | null;
        userId: string;
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
    }>;
    getMaintenanceRequests(): Promise<any[]>;
    approveMaintenanceRequest(id: string): Promise<{
        status: string;
        id: string;
        description: string;
        createdAt: Date;
        updatedAt: Date;
        tenantId: string;
        bookingId: string | null;
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
        description: string;
        createdAt: Date;
        updatedAt: Date;
        tenantId: string;
        bookingId: string | null;
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
                id: string;
                status: import(".prisma/client").$Enums.BookingStatus;
                createdAt: Date;
                updatedAt: Date;
                deletedAt: Date | null;
                roomId: string;
                userId: string;
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
            user: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                deletedAt: Date | null;
                email: string | null;
                phone: string;
                password: string | null;
                dob: Date | null;
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
            name: string;
            type: import(".prisma/client").$Enums.DocumentType;
            status: import(".prisma/client").$Enums.DocumentStatus;
            updatedAt: Date;
            deletedAt: Date | null;
            userId: string;
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
        })[];
        bookings: ({
            room: {
                id: string;
                name: string;
                type: import(".prisma/client").$Enums.RoomType;
                description: string | null;
                floor: number;
                area: number;
                rent: import("@prisma/client/runtime/library").Decimal;
                deposit: import("@prisma/client/runtime/library").Decimal;
                status: import(".prisma/client").$Enums.RoomStatus;
                isAvailable: boolean;
                occupiedFrom: Date | null;
                occupiedUntil: Date | null;
                availableAt: Date | null;
                videoUrl: string | null;
                createdAt: Date;
                updatedAt: Date;
                deletedAt: Date | null;
                amenities: ({
                    amenity: {
                        id: string;
                        name: string;
                        description: string | null;
                        createdAt: Date;
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
            user: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                deletedAt: Date | null;
                email: string | null;
                phone: string;
                password: string | null;
                dob: Date | null;
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
            documents: {
                id: string;
                name: string;
                type: import(".prisma/client").$Enums.DocumentType;
                status: import(".prisma/client").$Enums.DocumentStatus;
                updatedAt: Date;
                deletedAt: Date | null;
                userId: string;
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
            status: import(".prisma/client").$Enums.BookingStatus;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            roomId: string;
            userId: string;
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
                createdAt: Date;
                updatedAt: Date;
                userId: string;
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
            updatedAt: Date;
            deletedAt: Date | null;
            email: string | null;
            phone: string;
            password: string | null;
            dob: Date | null;
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
    createRoom(files: Express.Multer.File[], body: Record<string, any>, _req: any): Promise<{
        rules: string[];
        id: string;
        name: string;
        type: import(".prisma/client").$Enums.RoomType;
        description: string | null;
        floor: number;
        area: number;
        rent: import("@prisma/client/runtime/library").Decimal;
        deposit: import("@prisma/client/runtime/library").Decimal;
        status: import(".prisma/client").$Enums.RoomStatus;
        isAvailable: boolean;
        occupiedFrom: Date | null;
        occupiedUntil: Date | null;
        videoUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        amenities: ({
            amenity: {
                id: string;
                name: string;
                description: string | null;
                createdAt: Date;
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
    }>;
    updateRoom(id: string, files: Express.Multer.File[], body: Record<string, any>, _req: any): Promise<{
        rules: string[];
        id: string;
        name: string;
        type: import(".prisma/client").$Enums.RoomType;
        description: string | null;
        floor: number;
        area: number;
        rent: import("@prisma/client/runtime/library").Decimal;
        deposit: import("@prisma/client/runtime/library").Decimal;
        status: import(".prisma/client").$Enums.RoomStatus;
        isAvailable: boolean;
        occupiedFrom: Date | null;
        occupiedUntil: Date | null;
        videoUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        amenities: ({
            amenity: {
                id: string;
                name: string;
                description: string | null;
                createdAt: Date;
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
    } | {
        booking: {
            id: string;
            status: import(".prisma/client").$Enums.BookingStatus;
            roomId: string;
            userId: string;
            moveInDate: Date | null;
            moveOutDate: Date | null;
            bookingSource: import(".prisma/client").$Enums.BookingSource;
            brokerName: string | null;
        };
        user: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            email: string | null;
            phone: string;
            password: string | null;
            dob: Date | null;
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
        message: string;
        amenities?: ({
            amenity: {
                id: string;
                name: string;
                description: string | null;
                createdAt: Date;
                icon: string | null;
            };
        } & {
            id: string;
            roomId: string;
            amenityId: string;
        })[] | undefined;
        images?: {
            id: string;
            createdAt: Date;
            roomId: string;
            url: string;
            caption: string | null;
            isPrimary: boolean;
            order: number;
        }[] | undefined;
        media?: {
            id: string;
            type: string;
            createdAt: Date;
            roomId: string;
            url: string;
        }[] | undefined;
        id?: string | undefined;
        name?: string | undefined;
        type?: import(".prisma/client").$Enums.RoomType | undefined;
        description?: string | null | undefined;
        floor?: number | undefined;
        area?: number | undefined;
        rent?: import("@prisma/client/runtime/library").Decimal | undefined;
        deposit?: import("@prisma/client/runtime/library").Decimal | undefined;
        status?: import(".prisma/client").$Enums.RoomStatus | undefined;
        isAvailable?: boolean | undefined;
        occupiedFrom?: Date | null | undefined;
        occupiedUntil?: Date | null | undefined;
        availableAt?: Date | null | undefined;
        videoUrl?: string | null | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
        deletedAt?: Date | null | undefined;
    }>;
    patchRoom(id: string, files: Express.Multer.File[], body: Record<string, any>, _req: any): Promise<{
        rules: string[];
        id: string;
        name: string;
        type: import(".prisma/client").$Enums.RoomType;
        description: string | null;
        floor: number;
        area: number;
        rent: import("@prisma/client/runtime/library").Decimal;
        deposit: import("@prisma/client/runtime/library").Decimal;
        status: import(".prisma/client").$Enums.RoomStatus;
        isAvailable: boolean;
        occupiedFrom: Date | null;
        occupiedUntil: Date | null;
        videoUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        amenities: ({
            amenity: {
                id: string;
                name: string;
                description: string | null;
                createdAt: Date;
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
    } | {
        booking: {
            id: string;
            status: import(".prisma/client").$Enums.BookingStatus;
            roomId: string;
            userId: string;
            moveInDate: Date | null;
            moveOutDate: Date | null;
            bookingSource: import(".prisma/client").$Enums.BookingSource;
            brokerName: string | null;
        };
        user: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            email: string | null;
            phone: string;
            password: string | null;
            dob: Date | null;
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
        message: string;
        amenities?: ({
            amenity: {
                id: string;
                name: string;
                description: string | null;
                createdAt: Date;
                icon: string | null;
            };
        } & {
            id: string;
            roomId: string;
            amenityId: string;
        })[] | undefined;
        images?: {
            id: string;
            createdAt: Date;
            roomId: string;
            url: string;
            caption: string | null;
            isPrimary: boolean;
            order: number;
        }[] | undefined;
        media?: {
            id: string;
            type: string;
            createdAt: Date;
            roomId: string;
            url: string;
        }[] | undefined;
        id?: string | undefined;
        name?: string | undefined;
        type?: import(".prisma/client").$Enums.RoomType | undefined;
        description?: string | null | undefined;
        floor?: number | undefined;
        area?: number | undefined;
        rent?: import("@prisma/client/runtime/library").Decimal | undefined;
        deposit?: import("@prisma/client/runtime/library").Decimal | undefined;
        status?: import(".prisma/client").$Enums.RoomStatus | undefined;
        isAvailable?: boolean | undefined;
        occupiedFrom?: Date | null | undefined;
        occupiedUntil?: Date | null | undefined;
        availableAt?: Date | null | undefined;
        videoUrl?: string | null | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
        deletedAt?: Date | null | undefined;
    }>;
    deleteRoom(id: string): Promise<{
        message: string;
        room: {
            id: string;
            name: string;
            type: import(".prisma/client").$Enums.RoomType;
            description: string | null;
            floor: number;
            area: number;
            rent: import("@prisma/client/runtime/library").Decimal;
            deposit: import("@prisma/client/runtime/library").Decimal;
            status: import(".prisma/client").$Enums.RoomStatus;
            isAvailable: boolean;
            occupiedFrom: Date | null;
            occupiedUntil: Date | null;
            availableAt: Date | null;
            videoUrl: string | null;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
        };
    }>;
    uploadRoomVideo(file: Express.Multer.File): Promise<{
        message: string;
        videoUrl: string;
    }>;
    approveTenant(userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        email: string | null;
        phone: string;
        password: string | null;
        dob: Date | null;
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
        updatedAt: Date;
        deletedAt: Date | null;
        email: string | null;
        phone: string;
        password: string | null;
        dob: Date | null;
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
        updatedAt: Date;
        deletedAt: Date | null;
        email: string | null;
        phone: string;
        password: string | null;
        dob: Date | null;
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
