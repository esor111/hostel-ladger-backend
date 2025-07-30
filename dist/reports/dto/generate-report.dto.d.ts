export declare enum ReportType {
    OCCUPANCY = "occupancy",
    FINANCIAL = "financial",
    STUDENT = "student",
    PAYMENT = "payment",
    BOOKING = "booking",
    LEDGER = "ledger",
    MONTHLY = "monthly"
}
export declare class GenerateReportDto {
    type: ReportType;
    parameters?: {
        dateFrom?: string;
        dateTo?: string;
        studentId?: string;
        month?: number;
        year?: number;
        generatedBy?: string;
        [key: string]: any;
    };
}
export declare class GenerateOccupancyReportDto {
    asOfDate?: string;
    roomType?: string;
    floor?: string;
    generatedBy?: string;
}
export declare class GenerateFinancialReportDto {
    dateFrom?: string;
    dateTo?: string;
    generatedBy?: string;
}
export declare class GenerateStudentReportDto {
    status?: string;
    course?: string;
    institution?: string;
    generatedBy?: string;
}
export declare class GeneratePaymentReportDto {
    dateFrom?: string;
    dateTo?: string;
    paymentMethod?: string;
    generatedBy?: string;
}
export declare class GenerateLedgerReportDto {
    dateFrom?: string;
    dateTo?: string;
    studentId?: string;
    entryType?: string;
    generatedBy?: string;
}
