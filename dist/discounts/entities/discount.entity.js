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
exports.Discount = exports.DiscountApplication = exports.DiscountStatus = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../common/entities/base.entity");
const student_entity_1 = require("../../students/entities/student.entity");
const discount_type_entity_1 = require("./discount-type.entity");
var DiscountStatus;
(function (DiscountStatus) {
    DiscountStatus["ACTIVE"] = "active";
    DiscountStatus["EXPIRED"] = "expired";
    DiscountStatus["CANCELLED"] = "cancelled";
    DiscountStatus["USED"] = "used";
})(DiscountStatus || (exports.DiscountStatus = DiscountStatus = {}));
var DiscountApplication;
(function (DiscountApplication) {
    DiscountApplication["LEDGER"] = "ledger";
    DiscountApplication["INVOICE"] = "invoice";
    DiscountApplication["PAYMENT"] = "payment";
})(DiscountApplication || (exports.DiscountApplication = DiscountApplication = {}));
let Discount = class Discount extends base_entity_1.BaseEntityWithCustomId {
    get studentName() {
        return this.student?.name || '';
    }
    get room() {
        return this.student?.room?.roomNumber || '';
    }
};
exports.Discount = Discount;
__decorate([
    (0, typeorm_1.Column)({ name: 'student_id', length: 50 }),
    __metadata("design:type", String)
], Discount.prototype, "studentId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'discount_type_id', nullable: true }),
    __metadata("design:type", String)
], Discount.prototype, "discountTypeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Discount.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], Discount.prototype, "reason", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Discount.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'applied_by', length: 100, default: 'Admin' }),
    __metadata("design:type", String)
], Discount.prototype, "appliedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], Discount.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: DiscountStatus,
        default: DiscountStatus.ACTIVE
    }),
    __metadata("design:type", String)
], Discount.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'applied_to',
        type: 'enum',
        enum: DiscountApplication,
        default: DiscountApplication.LEDGER
    }),
    __metadata("design:type", String)
], Discount.prototype, "appliedTo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'valid_from', type: 'date', nullable: true }),
    __metadata("design:type", Date)
], Discount.prototype, "validFrom", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'valid_to', type: 'date', nullable: true }),
    __metadata("design:type", Date)
], Discount.prototype, "validTo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_percentage', default: false }),
    __metadata("design:type", Boolean)
], Discount.prototype, "isPercentage", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'percentage_value', type: 'decimal', precision: 5, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], Discount.prototype, "percentageValue", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'max_amount', type: 'decimal', precision: 10, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], Discount.prototype, "maxAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'reference_id', length: 50, nullable: true }),
    __metadata("design:type", String)
], Discount.prototype, "referenceId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => student_entity_1.Student, student => student.discounts, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'student_id' }),
    __metadata("design:type", student_entity_1.Student)
], Discount.prototype, "student", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => discount_type_entity_1.DiscountType, discountType => discountType.discounts, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'discount_type_id' }),
    __metadata("design:type", discount_type_entity_1.DiscountType)
], Discount.prototype, "discountType", void 0);
exports.Discount = Discount = __decorate([
    (0, typeorm_1.Entity)('discounts'),
    (0, typeorm_1.Index)(['studentId']),
    (0, typeorm_1.Index)(['status']),
    (0, typeorm_1.Index)(['date']),
    (0, typeorm_1.Index)(['discountTypeId'])
], Discount);
//# sourceMappingURL=discount.entity.js.map