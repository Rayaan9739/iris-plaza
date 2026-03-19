import { Prisma } from "@prisma/client";
import { PrismaService } from "@/prisma/prisma.service";
import { CreateRoomDto, UpdateRoomDto } from "./dto/room.dto";
export declare class RoomsService {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    private toStartOfUtcDay;
    private normalizeRoomType;
    private parseSelectedMonthStart;
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
        name: string;
        type: import(".prisma/client").$Enums.RoomType;
        description: string | null;
        floor: number;
        area: number;
        rent: Prisma.Decimal;
        deposit: Prisma.Decimal;
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
    }[]>;
    findOne(id: string): Promise<{
        rules: string[];
        id: string;
        name: string;
        type: import(".prisma/client").$Enums.RoomType;
        description: string | null;
        floor: number;
        area: number;
        rent: Prisma.Decimal;
        deposit: Prisma.Decimal;
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
    create(createRoomDto: CreateRoomDto): Promise<{
        rules: string[];
        id: string;
        name: string;
        type: import(".prisma/client").$Enums.RoomType;
        description: string | null;
        floor: number;
        area: number;
        rent: Prisma.Decimal;
        deposit: Prisma.Decimal;
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
    update(id: string, updateRoomDto: UpdateRoomDto): Promise<{
        rules: string[];
        id: string;
        name: string;
        type: import(".prisma/client").$Enums.RoomType;
        description: string | null;
        floor: number;
        area: number;
        rent: Prisma.Decimal;
        deposit: Prisma.Decimal;
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
    remove(id: string): Promise<{
        id: string;
        name: string;
        type: import(".prisma/client").$Enums.RoomType;
        description: string | null;
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
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }>;
    delete(id: string): Promise<{
        id: string;
        name: string;
        type: import(".prisma/client").$Enums.RoomType;
        description: string | null;
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
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }>;
    getAvailableRooms(selectedMonth?: string): Promise<{
        availabilityStatus: "AVAILABLE" | "RESERVED" | "OCCUPIED" | "MAINTENANCE";
        availableFrom: string | null;
        rules: string[];
        id: string;
        name: string;
        type: import(".prisma/client").$Enums.RoomType;
        description: string | null;
        floor: number;
        area: number;
        rent: Prisma.Decimal;
        deposit: Prisma.Decimal;
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
    }[]>;
    findOccupiedRooms(): Promise<{
        rules: string[];
        id: string;
        name: string;
        type: import(".prisma/client").$Enums.RoomType;
        description: string | null;
        floor: number;
        area: number;
        rent: Prisma.Decimal;
        deposit: Prisma.Decimal;
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
    }[]>;
}
