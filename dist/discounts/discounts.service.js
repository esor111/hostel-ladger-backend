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
exports.DiscountsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const discount_entity_1 = require("./entities/discount.entity");
const discount_type_entity_1 = require("./entities/discount-type.entity");
const ledger_service_1 = require("../ledger/ledger.service");
let DiscountsService = class DiscountsService {
    constructor(discountRepository, discountTypeRepository, ledgerService) {
        this.discountRepository = discountRepository;
        this.discountTypeRepository = discountTypeRepository;
        this.ledgerService = ledgerService;
    }
    async findAll(filters = {}) {
        const { page = 1, limit = 50, studentId, status, dateFrom, dateTo, search } = filters;
        const queryBuilder = this.discountRepository.createQueryBuilder('discount')
            .leftJoinAndSelect('discount.student', 'student')
            .leftJoinAndSelect('student.room', 'room')
            .leftJoinAndSelect('discount.discountType', 'discountType');
        if (studentId) {
            queryBuilder.andWhere('discount.studentId = :studentId', { studentId });
        }
        if (status) {
            queryBuilder.andWhere('discount.status = :status', { status });
        }
        if (dateFrom) {
            queryBuilder.andWhere('discount.date >= :dateFrom', { dateFrom });
        }
        if (dateTo) {
            queryBuilder.andWhere('discount.date <= :dateTo', { dateTo });
        }
        if (search) {
            queryBuilder.andWhere('(student.name ILIKE :search OR discount.reason ILIKE :search)', { search: `%${search}%` });
        }
        const offset = (page - 1) * limit;
        queryBuilder.skip(offset).take(limit);
        queryBuilder.orderBy('discount.date', 'DESC');
        const [discounts, total] = await queryBuilder.getManyAndCount();
        const transformedItems = discounts.map(discount => this.transformToApiResponse(discount));
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
        const discount = await this.discountRepository.findOne({
            where: { id },
            relations: ['student', 'student.room', 'discountType']
        });
        if (!discount) {
            throw new common_1.NotFoundException('Discount not found');
        }
        return this.transformToApiResponse(discount);
    }
    async findByStudentId(studentId) {
        const discounts = await this.discountRepository.find({
            where: { studentId },
            relations: ['student', 'student.room', 'discountType'],
            order: { date: 'DESC' }
        });
        return discounts.map(discount => this.transformToApiResponse(discount));
    }
    async create(createDiscountDto) {
        let discountType = null;
        if (createDiscountDto.discountType) {
            discountType = await this.discountTypeRepository.findOne({
                where: { name: createDiscountDto.discountType }
            });
            if (!discountType) {
                discountType = await this.discountTypeRepository.save({
                    name: createDiscountDto.discountType,
                    category: discount_type_entity_1.DiscountCategory.PROMOTIONAL,
                    description: `Auto-created discount type: ${createDiscountDto.discountType}`,
                    isActive: true
                });
            }
        }
        let finalAmount = createDiscountDto.amount;
        if (createDiscountDto.isPercentage && createDiscountDto.percentageValue) {
            finalAmount = createDiscountDto.baseAmount * (createDiscountDto.percentageValue / 100);
            if (createDiscountDto.maxAmount && finalAmount > createDiscountDto.maxAmount) {
                finalAmount = createDiscountDto.maxAmount;
            }
        }
        const discount = this.discountRepository.create({
            id: createDiscountDto.id || this.generateDiscountId(),
            studentId: createDiscountDto.studentId,
            discountTypeId: discountType?.id,
            amount: finalAmount,
            reason: createDiscountDto.reason,
            notes: createDiscountDto.notes,
            appliedBy: createDiscountDto.appliedBy || 'Admin',
            date: createDiscountDto.date || new Date(),
            status: createDiscountDto.status || discount_entity_1.DiscountStatus.ACTIVE,
            appliedTo: createDiscountDto.appliedTo || 'ledger',
            validFrom: createDiscountDto.validFrom,
            validTo: createDiscountDto.validTo,
            isPercentage: createDiscountDto.isPercentage || false,
            percentageValue: createDiscountDto.percentageValue,
            maxAmount: createDiscountDto.maxAmount,
            referenceId: createDiscountDto.referenceId
        });
        const savedDiscount = await this.discountRepository.save(discount);
        if (savedDiscount.appliedTo === 'ledger') {
            await this.ledgerService.createDiscountEntry(savedDiscount);
        }
        return this.findOne(savedDiscount.id);
    }
    async update(id, updateDiscountDto) {
        const discount = await this.findOne(id);
        await this.discountRepository.update(id, {
            amount: updateDiscountDto.amount,
            reason: updateDiscountDto.reason,
            notes: updateDiscountDto.notes,
            status: updateDiscountDto.status,
            validFrom: updateDiscountDto.validFrom,
            validTo: updateDiscountDto.validTo
        });
        return this.findOne(id);
    }
    async applyDiscount(studentId, discountData) {
        const discount = await this.create({
            ...discountData,
            studentId,
            appliedTo: 'ledger'
        });
        return {
            success: true,
            discount: discount,
            message: `Discount of ${discountData.amount} applied successfully`
        };
    }
    async expireDiscount(id, expiredBy = 'system') {
        await this.discountRepository.update(id, {
            status: discount_entity_1.DiscountStatus.EXPIRED,
            updatedBy: expiredBy
        });
        return {
            success: true,
            message: 'Discount expired successfully'
        };
    }
    async getStats() {
        const totalDiscounts = await this.discountRepository.count();
        const activeDiscounts = await this.discountRepository.count({
            where: { status: discount_entity_1.DiscountStatus.ACTIVE }
        });
        const expiredDiscounts = await this.discountRepository.count({
            where: { status: discount_entity_1.DiscountStatus.EXPIRED }
        });
        const amountResult = await this.discountRepository
            .createQueryBuilder('discount')
            .select('SUM(discount.amount)', 'totalAmount')
            .addSelect('AVG(discount.amount)', 'averageAmount')
            .addSelect('COUNT(DISTINCT discount.studentId)', 'studentsWithDiscounts')
            .where('discount.status = :status', { status: discount_entity_1.DiscountStatus.ACTIVE })
            .getRawOne();
        const typeResult = await this.discountRepository
            .createQueryBuilder('discount')
            .leftJoin('discount.discountType', 'discountType')
            .select('discountType.name', 'typeName')
            .addSelect('COUNT(*)', 'count')
            .addSelect('SUM(discount.amount)', 'amount')
            .where('discount.status = :status', { status: discount_entity_1.DiscountStatus.ACTIVE })
            .groupBy('discountType.name')
            .getRawMany();
        const discountTypes = {};
        typeResult.forEach(row => {
            discountTypes[row.typeName || 'Other'] = {
                count: parseInt(row.count),
                amount: parseFloat(row.amount)
            };
        });
        return {
            totalDiscounts,
            activeDiscounts,
            expiredDiscounts,
            cancelledDiscounts: totalDiscounts - activeDiscounts - expiredDiscounts,
            totalAmount: parseFloat(amountResult?.totalAmount) || 0,
            averageDiscountAmount: parseFloat(amountResult?.averageAmount) || 0,
            studentsWithDiscounts: parseInt(amountResult?.studentsWithDiscounts) || 0,
            discountTypes
        };
    }
    async getDiscountTypes() {
        const discountTypes = await this.discountTypeRepository.find({
            where: { isActive: true },
            order: { name: 'ASC' }
        });
        return discountTypes.map(type => ({
            id: type.id,
            name: type.name,
            category: type.category,
            description: type.description,
            defaultAmount: type.defaultAmount,
            isPercentage: type.isPercentage,
            percentageValue: type.percentageValue,
            maxAmount: type.maxAmount,
            requiresApproval: type.requiresApproval,
            autoApply: type.autoApply
        }));
    }
    transformToApiResponse(discount) {
        return {
            id: discount.id,
            studentId: discount.studentId,
            studentName: discount.student?.name || '',
            room: discount.student?.room?.roomNumber || '',
            amount: discount.amount,
            reason: discount.reason,
            notes: discount.notes,
            appliedBy: discount.appliedBy,
            date: discount.date,
            status: discount.status,
            appliedTo: discount.appliedTo,
            discountType: discount.discountType?.name || null,
            validFrom: discount.validFrom,
            validTo: discount.validTo,
            isPercentage: discount.isPercentage,
            percentageValue: discount.percentageValue,
            maxAmount: discount.maxAmount,
            createdAt: discount.createdAt,
            updatedAt: discount.updatedAt
        };
    }
    generateDiscountId() {
        return `DSC${Date.now()}`;
    }
};
exports.DiscountsService = DiscountsService;
exports.DiscountsService = DiscountsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(discount_entity_1.Discount)),
    __param(1, (0, typeorm_1.InjectRepository)(discount_type_entity_1.DiscountType)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        ledger_service_1.LedgerService])
], DiscountsService);
//# sourceMappingURL=discounts.service.js.map