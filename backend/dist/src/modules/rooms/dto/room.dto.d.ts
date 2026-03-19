import { RoomType } from "../enums/room-type.enum";
export declare class RoomImageDto {
    url?: string;
    caption?: string;
    order?: number;
    isPrimary?: boolean;
}
export declare class RoomMediaDto {
    type: string;
    url: string;
}
export declare class CreateRoomDto {
    name: string;
    type: RoomType;
    description?: string;
    videoUrl?: string;
    media?: RoomMediaDto[];
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
    media?: RoomMediaDto[];
    rules?: string[];
    floor?: number;
    area?: number;
    rent?: number;
    deposit?: number;
    amenities?: string[];
    status?: string;
    images?: RoomImageDto[];
}
