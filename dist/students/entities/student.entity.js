"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = exports.StudentStatus = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../common/entities/base.entity");
const room_entity_1 = require("../../rooms/entities/room.entity");
const room_occupant_entity_1 = require("../../rooms/entities/room-occupant.entity");
const booking_request_entity_1 = require("../../bookings/entities/booking-request.entity");
const invoice_entity_1 = require("../../invoices/entities/invoice.entity");
const payment_entity_1 = require("../../payments/entities/payment.entity");
const ledger_entry_entity_1 = require("../../ledger/entities/ledger-entry.entity");
const discount_entity_1 = require("../../discounts/entities/discount.entity");
const student_contact_entity_1 = require("./student-contact.entity");
const student_academic_info_entity_1 = require("./student-academic-info.entity");
const student_financial_info_entity_1 = require("./student-financial-info.entity");
var StudentStatus;
(function (StudentStatus) {
    StudentStatus["ACTIVE"] = "Active";
    StudentStatus["INACTIVE"] = "Inactive";
    StudentStatus["SUSPENDED"] = "Suspended";
    StudentStatus["GRADUATED"] = "Graduated";
})(StudentStatus || (exports.StudentStatus = StudentStatus = {}));
let Student = class Student extends base_entity_1.BaseEntityWithCustomId {
};
exports.Student = Student;
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], Student.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20, unique: true }),
    __metadata("design:type", String)
], Student.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, unique: true }),
    __metadata("design:type", String)
], Student.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'enrollment_date', type: 'date', nullable: true }),
    __metadata("design:type", Date)
], Student.prototype, "enrollmentDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: StudentStatus,
        default: StudentStatus.ACTIVE
    }),
    __metadata("design:type", String)
], Student.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Student.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'room_id', nullable: true }),
    __metadata("design:type", String)
], Student.prototype, "roomId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'booking_request_id', length: 50, nullable: true }),
    __metadata("design:type", String)
], Student.prototype, "bookingRequestId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => room_entity_1.Room, room => room.students, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'room_id' }),
    __metadata("design:type", room_entity_1.Room)
], Student.prototype, "room", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => booking_request_entity_1.BookingRequest, booking => booking.student, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'booking_request_id' }),
    __metadata("design:type", booking_request_entity_1.BookingRequest)
], Student.prototype, "bookingRequest", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => student_contact_entity_1.StudentContact, contact => contact.student, { cascade: true }),
    __metadata("design:type", Array)
], Student.prototype, "contacts", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => student_academic_info_entity_1.StudentAcademicInfo, academic => academic.student, { cascade: true }),
    __metadata("design:type", Array)
], Student.prototype, "academicInfo", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => student_financial_info_entity_1.StudentFinancialInfo, financial => financial.student, { cascade: true }),
    __metadata("design:type", Array)
], Student.prototype, "financialInfo", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => invoice_entity_1.Invoice, invoice => invoice.student),
    __metadata("design:type", Array)
], Student.prototype, "invoices", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => payment_entity_1.Payment, payment => payment.student),
    __metadata("design:type", Array)
], Student.prototype, "payments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ledger_entry_entity_1.LedgerEntry, ledgerEntry => ledgerEntry.student),
    __metadata("design:type", Array)
], Student.prototype, "ledgerEntries", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => discount_entity_1.Discount, discount => discount.student),
    __metadata("design:type", Array)
], Student.prototype, "discounts", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => room_occupant_entity_1.RoomOccupant, occupant => occupant.student),
    __metadata("design:type", Array)
], Student.prototype, "roomOccupancy", void 0);
exports.Student = Student = __decorate([
    (0, typeorm_1.Entity)('students'),
    (0, typeorm_1.Index)(['email'], { unique: true }),
    (0, typeorm_1.Index)(['phone'], { unique: true }),
    (0, typeorm_1.Index)(['status']),
    (0, typeorm_1.Index)(['enrollmentDate'])
], Student);
//# sourceMappingURL=student.entity.js.map