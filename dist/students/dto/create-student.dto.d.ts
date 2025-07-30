import { StudentStatus } from '../entities/student.entity';
export declare class CreateStudentDto {
    id?: string;
    name: string;
    phone: string;
    email: string;
    roomNumber?: string;
    guardianName?: string;
    guardianPhone?: string;
    address?: string;
    baseMonthlyFee?: number;
    laundryFee?: number;
    foodFee?: number;
    enrollmentDate?: string;
    status?: StudentStatus;
    emergencyContact?: string;
    course?: string;
    institution?: string;
    idProofType?: string;
    idProofNumber?: string;
    bookingRequestId?: string;
}
