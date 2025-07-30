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
exports.InvoiceItem = exports.InvoiceItemCategory = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../common/entities/base.entity");
const invoice_entity_1 = require("./invoice.entity");
var InvoiceItemCategory;
(function (InvoiceItemCategory) {
    InvoiceItemCategory["ACCOMMODATION"] = "Accommodation";
    InvoiceItemCategory["SERVICES"] = "Services";
    InvoiceItemCategory["FOOD"] = "Food";
    InvoiceItemCategory["UTILITIES"] = "Utilities";
    InvoiceItemCategory["OTHER"] = "Other";
})(InvoiceItemCategory || (exports.InvoiceItemCategory = InvoiceItemCategory = {}));
let InvoiceItem = class InvoiceItem extends base_entity_1.BaseEntityWithCustomId {
};
exports.InvoiceItem = InvoiceItem;
__decorate([
    (0, typeorm_1.Column)({ name: 'invoice_id', length: 50 }),
    __metadata("design:type", String)
], InvoiceItem.prototype, "invoiceId", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], InvoiceItem.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], InvoiceItem.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: InvoiceItemCategory,
        default: InvoiceItemCategory.OTHER
    }),
    __metadata("design:type", String)
], InvoiceItem.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 1 }),
    __metadata("design:type", Number)
], InvoiceItem.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'unit_price', type: 'decimal', precision: 10, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], InvoiceItem.prototype, "unitPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'tax_rate', type: 'decimal', precision: 5, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], InvoiceItem.prototype, "taxRate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'tax_amount', type: 'decimal', precision: 10, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], InvoiceItem.prototype, "taxAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_taxable', default: false }),
    __metadata("design:type", Boolean)
], InvoiceItem.prototype, "isTaxable", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => invoice_entity_1.Invoice, invoice => invoice.items, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'invoice_id' }),
    __metadata("design:type", invoice_entity_1.Invoice)
], InvoiceItem.prototype, "invoice", void 0);
exports.InvoiceItem = InvoiceItem = __decorate([
    (0, typeorm_1.Entity)('invoice_items'),
    (0, typeorm_1.Index)(['invoiceId']),
    (0, typeorm_1.Index)(['category'])
], InvoiceItem);
//# sourceMappingURL=invoice-item.entity.js.map