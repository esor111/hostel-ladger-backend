import { CreateBookingDto } from './create-booking.dto';
declare const UpdateBookingDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateBookingDto>>;
export declare class UpdateBookingDto extends UpdateBookingDto_base {
    name?: string;
    phone?: string;
    email?: string;
    guardianName?: string;
    guardianPhone?: string;
    preferredRoom?: string;
    course?: string;
    institution?: string;
    checkInDate?: string;
    duration?: number;
    notes?: string;
    emergencyContact?: string;
    address?: string;
    idProofType?: string;
    idProofNumber?: string;
}
export {};
