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
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const payment_entity_1 = require("./entities/payment.entity");
const payment_invoice_allocation_entity_1 = require("./entities/payment-invoice-allocation.entity");
const ledger_service_1 = require("../ledger/ledger.service");
let PaymentsService = class PaymentsService {
    constructor(paymentRepository, allocationRepository, ledgerService) {
        this.paymentRepository = paymentRepository;
        this.allocationRepository = allocationRepository;
        this.ledgerService = ledgerService;
    }
    async findAll(filters = {}) {
        const { page = 1, limit = 50, studentId, paymentMethod, dateFrom, dateTo, search } = filters;
        const queryBuilder = this.paymentRepository.createQueryBuilder('payment')
            .leftJoinAndSelect('payment.student', 'student')
            .leftJoinAndSelect('payment.invoiceAllocations', 'allocations')
            .leftJoinAndSelect('allocations.invoice', 'invoice');
        if (studentId) {
            queryBuilder.andWhere('payment.studentId = :studentId', { studentId });
        }
        if (paymentMethod) {
            queryBuilder.andWhere('payment.paymentMethod = :paymentMethod', { paymentMethod });
        }
        if (dateFrom) {
            queryBuilder.andWhere('payment.paymentDate >= :dateFrom', { dateFrom });
        }
        if (dateTo) {
            queryBuilder.andWhere('payment.paymentDate <= :dateTo', { dateTo });
        }
        if (search) {
            queryBuilder.andWhere('(student.name ILIKE :search OR payment.reference ILIKE :search OR payment.transactionId ILIKE :search)', { search: `%${search}%` });
        }
        const offset = (page - 1) * limit;
        queryBuilder.skip(offset).take(limit);
        queryBuilder.orderBy('payment.paymentDate', 'DESC');
        const [payments, total] = await queryBuilder.getManyAndCount();
        const transformedItems = payments.map(payment => this.transformToApiResponse(payment));
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
    async findOne(id) {
        const payment = await this.paymentRepository.findOne({
            where: { id },
            relations: [
                'student',
                'invoiceAllocations',
                'invoiceAllocations.invoice'
            ]
        });
        if (!payment) {
            throw new common_1.NotFoundException('Payment not found');
        }
        return this.transformToApiResponse(payment);
    }
    async findByStudentId(studentId) {
        const payments = await this.paymentRepository.find({
            where: { studentId },
            relations: [
                'student',
                'invoiceAllocations',
                'invoiceAllocations.invoice'
            ],
            order: { paymentDate: 'DESC' }
        });
        return payments.map(payment => this.transformToApiResponse(payment));
    }
    async create(createPaymentDto) {
        const payment = this.paymentRepository.create({
            id: createPaymentDto.id || this.generatePaymentId(),
            studentId: createPaymentDto.studentId,
            amount: createPaymentDto.amount,
            paymentMethod: createPaymentDto.paymentMethod,
            paymentDate: createPaymentDto.paymentDate || new Date(),
            reference: createPaymentDto.reference,
            notes: createPaymentDto.notes,
            status: createPaymentDto.status || payment_entity_1.PaymentStatus.COMPLETED,
            transactionId: createPaymentDto.transactionId,
            receiptNumber: createPaymentDto.receiptNumber || this.generateReceiptNumber(),
            processedBy: createPaymentDto.processedBy || 'admin',
            bankName: createPaymentDto.bankName,
            chequeNumber: createPaymentDto.chequeNumber,
            chequeDate: createPaymentDto.chequeDate
        });
        const savedPayment = await this.paymentRepository.save(payment);
        if (savedPayment.status === payment_entity_1.PaymentStatus.COMPLETED) {
            await this.ledgerService.createPaymentEntry(savedPayment);
        }
        if (createPaymentDto.invoiceIds && createPaymentDto.invoiceIds.length > 0) {
            await this.allocatePaymentToInvoices(savedPayment.id, createPaymentDto.invoiceIds);
        }
        return this.findOne(savedPayment.id);
    }
    async update(id, updatePaymentDto) {
        const payment = await this.findOne(id);
        await this.paymentRepository.update(id, {
            amount: updatePaymentDto.amount,
            paymentMethod: updatePaymentDto.paymentMethod,
            paymentDate: updatePaymentDto.paymentDate,
            reference: updatePaymentDto.reference,
            notes: updatePaymentDto.notes,
            status: updatePaymentDto.status,
            transactionId: updatePaymentDto.transactionId,
            bankName: updatePaymentDto.bankName,
            chequeNumber: updatePaymentDto.chequeNumber,
            chequeDate: updatePaymentDto.chequeDate
        });
        return this.findOne(id);
    }
    async getStats() {
        const totalPayments = await this.paymentRepository.count();
        const completedPayments = await this.paymentRepository.count({
            where: { status: payment_entity_1.PaymentStatus.COMPLETED }
        });
        const pendingPayments = await this.paymentRepository.count({
            where: { status: payment_entity_1.PaymentStatus.PENDING }
        });
        const failedPayments = await this.paymentRepository.count({
            where: { status: payment_entity_1.PaymentStatus.FAILED }
        });
        const amountResult = await this.paymentRepository
            .createQueryBuilder('payment')
            .select('SUM(payment.amount)', 'totalAmount')
            .addSelect('AVG(payment.amount)', 'averageAmount')
            .where('payment.status = :status', { status: payment_entity_1.PaymentStatus.COMPLETED })
            .getRawOne();
        const methodResult = await this.paymentRepository
            .createQueryBuilder('payment')
            .select('payment.paymentMethod', 'method')
            .addSelect('COUNT(*)', 'count')
            .addSelect('SUM(payment.amount)', 'amount')
            .where('payment.status = :status', { status: payment_entity_1.PaymentStatus.COMPLETED })
            .groupBy('payment.paymentMethod')
            .getRawMany();
        const paymentMethods = {};
        methodResult.forEach(row => {
            paymentMethods[row.method] = {
                count: parseInt(row.count),
                amount: parseFloat(row.amount)
            };
        });
        return {
            totalPayments,
            completedPayments,
            pendingPayments,
            failedPayments,
            totalAmount: parseFloat(amountResult?.totalAmount) || 0,
            averagePaymentAmount: parseFloat(amountResult?.averageAmount) || 0,
            paymentMethods,
            successRate: totalPayments > 0 ? (completedPayments / totalPayments) * 100 : 0
        };
    }
    async processBulkPayments(payments) {
        const results = {
            successful: 0,
            failed: 0,
            errors: []
        };
        for (const paymentData of payments) {
            try {
                await this.create(paymentData);
                results.successful++;
            }
            catch (error) {
                results.failed++;
                results.errors.push({
                    payment: paymentData,
                    error: error.message
                });
            }
        }
        return results;
    }
    async allocatePaymentToInvoices(paymentId, invoiceAllocations) {
        await this.allocationRepository.delete({ paymentId });
        const allocations = invoiceAllocations.map(allocation => ({
            paymentId,
            invoiceId: allocation.invoiceId,
            allocatedAmount: allocation.amount,
            allocationDate: new Date(),
            allocatedBy: 'system',
            notes: allocation.notes
        }));
        await this.allocationRepository.save(allocations);
        return {
            success: true,
            allocationsCreated: allocations.length
        };
    }
    transformToApiResponse(payment) {
        const invoiceIds = payment.invoiceAllocations?.map(allocation => allocation.invoiceId) || [];
        return {
            id: payment.id,
            studentId: payment.studentId,
            studentName: payment.student?.name || '',
            amount: payment.amount,
            paymentMethod: payment.paymentMethod,
            paymentDate: payment.paymentDate,
            reference: payment.reference,
            notes: payment.notes,
            status: payment.status,
            createdBy: payment.processedBy,
            createdAt: payment.createdAt,
            invoiceIds: invoiceIds
        };
    }
    generatePaymentId() {
        return `PMT${Date.now()}`;
    }
    generateReceiptNumber() {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const timestamp = Date.now().toString().slice(-6);
        return `RCP-${year}${month}-${timestamp}`;
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(payment_entity_1.Payment)),
    __param(1, (0, typeorm_1.InjectRepository)(payment_invoice_allocation_entity_1.PaymentInvoiceAllocation)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        ledger_service_1.LedgerService])
], PaymentsService);
//# sourceMappingURL=payments.service.js.map