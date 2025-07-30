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
exports.CreateAdjustmentDto = exports.CreateLedgerEntryDto = exports.BalanceType = exports.LedgerEntryType = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
var LedgerEntryType;
(function (LedgerEntryType) {
    LedgerEntryType["INVOICE"] = "invoice";
    LedgerEntryType["PAYMENT"] = "payment";
    LedgerEntryType["DISCOUNT"] = "discount";
    LedgerEntryType["ADJUSTMENT"] = "adjustment";
    LedgerEntryType["REFUND"] = "refund";
})(LedgerEntryType || (exports.LedgerEntryType = LedgerEntryType = {}));
var BalanceType;
(function (BalanceType) {
    BalanceType["DR"] = "DR";
    BalanceType["CR"] = "CR";
    BalanceType["NIL"] = "NIL";
})(BalanceType || (exports.BalanceType = BalanceType = {}));
class CreateLedgerEntryDto {
}
exports.CreateLedgerEntryDto = CreateLedgerEntryDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLedgerEntryDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLedgerEntryDto.prototype, "studentId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateLedgerEntryDto.prototype, "date", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(LedgerEntryType),
    __metadata("design:type", String)
], CreateLedgerEntryDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLedgerEntryDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLedgerEntryDto.prototype, "referenceId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_transformer_1.Transform)(({ value }) => parseFloat(value)),
    __metadata("design:type", Number)
], CreateLedgerEntryDto.prototype, "debit", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_transformer_1.Transform)(({ value }) => parseFloat(value)),
    __metadata("design:type", Number)
], CreateLedgerEntryDto.prototype, "credit", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_transformer_1.Transform)(({ value }) => parseFloat(value)),
    __metadata("design:type", Number)
], CreateLedgerEntryDto.prototype, "balance", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(BalanceType),
    __metadata("design:type", String)
], CreateLedgerEntryDto.prototype, "balanceType", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLedgerEntryDto.prototype, "notes", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLedgerEntryDto.prototype, "createdBy", void 0);
class CreateAdjustmentDto {
}
exports.CreateAdjustmentDto = CreateAdjustmentDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAdjustmentDto.prototype, "studentId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0.01),
    (0, class_transformer_1.Transform)(({ value }) => parseFloat(value)),
    __metadata("design:type", Number)
], CreateAdjustmentDto.prototype, "amount", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAdjustmentDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(['debit', 'credit']),
    __metadata("design:type", String)
], CreateAdjustmentDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAdjustmentDto.prototype, "createdBy", void 0);
//# sourceMappingURL=create-ledger-entry.dto.js.map