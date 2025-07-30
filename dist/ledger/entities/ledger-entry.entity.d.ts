import { BaseEntityWithCustomId } from '../../common/entities/base.entity';
import { Student } from '../../students/entities/student.entity';
export declare enum LedgerEntryType {
    INVOICE = "Invoice",
    PAYMENT = "Payment",
    DISCOUNT = "Discount",
    ADJUSTMENT = "Adjustment",
    REFUND = "Refund",
    PENALTY = "Penalty",
    CREDIT_NOTE = "Credit Note",
    DEBIT_NOTE = "Debit Note"
}
export declare enum BalanceType {
    DR = "Dr",
    CR = "Cr",
    NIL = "Nil"
}
export declare class LedgerEntry extends BaseEntityWithCustomId {
    studentId: string;
    date: Date;
    type: LedgerEntryType;
    description: string;
    referenceId: string;
    debit: number;
    credit: number;
    balance: number;
    balanceType: BalanceType;
    notes: string;
    entryNumber: number;
    isReversed: boolean;
    reversedBy: string;
    reversalDate: Date;
    get studentName(): string;
    student: Student;
}
