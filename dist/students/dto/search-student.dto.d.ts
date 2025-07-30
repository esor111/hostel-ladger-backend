import { StudentStatus } from '../entities/student.entity';
export declare class SearchStudentDto {
    name?: string;
    phone?: string;
    email?: string;
    roomNumber?: string;
    status?: StudentStatus;
    course?: string;
    institution?: string;
    enrollmentDateFrom?: string;
    enrollmentDateTo?: string;
    balanceMin?: number;
    balanceMax?: number;
    page?: number;
    limit?: number;
}
