import { BaseEntityWithCustomId } from '../../common/entities/base.entity';
import { Student } from '../../students/entities/student.entity';
import { PaymentInvoiceAllocation } from './payment-invoice-allocation.entity';
export declare enum PaymentMethod {
    CASH = "Cash",
    BANK_TRANSFER = "Bank Transfer",
    CARD = "Card",
    ONLINE = "Online",
    CHEQUE = "Cheque",
    UPI = "UPI",
    MOBILE_WALLET = "Mobile Wallet"
}
export declare enum PaymentStatus {
    COMPLETED = "Completed",
    PENDING = "Pending",
    FAILED = "Failed",
    CANCELLED = "Cancelled",
    REFUNDED = "Refunded"
}
export declare class Payment extends BaseEntityWithCustomId {
    studentId: string;
    amount: number;
    paymentMethod: PaymentMethod;
    paymentDate: Date;
    reference: string;
    notes: string;
    status: PaymentStatus;
    transactionId: string;
    receiptNumber: string;
    processedBy: string;
    bankName: string;
    chequeNumber: string;
    chequeDate: Date;
    get studentName(): string;
    student: Student;
    invoiceAllocations: PaymentInvoiceAllocation[];
    get invoiceIds(): string[];
}
