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
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        name: string;
        description: string | null;
        type: import(".prisma/client").$Enums.RoomType;
        floor: number;
        area: number;
        rent: Prisma.Decimal;
        deposit: Prisma.Decimal;
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
        rent: Prisma.Decimal;
        deposit: Prisma.Decimal;
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
    create(createRoomDto: CreateRoomDto): Promise<{
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
        rent: Prisma.Decimal;
        deposit: Prisma.Decimal;
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
        rent: Prisma.Decimal;
        deposit: Prisma.Decimal;
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
        rent: Prisma.Decimal;
        deposit: Prisma.Decimal;
        status: import(".prisma/client").$Enums.RoomStatus;
        isAvailable: boolean;
        occupiedFrom: Date | null;
        occupiedUntil: Date | null;
        availableAt: Date | null;
        videoUrl: string | null;
    }>;
    delete(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        name: string;
        description: string | null;
        type: import(".prisma/client").$Enums.RoomType;
        floor: number;
        area: number;
        rent: Prisma.Decimal;
        deposit: Prisma.Decimal;
        status: import(".prisma/client").$Enums.RoomStatus;
        isAvailable: boolean;
        occupiedFrom: Date | null;
        occupiedUntil: Date | null;
        availableAt: Date | null;
        videoUrl: string | null;
    }>;
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
        rent: Prisma.Decimal;
        deposit: Prisma.Decimal;
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
}
