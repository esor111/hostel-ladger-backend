import { IsString, IsNumber, IsOptional, IsArray, IsBoolean, IsEnum, ValidateNested, Min, Max } from 'class-validator';
import { Type, Transform } from 'class-transformer';

export class CreateRoomAmenityDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class CreateRoomLayoutDto {
  @IsOptional()
  @IsString()
  layoutType?: string;

  @IsOptional()
  bedPositions?: any; // JSONB data

  @IsOptional()
  furnitureLayout?: any; // JSONB data

  @IsOptional()
  dimensions?: any; // JSONB data
}

export class CreateRoomDto {
  @IsOptional()
  @IsString()
  id?: string;

  // ✅ FIXED: Added 'name' field to match Express API
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  roomNumber?: string;

  @IsOptional()
  @IsString()
  type?: string;

  // ✅ FIXED: Added 'bedCount' field to match Express API
  @IsNumber()
  @Min(1)
  @Max(10)
  @Transform(({ value }) => parseInt(value))
  bedCount: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(10)
  @Transform(({ value }) => parseInt(value))
  capacity?: number;

  // ✅ FIXED: Added 'monthlyRate' field to match Express API
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => parseFloat(value))
  monthlyRate: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => parseFloat(value))
  rent?: number;

  // ✅ FIXED: Added 'gender' field to match Express API
  @IsOptional()
  @IsString()
  gender?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(20)
  @Transform(({ value }) => parseInt(value))
  floor?: number;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateRoomAmenityDto)
  amenities?: CreateRoomAmenityDto[];

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateRoomLayoutDto)
  layout?: CreateRoomLayoutDto;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsString()
  notes?: string;
}