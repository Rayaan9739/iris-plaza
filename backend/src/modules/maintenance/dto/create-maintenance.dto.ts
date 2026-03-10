import { IsString, IsOptional, IsNumber, Min, IsIn } from "class-validator";

export class CreateMaintenanceDto {
  @IsString()
  title: string;

  @IsString()
  category: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsIn(["LOW", "MEDIUM", "HIGH", "URGENT"])
  priority?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  requestedAmount?: number;

  @IsOptional()
  @IsString()
  bookingId?: string;
}
