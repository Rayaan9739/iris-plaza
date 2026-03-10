import { Prisma } from "@prisma/client";
import { PrismaService } from "@/prisma/prisma.service";
import { CreateRoomDto, UpdateRoomDto } from "./dto/room.dto";
export declare class RoomsService {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    private roomSafeSelect;
    private mapMediaToImageRows;
    private getPrimaryVideoUrl;
    private normalizeMediaInput;
    private buildAmenityCreateInput;
    private ensureRoomRulesTable;
    private setRules;
    private getRulesByRoomIds;
    refreshExpiredOccupancies(): Promise<void>;
    triggerOccupancyRefresh(): Promise<void>;
    findAll(): Promise<{
        rules: string[];
        type: import(".prisma/client").$Enums.RoomType;
        description: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        name: string;
        status: import(".prisma/client").$Enums.RoomStatus;
        floor: number;
        area: number;
        rent: Prisma.Decimal;
        deposit: Prisma.Decimal;
        isAvailable: boolean;
        occupiedFrom: Date | null;
        occupiedUntil: Date | null;
        videoUrl: string | null;
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
            roomId: string;
            url: string;
            caption: string | null;
            order: number;
            isPrimary: boolean;
        }[];
        media: {
            type: string;
            id: string;
            createdAt: Date;
            roomId: string;
            url: string;
        }[];
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
        status: import(".prisma/client").$Enums.RoomStatus;
        floor: number;
        area: number;
        rent: Prisma.Decimal;
        deposit: Prisma.Decimal;
        isAvailable: boolean;
        occupiedFrom: Date | null;
        occupiedUntil: Date | null;
        videoUrl: string | null;
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
            roomId: string;
            url: string;
            caption: string | null;
            order: number;
            isPrimary: boolean;
        }[];
        media: {
            type: string;
            id: string;
            createdAt: Date;
            roomId: string;
            url: string;
        }[];
    }>;
    create(createRoomDto: CreateRoomDto): Promise<{
        rules: string[];
        type: import(".prisma/client").$Enums.RoomType;
        description: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        name: string;
        status: import(".prisma/client").$Enums.RoomStatus;
        floor: number;
        area: number;
        rent: Prisma.Decimal;
        deposit: Prisma.Decimal;
        isAvailable: boolean;
        occupiedFrom: Date | null;
        occupiedUntil: Date | null;
        videoUrl: string | null;
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
            roomId: string;
            url: string;
            caption: string | null;
            order: number;
            isPrimary: boolean;
        }[];
        media: {
            type: string;
            id: string;
            createdAt: Date;
            roomId: string;
            url: string;
        }[];
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
        status: import(".prisma/client").$Enums.RoomStatus;
        floor: number;
        area: number;
        rent: Prisma.Decimal;
        deposit: Prisma.Decimal;
        isAvailable: boolean;
        occupiedFrom: Date | null;
        occupiedUntil: Date | null;
        videoUrl: string | null;
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
            roomId: string;
            url: string;
            caption: string | null;
            order: number;
            isPrimary: boolean;
        }[];
        media: {
            type: string;
            id: string;
            createdAt: Date;
            roomId: string;
            url: string;
        }[];
    }>;
    remove(id: string): Promise<{
        type: import(".prisma/client").$Enums.RoomType;
        description: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        name: string;
        status: import(".prisma/client").$Enums.RoomStatus;
        floor: number;
        area: number;
        rent: Prisma.Decimal;
        deposit: Prisma.Decimal;
        isAvailable: boolean;
        occupiedFrom: Date | null;
        occupiedUntil: Date | null;
        availableAt: Date | null;
        videoUrl: string | null;
    }>;
    delete(id: string): Promise<{
        type: import(".prisma/client").$Enums.RoomType;
        description: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        name: string;
        status: import(".prisma/client").$Enums.RoomStatus;
        floor: number;
        area: number;
        rent: Prisma.Decimal;
        deposit: Prisma.Decimal;
        isAvailable: boolean;
        occupiedFrom: Date | null;
        occupiedUntil: Date | null;
        availableAt: Date | null;
        videoUrl: string | null;
    }>;
    getAvailableRooms(): Promise<{
        rules: string[];
        type: import(".prisma/client").$Enums.RoomType;
        description: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        name: string;
        status: import(".prisma/client").$Enums.RoomStatus;
        floor: number;
        area: number;
        rent: Prisma.Decimal;
        deposit: Prisma.Decimal;
        isAvailable: boolean;
        occupiedFrom: Date | null;
        occupiedUntil: Date | null;
        videoUrl: string | null;
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
            roomId: string;
            url: string;
            caption: string | null;
            order: number;
            isPrimary: boolean;
        }[];
        media: {
            type: string;
            id: string;
            createdAt: Date;
            roomId: string;
            url: string;
        }[];
    }[]>;
}
