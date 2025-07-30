"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSourceOptions = void 0;
const typeorm_1 = require("typeorm");
const dotenv_1 = require("dotenv");
const student_entity_1 = require("../students/entities/student.entity");
const student_contact_entity_1 = require("../students/entities/student-contact.entity");
const student_academic_info_entity_1 = require("../students/entities/student-academic-info.entity");
const student_financial_info_entity_1 = require("../students/entities/student-financial-info.entity");
const room_entity_1 = require("../rooms/entities/room.entity");
const building_entity_1 = require("../rooms/entities/building.entity");
const room_type_entity_1 = require("../rooms/entities/room-type.entity");
const amenity_entity_1 = require("../rooms/entities/amenity.entity");
const room_amenity_entity_1 = require("../rooms/entities/room-amenity.entity");
const room_occupant_entity_1 = require("../rooms/entities/room-occupant.entity");
const room_layout_entity_1 = require("../rooms/entities/room-layout.entity");
const invoice_entity_1 = require("../invoices/entities/invoice.entity");
const invoice_item_entity_1 = require("../invoices/entities/invoice-item.entity");
const payment_entity_1 = require("../payments/entities/payment.entity");
const payment_invoice_allocation_entity_1 = require("../payments/entities/payment-invoice-allocation.entity");
const ledger_entry_entity_1 = require("../ledger/entities/ledger-entry.entity");
const discount_entity_1 = require("../discounts/entities/discount.entity");
const discount_type_entity_1 = require("../discounts/entities/discount-type.entity");
const booking_request_entity_1 = require("../bookings/entities/booking-request.entity");
const report_entity_1 = require("../reports/entities/report.entity");
(0, dotenv_1.config)();
exports.dataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME || 'kaha_user',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'kaha_hostel_db',
    entities: [
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
    ],
    migrations: ['src/database/migrations/*{.ts,.js}'],
    synchronize: false,
    logging: process.env.NODE_ENV === 'development',
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    migrationsRun: false,
    migrationsTableName: 'typeorm_migrations',
};
const dataSource = new typeorm_1.DataSource(exports.dataSourceOptions);
exports.default = dataSource;
//# sourceMappingURL=data-source.js.map