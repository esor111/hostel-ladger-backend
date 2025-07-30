import { BaseEntity } from '../../common/entities/base.entity';
import { Student } from './student.entity';
export declare enum ContactType {
    GUARDIAN = "guardian",
    EMERGENCY = "emergency",
    PARENT = "parent",
    RELATIVE = "relative"
}
export declare class StudentContact extends BaseEntity {
    studentId: string;
    type: ContactType;
    name: string;
    phone: string;
    email: string;
    relationship: string;
    isPrimary: boolean;
    isActive: boolean;
    student: Student;
}
