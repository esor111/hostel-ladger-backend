"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const reports_controller_1 = require("./reports.controller");
const reports_service_1 = require("./reports.service");
const report_entity_1 = require("./entities/report.entity");
const student_entity_1 = require("../students/entities/student.entity");
const room_entity_1 = require("../rooms/entities/room.entity");
const invoice_entity_1 = require("../invoices/entities/invoice.entity");
const payment_entity_1 = require("../payments/entities/payment.entity");
const ledger_entry_entity_1 = require("../ledger/entities/ledger-entry.entity");
const discount_entity_1 = require("../discounts/entities/discount.entity");
const booking_request_entity_1 = require("../bookings/entities/booking-request.entity");
let ReportsModule = class ReportsModule {
};
exports.ReportsModule = ReportsModule;
exports.ReportsModule = ReportsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([
                report_entity_1.Report,
                student_entity_1.Student,
                room_entity_1.Room,
                invoice_entity_1.Invoice,
                payment_entity_1.Payment,
                ledger_entry_entity_1.LedgerEntry,
                discount_entity_1.Discount,
                booking_request_entity_1.BookingRequest
            ])],
        controllers: [reports_controller_1.ReportsController],
        providers: [reports_service_1.ReportsService],
        exports: [reports_service_1.ReportsService],
    })
], ReportsModule);
//# sourceMappingURL=reports.module.js.map