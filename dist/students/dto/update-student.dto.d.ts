import { CreateStudentDto } from './create-student.dto';
import { StudentStatus } from '../entities/student.entity';
declare const UpdateStudentDto_base: import("@nestjs/common").Type<Partial<CreateStudentDto>>;
export declare class UpdateStudentDto extends UpdateStudentDto_base {
    name?: string;
    phone?: string;
    email?: string;
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
}
export {};
