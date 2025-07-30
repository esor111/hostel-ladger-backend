import { Repository } from 'typeorm';
import { BookingRequest } from './entities/booking-request.entity';
import { Student } from '../students/entities/student.entity';
import { Room } from '../rooms/entities/room.entity';
export declare class BookingsService {
    private bookingRepository;
    private studentRepository;
    private roomRepository;
    constructor(bookingRepository: Repository<BookingRequest>, studentRepository: Repository<Student>, roomRepository: Repository<Room>);
    findAll(filters?: any): Promise<{
        items: any[];
        pagination: {
            page: any;
            limit: any;
            total: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<any>;
    create(createBookingDto: any): Promise<any>;
    update(id: string, updateBookingDto: any): Promise<any>;
    approveBooking(id: string, approvalData: any): Promise<{
        success: boolean;
        message: string;
        bookingId: string;
        approvedDate: Date;
    }>;
    rejectBooking(id: string, rejectionData: any): Promise<{
        success: boolean;
        message: string;
        bookingId: string;
        reason: any;
    }>;
    getStats(): Promise<{
        totalBookings: number;
        pendingBookings: number;
        approvedBookings: number;
        rejectedBookings: number;
        cancelledBookings: number;
        approvalRate: number;
        sourceBreakdown: {};
        monthlyTrend: {
            month: any;
            count: number;
        }[];
    }>;
    getPendingBookings(): Promise<any[]>;
    private transformToApiResponse;
    private createStudentFromBooking;
    private calculatePriorityScore;
    private generateBookingId;
    private generateStudentId;
}
