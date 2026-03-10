import { RoomsService } from "./rooms.service";
import { UpdateRoomDto } from "./dto/room.dto";
export declare class RoomsController {
    private readonly roomsService;
    constructor(roomsService: RoomsService);
    findAll(): Promise<{
        rules: string[];
        name: string;
        description: string | null;
        deletedAt: Date | null;
        status: import(".prisma/client").$Enums.RoomStatus;
        isAvailable: boolean;
        id: string;
        type: import(".prisma/client").$Enums.RoomType;
        createdAt: Date;
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
                name: string;
                description: string | null;
                id: string;
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
    getAvailableRooms(): Promise<{
        rules: string[];
        name: string;
        description: string | null;
        deletedAt: Date | null;
        status: import(".prisma/client").$Enums.RoomStatus;
        isAvailable: boolean;
        id: string;
        type: import(".prisma/client").$Enums.RoomType;
        createdAt: Date;
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
                name: string;
                description: string | null;
                id: string;
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
    findOne(id: string): Promise<{
        rules: string[];
        name: string;
        description: string | null;
        deletedAt: Date | null;
        status: import(".prisma/client").$Enums.RoomStatus;
        isAvailable: boolean;
        id: string;
        type: import(".prisma/client").$Enums.RoomType;
        createdAt: Date;
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
                name: string;
                description: string | null;
                id: string;
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
    }>;
    create(body: any): Promise<{
        rules: string[];
        name: string;
        description: string | null;
        deletedAt: Date | null;
        status: import(".prisma/client").$Enums.RoomStatus;
        isAvailable: boolean;
        id: string;
        type: import(".prisma/client").$Enums.RoomType;
        createdAt: Date;
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
                name: string;
                description: string | null;
                id: string;
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
    }>;
    update(id: string, updateRoomDto: UpdateRoomDto): Promise<{
        rules: string[];
        name: string;
        description: string | null;
        deletedAt: Date | null;
        status: import(".prisma/client").$Enums.RoomStatus;
        isAvailable: boolean;
        id: string;
        type: import(".prisma/client").$Enums.RoomType;
        createdAt: Date;
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
                name: string;
                description: string | null;
                id: string;
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
    }>;
    remove(id: string): Promise<{
        name: string;
        description: string | null;
        deletedAt: Date | null;
        status: import(".prisma/client").$Enums.RoomStatus;
        isAvailable: boolean;
        id: string;
        type: import(".prisma/client").$Enums.RoomType;
        createdAt: Date;
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
}
