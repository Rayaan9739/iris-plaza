import { RoomType } from "../enums/room-type.enum";
export declare class RoomImageDto {
    url?: string;
    caption?: string;
    order?: number;
    isPrimary?: boolean;
}
export declare class CreateRoomDto {
    name: string;
    type: RoomType;
    description?: string;
    videoUrl?: string;
    media?: Array<{
        type: string;
        url: string;
    }>;
    rules?: string[];
    floor: number;
    area: number;
    rent: number;
    deposit: number;
    amenities?: string[];
    status?: string;
    images?: RoomImageDto[];
}
export declare class UpdateRoomDto {
    name?: string;
    type?: RoomType;
    description?: string;
    videoUrl?: string;
    media?: Array<{
        type: string;
        url: string;
    }>;
    rules?: string[];
    floor?: number;
    area?: number;
    rent?: number;
    deposit?: number;
    amenities?: string[];
    status?: string;
    images?: RoomImageDto[];
}
