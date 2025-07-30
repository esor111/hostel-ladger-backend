export declare class ApplyDiscountDto {
    studentId: string;
    discountType?: string;
    amount: number;
    reason: string;
    notes?: string;
    appliedBy?: string;
    date?: string;
    validFrom?: string;
    validTo?: string;
    isPercentage?: boolean;
    percentageValue?: number;
    maxAmount?: number;
    baseAmount?: number;
}
