import { Repository } from 'typeorm';
import { Invoice } from './entities/invoice.entity';
import { InvoiceItem } from './entities/invoice-item.entity';
export declare class InvoicesService {
    private invoiceRepository;
    private invoiceItemRepository;
    constructor(invoiceRepository: Repository<Invoice>, invoiceItemRepository: Repository<InvoiceItem>);
    findAll(filters?: any): Promise<{
        items: any[];
        pagination: {
            page: any;
            limit: any;
            total: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<any>;
    create(createInvoiceDto: any): Promise<any>;
    update(id: string, updateInvoiceDto: any): Promise<any>;
    getStats(): Promise<{
        totalInvoices: number;
        paidInvoices: number;
        unpaidInvoices: number;
        partiallyPaidInvoices: number;
        overdueInvoices: number;
        totalAmount: number;
        totalPaid: number;
        totalOutstanding: number;
        averageInvoiceAmount: number;
        collectionRate: number;
    }>;
    generateMonthlyInvoices(month: string, studentIds?: string[]): Promise<{
        generated: number;
        failed: number;
        month: string;
        invoices: any[];
    }>;
    sendInvoice(id: string, method?: string): Promise<{
        success: boolean;
        method: string;
        sentTo: any;
        sentAt: Date;
    }>;
    private transformToApiResponse;
    private createInvoiceItems;
    private updateInvoiceItems;
    private generateInvoiceId;
    private generateInvoiceNumber;
    private generateItemId;
}
