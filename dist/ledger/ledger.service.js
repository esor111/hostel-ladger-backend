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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LedgerService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const ledger_entry_entity_1 = require("./entities/ledger-entry.entity");
const student_entity_1 = require("../students/entities/student.entity");
const invoice_entity_1 = require("../invoices/entities/invoice.entity");
const payment_entity_1 = require("../payments/entities/payment.entity");
const discount_entity_1 = require("../discounts/entities/discount.entity");
let LedgerService = class LedgerService {
    constructor(ledgerRepository, studentRepository, invoiceRepository, paymentRepository, discountRepository) {
        this.ledgerRepository = ledgerRepository;
        this.studentRepository = studentRepository;
        this.invoiceRepository = invoiceRepository;
        this.paymentRepository = paymentRepository;
        this.discountRepository = discountRepository;
    }
    async findAll(filters = {}) {
        const { page = 1, limit = 50, studentId, type, dateFrom, dateTo, search } = filters;
        const queryBuilder = this.ledgerRepository.createQueryBuilder('ledger')
            .leftJoinAndSelect('ledger.student', 'student');
        if (studentId) {
            queryBuilder.andWhere('ledger.studentId = :studentId', { studentId });
        }
        if (type) {
            queryBuilder.andWhere('ledger.type = :type', { type });
        }
        if (dateFrom) {
            queryBuilder.andWhere('ledger.date >= :dateFrom', { dateFrom });
        }
        if (dateTo) {
            queryBuilder.andWhere('ledger.date <= :dateTo', { dateTo });
        }
        if (search) {
            queryBuilder.andWhere('(student.name ILIKE :search OR ledger.description ILIKE :search)', { search: `%${search}%` });
        }
        const offset = (page - 1) * limit;
        queryBuilder.skip(offset).take(limit);
        queryBuilder.orderBy('ledger.date', 'DESC')
            .addOrderBy('ledger.entryNumber', 'DESC');
        const [entries, total] = await queryBuilder.getManyAndCount();
        const transformedItems = entries.map(entry => this.transformToApiResponse(entry));
        return {
            items: transformedItems,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        };
    }
    async findByStudentId(studentId) {
        const entries = await this.ledgerRepository.find({
            where: { studentId },
            relations: ['student'],
            order: { date: 'DESC', entryNumber: 'DESC' }
        });
        return entries.map(entry => this.transformToApiResponse(entry));
    }
    async getStudentBalance(studentId) {
        const result = await this.ledgerRepository
            .createQueryBuilder('ledger')
            .select('SUM(CASE WHEN ledger.balanceType = :dr THEN ledger.balance ELSE 0 END)', 'drBalance')
            .addSelect('SUM(CASE WHEN ledger.balanceType = :cr THEN ledger.balance ELSE 0 END)', 'crBalance')
            .addSelect('COUNT(*)', 'totalEntries')
            .where('ledger.studentId = :studentId', { studentId })
            .andWhere('ledger.isReversed = :isReversed', { isReversed: false })
            .setParameters({ dr: ledger_entry_entity_1.BalanceType.DR, cr: ledger_entry_entity_1.BalanceType.CR })
            .getRawOne();
        const drBalance = parseFloat(result?.drBalance) || 0;
        const crBalance = parseFloat(result?.crBalance) || 0;
        const netBalance = drBalance - crBalance;
        return {
            studentId,
            currentBalance: netBalance,
            debitBalance: drBalance,
            creditBalance: crBalance,
            balanceType: netBalance > 0 ? ledger_entry_entity_1.BalanceType.DR : netBalance < 0 ? ledger_entry_entity_1.BalanceType.CR : ledger_entry_entity_1.BalanceType.NIL,
            totalEntries: parseInt(result?.totalEntries) || 0
        };
    }
    async createInvoiceEntry(invoice) {
        const student = await this.studentRepository.findOne({ where: { id: invoice.studentId } });
        if (!student) {
            throw new common_1.NotFoundException('Student not found');
        }
        const currentBalance = await this.getStudentBalance(invoice.studentId);
        const newBalance = currentBalance.currentBalance + invoice.total;
        const entry = this.ledgerRepository.create({
            id: this.generateEntryId(),
            studentId: invoice.studentId,
            date: new Date(),
            type: ledger_entry_entity_1.LedgerEntryType.INVOICE,
            description: `Invoice for ${invoice.month} - ${invoice.student?.name}`,
            referenceId: invoice.id,
            debit: invoice.total,
            credit: 0,
            balance: Math.abs(newBalance),
            balanceType: newBalance > 0 ? ledger_entry_entity_1.BalanceType.DR : newBalance < 0 ? ledger_entry_entity_1.BalanceType.CR : ledger_entry_entity_1.BalanceType.NIL,
            entryNumber: await this.getNextEntryNumber(),
            createdBy: 'system'
        });
        const savedEntry = await this.ledgerRepository.save(entry);
        await this.updateStudentBalance(invoice.studentId);
        return this.transformToApiResponse(savedEntry);
    }
    async createPaymentEntry(payment) {
        const student = await this.studentRepository.findOne({ where: { id: payment.studentId } });
        if (!student) {
            throw new common_1.NotFoundException('Student not found');
        }
        const currentBalance = await this.getStudentBalance(payment.studentId);
        const newBalance = currentBalance.currentBalance - payment.amount;
        const entry = this.ledgerRepository.create({
            id: this.generateEntryId(),
            studentId: payment.studentId,
            date: payment.paymentDate,
            type: ledger_entry_entity_1.LedgerEntryType.PAYMENT,
            description: `Payment received - ${payment.paymentMethod} - ${payment.student?.name}`,
            referenceId: payment.id,
            debit: 0,
            credit: payment.amount,
            balance: Math.abs(newBalance),
            balanceType: newBalance > 0 ? ledger_entry_entity_1.BalanceType.DR : newBalance < 0 ? ledger_entry_entity_1.BalanceType.CR : ledger_entry_entity_1.BalanceType.NIL,
            entryNumber: await this.getNextEntryNumber(),
            createdBy: payment.processedBy || 'system'
        });
        const savedEntry = await this.ledgerRepository.save(entry);
        await this.updateStudentBalance(payment.studentId);
        return this.transformToApiResponse(savedEntry);
    }
    async createDiscountEntry(discount) {
        const student = await this.studentRepository.findOne({ where: { id: discount.studentId } });
        if (!student) {
            throw new common_1.NotFoundException('Student not found');
        }
        const currentBalance = await this.getStudentBalance(discount.studentId);
        const newBalance = currentBalance.currentBalance - discount.amount;
        const entry = this.ledgerRepository.create({
            id: this.generateEntryId(),
            studentId: discount.studentId,
            date: discount.date,
            type: ledger_entry_entity_1.LedgerEntryType.DISCOUNT,
            description: `Discount applied - ${discount.reason} - ${discount.student?.name}`,
            referenceId: discount.id,
            debit: 0,
            credit: discount.amount,
            balance: Math.abs(newBalance),
            balanceType: newBalance > 0 ? ledger_entry_entity_1.BalanceType.DR : newBalance < 0 ? ledger_entry_entity_1.BalanceType.CR : ledger_entry_entity_1.BalanceType.NIL,
            entryNumber: await this.getNextEntryNumber(),
            createdBy: discount.appliedBy || 'system'
        });
        const savedEntry = await this.ledgerRepository.save(entry);
        await this.updateStudentBalance(discount.studentId);
        return this.transformToApiResponse(savedEntry);
    }
    async createAdjustmentEntry(studentId, amount, description, type, createdBy = 'admin') {
        const student = await this.studentRepository.findOne({ where: { id: studentId } });
        if (!student) {
            throw new common_1.NotFoundException('Student not found');
        }
        const currentBalance = await this.getStudentBalance(studentId);
        const adjustmentAmount = type === 'debit' ? amount : -amount;
        const newBalance = currentBalance.currentBalance + adjustmentAmount;
        const entry = this.ledgerRepository.create({
            id: this.generateEntryId(),
            studentId,
            date: new Date(),
            type: ledger_entry_entity_1.LedgerEntryType.ADJUSTMENT,
            description: `${type.toUpperCase()} Adjustment - ${description} - ${student.name}`,
            referenceId: null,
            debit: type === 'debit' ? amount : 0,
            credit: type === 'credit' ? amount : 0,
            balance: Math.abs(newBalance),
            balanceType: newBalance > 0 ? ledger_entry_entity_1.BalanceType.DR : newBalance < 0 ? ledger_entry_entity_1.BalanceType.CR : ledger_entry_entity_1.BalanceType.NIL,
            entryNumber: await this.getNextEntryNumber(),
            createdBy
        });
        const savedEntry = await this.ledgerRepository.save(entry);
        await this.updateStudentBalance(studentId);
        return this.transformToApiResponse(savedEntry);
    }
    async reverseEntry(entryId, reversedBy = 'admin', reason = 'Manual reversal') {
        const entry = await this.ledgerRepository.findOne({ where: { id: entryId } });
        if (!entry) {
            throw new common_1.NotFoundException('Ledger entry not found');
        }
        if (entry.isReversed) {
            throw new Error('Entry is already reversed');
        }
        await this.ledgerRepository.update(entryId, {
            isReversed: true,
            reversedBy,
            reversalDate: new Date()
        });
        const currentBalance = await this.getStudentBalance(entry.studentId);
        const reversalAmount = entry.debit - entry.credit;
        const newBalance = currentBalance.currentBalance - reversalAmount;
        const reversalEntry = this.ledgerRepository.create({
            id: this.generateEntryId(),
            studentId: entry.studentId,
            date: new Date(),
            type: entry.type,
            description: `REVERSAL: ${entry.description} - ${reason}`,
            referenceId: entry.referenceId,
            debit: entry.credit,
            credit: entry.debit,
            balance: Math.abs(newBalance),
            balanceType: newBalance > 0 ? ledger_entry_entity_1.BalanceType.DR : newBalance < 0 ? ledger_entry_entity_1.BalanceType.CR : ledger_entry_entity_1.BalanceType.NIL,
            entryNumber: await this.getNextEntryNumber(),
            createdBy: reversedBy
        });
        const savedReversalEntry = await this.ledgerRepository.save(reversalEntry);
        await this.updateStudentBalance(entry.studentId);
        return {
            originalEntry: this.transformToApiResponse(entry),
            reversalEntry: this.transformToApiResponse(savedReversalEntry)
        };
    }
    async getStats() {
        const totalEntries = await this.ledgerRepository.count({ where: { isReversed: false } });
        const balanceResult = await this.ledgerRepository
            .createQueryBuilder('ledger')
            .select('SUM(ledger.debit)', 'totalDebits')
            .addSelect('SUM(ledger.credit)', 'totalCredits')
            .addSelect('COUNT(DISTINCT ledger.studentId)', 'activeStudents')
            .where('ledger.isReversed = :isReversed', { isReversed: false })
            .getRawOne();
        const typeBreakdown = await this.ledgerRepository
            .createQueryBuilder('ledger')
            .select('ledger.type', 'type')
            .addSelect('COUNT(*)', 'count')
            .addSelect('SUM(ledger.debit)', 'totalDebits')
            .addSelect('SUM(ledger.credit)', 'totalCredits')
            .where('ledger.isReversed = :isReversed', { isReversed: false })
            .groupBy('ledger.type')
            .getRawMany();
        const breakdown = {};
        typeBreakdown.forEach(row => {
            breakdown[row.type] = {
                count: parseInt(row.count),
                totalDebits: parseFloat(row.totalDebits) || 0,
                totalCredits: parseFloat(row.totalCredits) || 0
            };
        });
        return {
            totalEntries,
            totalDebits: parseFloat(balanceResult?.totalDebits) || 0,
            totalCredits: parseFloat(balanceResult?.totalCredits) || 0,
            netBalance: (parseFloat(balanceResult?.totalDebits) || 0) - (parseFloat(balanceResult?.totalCredits) || 0),
            activeStudents: parseInt(balanceResult?.activeStudents) || 0,
            entryTypeBreakdown: breakdown
        };
    }
    transformToApiResponse(entry) {
        return {
            id: entry.id,
            studentId: entry.studentId,
            studentName: entry.student?.name || '',
            date: entry.date,
            type: entry.type,
            description: entry.description,
            referenceId: entry.referenceId,
            debit: entry.debit,
            credit: entry.credit,
            balance: entry.balance,
            balanceType: entry.balanceType,
            notes: entry.notes,
            createdBy: entry.createdBy,
            createdAt: entry.createdAt
        };
    }
    async updateStudentBalance(studentId) {
        const balance = await this.getStudentBalance(studentId);
    }
    async getNextEntryNumber() {
        const lastEntry = await this.ledgerRepository.findOne({
            order: { entryNumber: 'DESC' }
        });
        return (lastEntry?.entryNumber || 0) + 1;
    }
    generateEntryId() {
        return `LED${Date.now()}`;
    }
};
exports.LedgerService = LedgerService;
exports.LedgerService = LedgerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(ledger_entry_entity_1.LedgerEntry)),
    __param(1, (0, typeorm_1.InjectRepository)(student_entity_1.Student)),
    __param(2, (0, typeorm_1.InjectRepository)(invoice_entity_1.Invoice)),
    __param(3, (0, typeorm_1.InjectRepository)(payment_entity_1.Payment)),
    __param(4, (0, typeorm_1.InjectRepository)(discount_entity_1.Discount)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], LedgerService);
//# sourceMappingURL=ledger.service.js.map