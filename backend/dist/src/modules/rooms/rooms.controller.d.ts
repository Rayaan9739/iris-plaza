import { RoomsService } from "./rooms.service";
import { UpdateRoomDto } from "./dto/room.dto";
export declare class RoomsController {
    private readonly roomsService;
    constructor(roomsService: RoomsService);
    findAll(): Promise<{
        rules: string[];
        type: import(".prisma/client").$Enums.RoomType;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        name: string;
        videoUrl: string | null;
        media: {
            type: string;
            id: string;
            createdAt: Date;
            url: string;
            roomId: string;
        }[];
        floor: number;
        area: number;
        rent: import("@prisma/client/runtime/library").Decimal;
        deposit: import("@prisma/client/runtime/library").Decimal;
        amenities: ({
            amenity: {
                description: string | null;
                id: string;
                createdAt: Date;
                name: string;
                icon: string | null;
            };
        } & {
            id: string;
            roomId: string;
            amenityId: string;
        })[];
        status: import(".prisma/client").$Enums.RoomStatus;
        images: {
            id: string;
            createdAt: Date;
            url: string;
            caption: string | null;
            order: number;
            isPrimary: boolean;
            roomId: string;
        }[];
        isAvailable: boolean;
        occupiedUntil: Date | null;
        occupiedFrom: Date | null;
        managementRent: import("@prisma/client/runtime/library").Decimal | null;
        managementStatus: import(".prisma/client").$Enums.RoomStatus | null;
        managementIsAvailable: boolean | null;
        managementOccupiedUntil: Date | null;
    }[]>;
    getAvailableRooms(month?: string): Promise<{
        rent: import("@prisma/client/runtime/library").Decimal;
        status: import(".prisma/client").$Enums.RoomStatus;
        isAvailable: boolean;
        occupiedUntil: Date | null;
        availabilityStatus: "AVAILABLE" | "RESERVED" | "OCCUPIED" | "MAINTENANCE";
        availableFrom: string | null;
        rules: string[];
        type: import(".prisma/client").$Enums.RoomType;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        name: string;
        videoUrl: string | null;
        media: {
            type: string;
            id: string;
            createdAt: Date;
            url: string;
            roomId: string;
        }[];
        floor: number;
        area: number;
        deposit: import("@prisma/client/runtime/library").Decimal;
        amenities: ({
            amenity: {
                description: string | null;
                id: string;
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
            createdAt: Date;
            url: string;
            caption: string | null;
            order: number;
            isPrimary: boolean;
            roomId: string;
        }[];
        occupiedFrom: Date | null;
        managementRent: import("@prisma/client/runtime/library").Decimal | null;
        managementStatus: import(".prisma/client").$Enums.RoomStatus | null;
        managementIsAvailable: boolean | null;
        managementOccupiedUntil: Date | null;
    }[]>;
    findOccupiedRooms(): Promise<{
        rules: string[];
        type: import(".prisma/client").$Enums.RoomType;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        name: string;
        videoUrl: string | null;
        media: {
            type: string;
            id: string;
            createdAt: Date;
            url: string;
            roomId: string;
        }[];
        floor: number;
        area: number;
        rent: import("@prisma/client/runtime/library").Decimal;
        deposit: import("@prisma/client/runtime/library").Decimal;
        amenities: ({
            amenity: {
                description: string | null;
                id: string;
                createdAt: Date;
                name: string;
                icon: string | null;
            };
        } & {
            id: string;
            roomId: string;
            amenityId: string;
        })[];
        status: import(".prisma/client").$Enums.RoomStatus;
        images: {
            id: string;
            createdAt: Date;
            url: string;
            caption: string | null;
            order: number;
            isPrimary: boolean;
            roomId: string;
        }[];
        isAvailable: boolean;
        occupiedUntil: Date | null;
        occupiedFrom: Date | null;
        managementRent: import("@prisma/client/runtime/library").Decimal | null;
        managementStatus: import(".prisma/client").$Enums.RoomStatus | null;
        managementIsAvailable: boolean | null;
        managementOccupiedUntil: Date | null;
    }[]>;
    findOne(id: string): Promise<{
        rules: string[];
        type: import(".prisma/client").$Enums.RoomType;
        description: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        name: string;
        videoUrl: string | null;
        media: {
            type: string;
            id: string;
            createdAt: Date;
            url: string;
            roomId: string;
        }[];
        floor: number;
        area: number;
        rent: import("@prisma/client/runtime/library").Decimal;
        deposit: import("@prisma/client/runtime/library").Decimal;
        amenities: ({
            amenity: {
                description: string | null;
                id: string;
                createdAt: Date;
                name: string;
                icon: string | null;
            };
        } & {
            id: string;
            roomId: string;
            amenityId: string;
        })[];
        status: import(".prisma/client").$Enums.RoomStatus;
        images: {
            id: string;
            createdAt: Date;
            url: string;
            caption: string | null;
            order: number;
            isPrimary: boolean;
            roomId: string;
        }[];
        isAvailable: boolean;
        occupiedUntil: Date | null;
        occupiedFrom: Date | null;
    }>;
    create(body: any): Promise<{
        rules: string[];
        type: import(".prisma/client").$Enums.RoomType;
        description: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        name: string;
        videoUrl: string | null;
        media: {
            type: string;
            id: string;
            createdAt: Date;
            url: string;
            roomId: string;
        }[];
        floor: number;
        area: number;
        rent: import("@prisma/client/runtime/library").Decimal;
        deposit: import("@prisma/client/runtime/library").Decimal;
        amenities: ({
            amenity: {
                description: string | null;
                id: string;
                createdAt: Date;
                name: string;
                icon: string | null;
            };
        } & {
            id: string;
            roomId: string;
            amenityId: string;
        })[];
        status: import(".prisma/client").$Enums.RoomStatus;
        images: {
            id: string;
            createdAt: Date;
            url: string;
            caption: string | null;
            order: number;
            isPrimary: boolean;
            roomId: string;
        }[];
        isAvailable: boolean;
        occupiedUntil: Date | null;
        occupiedFrom: Date | null;
    }>;
    update(id: string, updateRoomDto: UpdateRoomDto): Promise<{
        rules: string[];
        type: import(".prisma/client").$Enums.RoomType;
        description: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        name: string;
        videoUrl: string | null;
        media: {
            type: string;
            id: string;
            createdAt: Date;
            url: string;
            roomId: string;
        }[];
        floor: number;
        area: number;
        rent: import("@prisma/client/runtime/library").Decimal;
        deposit: import("@prisma/client/runtime/library").Decimal;
        amenities: ({
            amenity: {
                description: string | null;
                id: string;
                createdAt: Date;
                name: string;
                icon: string | null;
            };
        } & {
            id: string;
            roomId: string;
            amenityId: string;
        })[];
        status: import(".prisma/client").$Enums.RoomStatus;
        images: {
            id: string;
            createdAt: Date;
            url: string;
            caption: string | null;
            order: number;
            isPrimary: boolean;
            roomId: string;
        }[];
        isAvailable: boolean;
        occupiedUntil: Date | null;
        occupiedFrom: Date | null;
    } | {
        booking: {
            id: string;
            moveInDate: Date | null;
            moveOutDate: Date | null;
            userId: string;
            status: import(".prisma/client").$Enums.BookingStatus;
            bookingSource: import(".prisma/client").$Enums.BookingSource;
            brokerName: string | null;
            roomId: string;
        };
        user: {
            phone: string;
            email: string | null;
            firstName: string;
            lastName: string;
            dob: Date | null;
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
        message: string;
        media?: {
            type: string;
            id: string;
            createdAt: Date;
            url: string;
            roomId: string;
        }[] | undefined;
        amenities?: ({
            amenity: {
                description: string | null;
                id: string;
                createdAt: Date;
                name: string;
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
            url: string;
            caption: string | null;
            order: number;
            isPrimary: boolean;
            roomId: string;
        }[] | undefined;
        type?: import(".prisma/client").$Enums.RoomType | undefined;
        description?: string | null | undefined;
        id?: string | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
        deletedAt?: Date | null | undefined;
        name?: string | undefined;
        videoUrl?: string | null | undefined;
        floor?: number | undefined;
        area?: number | undefined;
        rent?: import("@prisma/client/runtime/library").Decimal | undefined;
        deposit?: import("@prisma/client/runtime/library").Decimal | undefined;
        status?: import(".prisma/client").$Enums.RoomStatus | undefined;
        isAvailable?: boolean | undefined;
        occupiedUntil?: Date | null | undefined;
        occupiedFrom?: Date | null | undefined;
        availableAt?: Date | null | undefined;
        managementRent?: import("@prisma/client/runtime/library").Decimal | null | undefined;
        managementStatus?: import(".prisma/client").$Enums.RoomStatus | null | undefined;
        managementIsAvailable?: boolean | null | undefined;
        managementOccupiedUntil?: Date | null | undefined;
    }>;
    remove(id: string): Promise<{
        type: import(".prisma/client").$Enums.RoomType;
        description: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        name: string;
        videoUrl: string | null;
        floor: number;
        area: number;
        rent: import("@prisma/client/runtime/library").Decimal;
        deposit: import("@prisma/client/runtime/library").Decimal;
        status: import(".prisma/client").$Enums.RoomStatus;
        isAvailable: boolean;
        occupiedUntil: Date | null;
        occupiedFrom: Date | null;
        availableAt: Date | null;
        managementRent: import("@prisma/client/runtime/library").Decimal | null;
        managementStatus: import(".prisma/client").$Enums.RoomStatus | null;
        managementIsAvailable: boolean | null;
        managementOccupiedUntil: Date | null;
    }>;
}
