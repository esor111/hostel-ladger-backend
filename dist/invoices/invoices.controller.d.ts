import { HttpStatus } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
export declare class InvoicesController {
    private readonly invoicesService;
    constructor(invoicesService: InvoicesService);
    getAllInvoices(query: any): Promise<{
        status: HttpStatus;
        result: {
            items: any[];
            pagination: {
                page: any;
                limit: any;
                total: number;
                totalPages: number;
            };
        };
    }>;
    getInvoiceStats(): Promise<{
        status: HttpStatus;
        stats: {
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
        };
    }>;
    getInvoiceById(id: string): Promise<{
        status: HttpStatus;
        data: any;
    }>;
    createInvoice(createInvoiceDto: CreateInvoiceDto): Promise<{
        status: HttpStatus;
        data: any;
    }>;
    updateInvoice(id: string, updateInvoiceDto: UpdateInvoiceDto): Promise<{
        status: HttpStatus;
        data: any;
    }>;
    generateMonthlyInvoices(generateDto: any): Promise<{
        status: HttpStatus;
        data: {
            generated: number;
            failed: number;
            month: string;
            invoices: any[];
        };
    }>;
    sendInvoice(id: string, sendDto: any): Promise<{
        status: HttpStatus;
        data: {
            success: boolean;
            method: string;
            sentTo: any;
            sentAt: Date;
        };
    }>;
}
