import { BaseEntityWithCustomId } from '../../common/entities/base.entity';
import { Room } from '../../rooms/entities/room.entity';
import { RoomOccupant } from '../../rooms/entities/room-occupant.entity';
import { BookingRequest } from '../../bookings/entities/booking-request.entity';
import { Invoice } from '../../invoices/entities/invoice.entity';
import { Payment } from '../../payments/entities/payment.entity';
import { LedgerEntry } from '../../ledger/entities/ledger-entry.entity';
import { Discount } from '../../discounts/entities/discount.entity';
import { StudentContact } from './student-contact.entity';
import { StudentAcademicInfo } from './student-academic-info.entity';
import { StudentFinancialInfo } from './student-financial-info.entity';
export declare enum StudentStatus {
    ACTIVE = "Active",
    INACTIVE = "Inactive",
    SUSPENDED = "Suspended",
    GRADUATED = "Graduated"
}
export declare class Student extends BaseEntityWithCustomId {
    name: string;
    phone: string;
    email: string;
    enrollmentDate: Date;
    status: StudentStatus;
    address: string;
    roomId: string;
    bookingRequestId: string;
    room: Room;
    bookingRequest: BookingRequest;
    contacts: StudentContact[];
    academicInfo: StudentAcademicInfo[];
    financialInfo: StudentFinancialInfo[];
    invoices: Invoice[];
    payments: Payment[];
    ledgerEntries: LedgerEntry[];
    discounts: Discount[];
    roomOccupancy: RoomOccupant[];
}
