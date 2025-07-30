import { BaseEntity } from '../../common/entities/base.entity';
import { Payment } from './payment.entity';
import { Invoice } from '../../invoices/entities/invoice.entity';
export declare class PaymentInvoiceAllocation extends BaseEntity {
    paymentId: string;
    invoiceId: string;
    allocatedAmount: number;
    allocationDate: Date;
    allocatedBy: string;
    notes: string;
    payment: Payment;
    invoice: Invoice;
}
