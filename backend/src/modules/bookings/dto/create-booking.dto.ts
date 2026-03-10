import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";
import { Transform } from "class-transformer";

export class CreateBookingDto {
  // Legacy/extra fields from older frontend payloads.
  // Accepted to avoid 400 validation failures; ignored by service.
  @IsOptional()
  @IsString()
  userId?: string;

  @IsString()
  @IsNotEmpty()
  roomId: string;

  @Transform(({ value }) => {
    if (!value) return value;
    const str = String(value).trim();
    // Accept YYYY-MM-DD format and convert to ISO if needed
    if (/^\d{4}-\d{2}-\d{2}$/.test(str)) {
      return str;
    }
    return str;
  })
  @IsString()
  @IsNotEmpty()
  moveInDate: string;

  @Transform(({ value }) => {
    if (!value) return value;
    const str = String(value).trim();
    // Accept YYYY-MM-DD format and convert to ISO if needed
    if (/^\d{4}-\d{2}-\d{2}$/.test(str)) {
      return str;
    }
    return str;
  })
  @IsString()
  @IsNotEmpty()
  moveOutDate: string;

  @IsOptional()
  @IsString()
  rent?: string;

  @IsOptional()
  @IsString()
  deposit?: string;
}
