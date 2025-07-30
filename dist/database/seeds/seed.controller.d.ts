import { SeedService } from './seed.service';
export declare class SeedController {
    private readonly seedService;
    constructor(seedService: SeedService);
    getSeedStatus(): Promise<{
        status: number;
        message: string;
        data: {
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
        };
    }>;
    seedAll(force?: string): Promise<{
        status: number;
        message: string;
        data: {
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
                    status: import("../../rooms/entities/building.entity").BuildingStatus;
                    description: string;
                    facilities: string[];
                    contactInfo: {
                        phone: string;
                        email: string;
                    };
                    isActive: boolean;
                } & import("../../rooms/entities/building.entity").Building)[];
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
                    pricingModel: import("../../rooms/entities/room-type.entity").PricingModel;
                    features: string[];
                    isActive: boolean;
                } & import("../../rooms/entities/room-type.entity").RoomType)[];
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
                    category: import("../../rooms/entities/amenity.entity").AmenityCategory;
                    description: string;
                    maintenanceRequired: boolean;
                    isActive: boolean;
                } & import("../../rooms/entities/amenity.entity").Amenity)[];
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
                } & import("../../rooms/entities/room-occupant.entity").RoomOccupant)[];
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
                    category: import("../../discounts/entities/discount-type.entity").DiscountCategory;
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
                    category: import("../../discounts/entities/discount-type.entity").DiscountCategory;
                    description: string;
                    defaultAmount: any;
                    isPercentage: boolean;
                    percentageValue: number;
                    maxAmount: number;
                    requiresApproval: boolean;
                    autoApply: boolean;
                    isActive: boolean;
                }) & import("../../discounts/entities/discount-type.entity").DiscountType)[];
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
                    paymentMethod: import("../../payments/entities/payment.entity").PaymentMethod;
                    transactionId: string;
                    referenceNumber: string;
                    status: import("../../payments/entities/payment.entity").PaymentStatus;
                    notes: string;
                    processedBy: string;
                    bankName: string;
                } & import("../../payments/entities/payment.entity").Payment)[];
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
                } & import("../../payments/entities/payment-invoice-allocation.entity").PaymentInvoiceAllocation)[];
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
                    status: import("../../discounts/entities/discount.entity").DiscountStatus;
                    appliedTo: import("../../discounts/entities/discount.entity").DiscountApplication;
                    validFrom: Date;
                    validTo: Date;
                    isPercentage: boolean;
                    percentageValue: number;
                    maxAmount: number;
                    referenceId: string;
                } & import("../../discounts/entities/discount.entity").Discount)[];
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
                    type: import("../../ledger/entities/ledger-entry.entity").LedgerEntryType;
                    date: Date;
                    description: string;
                    referenceId: string;
                    debit: number;
                    credit: number;
                    balance: number;
                    balanceType: import("../../ledger/entities/ledger-entry.entity").BalanceType;
                    notes: string;
                } & import("../../ledger/entities/ledger-entry.entity").LedgerEntry)[];
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
                    status: import("../../bookings/entities/booking-request.entity").BookingStatus;
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
                } & import("../../bookings/entities/booking-request.entity").BookingRequest)[];
                message?: undefined;
            };
        };
    }>;
    seedBuildings(force?: string): Promise<{
        status: number;
        message: string;
        data: {
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
                status: import("../../rooms/entities/building.entity").BuildingStatus;
                description: string;
                facilities: string[];
                contactInfo: {
                    phone: string;
                    email: string;
                };
                isActive: boolean;
            } & import("../../rooms/entities/building.entity").Building)[];
            message?: undefined;
        };
    }>;
    seedRoomTypes(force?: string): Promise<{
        status: number;
        message: string;
        data: {
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
                pricingModel: import("../../rooms/entities/room-type.entity").PricingModel;
                features: string[];
                isActive: boolean;
            } & import("../../rooms/entities/room-type.entity").RoomType)[];
            message?: undefined;
        };
    }>;
    seedAmenities(force?: string): Promise<{
        status: number;
        message: string;
        data: {
            message: string;
            count: number;
            data?: undefined;
        } | {
            count: number;
            data: ({
                name: string;
                category: import("../../rooms/entities/amenity.entity").AmenityCategory;
                description: string;
                maintenanceRequired: boolean;
                isActive: boolean;
            } & import("../../rooms/entities/amenity.entity").Amenity)[];
            message?: undefined;
        };
    }>;
    seedRooms(force?: string): Promise<{
        status: number;
        message: string;
        data: {
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
    }>;
    seedStudents(force?: string): Promise<{
        status: number;
        message: string;
        data: {
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
    }>;
    seedInvoices(force?: string): Promise<{
        status: number;
        message: string;
        data: {
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
    }>;
    seedPayments(force?: string): Promise<{
        status: number;
        message: string;
        data: {
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
                paymentMethod: import("../../payments/entities/payment.entity").PaymentMethod;
                transactionId: string;
                referenceNumber: string;
                status: import("../../payments/entities/payment.entity").PaymentStatus;
                notes: string;
                processedBy: string;
                bankName: string;
            } & import("../../payments/entities/payment.entity").Payment)[];
            message?: undefined;
        };
    }>;
    seedDiscounts(force?: string): Promise<{
        status: number;
        message: string;
        data: {
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
                status: import("../../discounts/entities/discount.entity").DiscountStatus;
                appliedTo: import("../../discounts/entities/discount.entity").DiscountApplication;
                validFrom: Date;
                validTo: Date;
                isPercentage: boolean;
                percentageValue: number;
                maxAmount: number;
                referenceId: string;
            } & import("../../discounts/entities/discount.entity").Discount)[];
            message?: undefined;
        };
    }>;
    seedRoomOccupants(force?: string): Promise<{
        status: number;
        message: string;
        data: {
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
            } & import("../../rooms/entities/room-occupant.entity").RoomOccupant)[];
            message?: undefined;
        };
    }>;
    seedDiscountTypes(force?: string): Promise<{
        status: number;
        message: string;
        data: {
            message: string;
            count: number;
            data?: undefined;
        } | {
            count: number;
            data: (({
                name: string;
                category: import("../../discounts/entities/discount-type.entity").DiscountCategory;
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
                category: import("../../discounts/entities/discount-type.entity").DiscountCategory;
                description: string;
                defaultAmount: any;
                isPercentage: boolean;
                percentageValue: number;
                maxAmount: number;
                requiresApproval: boolean;
                autoApply: boolean;
                isActive: boolean;
            }) & import("../../discounts/entities/discount-type.entity").DiscountType)[];
            message?: undefined;
        };
    }>;
    seedPaymentAllocations(force?: string): Promise<{
        status: number;
        message: string;
        data: {
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
            } & import("../../payments/entities/payment-invoice-allocation.entity").PaymentInvoiceAllocation)[];
            message?: undefined;
        };
    }>;
    seedLedgerEntries(force?: string): Promise<{
        status: number;
        message: string;
        data: {
            message: string;
            count: number;
            data?: undefined;
        } | {
            count: number;
            data: ({
                id: string;
                studentId: string;
                type: import("../../ledger/entities/ledger-entry.entity").LedgerEntryType;
                date: Date;
                description: string;
                referenceId: string;
                debit: number;
                credit: number;
                balance: number;
                balanceType: import("../../ledger/entities/ledger-entry.entity").BalanceType;
                notes: string;
            } & import("../../ledger/entities/ledger-entry.entity").LedgerEntry)[];
            message?: undefined;
        };
    }>;
    seedBookings(force?: string): Promise<{
        status: number;
        message: string;
        data: {
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
                status: import("../../bookings/entities/booking-request.entity").BookingStatus;
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
            } & import("../../bookings/entities/booking-request.entity").BookingRequest)[];
            message?: undefined;
        };
    }>;
    seedCustomData(seedData: any): Promise<{
        status: number;
        message: string;
        data: {};
    }>;
    clearAllData(confirm?: string): Promise<{
        status: number;
        message: string;
        data: any;
    }>;
    clearEntityData(entity: string, confirm?: string): Promise<{
        status: number;
        message: string;
        data: any;
    }>;
}
