export declare class CreateDiscountDto {
    id?: string;
    studentId: string;
    amount: number;
    reason: string;
    notes?: string;
    appliedBy?: string;
    date?: string;
    status?: string;
    appliedTo?: string;
    discountType?: string;
    validFrom?: string;
    validTo?: string;
    isPercentage?: boolean;
    percentageValue?: number;
    maxAmount?: number;
    referenceId?: string;
}
export declare class ApplyDiscountDto {
    studentId: string;
    amount: number;
    reason: string;
    notes?: string;
    appliedBy?: string;
    discountType?: string;
}
