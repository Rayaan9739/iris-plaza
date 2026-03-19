import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  MinLength,
  MaxLength,
  IsPhoneNumber,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

/**
 * Sign up DTO for tenant registration
 */
export class SignUpDto {
  @ApiProperty({ example: "+1234567890" })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiPropertyOptional({ example: "user@example.com" })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({ example: "password123", minLength: 8, maxLength: 32 })
  @IsString()
  @MinLength(8)
  @MaxLength(32)
  password: string;

  @ApiProperty({ example: "John" })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  firstName: string;

  @ApiProperty({ example: "Doe" })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  lastName: string;

  // Identity details for TenantProfile
  @ApiPropertyOptional({ example: "John Smith" })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  fatherName?: string;

  @ApiPropertyOptional({ example: "S/O" })
  @IsOptional()
  @IsString()
  @MaxLength(10)
  relation?: string;

  @ApiPropertyOptional({ example: "1234 5678 9012" })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  aadhaarNumber?: string;

  @ApiPropertyOptional({ example: "Male" })
  @IsOptional()
  @IsString()
  @MaxLength(10)
  gender?: string;

  @ApiPropertyOptional({ example: "Bangalore" })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  tenantAddress?: string;

  @ApiPropertyOptional({ example: "Manipal University" })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  collegeName?: string;
}

/**
 * Sign in DTO with phone and password
 */
export class SignInDto {
  @ApiProperty({ example: "+1234567890" })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ example: "password123" })
  @IsString()
  @IsNotEmpty()
  password: string;
}

/**
 * Refresh token DTO
 */
export class RefreshTokenDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}
