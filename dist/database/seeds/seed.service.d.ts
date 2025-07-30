import { Repository } from "typeorm";
import { Student } from "../../students/entities/student.entity";
import { StudentContact } from "../../students/entities/student-contact.entity";
import { StudentAcademicInfo } from "../../students/entities/student-academic-info.entity";
import { StudentFinancialInfo } from "../../students/entities/student-financial-info.entity";
import { Room } from "../../rooms/entities/room.entity";
import { Building, BuildingStatus } from "../../rooms/entities/building.entity";
import { RoomType, PricingModel } from "../../rooms/entities/room-type.entity";
import { Amenity, AmenityCategory } from "../../rooms/entities/amenity.entity";
import { RoomAmenity } from "../../rooms/entities/room-amenity.entity";
import { RoomLayout } from "../../rooms/entities/room-layout.entity";
import { RoomOccupant } from "../../rooms/entities/room-occupant.entity";
import { Invoice } from "../../invoices/entities/invoice.entity";
import { InvoiceItem } from "../../invoices/entities/invoice-item.entity";
import { Payment, PaymentMethod, PaymentStatus } from "../../payments/entities/payment.entity";
import { PaymentInvoiceAllocation } from "../../payments/entities/payment-invoice-allocation.entity";
import { LedgerEntry, LedgerEntryType, BalanceType } from "../../ledger/entities/ledger-entry.entity";
import { Discount, DiscountStatus, DiscountApplication } from "../../discounts/entities/discount.entity";
import { DiscountType, DiscountCategory } from "../../discounts/entities/discount-type.entity";
import { BookingRequest, BookingStatus } from "../../bookings/entities/booking-request.entity";
import { Report } from "../../reports/entities/report.entity";
export declare class SeedService {
    private studentRepository;
    private studentContactRepository;
    private studentAcademicRepository;
    private studentFinancialRepository;
    private roomRepository;
    private buildingRepository;
    private roomTypeRepository;
    private amenityRepository;
    private roomAmenityRepository;
    private roomLayoutRepository;
    private roomOccupantRepository;
    private invoiceRepository;
    private invoiceItemRepository;
    private paymentRepository;
    private paymentAllocationRepository;
    private ledgerRepository;
    private discountRepository;
    private discountTypeRepository;
    private bookingRepository;
    private reportRepository;
    private readonly logger;
    constructor(studentRepository: Repository<Student>, studentContactRepository: Repository<StudentContact>, studentAcademicRepository: Repository<StudentAcademicInfo>, studentFinancialRepository: Repository<StudentFinancialInfo>, roomRepository: Repository<Room>, buildingRepository: Repository<Building>, roomTypeRepository: Repository<RoomType>, amenityRepository: Repository<Amenity>, roomAmenityRepository: Repository<RoomAmenity>, roomLayoutRepository: Repository<RoomLayout>, roomOccupantRepository: Repository<RoomOccupant>, invoiceRepository: Repository<Invoice>, invoiceItemRepository: Repository<InvoiceItem>, paymentRepository: Repository<Payment>, paymentAllocationRepository: Repository<PaymentInvoiceAllocation>, ledgerRepository: Repository<LedgerEntry>, discountRepository: Repository<Discount>, discountTypeRepository: Repository<DiscountType>, bookingRepository: Repository<BookingRequest>, reportRepository: Repository<Report>);
    checkSeedStatus(): Promise<{
        buildings: number;
        roomTypes: number;
        amenities: number;
        rooms: number;
        roomOccupants: number;
        students: number;
        studentContacts: number;
        studentAcademic: number;
        studentFinancial: number;
        discountTypes: number;
        discounts: number;
        invoices: number;
        invoiceItems: number;
        payments: number;
        paymentAllocations: number;
        ledgerEntries: number;
        bookings: number;
        reports: number;
        lastSeeded: string;
    }>;
    seedAll(force?: boolean): Promise<{
        buildings: {
            message: string;
            count: number;
            data?: undefined;
        } | {
            count: number;
            data: ({
                id: string;
                name: string;
                address: string;
                totalFloors: number;
                totalRooms: number;
                status: BuildingStatus;
                description: string;
                facilities: string[];
                contactInfo: {
                    phone: string;
                    email: string;
                };
                isActive: boolean;
            } & Building)[];
            message?: undefined;
        };
        roomTypes: {
            message: string;
            count: number;
            data?: undefined;
        } | {
            count: number;
            data: ({
                id: string;
                name: string;
                description: string;
                defaultBedCount: number;
                maxOccupancy: number;
                baseMonthlyRate: number;
                baseDailyRate: number;
                pricingModel: PricingModel;
                features: string[];
                isActive: boolean;
            } & RoomType)[];
            message?: undefined;
        };
        amenities: {
            message: string;
            count: number;
            data?: undefined;
        } | {
            count: number;
            data: ({
                name: string;
                category: AmenityCategory;
                description: string;
                maintenanceRequired: boolean;
                isActive: boolean;
            } & Amenity)[];
            message?: undefined;
        };
        rooms: {
            message: string;
            count: number;
            data?: undefined;
        } | {
            count: number;
            data: {
                rooms: number;
                amenities: number;
                layouts: number;
            };
            message?: undefined;
        };
        students: {
            message: string;
            count: number;
            data?: undefined;
        } | {
            count: number;
            data: {
                students: number;
                contacts: number;
                academic: number;
                financial: number;
            };
            message?: undefined;
        };
        roomOccupants: {
            message: string;
            count: number;
            data?: undefined;
        } | {
            count: number;
            data: ({
                roomId: string;
                studentId: string;
                checkInDate: Date;
                bedNumber: string;
                status: string;
                notes: string;
                assignedBy: string;
            } & RoomOccupant)[];
            message?: undefined;
        };
        discountTypes: {
            message: string;
            count: number;
            data?: undefined;
        } | {
            count: number;
            data: (({
                name: string;
                category: DiscountCategory;
                description: string;
                defaultAmount: number;
                isPercentage: boolean;
                percentageValue: any;
                maxAmount: number;
                requiresApproval: boolean;
                autoApply: boolean;
                isActive: boolean;
            } | {
                name: string;
                category: DiscountCategory;
                description: string;
                defaultAmount: any;
                isPercentage: boolean;
                percentageValue: number;
                maxAmount: number;
                requiresApproval: boolean;
                autoApply: boolean;
                isActive: boolean;
            }) & DiscountType)[];
            message?: undefined;
        };
        invoices: {
            message: string;
            count: number;
            data?: undefined;
        } | {
            count: number;
            data: {
                invoices: number;
                items: number;
            };
            message?: undefined;
        };
        payments: {
            message: string;
            count: number;
            data?: undefined;
        } | {
            count: number;
            data: ({
                id: string;
                studentId: string;
                amount: number;
                paymentDate: Date;
                paymentMethod: PaymentMethod;
                transactionId: string;
                referenceNumber: string;
                status: PaymentStatus;
                notes: string;
                processedBy: string;
                bankName: string;
            } & Payment)[];
            message?: undefined;
        };
        paymentAllocations: {
            message: string;
            count: number;
            data?: undefined;
        } | {
            count: number;
            data: ({
                paymentId: string;
                invoiceId: string;
                amount: number;
                allocationDate: Date;
                notes: string;
                isActive: boolean;
            } & PaymentInvoiceAllocation)[];
            message?: undefined;
        };
        discounts: {
            message: string;
            count: number;
            data?: undefined;
        } | {
            count: number;
            data: ({
                id: string;
                studentId: string;
                discountTypeId: string;
                amount: number;
                reason: string;
                notes: string;
                appliedBy: string;
                date: Date;
                status: DiscountStatus;
                appliedTo: DiscountApplication;
                validFrom: Date;
                validTo: Date;
                isPercentage: boolean;
                percentageValue: number;
                maxAmount: number;
                referenceId: string;
            } & Discount)[];
            message?: undefined;
        };
        ledgerEntries: {
            message: string;
            count: number;
            data?: undefined;
        } | {
            count: number;
            data: ({
                id: string;
                studentId: string;
                type: LedgerEntryType;
                date: Date;
                description: string;
                referenceId: string;
                debit: number;
                credit: number;
                balance: number;
                balanceType: BalanceType;
                notes: string;
            } & LedgerEntry)[];
            message?: undefined;
        };
        bookings: {
            message: string;
            count: number;
            data?: undefined;
        } | {
            count: number;
            data: ({
                id: string;
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
                priorityScore: number;
                source: string;
                approvedDate: Date;
                processedBy: string;
                assignedRoom: string;
            } & BookingRequest)[];
            message?: undefined;
        };
    }>;
    seedBuildings(force?: boolean): Promise<{
        message: string;
        count: number;
        data?: undefined;
    } | {
        count: number;
        data: ({
            id: string;
            name: string;
            address: string;
            totalFloors: number;
            totalRooms: number;
            status: BuildingStatus;
            description: string;
            facilities: string[];
            contactInfo: {
                phone: string;
                email: string;
            };
            isActive: boolean;
        } & Building)[];
        message?: undefined;
    }>;
    seedRoomTypes(force?: boolean): Promise<{
        message: string;
        count: number;
        data?: undefined;
    } | {
        count: number;
        data: ({
            id: string;
            name: string;
            description: string;
            defaultBedCount: number;
            maxOccupancy: number;
            baseMonthlyRate: number;
            baseDailyRate: number;
            pricingModel: PricingModel;
            features: string[];
            isActive: boolean;
        } & RoomType)[];
        message?: undefined;
    }>;
    seedAmenities(force?: boolean): Promise<{
        message: string;
        count: number;
        data?: undefined;
    } | {
        count: number;
        data: ({
            name: string;
            category: AmenityCategory;
            description: string;
            maintenanceRequired: boolean;
            isActive: boolean;
        } & Amenity)[];
        message?: undefined;
    }>;
    seedRooms(force?: boolean): Promise<{
        message: string;
        count: number;
        data?: undefined;
    } | {
        count: number;
        data: {
            rooms: number;
            amenities: number;
            layouts: number;
        };
        message?: undefined;
    }>;
    seedStudents(force?: boolean): Promise<{
        message: string;
        count: number;
        data?: undefined;
    } | {
        count: number;
        data: {
            students: number;
            contacts: number;
            academic: number;
            financial: number;
        };
        message?: undefined;
    }>;
    seedInvoices(force?: boolean): Promise<{
        message: string;
        count: number;
        data?: undefined;
    } | {
        count: number;
        data: {
            invoices: number;
            items: number;
        };
        message?: undefined;
    }>;
    seedPayments(force?: boolean): Promise<{
        message: string;
        count: number;
        data?: undefined;
    } | {
        count: number;
        data: ({
            id: string;
            studentId: string;
            amount: number;
            paymentDate: Date;
            paymentMethod: PaymentMethod;
            transactionId: string;
            referenceNumber: string;
            status: PaymentStatus;
            notes: string;
            processedBy: string;
            bankName: string;
        } & Payment)[];
        message?: undefined;
    }>;
    seedDiscounts(force?: boolean): Promise<{
        message: string;
        count: number;
        data?: undefined;
    } | {
        count: number;
        data: ({
            id: string;
            studentId: string;
            discountTypeId: string;
            amount: number;
            reason: string;
            notes: string;
            appliedBy: string;
            date: Date;
            status: DiscountStatus;
            appliedTo: DiscountApplication;
            validFrom: Date;
            validTo: Date;
            isPercentage: boolean;
            percentageValue: number;
            maxAmount: number;
            referenceId: string;
        } & Discount)[];
        message?: undefined;
    }>;
    seedRoomOccupants(force?: boolean): Promise<{
        message: string;
        count: number;
        data?: undefined;
    } | {
        count: number;
        data: ({
            roomId: string;
            studentId: string;
            checkInDate: Date;
            bedNumber: string;
            status: string;
            notes: string;
            assignedBy: string;
        } & RoomOccupant)[];
        message?: undefined;
    }>;
    seedDiscountTypes(force?: boolean): Promise<{
        message: string;
        count: number;
        data?: undefined;
    } | {
        count: number;
        data: (({
            name: string;
            category: DiscountCategory;
            description: string;
            defaultAmount: number;
            isPercentage: boolean;
            percentageValue: any;
            maxAmount: number;
            requiresApproval: boolean;
            autoApply: boolean;
            isActive: boolean;
        } | {
            name: string;
            category: DiscountCategory;
            description: string;
            defaultAmount: any;
            isPercentage: boolean;
            percentageValue: number;
            maxAmount: number;
            requiresApproval: boolean;
            autoApply: boolean;
            isActive: boolean;
        }) & DiscountType)[];
        message?: undefined;
    }>;
    seedPaymentAllocations(force?: boolean): Promise<{
        message: string;
        count: number;
        data?: undefined;
    } | {
        count: number;
        data: ({
            paymentId: string;
            invoiceId: string;
            amount: number;
            allocationDate: Date;
            notes: string;
            isActive: boolean;
        } & PaymentInvoiceAllocation)[];
        message?: undefined;
    }>;
    seedLedgerEntries(force?: boolean): Promise<{
        message: string;
        count: number;
        data?: undefined;
    } | {
        count: number;
        data: ({
            id: string;
            studentId: string;
            type: LedgerEntryType;
            date: Date;
            description: string;
            referenceId: string;
            debit: number;
            credit: number;
            balance: number;
            balanceType: BalanceType;
            notes: string;
        } & LedgerEntry)[];
        message?: undefined;
    }>;
    seedBookings(force?: boolean): Promise<{
        message: string;
        count: number;
        data?: undefined;
    } | {
        count: number;
        data: ({
            id: string;
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
            priorityScore: number;
            source: string;
            approvedDate: Date;
            processedBy: string;
            assignedRoom: string;
        } & BookingRequest)[];
        message?: undefined;
    }>;
    seedCustomData(seedData: any): Promise<{}>;
    clearAllData(): Promise<any>;
    clearEntityData(entityType: string): Promise<any>;
}
