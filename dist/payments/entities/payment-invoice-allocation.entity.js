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
exports.PaymentInvoiceAllocation = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../common/entities/base.entity");
const payment_entity_1 = require("./payment.entity");
const invoice_entity_1 = require("../../invoices/entities/invoice.entity");
let PaymentInvoiceAllocation = class PaymentInvoiceAllocation extends base_entity_1.BaseEntity {
};
exports.PaymentInvoiceAllocation = PaymentInvoiceAllocation;
__decorate([
    (0, typeorm_1.Column)({ name: 'payment_id', length: 50 }),
    __metadata("design:type", String)
], PaymentInvoiceAllocation.prototype, "paymentId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'invoice_id', length: 50 }),
    __metadata("design:type", String)
], PaymentInvoiceAllocation.prototype, "invoiceId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'allocated_amount', type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], PaymentInvoiceAllocation.prototype, "allocatedAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'allocation_date', type: 'date', default: () => 'CURRENT_DATE' }),
    __metadata("design:type", Date)
], PaymentInvoiceAllocation.prototype, "allocationDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'allocated_by', length: 100, default: 'system' }),
    __metadata("design:type", String)
], PaymentInvoiceAllocation.prototype, "allocatedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], PaymentInvoiceAllocation.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => payment_entity_1.Payment, payment => payment.invoiceAllocations, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'payment_id' }),
    __metadata("design:type", payment_entity_1.Payment)
], PaymentInvoiceAllocation.prototype, "payment", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => invoice_entity_1.Invoice, invoice => invoice.paymentAllocations, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'invoice_id' }),
    __metadata("design:type", invoice_entity_1.Invoice)
], PaymentInvoiceAllocation.prototype, "invoice", void 0);
exports.PaymentInvoiceAllocation = PaymentInvoiceAllocation = __decorate([
    (0, typeorm_1.Entity)('payment_invoice_allocations'),
    (0, typeorm_1.Index)(['paymentId', 'invoiceId'], { unique: true }),
    (0, typeorm_1.Index)(['paymentId']),
    (0, typeorm_1.Index)(['invoiceId'])
], PaymentInvoiceAllocation);
//# sourceMappingURL=payment-invoice-allocation.entity.js.map