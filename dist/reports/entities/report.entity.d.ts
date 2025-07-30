import { BaseEntityWithCustomId } from '../../common/entities/base.entity';
export declare enum ReportType {
    FINANCIAL = "financial",
    LEDGER = "ledger",
    PAYMENT = "payment",
    INVOICE = "invoice",
    STUDENT = "student",
    ROOM = "room",
    OCCUPANCY = "occupancy",
    BOOKING = "booking"
}
export declare enum ReportFormat {
    PDF = "pdf",
    EXCEL = "excel",
    CSV = "csv",
    JSON = "json"
}
export declare enum ReportStatus {
    COMPLETED = "completed",
    PROCESSING = "processing",
    FAILED = "failed",
    QUEUED = "queued"
}
export declare class Report extends BaseEntityWithCustomId {
    name: string;
    type: ReportType;
    description: string;
    generatedBy: string;
    generatedAt: Date;
    parameters: Record<string, any>;
    data: Record<string, any>;
    format: ReportFormat;
    filePath: string;
    fileSize: string;
    status: ReportStatus;
    isScheduled: boolean;
    scheduleConfig: Record<string, any>;
    executionTimeMs: number;
    errorMessage: string;
    downloadCount: number;
    expiresAt: Date;
}
