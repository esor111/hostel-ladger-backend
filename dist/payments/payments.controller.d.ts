import { HttpStatus } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
export declare class PaymentsController {
    private readonly paymentsService;
    constructor(paymentsService: PaymentsService);
    getAllPayments(query: any): Promise<{
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
    getPaymentStats(): Promise<{
        status: HttpStatus;
        stats: {
            totalPayments: number;
            completedPayments: number;
            pendingPayments: number;
            failedPayments: number;
            totalAmount: number;
            averagePaymentAmount: number;
            paymentMethods: {};
            successRate: number;
        };
    }>;
    getPaymentsByStudentId(studentId: string): Promise<{
        status: HttpStatus;
        data: any[];
    }>;
    getPaymentById(id: string): Promise<{
        status: HttpStatus;
        data: any;
    }>;
    recordPayment(createPaymentDto: CreatePaymentDto): Promise<{
        status: HttpStatus;
        data: any;
    }>;
    updatePayment(id: string, updatePaymentDto: UpdatePaymentDto): Promise<{
        status: HttpStatus;
        data: any;
    }>;
    processBulkPayments(bulkPaymentDto: any): Promise<{
        status: HttpStatus;
        data: {
            successful: number;
            failed: number;
            errors: any[];
        };
    }>;
    allocatePaymentToInvoices(id: string, allocationDto: any): Promise<{
        status: HttpStatus;
        data: {
            success: boolean;
            allocationsCreated: number;
        };
    }>;
}
