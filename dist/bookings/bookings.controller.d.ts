import { HttpStatus } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto, ApproveBookingDto, RejectBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
export declare class BookingsController {
    private readonly bookingsService;
    constructor(bookingsService: BookingsService);
    getAllBookingRequests(query: any): Promise<{
        status: HttpStatus;
        result: {
            items: any[];
            pagination: {
                page: any;
                limit: any;
                total: number;
                totalPages: number;
            };
        };
    }>;
    getBookingStats(): Promise<{
        status: HttpStatus;
        stats: {
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
        };
    }>;
    getPendingBookings(): Promise<{
        status: HttpStatus;
        data: any[];
    }>;
    getBookingRequestById(id: string): Promise<{
        status: HttpStatus;
        data: any;
    }>;
    createBookingRequest(createBookingDto: CreateBookingDto): Promise<{
        status: HttpStatus;
        data: any;
    }>;
    updateBookingRequest(id: string, updateBookingDto: UpdateBookingDto): Promise<{
        status: HttpStatus;
        data: any;
    }>;
    approveBookingRequest(id: string, approvalDto: ApproveBookingDto): Promise<{
        status: HttpStatus;
        data: {
            success: boolean;
            message: string;
            bookingId: string;
            approvedDate: Date;
        };
    }>;
    rejectBookingRequest(id: string, rejectionDto: RejectBookingDto): Promise<{
        status: HttpStatus;
        data: {
            success: boolean;
            message: string;
            bookingId: string;
            reason: any;
        };
    }>;
}
