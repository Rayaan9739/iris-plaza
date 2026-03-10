import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsEnum,
  IsOptional,
  IsArray,
  ValidateNested,
  IsBoolean,
  Min,
  IsIn,
} from "class-validator";
import { Type, Transform } from "class-transformer";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { RoomType } from "../enums/room-type.enum";

export class RoomImageDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  url?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  caption?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  order?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isPrimary?: boolean;
}

export class CreateRoomDto {
  @ApiProperty({ example: "Room 101" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    enum: RoomType,
  })
  @Transform(({ value }) => value?.trim())
  @IsEnum(RoomType, {
    message: "Room type must be ONE_BHK, TWO_BHK, or PENT_HOUSE",
  })
  type: RoomType;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  videoUrl?: string;

  @ApiPropertyOptional({
    description: "Array of media items (image or video) with URLs",
    type: [Object],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Object)
  media?: Array<{ type: string; url: string }>;

  @ApiPropertyOptional({ example: ["No smoking", "No pets"] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  rules?: string[];

  @ApiProperty({ example: 1 })
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  floor: number;

  @ApiProperty({ example: 250 })
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  area: number;

  @ApiProperty({ example: 850 })
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  rent: number;

  @ApiProperty({ example: 1700 })
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  deposit: number;

  @ApiPropertyOptional({ example: ["WiFi", "AC"] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  amenities?: string[];

  @ApiPropertyOptional({
    enum: ["AVAILABLE", "RESERVED", "OCCUPIED", "MAINTENANCE"],
  })
  @IsOptional()
  @IsIn(["AVAILABLE", "RESERVED", "OCCUPIED", "MAINTENANCE"])
  status?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RoomImageDto)
  images?: RoomImageDto[];
}

export class UpdateRoomDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ enum: RoomType })
  @IsOptional()
  @Transform(({ value }) => value?.trim())
  @IsEnum(RoomType, {
    message: "Room type must be ONE_BHK, TWO_BHK, or PENT_HOUSE",
  })
  type?: RoomType;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  videoUrl?: string;

  @ApiPropertyOptional({
    description: "Array of media items (image or video) with URLs",
    type: [Object],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Object)
  media?: Array<{ type: string; url: string }>;

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  rules?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  floor?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  area?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  rent?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  deposit?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  amenities?: string[];

  @ApiPropertyOptional({
    enum: ["AVAILABLE", "RESERVED", "OCCUPIED", "MAINTENANCE"],
  })
  @IsOptional()
  @IsIn(["AVAILABLE", "RESERVED", "OCCUPIED", "MAINTENANCE"])
  status?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RoomImageDto)
  images?: RoomImageDto[];
}
