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
exports.StudentFinancialInfo = exports.FeeType = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../common/entities/base.entity");
const student_entity_1 = require("./student.entity");
var FeeType;
(function (FeeType) {
    FeeType["BASE_MONTHLY"] = "base_monthly";
    FeeType["LAUNDRY"] = "laundry";
    FeeType["FOOD"] = "food";
    FeeType["UTILITIES"] = "utilities";
    FeeType["MAINTENANCE"] = "maintenance";
    FeeType["SECURITY_DEPOSIT"] = "security_deposit";
})(FeeType || (exports.FeeType = FeeType = {}));
let StudentFinancialInfo = class StudentFinancialInfo extends base_entity_1.BaseEntity {
};
exports.StudentFinancialInfo = StudentFinancialInfo;
__decorate([
    (0, typeorm_1.Column)({ name: 'student_id', length: 50 }),
    __metadata("design:type", String)
], StudentFinancialInfo.prototype, "studentId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'fee_type',
        type: 'enum',
        enum: FeeType
    }),
    __metadata("design:type", String)
], StudentFinancialInfo.prototype, "feeType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], StudentFinancialInfo.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'effective_from', type: 'date' }),
    __metadata("design:type", Date)
], StudentFinancialInfo.prototype, "effectiveFrom", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'effective_to', type: 'date', nullable: true }),
    __metadata("design:type", Date)
], StudentFinancialInfo.prototype, "effectiveTo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active', default: true }),
    __metadata("design:type", Boolean)
], StudentFinancialInfo.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], StudentFinancialInfo.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => student_entity_1.Student, student => student.financialInfo, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'student_id' }),
    __metadata("design:type", student_entity_1.Student)
], StudentFinancialInfo.prototype, "student", void 0);
exports.StudentFinancialInfo = StudentFinancialInfo = __decorate([
    (0, typeorm_1.Entity)('student_financial_info'),
    (0, typeorm_1.Index)(['studentId', 'feeType']),
    (0, typeorm_1.Index)(['isActive'])
], StudentFinancialInfo);
//# sourceMappingURL=student-financial-info.entity.js.map