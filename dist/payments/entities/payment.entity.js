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
exports.Payment = exports.PaymentStatus = exports.PaymentMethod = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../common/entities/base.entity");
const student_entity_1 = require("../../students/entities/student.entity");
const payment_invoice_allocation_entity_1 = require("./payment-invoice-allocation.entity");
var PaymentMethod;
(function (PaymentMethod) {
    PaymentMethod["CASH"] = "Cash";
    PaymentMethod["BANK_TRANSFER"] = "Bank Transfer";
    PaymentMethod["CARD"] = "Card";
    PaymentMethod["ONLINE"] = "Online";
    PaymentMethod["CHEQUE"] = "Cheque";
    PaymentMethod["UPI"] = "UPI";
    PaymentMethod["MOBILE_WALLET"] = "Mobile Wallet";
})(PaymentMethod || (exports.PaymentMethod = PaymentMethod = {}));
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["COMPLETED"] = "Completed";
    PaymentStatus["PENDING"] = "Pending";
    PaymentStatus["FAILED"] = "Failed";
    PaymentStatus["CANCELLED"] = "Cancelled";
    PaymentStatus["REFUNDED"] = "Refunded";
})(PaymentStatus || (exports.PaymentStatus = PaymentStatus = {}));
let Payment = class Payment extends base_entity_1.BaseEntityWithCustomId {
    get studentName() {
        return this.student?.name || '';
    }
    get invoiceIds() {
        return this.invoiceAllocations?.map(allocation => allocation.invoiceId) || [];
    }
};
exports.Payment = Payment;
__decorate([
    (0, typeorm_1.Column)({ name: 'student_id', length: 50 }),
    __metadata("design:type", String)
], Payment.prototype, "studentId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Payment.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'payment_method',
        type: 'enum',
        enum: PaymentMethod
    }),
    __metadata("design:type", String)
], Payment.prototype, "paymentMethod", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'payment_date', type: 'date' }),
    __metadata("design:type", Date)
], Payment.prototype, "paymentDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, nullable: true }),
    __metadata("design:type", String)
], Payment.prototype, "reference", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Payment.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: PaymentStatus,
        default: PaymentStatus.COMPLETED
    }),
    __metadata("design:type", String)
], Payment.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'transaction_id', length: 255, nullable: true }),
    __metadata("design:type", String)
], Payment.prototype, "transactionId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'receipt_number', length: 100, nullable: true }),
    __metadata("design:type", String)
], Payment.prototype, "receiptNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'processed_by', length: 100, default: 'admin' }),
    __metadata("design:type", String)
], Payment.prototype, "processedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'bank_name', length: 100, nullable: true }),
    __metadata("design:type", String)
], Payment.prototype, "bankName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cheque_number', length: 50, nullable: true }),
    __metadata("design:type", String)
], Payment.prototype, "chequeNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cheque_date', type: 'date', nullable: true }),
    __metadata("design:type", Date)
], Payment.prototype, "chequeDate", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => student_entity_1.Student, student => student.payments, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'student_id' }),
    __metadata("design:type", student_entity_1.Student)
], Payment.prototype, "student", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => payment_invoice_allocation_entity_1.PaymentInvoiceAllocation, allocation => allocation.payment, { cascade: true }),
    __metadata("design:type", Array)
], Payment.prototype, "invoiceAllocations", void 0);
exports.Payment = Payment = __decorate([
    (0, typeorm_1.Entity)('payments'),
    (0, typeorm_1.Index)(['studentId']),
    (0, typeorm_1.Index)(['paymentDate']),
    (0, typeorm_1.Index)(['paymentMethod']),
    (0, typeorm_1.Index)(['status']),
    (0, typeorm_1.Index)(['amount'])
], Payment);
//# sourceMappingURL=payment.entity.js.map