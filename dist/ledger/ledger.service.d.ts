import { Repository } from 'typeorm';
import { LedgerEntry, BalanceType } from './entities/ledger-entry.entity';
import { Student } from '../students/entities/student.entity';
import { Invoice } from '../invoices/entities/invoice.entity';
import { Payment } from '../payments/entities/payment.entity';
import { Discount } from '../discounts/entities/discount.entity';
export declare class LedgerService {
    private ledgerRepository;
    private studentRepository;
    private invoiceRepository;
    private paymentRepository;
    private discountRepository;
    constructor(ledgerRepository: Repository<LedgerEntry>, studentRepository: Repository<Student>, invoiceRepository: Repository<Invoice>, paymentRepository: Repository<Payment>, discountRepository: Repository<Discount>);
    findAll(filters?: any): Promise<{
        items: any[];
        pagination: {
            page: any;
            limit: any;
            total: number;
            totalPages: number;
        };
    }>;
    findByStudentId(studentId: string): Promise<any[]>;
    getStudentBalance(studentId: string): Promise<{
        studentId: string;
        currentBalance: number;
        debitBalance: number;
        creditBalance: number;
        balanceType: BalanceType;
        totalEntries: number;
    }>;
    createInvoiceEntry(invoice: Invoice): Promise<any>;
    createPaymentEntry(payment: Payment): Promise<any>;
    createDiscountEntry(discount: Discount): Promise<any>;
    createAdjustmentEntry(studentId: string, amount: number, description: string, type: 'debit' | 'credit', createdBy?: string): Promise<any>;
    reverseEntry(entryId: string, reversedBy?: string, reason?: string): Promise<{
        originalEntry: any;
        reversalEntry: any;
    }>;
    getStats(): Promise<{
        totalEntries: number;
        totalDebits: number;
        totalCredits: number;
        netBalance: number;
        activeStudents: number;
        entryTypeBreakdown: {};
    }>;
    private transformToApiResponse;
    private updateStudentBalance;
    private getNextEntryNumber;
    private generateEntryId;
}
