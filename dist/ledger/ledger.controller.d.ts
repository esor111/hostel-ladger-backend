import { HttpStatus } from '@nestjs/common';
import { LedgerService } from './ledger.service';
import { CreateAdjustmentDto } from './dto/create-ledger-entry.dto';
export declare class LedgerController {
    private readonly ledgerService;
    constructor(ledgerService: LedgerService);
    getAllLedgerEntries(query: any): Promise<{
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
    getLedgerStats(): Promise<{
        status: HttpStatus;
        stats: {
            totalEntries: number;
            totalDebits: number;
            totalCredits: number;
            netBalance: number;
            activeStudents: number;
            entryTypeBreakdown: {};
        };
    }>;
    getStudentLedger(studentId: string): Promise<{
        status: HttpStatus;
        data: any[];
    }>;
    getStudentBalance(studentId: string): Promise<{
        status: HttpStatus;
        data: {
            studentId: string;
            currentBalance: number;
            debitBalance: number;
            creditBalance: number;
            balanceType: import("./entities/ledger-entry.entity").BalanceType;
            totalEntries: number;
        };
    }>;
    createAdjustment(adjustmentDto: CreateAdjustmentDto): Promise<{
        status: HttpStatus;
        data: any;
    }>;
    reverseEntry(entryId: string, reversalDto: any): Promise<{
        status: HttpStatus;
        data: {
            originalEntry: any;
            reversalEntry: any;
        };
    }>;
}
