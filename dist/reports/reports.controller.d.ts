import { HttpStatus } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { GenerateReportDto, GenerateOccupancyReportDto, GenerateFinancialReportDto, GenerateStudentReportDto, GeneratePaymentReportDto, GenerateLedgerReportDto } from './dto/generate-report.dto';
export declare class ReportsController {
    private readonly reportsService;
    constructor(reportsService: ReportsService);
    getAllReports(query: any): Promise<{
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
    getReportById(id: string): Promise<{
        status: HttpStatus;
        data: any;
    }>;
    getReportData(id: string): Promise<{
        status: HttpStatus;
        data: {
            reportId: string;
            name: string;
            type: import("./entities/report.entity").ReportType.FINANCIAL | import("./entities/report.entity").ReportType.LEDGER | import("./entities/report.entity").ReportType.PAYMENT | import("./entities/report.entity").ReportType.STUDENT | import("./entities/report.entity").ReportType.OCCUPANCY;
            description: string;
            generatedAt: Date;
            parameters: Record<string, any>;
            data: any;
        };
    }>;
    generateReport(generateReportDto: GenerateReportDto): Promise<{
        status: HttpStatus;
        data: {
            reportId: string;
            name: any;
            type: "student" | "occupancy" | "payment" | "ledger" | "financial";
            status: import("./entities/report.entity").ReportStatus;
            generatedAt: Date;
            data: any;
        };
    }>;
    generateOccupancyReport(parameters?: GenerateOccupancyReportDto): Promise<{
        status: HttpStatus;
        data: {
            reportId: string;
            name: any;
            type: "student" | "occupancy" | "payment" | "ledger" | "financial";
            status: import("./entities/report.entity").ReportStatus;
            generatedAt: Date;
            data: any;
        };
    }>;
    generateFinancialReport(parameters?: GenerateFinancialReportDto): Promise<{
        status: HttpStatus;
        data: {
            reportId: string;
            name: any;
            type: "student" | "occupancy" | "payment" | "ledger" | "financial";
            status: import("./entities/report.entity").ReportStatus;
            generatedAt: Date;
            data: any;
        };
    }>;
    generateStudentReport(parameters?: GenerateStudentReportDto): Promise<{
        status: HttpStatus;
        data: {
            reportId: string;
            name: any;
            type: "student" | "occupancy" | "payment" | "ledger" | "financial";
            status: import("./entities/report.entity").ReportStatus;
            generatedAt: Date;
            data: any;
        };
    }>;
    generatePaymentReport(parameters?: GeneratePaymentReportDto): Promise<{
        status: HttpStatus;
        data: {
            reportId: string;
            name: any;
            type: "student" | "occupancy" | "payment" | "ledger" | "financial";
            status: import("./entities/report.entity").ReportStatus;
            generatedAt: Date;
            data: any;
        };
    }>;
    generateLedgerReport(parameters?: GenerateLedgerReportDto): Promise<{
        status: HttpStatus;
        data: {
            reportId: string;
            name: any;
            type: "student" | "occupancy" | "payment" | "ledger" | "financial";
            status: import("./entities/report.entity").ReportStatus;
            generatedAt: Date;
            data: any;
        };
    }>;
}
