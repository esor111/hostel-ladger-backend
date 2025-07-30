import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import { StudentContact } from './entities/student-contact.entity';
import { StudentAcademicInfo } from './entities/student-academic-info.entity';
import { StudentFinancialInfo } from './entities/student-financial-info.entity';
export declare class StudentsService {
    private studentRepository;
    private contactRepository;
    private academicRepository;
    private financialRepository;
    constructor(studentRepository: Repository<Student>, contactRepository: Repository<StudentContact>, academicRepository: Repository<StudentAcademicInfo>, financialRepository: Repository<StudentFinancialInfo>);
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
    create(createStudentDto: any): Promise<any>;
    update(id: string, updateStudentDto: any): Promise<any>;
    getStats(): Promise<{
        totalStudents: number;
        activeStudents: number;
        inactiveStudents: number;
        totalBalance: number;
        totalAdvance: number;
    }>;
    private transformToApiResponse;
    private createRelatedEntities;
    getStudentBalance(studentId: string): Promise<{
        studentId: string;
        currentBalance: number;
        advanceBalance: number;
        totalPaid: number;
        totalDue: number;
        lastPaymentDate: any;
        lastPaymentAmount: number;
    }>;
    getStudentLedger(studentId: string): Promise<{
        studentId: string;
        entries: any[];
        summary: {
            totalDebits: number;
            totalCredits: number;
            currentBalance: number;
        };
    }>;
    getStudentPayments(studentId: string): Promise<{
        studentId: string;
        payments: any[];
        summary: {
            totalPayments: number;
            totalAmount: number;
            lastPaymentDate: any;
        };
    }>;
    getStudentInvoices(studentId: string): Promise<{
        studentId: string;
        invoices: any[];
        summary: {
            totalInvoices: number;
            totalAmount: number;
            paidAmount: number;
            outstandingAmount: number;
        };
    }>;
    processCheckout(studentId: string, checkoutDetails: any): Promise<{
        success: boolean;
        studentId: string;
        checkoutDate: any;
        finalBalance: number;
        refundAmount: any;
        deductionAmount: any;
        netSettlement: number;
        message: string;
    }>;
    advancedSearch(searchDto: any): Promise<{
        items: any[];
        count: number;
        pagination: {
            page: any;
            limit: any;
            total: number;
            totalPages: number;
        };
    }>;
    bulkUpdate(bulkUpdateDto: any): Promise<{
        updated: number;
        failed: number;
        total: any;
        errors: any[];
    }>;
    remove(id: string): Promise<{
        success: boolean;
        message: string;
        studentId: string;
    }>;
    private updateRelatedEntities;
}
