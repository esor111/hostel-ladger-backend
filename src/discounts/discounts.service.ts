import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Discount, DiscountStatus, DiscountApplication } from './entities/discount.entity';
import { DiscountType } from './entities/discount-type.entity';
import { Student } from '../students/entities/student.entity';
import { LedgerEntry, LedgerEntryType, LedgerEntrySource } from '../ledger/entities/ledger-entry.entity';
import { ApplyDiscountDto } from './dto';

@Injectable()
export class DiscountsService {
  constructor(
    @InjectRepository(Discount)
    private discountRepository: Repository<Discount>,
    @InjectRepository(DiscountType)
    private discountTypeRepository: Repository<DiscountType>,
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
    @InjectRepository(LedgerEntry)
    private ledgerEntryRepository: Repository<LedgerEntry>,
  ) {}

  async applyDiscount(applyDiscountDto: ApplyDiscountDto) {
    // Validate student exists
    const student = await this.studentRepository.findOne({
      where: { id: applyDiscountDto.studentId },
      relations: ['room']
    });
    
    if (!student) {
      throw new NotFoundException('Student not found');
    }

    // Find discount type by name if provided
    let discountType = null;
    if (applyDiscountDto.discountType) {
      discountType = await this.discountTypeRepository.findOne({
        where: { name: applyDiscountDto.discountType, isActive: true }
      });
      
      if (!discountType) {
        throw new NotFoundException('Discount type not found or inactive');
      }

      // Check if approval is required
      if (discountType.requiresApproval) {
        throw new BadRequestException('This discount type requires approval');
      }

      // Check max amount limit
      if (discountType.maxAmount && applyDiscountDto.amount > discountType.maxAmount) {
        throw new BadRequestException(`Amount exceeds maximum limit of ${discountType.maxAmount}`);
      }

      // Check for duplicate discounts (same type for same student)
      const existingDiscount = await this.discountRepository.findOne({
        where: {
          studentId: applyDiscountDto.studentId,
          discountTypeId: discountType.id,
          status: DiscountStatus.ACTIVE
        }
      });

      if (existingDiscount) {
        throw new BadRequestException('This discount type has already been applied to this student');
      }
    }

    // Create discount
    const discount = this.discountRepository.create({
      studentId: applyDiscountDto.studentId,
      discountTypeId: discountType?.id,
      amount: applyDiscountDto.amount,
      reason: applyDiscountDto.reason,
      notes: applyDiscountDto.notes,
      appliedBy: applyDiscountDto.appliedBy || 'Admin',
      date: applyDiscountDto.date ? new Date(applyDiscountDto.date) : new Date(),
      status: DiscountStatus.ACTIVE,
      appliedTo: DiscountApplication.LEDGER, // Always apply to ledger as per frontend requirement
      validFrom: applyDiscountDto.validFrom ? new Date(applyDiscountDto.validFrom) : null,
      validTo: applyDiscountDto.validTo ? new Date(applyDiscountDto.validTo) : null,
      isPercentage: applyDiscountDto.isPercentage || false,
      percentageValue: applyDiscountDto.percentageValue,
      maxAmount: applyDiscountDto.maxAmount
    });

    const savedDiscount = await this.discountRepository.save(discount);

    // Create corresponding ledger entry
    const ledgerEntry = this.ledgerEntryRepository.create({
      studentId: applyDiscountDto.studentId,
      date: new Date(),
      type: LedgerEntryType.DISCOUNT,
      description: `Discount: ${applyDiscountDto.reason}`,
      referenceId: savedDiscount.id,
      debit: 0,
      credit: applyDiscountDto.amount,
      discountId: savedDiscount.id,
      adminNotes: applyDiscountDto.notes,
      entrySource: LedgerEntrySource.DISCOUNT
    });

    await this.ledgerEntryRepository.save(ledgerEntry);

    // Return with relations
    return this.findOne(savedDiscount.id);
  }

  async findAll(filters: any = {}) {
    const { page = 1, limit = 50, studentId, status, appliedBy, dateFrom, dateTo } = filters;
    
    const queryBuilder = this.discountRepository.createQueryBuilder('discount')
      .leftJoinAndSelect('discount.student', 'student')
      .leftJoinAndSelect('student.room', 'room')
      .leftJoinAndSelect('discount.discountType', 'discountType')
      .leftJoinAndSelect('discount.ledgerEntry', 'ledgerEntry');
    
    // Apply filters
    if (studentId) {
      queryBuilder.andWhere('discount.studentId = :studentId', { studentId });
    }
    
    if (status) {
      queryBuilder.andWhere('discount.status = :status', { status });
    }
    
    if (appliedBy) {
      queryBuilder.andWhere('discount.appliedBy = :appliedBy', { appliedBy });
    }
    
    if (dateFrom) {
      queryBuilder.andWhere('discount.date >= :dateFrom', { dateFrom });
    }
    
    if (dateTo) {
      queryBuilder.andWhere('discount.date <= :dateTo', { dateTo });
    }
    
    // Apply pagination
    const offset = (page - 1) * limit;
    queryBuilder.skip(offset).take(limit);
    
    // Order by date
    queryBuilder.orderBy('discount.date', 'DESC');
    
    const [discounts, total] = await queryBuilder.getManyAndCount();
    
    return {
      items: discounts.map(discount => this.transformToApiResponse(discount)),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  async findOne(id: string) {
    const discount = await this.discountRepository.findOne({
      where: { id },
      relations: ['student', 'student.room', 'discountType', 'ledgerEntry']
    });
    
    if (!discount) {
      throw new NotFoundException('Discount not found');
    }
    
    return this.transformToApiResponse(discount);
  }

  async getDiscountHistory(filters: any = {}) {
    return this.findAll(filters);
  }

  async updateDiscount(id: string, updateData: any) {
    const discount = await this.discountRepository.findOne({ where: { id } });
    
    if (!discount) {
      throw new NotFoundException('Discount not found');
    }

    if (discount.status !== DiscountStatus.ACTIVE) {
      throw new BadRequestException('Only active discounts can be updated');
    }

    await this.discountRepository.update(id, updateData);
    return this.findOne(id);
  }

  async expireDiscount(id: string, expiredBy: string, reason?: string) {
    const discount = await this.discountRepository.findOne({
      where: { id },
      relations: ['ledgerEntry']
    });
    
    if (!discount) {
      throw new NotFoundException('Discount not found');
    }
    
    if (discount.status !== DiscountStatus.ACTIVE) {
      throw new BadRequestException('Only active discounts can be expired');
    }

    // Update discount status
    await this.discountRepository.update(id, {
      status: DiscountStatus.EXPIRED,
      notes: discount.notes ? `${discount.notes}\n\nExpired by ${expiredBy}: ${reason || 'No reason provided'}` : `Expired by ${expiredBy}: ${reason || 'No reason provided'}`
    });

    // Create reversal ledger entry if needed
    if (discount.ledgerEntry) {
      const reversalEntry = this.ledgerEntryRepository.create({
        studentId: discount.studentId,
        date: new Date(),
        type: LedgerEntryType.ADJUSTMENT,
        description: `Discount Expiry: ${discount.reason}`,
        referenceId: `EXP-${discount.id}`,
        debit: discount.amount,
        credit: 0,
        adminNotes: `Discount expired: ${reason || 'No reason provided'}`,
        entrySource: LedgerEntrySource.ADJUSTMENT
      });

      await this.ledgerEntryRepository.save(reversalEntry);
    }

    return {
      success: true,
      message: 'Discount expired successfully',
      discountId: id,
      expiredAmount: discount.amount,
      expiredBy,
      reason
    };
  }

  async getDiscountStats() {
    const activeDiscounts = await this.discountRepository.count({
      where: { status: DiscountStatus.ACTIVE }
    });

    const totalDiscounts = await this.discountRepository.count();

    const amountResult = await this.discountRepository
      .createQueryBuilder('discount')
      .select('SUM(discount.amount)', 'totalAmount')
      .addSelect('AVG(discount.amount)', 'averageAmount')
      .where('discount.status = :status', { status: DiscountStatus.ACTIVE })
      .getRawOne();

    const categoryBreakdown = await this.discountRepository
      .createQueryBuilder('discount')
      .leftJoin('discount.discountType', 'discountType')
      .select('discountType.category', 'category')
      .addSelect('COUNT(*)', 'count')
      .addSelect('SUM(discount.amount)', 'amount')
      .where('discount.status = :status', { status: DiscountStatus.ACTIVE })
      .groupBy('discountType.category')
      .getRawMany();

    return {
      totalDiscounts,
      activeDiscounts,
      expiredDiscounts: totalDiscounts - activeDiscounts,
      totalDiscountAmount: parseFloat(amountResult?.totalAmount) || 0,
      averageDiscount: parseFloat(amountResult?.averageAmount) || 0,
      categoryBreakdown: categoryBreakdown.map(item => ({
        category: item.category || 'uncategorized',
        count: parseInt(item.count),
        amount: parseFloat(item.amount)
      }))
    };
  }

  // Discount Types Management
  async findAllDiscountTypes() {
    return this.discountTypeRepository.find({
      where: { isActive: true },
      order: { category: 'ASC', name: 'ASC' }
    });
  }

  async createDiscountType(createDto: any) {
    const existingType = await this.discountTypeRepository.findOne({
      where: { name: createDto.name }
    });
    
    if (existingType) {
      throw new BadRequestException('Discount type with this name already exists');
    }

    const discountType = this.discountTypeRepository.create(createDto);
    return this.discountTypeRepository.save(discountType);
  }

  private transformToApiResponse(discount: Discount): any {
    return {
      id: discount.id,
      studentId: discount.studentId,
      studentName: discount.studentName,
      room: discount.room,
      discountTypeId: discount.discountTypeId,
      discountTypeName: discount.discountType?.name || 'Custom',
      amount: discount.amount,
      reason: discount.reason,
      notes: discount.notes,
      appliedBy: discount.appliedBy,
      date: discount.date,
      status: discount.status,
      appliedTo: discount.appliedTo,
      validFrom: discount.validFrom,
      validTo: discount.validTo,
      isPercentage: discount.isPercentage,
      percentageValue: discount.percentageValue,
      maxAmount: discount.maxAmount,
      referenceId: discount.referenceId,
      createdAt: discount.createdAt,
      updatedAt: discount.updatedAt
    };
  }
}