export declare enum AdjustmentType {
    DEBIT = "debit",
    CREDIT = "credit"
}
export declare class AdjustmentDto {
    studentId: string;
    amount: number;
    description: string;
    type: AdjustmentType;
    createdBy?: string;
}
