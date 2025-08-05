import { IsString, IsNumber, IsOptional, IsEnum, IsUUID, Min, Max } from 'class-validator';
import { Transform } from 'class-transformer';
import { ChargeCategory } from '../entities/charge-type.entity';

export class CreateAdminChargeDto {
  @IsUUID()
  studentId: string;

  @IsOptional()
  @IsUUID()
  chargeTypeId?: string;

  @IsNumber()
  @Min(0.01)
  @Max(50000)
  @Transform(({ value }) => parseFloat(value))
  amount: number;

  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  customDescription?: string;

  @IsOptional()
  @IsString()
  adminNotes?: string;

  @IsString()
  appliedBy: string;

  @IsOptional()
  @IsString()
  referenceId?: string;

  @IsOptional()
  sendNotification?: boolean = true;
}

export class CreateBulkAdminChargeDto {
  @IsUUID(4, { each: true })
  studentIds: string[];

  @IsOptional()
  @IsUUID()
  chargeTypeId?: string;

  @IsNumber()
  @Min(0.01)
  @Max(50000)
  @Transform(({ value }) => parseFloat(value))
  amount: number;

  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  customDescription?: string;

  @IsOptional()
  @IsString()
  adminNotes?: string;

  @IsString()
  appliedBy: string;

  @IsOptional()
  sendNotification?: boolean = true;
}

export class ReverseAdminChargeDto {
  @IsString()
  reversedBy: string;

  @IsString()
  reversalReason: string;
}