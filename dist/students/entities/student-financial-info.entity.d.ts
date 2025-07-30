import { BaseEntity } from '../../common/entities/base.entity';
import { Student } from './student.entity';
export declare enum FeeType {
    BASE_MONTHLY = "base_monthly",
    LAUNDRY = "laundry",
    FOOD = "food",
    UTILITIES = "utilities",
    MAINTENANCE = "maintenance",
    SECURITY_DEPOSIT = "security_deposit"
}
export declare class StudentFinancialInfo extends BaseEntity {
    studentId: string;
    feeType: FeeType;
    amount: number;
    effectiveFrom: Date;
    effectiveTo: Date;
    isActive: boolean;
    notes: string;
    student: Student;
}
