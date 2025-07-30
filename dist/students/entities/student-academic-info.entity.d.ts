import { BaseEntity } from '../../common/entities/base.entity';
import { Student } from './student.entity';
export declare class StudentAcademicInfo extends BaseEntity {
    studentId: string;
    course: string;
    institution: string;
    academicYear: string;
    semester: string;
    startDate: Date;
    expectedEndDate: Date;
    studentIdNumber: string;
    isActive: boolean;
    student: Student;
}
