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
exports.LedgerEntry = exports.BalanceType = exports.LedgerEntryType = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../common/entities/base.entity");
const student_entity_1 = require("../../students/entities/student.entity");
var LedgerEntryType;
(function (LedgerEntryType) {
    LedgerEntryType["INVOICE"] = "Invoice";
    LedgerEntryType["PAYMENT"] = "Payment";
    LedgerEntryType["DISCOUNT"] = "Discount";
    LedgerEntryType["ADJUSTMENT"] = "Adjustment";
    LedgerEntryType["REFUND"] = "Refund";
    LedgerEntryType["PENALTY"] = "Penalty";
    LedgerEntryType["CREDIT_NOTE"] = "Credit Note";
    LedgerEntryType["DEBIT_NOTE"] = "Debit Note";
})(LedgerEntryType || (exports.LedgerEntryType = LedgerEntryType = {}));
var BalanceType;
(function (BalanceType) {
    BalanceType["DR"] = "Dr";
    BalanceType["CR"] = "Cr";
    BalanceType["NIL"] = "Nil";
})(BalanceType || (exports.BalanceType = BalanceType = {}));
let LedgerEntry = class LedgerEntry extends base_entity_1.BaseEntityWithCustomId {
    get studentName() {
        return this.student?.name || '';
    }
};
exports.LedgerEntry = LedgerEntry;
__decorate([
    (0, typeorm_1.Column)({ name: 'student_id', length: 50 }),
    __metadata("design:type", String)
], LedgerEntry.prototype, "studentId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], LedgerEntry.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: LedgerEntryType
    }),
    __metadata("design:type", String)
], LedgerEntry.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], LedgerEntry.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'reference_id', length: 50, nullable: true }),
    __metadata("design:type", String)
], LedgerEntry.prototype, "referenceId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], LedgerEntry.prototype, "debit", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], LedgerEntry.prototype, "credit", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], LedgerEntry.prototype, "balance", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'balance_type',
        type: 'enum',
        enum: BalanceType,
        default: BalanceType.NIL
    }),
    __metadata("design:type", String)
], LedgerEntry.prototype, "balanceType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], LedgerEntry.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'entry_number', type: 'int', nullable: true }),
    __metadata("design:type", Number)
], LedgerEntry.prototype, "entryNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_reversed', default: false }),
    __metadata("design:type", Boolean)
], LedgerEntry.prototype, "isReversed", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'reversed_by', length: 50, nullable: true }),
    __metadata("design:type", String)
], LedgerEntry.prototype, "reversedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'reversal_date', type: 'date', nullable: true }),
    __metadata("design:type", Date)
], LedgerEntry.prototype, "reversalDate", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => student_entity_1.Student, student => student.ledgerEntries, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'student_id' }),
    __metadata("design:type", student_entity_1.Student)
], LedgerEntry.prototype, "student", void 0);
exports.LedgerEntry = LedgerEntry = __decorate([
    (0, typeorm_1.Entity)('ledger_entries'),
    (0, typeorm_1.Index)(['studentId']),
    (0, typeorm_1.Index)(['date']),
    (0, typeorm_1.Index)(['type']),
    (0, typeorm_1.Index)(['referenceId']),
    (0, typeorm_1.Index)(['balanceType'])
], LedgerEntry);
//# sourceMappingURL=ledger-entry.entity.js.map