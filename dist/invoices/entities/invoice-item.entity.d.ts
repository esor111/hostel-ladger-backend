import { BaseEntityWithCustomId } from '../../common/entities/base.entity';
import { Invoice } from './invoice.entity';
export declare enum InvoiceItemCategory {
    ACCOMMODATION = "Accommodation",
    SERVICES = "Services",
    FOOD = "Food",
    UTILITIES = "Utilities",
    OTHER = "Other"
}
export declare class InvoiceItem extends BaseEntityWithCustomId {
    invoiceId: string;
    description: string;
    amount: number;
    category: InvoiceItemCategory;
    quantity: number;
    unitPrice: number;
    taxRate: number;
    taxAmount: number;
    isTaxable: boolean;
    invoice: Invoice;
}
