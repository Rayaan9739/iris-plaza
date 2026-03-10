import { RoomsService } from "./rooms.service";
import { UpdateRoomDto } from "./dto/room.dto";
export declare class RoomsController {
    private readonly roomsService;
    constructor(roomsService: RoomsService);
    findAll(): Promise<{
        rules: string[];
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        name: string;
        description: string | null;
        type: import(".prisma/client").$Enums.RoomType;
        floor: number;
        area: number;
        rent: import("@prisma/client/runtime/library").Decimal;
        deposit: import("@prisma/client/runtime/library").Decimal;
        status: import(".prisma/client").$Enums.RoomStatus;
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
            type: string;
            roomId: string;
            url: string;
        }[];
    }[]>;
    getAvailableRooms(): Promise<{
        rules: string[];
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        name: string;
        description: string | null;
        type: import(".prisma/client").$Enums.RoomType;
        floor: number;
        area: number;
        rent: import("@prisma/client/runtime/library").Decimal;
        deposit: import("@prisma/client/runtime/library").Decimal;
        status: import(".prisma/client").$Enums.RoomStatus;
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
            type: string;
            roomId: string;
            url: string;
        }[];
    }[]>;
    findOne(id: string): Promise<{
        rules: string[];
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        name: string;
        description: string | null;
        type: import(".prisma/client").$Enums.RoomType;
        floor: number;
        area: number;
        rent: import("@prisma/client/runtime/library").Decimal;
        deposit: import("@prisma/client/runtime/library").Decimal;
        status: import(".prisma/client").$Enums.RoomStatus;
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
            type: string;
            roomId: string;
            url: string;
        }[];
    }>;
    create(file: Express.Multer.File, body: any, req: any): Promise<{
        rules: string[];
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        name: string;
        description: string | null;
        type: import(".prisma/client").$Enums.RoomType;
        floor: number;
        area: number;
        rent: import("@prisma/client/runtime/library").Decimal;
        deposit: import("@prisma/client/runtime/library").Decimal;
        status: import(".prisma/client").$Enums.RoomStatus;
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
            type: string;
            roomId: string;
            url: string;
        }[];
    }>;
    update(id: string, updateRoomDto: UpdateRoomDto): Promise<{
        rules: string[];
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        name: string;
        description: string | null;
        type: import(".prisma/client").$Enums.RoomType;
        floor: number;
        area: number;
        rent: import("@prisma/client/runtime/library").Decimal;
        deposit: import("@prisma/client/runtime/library").Decimal;
        status: import(".prisma/client").$Enums.RoomStatus;
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
            type: string;
            roomId: string;
            url: string;
        }[];
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        name: string;
        description: string | null;
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
    }>;
}
