export declare enum PaymentMethod {
    CASH = "cash",
    CARD = "card",
    BANK_TRANSFER = "bank_transfer",
    UPI = "upi",
    CHEQUE = "cheque",
    ONLINE = "online"
}
export declare class CreatePaymentDto {
    id?: string;
    studentId: string;
    amount: number;
    paymentDate?: string;
    paymentMethod: PaymentMethod;
    transactionId?: string;
    referenceNumber?: string;
    notes?: string;
    processedBy?: string;
    status?: string;
    bankName?: string;
    chequeNumber?: string;
    chequeDate?: string;
}
export declare class InvoiceAllocationDto {
    invoiceId: string;
    amount: number;
    notes?: string;
}
