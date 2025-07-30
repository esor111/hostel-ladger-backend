import { BaseEntityWithCustomId } from '../../common/entities/base.entity';
import { Student } from '../../students/entities/student.entity';
import { DiscountType } from './discount-type.entity';
export declare enum DiscountStatus {
    ACTIVE = "active",
    EXPIRED = "expired",
    CANCELLED = "cancelled",
    USED = "used"
}
export declare enum DiscountApplication {
    LEDGER = "ledger",
    INVOICE = "invoice",
    PAYMENT = "payment"
}
export declare class Discount extends BaseEntityWithCustomId {
    studentId: string;
    discountTypeId: string;
    amount: number;
    reason: string;
    notes: string;
    appliedBy: string;
    date: Date;
    status: DiscountStatus;
    appliedTo: DiscountApplication;
    validFrom: Date;
    validTo: Date;
    isPercentage: boolean;
    percentageValue: number;
    maxAmount: number;
    referenceId: string;
    get studentName(): string;
    get room(): string;
    student: Student;
    discountType: DiscountType;
}
