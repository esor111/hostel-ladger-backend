import { IsString, IsNumber, IsOptional, IsDateString, IsEnum, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export enum PaymentMethod {
  CASH = 'Cash',
  CARD = 'Card', 
  BANK_TRANSFER = 'Bank Transfer',
  UPI = 'UPI',
  CHEQUE = 'Cheque',
  ONLINE = 'Online',
  MOBILE_WALLET = 'Mobile Wallet'
}

// ✅ FIXED: Transform function to handle case variations and map frontend values
function normalizePaymentMethod(value: string): string {
  if (!value) return value;
  
  // Map frontend values to backend enum values
  const mapping: { [key: string]: string } = {
    'cash': 'Cash',
    'card': 'Card',
    'bank_transfer': 'Bank Transfer',
    'upi': 'UPI',
    'cheque': 'Cheque', 
    'online': 'Online',
    'mobile_wallet': 'Mobile Wallet'
  };
  
  const lowerValue = value.toLowerCase();
  return mapping[lowerValue] || value;
}

export class CreatePaymentDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsString()
  studentId: string;

  @IsNumber()
  @Min(0.01)
  @Transform(({ value }) => parseFloat(value))
  amount: number;

  @IsOptional()
  @IsDateString()
  paymentDate?: string;

  @IsEnum(PaymentMethod)
  @Transform(({ value }) => normalizePaymentMethod(value))
  paymentMethod: PaymentMethod;

  @IsOptional()
  @IsString()
  transactionId?: string;

  @IsOptional()
  @IsString()
  referenceNumber?: string;

  // ✅ FIXED: Added 'reference' field for frontend compatibility
  @IsOptional()
  @IsString()
  reference?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  // ✅ FIXED: Added 'invoiceIds' field for frontend compatibility
  @IsOptional()
  invoiceIds?: string[];

  @IsOptional()
  @IsString()
  processedBy?: string;

  @IsOptional()
  @IsString()
  status?: string;

  // For bank transfer/cheque specific fields
  @IsOptional()
  @IsString()
  bankName?: string;

  @IsOptional()
  @IsString()
  chequeNumber?: string;

  @IsOptional()
  @IsDateString()
  chequeDate?: string;
}

export class InvoiceAllocationDto {
  @IsString()
  invoiceId: string;

  @IsNumber()
  @Min(0.01)
  @Transform(({ value }) => parseFloat(value))
  amount: number;

  @IsOptional()
  @IsString()
  notes?: string;
}