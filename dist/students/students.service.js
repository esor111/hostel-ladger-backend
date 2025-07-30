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
exports.StudentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const student_entity_1 = require("./entities/student.entity");
const student_contact_entity_1 = require("./entities/student-contact.entity");
const student_academic_info_entity_1 = require("./entities/student-academic-info.entity");
const student_financial_info_entity_1 = require("./entities/student-financial-info.entity");
let StudentsService = class StudentsService {
    constructor(studentRepository, contactRepository, academicRepository, financialRepository) {
        this.studentRepository = studentRepository;
        this.contactRepository = contactRepository;
        this.academicRepository = academicRepository;
        this.financialRepository = financialRepository;
    }
    async findAll(filters = {}) {
        const { status = 'all', search = '', page = 1, limit = 50 } = filters;
        const queryBuilder = this.studentRepository.createQueryBuilder('student')
            .leftJoinAndSelect('student.room', 'room')
            .leftJoinAndSelect('student.contacts', 'contacts')
            .leftJoinAndSelect('student.academicInfo', 'academic')
            .leftJoinAndSelect('student.financialInfo', 'financial');
        if (status !== 'all') {
            queryBuilder.andWhere('student.status = :status', { status });
        }
        if (search) {
            queryBuilder.andWhere('(student.name ILIKE :search OR student.phone ILIKE :search OR student.email ILIKE :search)', { search: `%${search}%` });
        }
        const offset = (page - 1) * limit;
        queryBuilder.skip(offset).take(limit);
        queryBuilder.orderBy('student.createdAt', 'DESC');
        const [students, total] = await queryBuilder.getManyAndCount();
        const transformedItems = await Promise.all(students.map(student => this.transformToApiResponse(student)));
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
        const student = await this.studentRepository.findOne({
            where: { id },
            relations: ['room', 'contacts', 'academicInfo', 'financialInfo']
        });
        if (!student) {
            throw new common_1.NotFoundException('Student not found');
        }
        return this.transformToApiResponse(student);
    }
    async create(createStudentDto) {
        const student = this.studentRepository.create({
            id: createStudentDto.id,
            name: createStudentDto.name,
            phone: createStudentDto.phone,
            email: createStudentDto.email,
            enrollmentDate: createStudentDto.enrollmentDate,
            status: createStudentDto.status || student_entity_1.StudentStatus.ACTIVE,
            address: createStudentDto.address,
            roomId: createStudentDto.roomNumber,
            bookingRequestId: createStudentDto.bookingRequestId
        });
        const savedStudent = await this.studentRepository.save(student);
        await this.createRelatedEntities(savedStudent.id, createStudentDto);
        return this.findOne(savedStudent.id);
    }
    async update(id, updateStudentDto) {
        const student = await this.findOne(id);
        await this.studentRepository.update(id, {
            name: updateStudentDto.name,
            phone: updateStudentDto.phone,
            email: updateStudentDto.email,
            enrollmentDate: updateStudentDto.enrollmentDate,
            status: updateStudentDto.status,
            address: updateStudentDto.address,
            roomId: updateStudentDto.roomNumber,
        });
        await this.updateRelatedEntities(id, updateStudentDto);
        return this.findOne(id);
    }
    async getStats() {
        const totalStudents = await this.studentRepository.count();
        const activeStudents = await this.studentRepository.count({
            where: { status: student_entity_1.StudentStatus.ACTIVE }
        });
        const inactiveStudents = await this.studentRepository.count({
            where: { status: student_entity_1.StudentStatus.INACTIVE }
        });
        const balanceResult = await this.studentRepository
            .createQueryBuilder('student')
            .select('SUM(CAST(ledger.balance AS DECIMAL))', 'totalBalance')
            .leftJoin('student.ledgerEntries', 'ledger')
            .where('ledger.balanceType = :type', { type: 'Dr' })
            .getRawOne();
        return {
            totalStudents,
            activeStudents,
            inactiveStudents,
            totalBalance: parseFloat(balanceResult?.totalBalance) || 0,
            totalAdvance: 0
        };
    }
    async transformToApiResponse(student) {
        const guardianContact = student.contacts?.find(c => c.type === student_contact_entity_1.ContactType.GUARDIAN);
        const emergencyContact = student.contacts?.find(c => c.type === student_contact_entity_1.ContactType.EMERGENCY);
        const currentAcademic = student.academicInfo?.find(a => a.isActive);
        const baseMonthlyFee = student.financialInfo?.find(f => f.feeType === student_financial_info_entity_1.FeeType.BASE_MONTHLY && f.isActive);
        const laundryFee = student.financialInfo?.find(f => f.feeType === student_financial_info_entity_1.FeeType.LAUNDRY && f.isActive);
        const foodFee = student.financialInfo?.find(f => f.feeType === student_financial_info_entity_1.FeeType.FOOD && f.isActive);
        const currentBalance = 0;
        const advanceBalance = 0;
        return {
            id: student.id,
            name: student.name,
            phone: student.phone,
            email: student.email,
            roomNumber: student.room?.roomNumber || null,
            guardianName: guardianContact?.name || null,
            guardianPhone: guardianContact?.phone || null,
            address: student.address,
            baseMonthlyFee: baseMonthlyFee?.amount || 0,
            laundryFee: laundryFee?.amount || 0,
            foodFee: foodFee?.amount || 0,
            enrollmentDate: student.enrollmentDate,
            status: student.status,
            currentBalance,
            advanceBalance,
            emergencyContact: emergencyContact?.phone || null,
            course: currentAcademic?.course || null,
            institution: currentAcademic?.institution || null,
            idProofType: null,
            idProofNumber: null,
            bookingRequestId: student.bookingRequestId,
            updatedAt: student.updatedAt
        };
    }
    async createRelatedEntities(studentId, dto) {
        if (dto.guardianName || dto.guardianPhone) {
            await this.contactRepository.save({
                studentId,
                type: student_contact_entity_1.ContactType.GUARDIAN,
                name: dto.guardianName,
                phone: dto.guardianPhone,
                isPrimary: true,
                isActive: true
            });
        }
        if (dto.emergencyContact) {
            await this.contactRepository.save({
                studentId,
                type: student_contact_entity_1.ContactType.EMERGENCY,
                name: 'Emergency Contact',
                phone: dto.emergencyContact,
                isPrimary: false,
                isActive: true
            });
        }
        if (dto.course || dto.institution) {
            await this.academicRepository.save({
                studentId,
                course: dto.course,
                institution: dto.institution,
                isActive: true
            });
        }
        const financialEntries = [];
        if (dto.baseMonthlyFee) {
            financialEntries.push({
                studentId,
                feeType: student_financial_info_entity_1.FeeType.BASE_MONTHLY,
                amount: dto.baseMonthlyFee,
                effectiveFrom: new Date(),
                isActive: true
            });
        }
        if (dto.laundryFee) {
            financialEntries.push({
                studentId,
                feeType: student_financial_info_entity_1.FeeType.LAUNDRY,
                amount: dto.laundryFee,
                effectiveFrom: new Date(),
                isActive: true
            });
        }
        if (dto.foodFee) {
            financialEntries.push({
                studentId,
                feeType: student_financial_info_entity_1.FeeType.FOOD,
                amount: dto.foodFee,
                effectiveFrom: new Date(),
                isActive: true
            });
        }
        if (financialEntries.length > 0) {
            await this.financialRepository.save(financialEntries);
        }
    }
    async getStudentBalance(studentId) {
        return {
            studentId,
            currentBalance: 0,
            advanceBalance: 0,
            totalPaid: 0,
            totalDue: 0,
            lastPaymentDate: null,
            lastPaymentAmount: 0
        };
    }
    async getStudentLedger(studentId) {
        return {
            studentId,
            entries: [],
            summary: {
                totalDebits: 0,
                totalCredits: 0,
                currentBalance: 0
            }
        };
    }
    async getStudentPayments(studentId) {
        return {
            studentId,
            payments: [],
            summary: {
                totalPayments: 0,
                totalAmount: 0,
                lastPaymentDate: null
            }
        };
    }
    async getStudentInvoices(studentId) {
        return {
            studentId,
            invoices: [],
            summary: {
                totalInvoices: 0,
                totalAmount: 0,
                paidAmount: 0,
                outstandingAmount: 0
            }
        };
    }
    async processCheckout(studentId, checkoutDetails) {
        const student = await this.findOne(studentId);
        await this.studentRepository.update(studentId, {
            status: student_entity_1.StudentStatus.INACTIVE
        });
        if (checkoutDetails.clearRoom) {
            await this.studentRepository.update(studentId, {
                roomId: null
            });
        }
        const finalBalance = 0;
        const refundAmount = checkoutDetails.refundAmount || 0;
        const deductionAmount = checkoutDetails.deductionAmount || 0;
        return {
            success: true,
            studentId,
            checkoutDate: checkoutDetails.checkoutDate || new Date(),
            finalBalance,
            refundAmount,
            deductionAmount,
            netSettlement: refundAmount - deductionAmount,
            message: 'Student checkout processed successfully'
        };
    }
    async advancedSearch(searchDto) {
        const { name, phone, email, roomNumber, status, course, institution, enrollmentDateFrom, enrollmentDateTo, balanceMin, balanceMax, page = 1, limit = 50 } = searchDto;
        const queryBuilder = this.studentRepository.createQueryBuilder('student')
            .leftJoinAndSelect('student.room', 'room')
            .leftJoinAndSelect('student.contacts', 'contacts')
            .leftJoinAndSelect('student.academicInfo', 'academic')
            .leftJoinAndSelect('student.financialInfo', 'financial');
        if (name) {
            queryBuilder.andWhere('student.name ILIKE :name', { name: `%${name}%` });
        }
        if (phone) {
            queryBuilder.andWhere('student.phone ILIKE :phone', { phone: `%${phone}%` });
        }
        if (email) {
            queryBuilder.andWhere('student.email ILIKE :email', { email: `%${email}%` });
        }
        if (roomNumber) {
            queryBuilder.andWhere('room.roomNumber = :roomNumber', { roomNumber });
        }
        if (status) {
            queryBuilder.andWhere('student.status = :status', { status });
        }
        if (course) {
            queryBuilder.andWhere('academic.course ILIKE :course', { course: `%${course}%` });
        }
        if (institution) {
            queryBuilder.andWhere('academic.institution ILIKE :institution', { institution: `%${institution}%` });
        }
        if (enrollmentDateFrom) {
            queryBuilder.andWhere('student.enrollmentDate >= :enrollmentDateFrom', { enrollmentDateFrom });
        }
        if (enrollmentDateTo) {
            queryBuilder.andWhere('student.enrollmentDate <= :enrollmentDateTo', { enrollmentDateTo });
        }
        const offset = (page - 1) * limit;
        queryBuilder.skip(offset).take(limit);
        queryBuilder.orderBy('student.createdAt', 'DESC');
        const [students, total] = await queryBuilder.getManyAndCount();
        const transformedItems = await Promise.all(students.map(student => this.transformToApiResponse(student)));
        return {
            items: transformedItems,
            count: total,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        };
    }
    async bulkUpdate(bulkUpdateDto) {
        const { studentIds, updates } = bulkUpdateDto;
        let updated = 0;
        let failed = 0;
        const errors = [];
        for (const studentId of studentIds) {
            try {
                await this.update(studentId, updates);
                updated++;
            }
            catch (error) {
                failed++;
                errors.push({
                    studentId,
                    error: error.message
                });
            }
        }
        return {
            updated,
            failed,
            total: studentIds.length,
            errors: errors.length > 0 ? errors : undefined
        };
    }
    async remove(id) {
        const student = await this.findOne(id);
        await this.studentRepository.update(id, {
            status: student_entity_1.StudentStatus.INACTIVE
        });
        return {
            success: true,
            message: 'Student deleted successfully',
            studentId: id
        };
    }
    async updateRelatedEntities(studentId, dto) {
        if (dto.guardianName !== undefined || dto.guardianPhone !== undefined) {
            await this.contactRepository.update({ studentId, type: student_contact_entity_1.ContactType.GUARDIAN }, { name: dto.guardianName, phone: dto.guardianPhone });
        }
        if (dto.emergencyContact !== undefined) {
            await this.contactRepository.update({ studentId, type: student_contact_entity_1.ContactType.EMERGENCY }, { phone: dto.emergencyContact });
        }
        if (dto.course !== undefined || dto.institution !== undefined) {
            await this.academicRepository.update({ studentId, isActive: true }, { course: dto.course, institution: dto.institution });
        }
        if (dto.baseMonthlyFee !== undefined) {
            await this.financialRepository.update({ studentId, feeType: student_financial_info_entity_1.FeeType.BASE_MONTHLY, isActive: true }, { amount: dto.baseMonthlyFee });
        }
        if (dto.laundryFee !== undefined) {
            await this.financialRepository.update({ studentId, feeType: student_financial_info_entity_1.FeeType.LAUNDRY, isActive: true }, { amount: dto.laundryFee });
        }
        if (dto.foodFee !== undefined) {
            await this.financialRepository.update({ studentId, feeType: student_financial_info_entity_1.FeeType.FOOD, isActive: true }, { amount: dto.foodFee });
        }
    }
};
exports.StudentsService = StudentsService;
exports.StudentsService = StudentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(student_entity_1.Student)),
    __param(1, (0, typeorm_1.InjectRepository)(student_contact_entity_1.StudentContact)),
    __param(2, (0, typeorm_1.InjectRepository)(student_academic_info_entity_1.StudentAcademicInfo)),
    __param(3, (0, typeorm_1.InjectRepository)(student_financial_info_entity_1.StudentFinancialInfo)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], StudentsService);
//# sourceMappingURL=students.service.js.map