import { BaseEntityWithCustomId } from '../../common/entities/base.entity';
import { Student } from '../../students/entities/student.entity';
import { InvoiceItem } from './invoice-item.entity';
import { PaymentInvoiceAllocation } from '../../payments/entities/payment-invoice-allocation.entity';
export declare enum InvoiceStatus {
    PAID = "Paid",
    UNPAID = "Unpaid",
    PARTIALLY_PAID = "Partially Paid",
    OVERDUE = "Overdue",
    CANCELLED = "Cancelled"
}
export declare class Invoice extends BaseEntityWithCustomId {
    studentId: string;
    month: string;
    total: number;
    status: InvoiceStatus;
    dueDate: Date;
    subtotal: number;
    discountTotal: number;
    paymentTotal: number;
    notes: string;
    invoiceNumber: string;
    generatedBy: string;
    get balanceDue(): number;
    get studentName(): string;
    get roomNumber(): string;
    student: Student;
    items: InvoiceItem[];
    paymentAllocations: PaymentInvoiceAllocation[];
    get payments(): any[];
    get discounts(): any[];
}
