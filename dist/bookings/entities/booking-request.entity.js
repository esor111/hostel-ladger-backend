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
exports.BookingRequest = exports.BookingStatus = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../common/entities/base.entity");
const student_entity_1 = require("../../students/entities/student.entity");
var BookingStatus;
(function (BookingStatus) {
    BookingStatus["PENDING"] = "Pending";
    BookingStatus["APPROVED"] = "Approved";
    BookingStatus["REJECTED"] = "Rejected";
    BookingStatus["CANCELLED"] = "Cancelled";
    BookingStatus["EXPIRED"] = "Expired";
})(BookingStatus || (exports.BookingStatus = BookingStatus = {}));
let BookingRequest = class BookingRequest extends base_entity_1.BaseEntityWithCustomId {
};
exports.BookingRequest = BookingRequest;
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], BookingRequest.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20 }),
    __metadata("design:type", String)
], BookingRequest.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], BookingRequest.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'guardian_name', length: 255, nullable: true }),
    __metadata("design:type", String)
], BookingRequest.prototype, "guardianName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'guardian_phone', length: 20, nullable: true }),
    __metadata("design:type", String)
], BookingRequest.prototype, "guardianPhone", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'preferred_room', length: 255, nullable: true }),
    __metadata("design:type", String)
], BookingRequest.prototype, "preferredRoom", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, nullable: true }),
    __metadata("design:type", String)
], BookingRequest.prototype, "course", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, nullable: true }),
    __metadata("design:type", String)
], BookingRequest.prototype, "institution", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'request_date', type: 'date' }),
    __metadata("design:type", Date)
], BookingRequest.prototype, "requestDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'check_in_date', type: 'date', nullable: true }),
    __metadata("design:type", Date)
], BookingRequest.prototype, "checkInDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, nullable: true }),
    __metadata("design:type", String)
], BookingRequest.prototype, "duration", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: BookingStatus,
        default: BookingStatus.PENDING
    }),
    __metadata("design:type", String)
], BookingRequest.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], BookingRequest.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'emergency_contact', length: 20, nullable: true }),
    __metadata("design:type", String)
], BookingRequest.prototype, "emergencyContact", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], BookingRequest.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'id_proof_type', length: 50, nullable: true }),
    __metadata("design:type", String)
], BookingRequest.prototype, "idProofType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'id_proof_number', length: 100, nullable: true }),
    __metadata("design:type", String)
], BookingRequest.prototype, "idProofNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'approved_date', type: 'date', nullable: true }),
    __metadata("design:type", Date)
], BookingRequest.prototype, "approvedDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'processed_by', length: 100, nullable: true }),
    __metadata("design:type", String)
], BookingRequest.prototype, "processedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'rejection_reason', type: 'text', nullable: true }),
    __metadata("design:type", String)
], BookingRequest.prototype, "rejectionReason", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'assigned_room', length: 50, nullable: true }),
    __metadata("design:type", String)
], BookingRequest.prototype, "assignedRoom", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'priority_score', type: 'int', default: 0 }),
    __metadata("design:type", Number)
], BookingRequest.prototype, "priorityScore", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'source', length: 50, default: 'website' }),
    __metadata("design:type", String)
], BookingRequest.prototype, "source", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => student_entity_1.Student, student => student.bookingRequest),
    __metadata("design:type", student_entity_1.Student)
], BookingRequest.prototype, "student", void 0);
exports.BookingRequest = BookingRequest = __decorate([
    (0, typeorm_1.Entity)('booking_requests'),
    (0, typeorm_1.Index)(['status']),
    (0, typeorm_1.Index)(['requestDate']),
    (0, typeorm_1.Index)(['checkInDate']),
    (0, typeorm_1.Index)(['phone']),
    (0, typeorm_1.Index)(['email'])
], BookingRequest);
//# sourceMappingURL=booking-request.entity.js.map