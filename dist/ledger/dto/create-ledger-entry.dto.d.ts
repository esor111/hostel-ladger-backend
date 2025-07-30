export declare enum LedgerEntryType {
    INVOICE = "invoice",
    PAYMENT = "payment",
    DISCOUNT = "discount",
    ADJUSTMENT = "adjustment",
    REFUND = "refund"
}
export declare enum BalanceType {
    DR = "DR",
    CR = "CR",
    NIL = "NIL"
}
export declare class CreateLedgerEntryDto {
    id?: string;
    studentId: string;
    date?: string;
    type: LedgerEntryType;
    description: string;
    referenceId?: string;
    debit: number;
    credit: number;
    balance: number;
    balanceType: BalanceType;
    notes?: string;
    createdBy?: string;
}
export declare class CreateAdjustmentDto {
    studentId: string;
    amount: number;
    description: string;
    type: 'debit' | 'credit';
    createdBy?: string;
}
