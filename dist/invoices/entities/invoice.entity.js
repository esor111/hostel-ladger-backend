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
exports.Invoice = exports.InvoiceStatus = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../common/entities/base.entity");
const student_entity_1 = require("../../students/entities/student.entity");
const invoice_item_entity_1 = require("./invoice-item.entity");
const payment_invoice_allocation_entity_1 = require("../../payments/entities/payment-invoice-allocation.entity");
var InvoiceStatus;
(function (InvoiceStatus) {
    InvoiceStatus["PAID"] = "Paid";
    InvoiceStatus["UNPAID"] = "Unpaid";
    InvoiceStatus["PARTIALLY_PAID"] = "Partially Paid";
    InvoiceStatus["OVERDUE"] = "Overdue";
    InvoiceStatus["CANCELLED"] = "Cancelled";
})(InvoiceStatus || (exports.InvoiceStatus = InvoiceStatus = {}));
let Invoice = class Invoice extends base_entity_1.BaseEntityWithCustomId {
    get balanceDue() {
        return this.total - this.paymentTotal;
    }
    get studentName() {
        return this.student?.name || '';
    }
    get roomNumber() {
        return this.student?.room?.roomNumber || '';
    }
    get payments() {
        return this.paymentAllocations?.map(allocation => ({
            id: allocation.payment.id,
            amount: allocation.allocatedAmount,
            date: allocation.payment.paymentDate,
            method: allocation.payment.paymentMethod
        })) || [];
    }
    get discounts() {
        return [];
    }
};
exports.Invoice = Invoice;
__decorate([
    (0, typeorm_1.Column)({ name: 'student_id', length: 50 }),
    __metadata("design:type", String)
], Invoice.prototype, "studentId", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 7 }),
    __metadata("design:type", String)
], Invoice.prototype, "month", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Invoice.prototype, "total", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: InvoiceStatus,
        default: InvoiceStatus.UNPAID
    }),
    __metadata("design:type", String)
], Invoice.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'due_date', type: 'date' }),
    __metadata("design:type", Date)
], Invoice.prototype, "dueDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Invoice.prototype, "subtotal", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'discount_total', type: 'decimal', precision: 10, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Invoice.prototype, "discountTotal", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'payment_total', type: 'decimal', precision: 10, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Invoice.prototype, "paymentTotal", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Invoice.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'invoice_number', length: 50, nullable: true }),
    __metadata("design:type", String)
], Invoice.prototype, "invoiceNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'generated_by', length: 100, default: 'system' }),
    __metadata("design:type", String)
], Invoice.prototype, "generatedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => student_entity_1.Student, student => student.invoices, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'student_id' }),
    __metadata("design:type", student_entity_1.Student)
], Invoice.prototype, "student", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => invoice_item_entity_1.InvoiceItem, item => item.invoice, { cascade: true }),
    __metadata("design:type", Array)
], Invoice.prototype, "items", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => payment_invoice_allocation_entity_1.PaymentInvoiceAllocation, allocation => allocation.invoice),
    __metadata("design:type", Array)
], Invoice.prototype, "paymentAllocations", void 0);
exports.Invoice = Invoice = __decorate([
    (0, typeorm_1.Entity)('invoices'),
    (0, typeorm_1.Index)(['studentId']),
    (0, typeorm_1.Index)(['month']),
    (0, typeorm_1.Index)(['status']),
    (0, typeorm_1.Index)(['dueDate'])
], Invoice);
//# sourceMappingURL=invoice.entity.js.map