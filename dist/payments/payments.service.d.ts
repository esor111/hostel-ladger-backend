import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { PaymentInvoiceAllocation } from './entities/payment-invoice-allocation.entity';
import { LedgerService } from '../ledger/ledger.service';
export declare class PaymentsService {
    private paymentRepository;
    private allocationRepository;
    private ledgerService;
    constructor(paymentRepository: Repository<Payment>, allocationRepository: Repository<PaymentInvoiceAllocation>, ledgerService: LedgerService);
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
    findByStudentId(studentId: string): Promise<any[]>;
    create(createPaymentDto: any): Promise<any>;
    update(id: string, updatePaymentDto: any): Promise<any>;
    getStats(): Promise<{
        totalPayments: number;
        completedPayments: number;
        pendingPayments: number;
        failedPayments: number;
        totalAmount: number;
        averagePaymentAmount: number;
        paymentMethods: {};
        successRate: number;
    }>;
    processBulkPayments(payments: any[]): Promise<{
        successful: number;
        failed: number;
        errors: any[];
    }>;
    allocatePaymentToInvoices(paymentId: string, invoiceAllocations: any[]): Promise<{
        success: boolean;
        allocationsCreated: number;
    }>;
    private transformToApiResponse;
    private generatePaymentId;
    private generateReceiptNumber;
}
