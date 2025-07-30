import { Repository } from 'typeorm';
import { Report, ReportStatus, ReportType } from './entities/report.entity';
import { Student } from '../students/entities/student.entity';
import { Room } from '../rooms/entities/room.entity';
import { Invoice } from '../invoices/entities/invoice.entity';
import { Payment } from '../payments/entities/payment.entity';
import { LedgerEntry } from '../ledger/entities/ledger-entry.entity';
import { Discount } from '../discounts/entities/discount.entity';
import { BookingRequest } from '../bookings/entities/booking-request.entity';
export declare class ReportsService {
    private reportRepository;
    private studentRepository;
    private roomRepository;
    private invoiceRepository;
    private paymentRepository;
    private ledgerRepository;
    private discountRepository;
    private bookingRepository;
    constructor(reportRepository: Repository<Report>, studentRepository: Repository<Student>, roomRepository: Repository<Room>, invoiceRepository: Repository<Invoice>, paymentRepository: Repository<Payment>, ledgerRepository: Repository<LedgerEntry>, discountRepository: Repository<Discount>, bookingRepository: Repository<BookingRequest>);
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
    generateReport(reportType: string, parameters?: any): Promise<{
        reportId: string;
        name: any;
        type: "student" | "occupancy" | "payment" | "ledger" | "financial";
        status: ReportStatus;
        generatedAt: Date;
        data: any;
    }>;
    getReportData(id: string): Promise<{
        reportId: string;
        name: string;
        type: ReportType.FINANCIAL | ReportType.LEDGER | ReportType.PAYMENT | ReportType.STUDENT | ReportType.OCCUPANCY;
        description: string;
        generatedAt: Date;
        parameters: Record<string, any>;
        data: any;
    }>;
    private generateOccupancyReport;
    private generateFinancialReport;
    private generateStudentReport;
    private generatePaymentReport;
    private generateLedgerReport;
    private transformToApiResponse;
    private generateReportId;
}
