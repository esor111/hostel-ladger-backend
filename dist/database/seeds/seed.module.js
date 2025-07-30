"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const seed_controller_1 = require("./seed.controller");
const seed_service_1 = require("./seed.service");
const student_entity_1 = require("../../students/entities/student.entity");
const student_contact_entity_1 = require("../../students/entities/student-contact.entity");
const student_academic_info_entity_1 = require("../../students/entities/student-academic-info.entity");
const student_financial_info_entity_1 = require("../../students/entities/student-financial-info.entity");
const room_entity_1 = require("../../rooms/entities/room.entity");
const building_entity_1 = require("../../rooms/entities/building.entity");
const room_type_entity_1 = require("../../rooms/entities/room-type.entity");
const amenity_entity_1 = require("../../rooms/entities/amenity.entity");
const room_amenity_entity_1 = require("../../rooms/entities/room-amenity.entity");
const room_occupant_entity_1 = require("../../rooms/entities/room-occupant.entity");
const room_layout_entity_1 = require("../../rooms/entities/room-layout.entity");
const invoice_entity_1 = require("../../invoices/entities/invoice.entity");
const invoice_item_entity_1 = require("../../invoices/entities/invoice-item.entity");
const payment_entity_1 = require("../../payments/entities/payment.entity");
const payment_invoice_allocation_entity_1 = require("../../payments/entities/payment-invoice-allocation.entity");
const ledger_entry_entity_1 = require("../../ledger/entities/ledger-entry.entity");
const discount_entity_1 = require("../../discounts/entities/discount.entity");
const discount_type_entity_1 = require("../../discounts/entities/discount-type.entity");
const booking_request_entity_1 = require("../../bookings/entities/booking-request.entity");
const report_entity_1 = require("../../reports/entities/report.entity");
let SeedModule = class SeedModule {
};
exports.SeedModule = SeedModule;
exports.SeedModule = SeedModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                student_entity_1.Student,
                student_contact_entity_1.StudentContact,
                student_academic_info_entity_1.StudentAcademicInfo,
                student_financial_info_entity_1.StudentFinancialInfo,
                room_entity_1.Room,
                building_entity_1.Building,
                room_type_entity_1.RoomType,
                amenity_entity_1.Amenity,
                room_amenity_entity_1.RoomAmenity,
                room_occupant_entity_1.RoomOccupant,
                room_layout_entity_1.RoomLayout,
                invoice_entity_1.Invoice,
                invoice_item_entity_1.InvoiceItem,
                payment_entity_1.Payment,
                payment_invoice_allocation_entity_1.PaymentInvoiceAllocation,
                ledger_entry_entity_1.LedgerEntry,
                discount_entity_1.Discount,
                discount_type_entity_1.DiscountType,
                booking_request_entity_1.BookingRequest,
                report_entity_1.Report,
            ]),
        ],
        controllers: [seed_controller_1.SeedController],
        providers: [seed_service_1.SeedService],
        exports: [seed_service_1.SeedService],
    })
], SeedModule);
//# sourceMappingURL=seed.module.js.map