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
exports.InvoicesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const invoice_entity_1 = require("./entities/invoice.entity");
const invoice_item_entity_1 = require("./entities/invoice-item.entity");
let InvoicesService = class InvoicesService {
    constructor(invoiceRepository, invoiceItemRepository) {
        this.invoiceRepository = invoiceRepository;
        this.invoiceItemRepository = invoiceItemRepository;
    }
    async findAll(filters = {}) {
        const { page = 1, limit = 50, status, studentId, month, search } = filters;
        const queryBuilder = this.invoiceRepository.createQueryBuilder('invoice')
            .leftJoinAndSelect('invoice.student', 'student')
            .leftJoinAndSelect('student.room', 'room')
            .leftJoinAndSelect('invoice.items', 'items')
            .leftJoinAndSelect('invoice.paymentAllocations', 'paymentAllocations')
            .leftJoinAndSelect('paymentAllocations.payment', 'payment');
        if (status) {
            queryBuilder.andWhere('invoice.status = :status', { status });
        }
        if (studentId) {
            queryBuilder.andWhere('invoice.studentId = :studentId', { studentId });
        }
        if (month) {
            queryBuilder.andWhere('invoice.month = :month', { month });
        }
        if (search) {
            queryBuilder.andWhere('(student.name ILIKE :search OR invoice.invoiceNumber ILIKE :search)', { search: `%${search}%` });
        }
        const offset = (page - 1) * limit;
        queryBuilder.skip(offset).take(limit);
        queryBuilder.orderBy('invoice.createdAt', 'DESC');
        const [invoices, total] = await queryBuilder.getManyAndCount();
        const transformedItems = invoices.map(invoice => this.transformToApiResponse(invoice));
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
        const invoice = await this.invoiceRepository.findOne({
            where: { id },
            relations: [
                'student',
                'student.room',
                'items',
                'paymentAllocations',
                'paymentAllocations.payment'
            ]
        });
        if (!invoice) {
            throw new common_1.NotFoundException('Invoice not found');
        }
        return this.transformToApiResponse(invoice);
    }
    async create(createInvoiceDto) {
        const invoice = this.invoiceRepository.create({
            id: createInvoiceDto.id || this.generateInvoiceId(),
            studentId: createInvoiceDto.studentId,
            month: createInvoiceDto.month,
            total: createInvoiceDto.total || 0,
            status: createInvoiceDto.status || invoice_entity_1.InvoiceStatus.UNPAID,
            dueDate: createInvoiceDto.dueDate,
            subtotal: createInvoiceDto.subtotal || 0,
            discountTotal: createInvoiceDto.discountTotal || 0,
            paymentTotal: createInvoiceDto.paymentTotal || 0,
            notes: createInvoiceDto.notes,
            invoiceNumber: createInvoiceDto.invoiceNumber || this.generateInvoiceNumber(),
            generatedBy: createInvoiceDto.generatedBy || 'system'
        });
        const savedInvoice = await this.invoiceRepository.save(invoice);
        if (createInvoiceDto.items && createInvoiceDto.items.length > 0) {
            await this.createInvoiceItems(savedInvoice.id, createInvoiceDto.items);
        }
        return this.findOne(savedInvoice.id);
    }
    async update(id, updateInvoiceDto) {
        const invoice = await this.findOne(id);
        await this.invoiceRepository.update(id, {
            total: updateInvoiceDto.total,
            status: updateInvoiceDto.status,
            dueDate: updateInvoiceDto.dueDate,
            subtotal: updateInvoiceDto.subtotal,
            discountTotal: updateInvoiceDto.discountTotal,
            paymentTotal: updateInvoiceDto.paymentTotal,
            notes: updateInvoiceDto.notes
        });
        if (updateInvoiceDto.items !== undefined) {
            await this.updateInvoiceItems(id, updateInvoiceDto.items);
        }
        return this.findOne(id);
    }
    async getStats() {
        const totalInvoices = await this.invoiceRepository.count();
        const paidInvoices = await this.invoiceRepository.count({
            where: { status: invoice_entity_1.InvoiceStatus.PAID }
        });
        const unpaidInvoices = await this.invoiceRepository.count({
            where: { status: invoice_entity_1.InvoiceStatus.UNPAID }
        });
        const partiallyPaidInvoices = await this.invoiceRepository.count({
            where: { status: invoice_entity_1.InvoiceStatus.PARTIALLY_PAID }
        });
        const overdueInvoices = await this.invoiceRepository.count({
            where: { status: invoice_entity_1.InvoiceStatus.OVERDUE }
        });
        const amountResult = await this.invoiceRepository
            .createQueryBuilder('invoice')
            .select('SUM(invoice.total)', 'totalAmount')
            .addSelect('SUM(invoice.paymentTotal)', 'totalPaid')
            .addSelect('SUM(invoice.total - invoice.paymentTotal)', 'totalOutstanding')
            .addSelect('AVG(invoice.total)', 'averageAmount')
            .getRawOne();
        return {
            totalInvoices,
            paidInvoices,
            unpaidInvoices,
            partiallyPaidInvoices,
            overdueInvoices,
            totalAmount: parseFloat(amountResult?.totalAmount) || 0,
            totalPaid: parseFloat(amountResult?.totalPaid) || 0,
            totalOutstanding: parseFloat(amountResult?.totalOutstanding) || 0,
            averageInvoiceAmount: parseFloat(amountResult?.averageAmount) || 0,
            collectionRate: totalInvoices > 0 ? (paidInvoices / totalInvoices) * 100 : 0
        };
    }
    async generateMonthlyInvoices(month, studentIds) {
        return {
            generated: 0,
            failed: 0,
            month: month,
            invoices: []
        };
    }
    async sendInvoice(id, method = 'email') {
        const invoice = await this.findOne(id);
        return {
            success: true,
            method: method,
            sentTo: invoice.student?.email || invoice.student?.phone,
            sentAt: new Date()
        };
    }
    transformToApiResponse(invoice) {
        const payments = invoice.paymentAllocations?.map(allocation => ({
            id: allocation.payment.id,
            amount: allocation.allocatedAmount,
            date: allocation.payment.paymentDate,
            method: allocation.payment.paymentMethod
        })) || [];
        const items = invoice.items?.map(item => ({
            id: item.id,
            description: item.description,
            amount: item.amount,
            category: item.category
        })) || [];
        return {
            id: invoice.id,
            studentId: invoice.studentId,
            studentName: invoice.student?.name || '',
            roomNumber: invoice.student?.room?.roomNumber || '',
            month: invoice.month,
            total: invoice.total,
            status: invoice.status,
            dueDate: invoice.dueDate,
            createdAt: invoice.createdAt,
            items: items,
            payments: payments,
            discounts: [],
            subtotal: invoice.subtotal,
            discountTotal: invoice.discountTotal,
            paymentTotal: invoice.paymentTotal,
            balanceDue: invoice.balanceDue,
            notes: invoice.notes
        };
    }
    async createInvoiceItems(invoiceId, items) {
        const invoiceItems = items.map(item => ({
            id: item.id || this.generateItemId(),
            invoiceId,
            description: item.description,
            amount: item.amount,
            category: item.category || 'Other',
            quantity: item.quantity || 1,
            unitPrice: item.unitPrice || item.amount,
            isTaxable: item.isTaxable || false,
            taxRate: item.taxRate || 0,
            taxAmount: item.taxAmount || 0
        }));
        await this.invoiceItemRepository.save(invoiceItems);
    }
    async updateInvoiceItems(invoiceId, items) {
        await this.invoiceItemRepository.delete({ invoiceId });
        if (items.length > 0) {
            await this.createInvoiceItems(invoiceId, items);
        }
    }
    generateInvoiceId() {
        return `INV${Date.now()}`;
    }
    generateInvoiceNumber() {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const timestamp = Date.now().toString().slice(-6);
        return `INV-${year}${month}-${timestamp}`;
    }
    generateItemId() {
        return `ITEM${Date.now()}${Math.floor(Math.random() * 100)}`;
    }
};
exports.InvoicesService = InvoicesService;
exports.InvoicesService = InvoicesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(invoice_entity_1.Invoice)),
    __param(1, (0, typeorm_1.InjectRepository)(invoice_item_entity_1.InvoiceItem)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], InvoicesService);
//# sourceMappingURL=invoices.service.js.map