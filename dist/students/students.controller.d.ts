import { HttpStatus } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto, UpdateStudentDto, SearchStudentDto, CheckoutStudentDto, BulkUpdateStudentDto } from './dto';
export declare class StudentsController {
    private readonly studentsService;
    constructor(studentsService: StudentsService);
    getAllStudents(query: any): Promise<{
        status: HttpStatus;
        data: {
            items: any[];
            pagination: {
                page: any;
                limit: any;
                total: number;
                totalPages: number;
            };
        };
    }>;
    getStudentStats(): Promise<{
        status: HttpStatus;
        data: {
            totalStudents: number;
            activeStudents: number;
            inactiveStudents: number;
            totalBalance: number;
            totalAdvance: number;
        };
    }>;
    getStudentById(id: string): Promise<{
        status: HttpStatus;
        data: any;
    }>;
    createStudent(createStudentDto: CreateStudentDto): Promise<{
        status: HttpStatus;
        data: any;
    }>;
    updateStudent(id: string, updateStudentDto: UpdateStudentDto): Promise<{
        status: HttpStatus;
        data: any;
    }>;
    getStudentBalance(id: string): Promise<{
        status: HttpStatus;
        data: {
            studentId: string;
            currentBalance: number;
            advanceBalance: number;
            totalPaid: number;
            totalDue: number;
            lastPaymentDate: any;
            lastPaymentAmount: number;
        };
    }>;
    getStudentLedger(id: string): Promise<{
        status: HttpStatus;
        data: {
            studentId: string;
            entries: any[];
            summary: {
                totalDebits: number;
                totalCredits: number;
                currentBalance: number;
            };
        };
    }>;
    getStudentPayments(id: string): Promise<{
        status: HttpStatus;
        data: {
            studentId: string;
            payments: any[];
            summary: {
                totalPayments: number;
                totalAmount: number;
                lastPaymentDate: any;
            };
        };
    }>;
    getStudentInvoices(id: string): Promise<{
        status: HttpStatus;
        data: {
            studentId: string;
            invoices: any[];
            summary: {
                totalInvoices: number;
                totalAmount: number;
                paidAmount: number;
                outstandingAmount: number;
            };
        };
    }>;
    processCheckout(id: string, checkoutDetails: CheckoutStudentDto): Promise<{
        status: HttpStatus;
        data: {
            success: boolean;
            studentId: string;
            checkoutDate: any;
            finalBalance: number;
            refundAmount: any;
            deductionAmount: any;
            netSettlement: number;
            message: string;
        };
    }>;
    searchStudents(searchDto: SearchStudentDto): Promise<{
        status: HttpStatus;
        data: {
            items: any[];
            count: number;
            pagination: {
                page: any;
                limit: any;
                total: number;
                totalPages: number;
            };
        };
    }>;
    bulkUpdateStudents(bulkUpdateDto: BulkUpdateStudentDto): Promise<{
        status: HttpStatus;
        data: {
            updated: number;
            failed: number;
            total: any;
            errors: any[];
        };
    }>;
    deleteStudent(id: string): Promise<{
        status: HttpStatus;
        data: {
            success: boolean;
            message: string;
            studentId: string;
        };
    }>;
}
