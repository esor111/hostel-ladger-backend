import { IsString, IsNumber, IsOptional, IsEnum, IsBoolean, Min, Max } from 'class-validator';
import { Transform } from 'class-transformer';
import { ChargeCategory } from '../entities/charge-type.entity';

export class CreateChargeTypeDto {
  @IsString()
  code: string;

  @IsString()
  label: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(ChargeCategory)
  category: ChargeCategory;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(50000)
  @Transform(({ value }) => parseFloat(value))
  defaultAmount?: number;

  @IsOptional()
  @IsBoolean()
  requiresApproval?: boolean = false;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100000)
  @Transform(({ value }) => parseFloat(value))
  maxAmount?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean = true;
}

export class UpdateChargeTypeDto {
  @IsOptional()
  @IsString()
  label?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(ChargeCategory)
  category?: ChargeCategory;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(50000)
  @Transform(({ value }) => parseFloat(value))
  defaultAmount?: number;

  @IsOptional()
  @IsBoolean()
  requiresApproval?: boolean;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100000)
  @Transform(({ value }) => parseFloat(value))
  maxAmount?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}