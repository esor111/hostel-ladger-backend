import { BaseEntityWithCustomId } from '../../common/entities/base.entity';
import { Student } from '../../students/entities/student.entity';
export declare enum BookingStatus {
    PENDING = "Pending",
    APPROVED = "Approved",
    REJECTED = "Rejected",
    CANCELLED = "Cancelled",
    EXPIRED = "Expired"
}
export declare class BookingRequest extends BaseEntityWithCustomId {
    name: string;
    phone: string;
    email: string;
    guardianName: string;
    guardianPhone: string;
    preferredRoom: string;
    course: string;
    institution: string;
    requestDate: Date;
    checkInDate: Date;
    duration: string;
    status: BookingStatus;
    notes: string;
    emergencyContact: string;
    address: string;
    idProofType: string;
    idProofNumber: string;
    approvedDate: Date;
    processedBy: string;
    rejectionReason: string;
    assignedRoom: string;
    priorityScore: number;
    source: string;
    student: Student;
}
