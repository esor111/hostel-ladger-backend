import { CreateDiscountDto } from './create-discount.dto';
declare const UpdateDiscountDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateDiscountDto>>;
export declare class UpdateDiscountDto extends UpdateDiscountDto_base {
    studentId?: string;
    amount?: number;
    reason?: string;
    notes?: string;
    status?: string;
    validFrom?: string;
    validTo?: string;
    isPercentage?: boolean;
    percentageValue?: number;
    maxAmount?: number;
    updatedBy?: string;
}
export {};
