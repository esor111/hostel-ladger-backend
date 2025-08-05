import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { AdminCharge, ChargeStatus } from './entities/admin-charge.entity';
import { ChargeType } from './entities/charge-type.entity';
import { Student } from '../students/entities/student.entity';
import { LedgerEntry, LedgerEntryType, LedgerEntrySource } from '../ledger/entities/ledger-entry.entity';
import { CreateAdminChargeDto, CreateBulkAdminChargeDto, ReverseAdminChargeDto } from './dto';

@Injectable()
export class AdminChargesService {
  constructor(
    @InjectRepository(AdminCharge)
    private adminChargeRepository: Repository<AdminCharge>,
    @InjectRepository(ChargeType)
    private chargeTypeRepository: Repository<ChargeType>,
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
    @InjectRepository(LedgerEntry)
    private ledgerEntryRepository: Repository<LedgerEntry>,
  ) {}

  async createCharge(createChargeDto: CreateAdminChargeDto) {
    // Validate student exists
    const student = await this.studentRepository.findOne({
      where: { id: createChargeDto.studentId },
      relations: ['room']
    });
    
    if (!student) {
      throw new NotFoundException('Student not found');
    }

    // Validate charge type if provided
    let chargeType = null;
    if (createChargeDto.chargeTypeId) {
      chargeType = await this.chargeTypeRepository.findOne({
        where: { id: createChargeDto.chargeTypeId, isActive: true }
      });
      
      if (!chargeType) {
        throw new NotFoundException('Charge type not found or inactive');
      }

      // Check if approval is required
      if (chargeType.requiresApproval) {
        throw new BadRequestException('This charge type requires approval');
      }

      // Check max amount limit
      if (chargeType.maxAmount && createChargeDto.amount > chargeType.maxAmount) {
        throw new BadRequestException(`Amount exceeds maximum limit of ${chargeType.maxAmount}`);
      }
    }

    // Create admin charge
    const adminCharge = this.adminChargeRepository.create({
      studentId: createChargeDto.studentId,
      chargeTypeId: createChargeDto.chargeTypeId,
      amount: createChargeDto.amount,
      description: createChargeDto.description,
      customDescription: createChargeDto.customDescription,
      adminNotes: createChargeDto.adminNotes,
      appliedBy: createChargeDto.appliedBy,
      referenceId: createChargeDto.referenceId,
      status: ChargeStatus.ACTIVE
    });

    const savedCharge = await this.adminChargeRepository.save(adminCharge);

    // Create corresponding ledger entry
    const ledgerEntry = this.ledgerEntryRepository.create({
      studentId: createChargeDto.studentId,
      date: new Date(),
      type: LedgerEntryType.ADMIN_CHARGE,
      description: createChargeDto.customDescription || createChargeDto.description,
      referenceId: savedCharge.referenceId,
      debit: createChargeDto.amount,
      credit: 0,
      chargeId: savedCharge.id,
      adminNotes: createChargeDto.adminNotes,
      entrySource: LedgerEntrySource.ADMIN_CHARGE
    });

    await this.ledgerEntryRepository.save(ledgerEntry);

    // Return with relations
    return this.findOne(savedCharge.id);
  }

  async createBulkCharges(createBulkDto: CreateBulkAdminChargeDto) {
    const results = [];
    const successful = [];
    const failed = [];

    for (const studentId of createBulkDto.studentIds) {
      try {
        const chargeDto: CreateAdminChargeDto = {
          studentId,
          chargeTypeId: createBulkDto.chargeTypeId,
          amount: createBulkDto.amount,
          description: createBulkDto.description,
          customDescription: createBulkDto.customDescription,
          adminNotes: createBulkDto.adminNotes,
          appliedBy: createBulkDto.appliedBy,
          sendNotification: createBulkDto.sendNotification
        };

        const result = await this.createCharge(chargeDto);
        successful.push({ studentId, charge: result });
        results.push({ studentId, success: true, charge: result });
      } catch (error) {
        failed.push({ studentId, error: error.message });
        results.push({ studentId, success: false, error: error.message });
      }
    }

    const totalAmount = successful.reduce((sum, item) => sum + item.charge.amount, 0);

    return {
      results,
      successful,
      failed,
      totalAmount,
      summary: {
        total: createBulkDto.studentIds.length,
        successful: successful.length,
        failed: failed.length
      }
    };
  }

  async findAll(filters: any = {}) {
    const { page = 1, limit = 50, studentId, status, appliedBy, dateFrom, dateTo } = filters;
    
    const queryBuilder = this.adminChargeRepository.createQueryBuilder('charge')
      .leftJoinAndSelect('charge.student', 'student')
      .leftJoinAndSelect('student.room', 'room')
      .leftJoinAndSelect('charge.chargeType', 'chargeType')
      .leftJoinAndSelect('charge.ledgerEntry', 'ledgerEntry');
    
    // Apply filters
    if (studentId) {
      queryBuilder.andWhere('charge.studentId = :studentId', { studentId });
    }
    
    if (status) {
      queryBuilder.andWhere('charge.status = :status', { status });
    }
    
    if (appliedBy) {
      queryBuilder.andWhere('charge.appliedBy = :appliedBy', { appliedBy });
    }
    
    if (dateFrom) {
      queryBuilder.andWhere('charge.appliedAt >= :dateFrom', { dateFrom });
    }
    
    if (dateTo) {
      queryBuilder.andWhere('charge.appliedAt <= :dateTo', { dateTo });
    }
    
    // Apply pagination
    const offset = (page - 1) * limit;
    queryBuilder.skip(offset).take(limit);
    
    // Order by applied date
    queryBuilder.orderBy('charge.appliedAt', 'DESC');
    
    const [charges, total] = await queryBuilder.getManyAndCount();
    
    return {
      items: charges.map(charge => this.transformToApiResponse(charge)),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  async findOne(id: string) {
    const charge = await this.adminChargeRepository.findOne({
      where: { id },
      relations: ['student', 'student.room', 'chargeType', 'ledgerEntry']
    });
    
    if (!charge) {
      throw new NotFoundException('Admin charge not found');
    }
    
    return this.transformToApiResponse(charge);
  }

  async reverseCharge(id: string, reverseDto: ReverseAdminChargeDto) {
    const charge = await this.adminChargeRepository.findOne({
      where: { id },
      relations: ['student', 'ledgerEntry']
    });
    
    if (!charge) {
      throw new NotFoundException('Admin charge not found');
    }
    
    if (charge.status === ChargeStatus.REVERSED) {
      throw new BadRequestException('Charge is already reversed');
    }

    // Update charge status
    await this.adminChargeRepository.update(id, {
      status: ChargeStatus.REVERSED,
      reversedBy: reverseDto.reversedBy,
      reversalReason: reverseDto.reversalReason,
      reversedAt: new Date()
    });

    // Create reversal ledger entry
    if (charge.ledgerEntry) {
      const reversalEntry = this.ledgerEntryRepository.create({
        studentId: charge.studentId,
        date: new Date(),
        type: LedgerEntryType.ADJUSTMENT,
        description: `Reversal: ${charge.description}`,
        referenceId: `REV-${charge.referenceId}`,
        debit: 0,
        credit: charge.amount,
        adminNotes: `Charge reversed: ${reverseDto.reversalReason}`,
        entrySource: LedgerEntrySource.ADJUSTMENT
      });

      await this.ledgerEntryRepository.save(reversalEntry);
    }

    return {
      success: true,
      message: 'Charge reversed successfully',
      chargeId: id,
      reversedAmount: charge.amount,
      reversedBy: reverseDto.reversedBy,
      reversalReason: reverseDto.reversalReason
    };
  }

  async getOverdueStudents() {
    // Use the view created in migration for efficient querying
    const overdueStudents = await this.studentRepository.query(`
      SELECT * FROM overdue_students
      ORDER BY current_balance DESC, days_since_payment DESC
      LIMIT 50
    `);

    return overdueStudents.map(student => ({
      ...student,
      suggestedLateFee: Math.min(Math.floor(student.current_balance * 0.03), 2000) // 3% or max 2000
    }));
  }

  async getTodayChargeSummary() {
    const today = new Date().toISOString().split('T')[0];
    
    const summary = await this.adminChargeRepository.query(`
      SELECT 
        COUNT(*) as total_charges,
        SUM(amount) as total_amount,
        COUNT(DISTINCT student_id) as students_charged,
        AVG(amount) as average_charge,
        COUNT(*) FILTER (WHERE status = 'active') as active_charges,
        COUNT(*) FILTER (WHERE status = 'reversed') as reversed_charges
      FROM admin_charges 
      WHERE DATE(applied_at) = $1
    `, [today]);

    const result = summary[0];
    
    return {
      totalCharges: parseInt(result.total_charges) || 0,
      totalAmount: parseFloat(result.total_amount) || 0,
      studentsCharged: parseInt(result.students_charged) || 0,
      averageCharge: parseFloat(result.average_charge) || 0,
      activeCharges: parseInt(result.active_charges) || 0,
      reversedCharges: parseInt(result.reversed_charges) || 0
    };
  }

  async getStudentChargeHistory(studentId: string, filters: any = {}) {
    const { page = 1, limit = 20 } = filters;
    
    const queryBuilder = this.adminChargeRepository.createQueryBuilder('charge')
      .leftJoinAndSelect('charge.chargeType', 'chargeType')
      .where('charge.studentId = :studentId', { studentId });
    
    // Apply pagination
    const offset = (page - 1) * limit;
    queryBuilder.skip(offset).take(limit);
    
    // Order by applied date
    queryBuilder.orderBy('charge.appliedAt', 'DESC');
    
    const [charges, total] = await queryBuilder.getManyAndCount();
    
    return {
      items: charges.map(charge => ({
        id: charge.id,
        amount: charge.amount,
        description: charge.effectiveDescription,
        appliedBy: charge.appliedBy,
        appliedAt: charge.appliedAt,
        status: charge.status,
        chargeType: charge.chargeType?.label || 'Custom',
        referenceId: charge.referenceId,
        adminNotes: charge.adminNotes,
        reversedBy: charge.reversedBy,
        reversalReason: charge.reversalReason,
        reversedAt: charge.reversedAt
      })),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  // Charge Types Management
  async findAllChargeTypes() {
    return this.chargeTypeRepository.find({
      where: { isActive: true },
      order: { category: 'ASC', label: 'ASC' }
    });
  }

  async createChargeType(createDto: any) {
    const existingType = await this.chargeTypeRepository.findOne({
      where: { code: createDto.code }
    });
    
    if (existingType) {
      throw new BadRequestException('Charge type with this code already exists');
    }

    const chargeType = this.chargeTypeRepository.create({
      ...createDto,
      isSystemDefined: false
    });

    return this.chargeTypeRepository.save(chargeType);
  }

  private transformToApiResponse(charge: AdminCharge): any {
    return {
      id: charge.id,
      studentId: charge.studentId,
      studentName: charge.studentName,
      roomNumber: charge.roomNumber,
      chargeTypeId: charge.chargeTypeId,
      chargeTypeName: charge.chargeTypeName,
      amount: charge.amount,
      description: charge.effectiveDescription,
      adminNotes: charge.adminNotes,
      appliedBy: charge.appliedBy,
      appliedAt: charge.appliedAt,
      referenceId: charge.referenceId,
      status: charge.status,
      reversedBy: charge.reversedBy,
      reversalReason: charge.reversalReason,
      reversedAt: charge.reversedAt,
      createdAt: charge.createdAt,
      updatedAt: charge.updatedAt
    };
  }
}