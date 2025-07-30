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
exports.DiscountType = exports.DiscountCategory = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../common/entities/base.entity");
const discount_entity_1 = require("./discount.entity");
var DiscountCategory;
(function (DiscountCategory) {
    DiscountCategory["ACADEMIC"] = "academic";
    DiscountCategory["FINANCIAL_HARDSHIP"] = "financial_hardship";
    DiscountCategory["EARLY_PAYMENT"] = "early_payment";
    DiscountCategory["LOYALTY"] = "loyalty";
    DiscountCategory["PROMOTIONAL"] = "promotional";
    DiscountCategory["STAFF"] = "staff";
    DiscountCategory["SIBLING"] = "sibling";
})(DiscountCategory || (exports.DiscountCategory = DiscountCategory = {}));
let DiscountType = class DiscountType extends base_entity_1.BaseEntity {
};
exports.DiscountType = DiscountType;
__decorate([
    (0, typeorm_1.Column)({ length: 100, unique: true }),
    __metadata("design:type", String)
], DiscountType.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: DiscountCategory
    }),
    __metadata("design:type", String)
], DiscountType.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], DiscountType.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'default_amount', type: 'decimal', precision: 10, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], DiscountType.prototype, "defaultAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_percentage', default: false }),
    __metadata("design:type", Boolean)
], DiscountType.prototype, "isPercentage", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'percentage_value', type: 'decimal', precision: 5, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], DiscountType.prototype, "percentageValue", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'max_amount', type: 'decimal', precision: 10, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], DiscountType.prototype, "maxAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'requires_approval', default: false }),
    __metadata("design:type", Boolean)
], DiscountType.prototype, "requiresApproval", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'auto_apply', default: false }),
    __metadata("design:type", Boolean)
], DiscountType.prototype, "autoApply", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active', default: true }),
    __metadata("design:type", Boolean)
], DiscountType.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], DiscountType.prototype, "conditions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => discount_entity_1.Discount, discount => discount.discountType),
    __metadata("design:type", Array)
], DiscountType.prototype, "discounts", void 0);
exports.DiscountType = DiscountType = __decorate([
    (0, typeorm_1.Entity)('discount_types'),
    (0, typeorm_1.Index)(['name'], { unique: true }),
    (0, typeorm_1.Index)(['category']),
    (0, typeorm_1.Index)(['isActive'])
], DiscountType);
//# sourceMappingURL=discount-type.entity.js.map