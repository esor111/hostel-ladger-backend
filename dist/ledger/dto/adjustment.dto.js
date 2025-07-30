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
exports.AdjustmentDto = exports.AdjustmentType = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
var AdjustmentType;
(function (AdjustmentType) {
    AdjustmentType["DEBIT"] = "debit";
    AdjustmentType["CREDIT"] = "credit";
})(AdjustmentType || (exports.AdjustmentType = AdjustmentType = {}));
class AdjustmentDto {
}
exports.AdjustmentDto = AdjustmentDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Transform)(({ value }) => value?.trim()),
    __metadata("design:type", String)
], AdjustmentDto.prototype, "studentId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_transformer_1.Transform)(({ value }) => parseFloat(value)),
    __metadata("design:type", Number)
], AdjustmentDto.prototype, "amount", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Transform)(({ value }) => value?.trim()),
    __metadata("design:type", String)
], AdjustmentDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(AdjustmentType),
    __metadata("design:type", String)
], AdjustmentDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Transform)(({ value }) => value?.trim()),
    __metadata("design:type", String)
], AdjustmentDto.prototype, "createdBy", void 0);
//# sourceMappingURL=adjustment.dto.js.map