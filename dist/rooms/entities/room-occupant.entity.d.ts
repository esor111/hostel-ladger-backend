import { Room } from './room.entity';
import { Student } from '../../students/entities/student.entity';
export declare class RoomOccupant {
    id: string;
    roomId: string;
    studentId: string;
    checkInDate: Date;
    checkOutDate: Date;
    bedNumber: string;
    status: string;
    notes: string;
    assignedBy: string;
    createdAt: Date;
    updatedAt: Date;
    room: Room;
    student: Student;
}
