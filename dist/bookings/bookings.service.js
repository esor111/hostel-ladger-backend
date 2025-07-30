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
exports.BookingsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const booking_request_entity_1 = require("./entities/booking-request.entity");
const student_entity_1 = require("../students/entities/student.entity");
const room_entity_1 = require("../rooms/entities/room.entity");
let BookingsService = class BookingsService {
    constructor(bookingRepository, studentRepository, roomRepository) {
        this.bookingRepository = bookingRepository;
        this.studentRepository = studentRepository;
        this.roomRepository = roomRepository;
    }
    async findAll(filters = {}) {
        const { page = 1, limit = 50, status, dateFrom, dateTo, search } = filters;
        const queryBuilder = this.bookingRepository.createQueryBuilder('booking');
        if (status) {
            queryBuilder.andWhere('booking.status = :status', { status });
        }
        if (dateFrom) {
            queryBuilder.andWhere('booking.requestDate >= :dateFrom', { dateFrom });
        }
        if (dateTo) {
            queryBuilder.andWhere('booking.requestDate <= :dateTo', { dateTo });
        }
        if (search) {
            queryBuilder.andWhere('(booking.name ILIKE :search OR booking.phone ILIKE :search OR booking.email ILIKE :search)', { search: `%${search}%` });
        }
        const offset = (page - 1) * limit;
        queryBuilder.skip(offset).take(limit);
        queryBuilder.orderBy('booking.requestDate', 'DESC');
        const [bookings, total] = await queryBuilder.getManyAndCount();
        const transformedItems = bookings.map(booking => this.transformToApiResponse(booking));
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
        const booking = await this.bookingRepository.findOne({
            where: { id },
            relations: ['student']
        });
        if (!booking) {
            throw new common_1.NotFoundException('Booking request not found');
        }
        return this.transformToApiResponse(booking);
    }
    async create(createBookingDto) {
        const booking = this.bookingRepository.create({
            id: createBookingDto.id || this.generateBookingId(),
            name: createBookingDto.name,
            phone: createBookingDto.phone,
            email: createBookingDto.email,
            guardianName: createBookingDto.guardianName,
            guardianPhone: createBookingDto.guardianPhone,
            preferredRoom: createBookingDto.preferredRoom,
            course: createBookingDto.course,
            institution: createBookingDto.institution,
            requestDate: createBookingDto.requestDate || new Date(),
            checkInDate: createBookingDto.checkInDate,
            duration: createBookingDto.duration,
            status: createBookingDto.status || booking_request_entity_1.BookingStatus.PENDING,
            notes: createBookingDto.notes,
            emergencyContact: createBookingDto.emergencyContact,
            address: createBookingDto.address,
            idProofType: createBookingDto.idProofType,
            idProofNumber: createBookingDto.idProofNumber,
            source: createBookingDto.source || 'website',
            priorityScore: this.calculatePriorityScore(createBookingDto)
        });
        const savedBooking = await this.bookingRepository.save(booking);
        return this.findOne(savedBooking.id);
    }
    async update(id, updateBookingDto) {
        const booking = await this.findOne(id);
        await this.bookingRepository.update(id, {
            name: updateBookingDto.name,
            phone: updateBookingDto.phone,
            email: updateBookingDto.email,
            guardianName: updateBookingDto.guardianName,
            guardianPhone: updateBookingDto.guardianPhone,
            preferredRoom: updateBookingDto.preferredRoom,
            course: updateBookingDto.course,
            institution: updateBookingDto.institution,
            checkInDate: updateBookingDto.checkInDate,
            duration: updateBookingDto.duration,
            notes: updateBookingDto.notes,
            emergencyContact: updateBookingDto.emergencyContact,
            address: updateBookingDto.address,
            idProofType: updateBookingDto.idProofType,
            idProofNumber: updateBookingDto.idProofNumber
        });
        return this.findOne(id);
    }
    async approveBooking(id, approvalData) {
        const booking = await this.bookingRepository.findOne({ where: { id } });
        if (!booking) {
            throw new common_1.NotFoundException('Booking request not found');
        }
        if (booking.status !== booking_request_entity_1.BookingStatus.PENDING) {
            throw new Error('Only pending bookings can be approved');
        }
        await this.bookingRepository.update(id, {
            status: booking_request_entity_1.BookingStatus.APPROVED,
            approvedDate: new Date(),
            processedBy: approvalData.processedBy || 'admin',
            assignedRoom: approvalData.assignedRoom
        });
        if (approvalData.createStudent) {
            const student = await this.createStudentFromBooking(booking, approvalData);
            await this.bookingRepository.update(id, {});
        }
        return {
            success: true,
            message: 'Booking approved successfully',
            bookingId: id,
            approvedDate: new Date()
        };
    }
    async rejectBooking(id, rejectionData) {
        const booking = await this.bookingRepository.findOne({ where: { id } });
        if (!booking) {
            throw new common_1.NotFoundException('Booking request not found');
        }
        if (booking.status !== booking_request_entity_1.BookingStatus.PENDING) {
            throw new Error('Only pending bookings can be rejected');
        }
        await this.bookingRepository.update(id, {
            status: booking_request_entity_1.BookingStatus.REJECTED,
            processedBy: rejectionData.processedBy || 'admin',
            rejectionReason: rejectionData.reason
        });
        return {
            success: true,
            message: 'Booking rejected successfully',
            bookingId: id,
            reason: rejectionData.reason
        };
    }
    async getStats() {
        const totalBookings = await this.bookingRepository.count();
        const pendingBookings = await this.bookingRepository.count({
            where: { status: booking_request_entity_1.BookingStatus.PENDING }
        });
        const approvedBookings = await this.bookingRepository.count({
            where: { status: booking_request_entity_1.BookingStatus.APPROVED }
        });
        const rejectedBookings = await this.bookingRepository.count({
            where: { status: booking_request_entity_1.BookingStatus.REJECTED }
        });
        const sourceBreakdown = await this.bookingRepository
            .createQueryBuilder('booking')
            .select('booking.source', 'source')
            .addSelect('COUNT(*)', 'count')
            .groupBy('booking.source')
            .getRawMany();
        const sources = {};
        sourceBreakdown.forEach(row => {
            sources[row.source] = parseInt(row.count);
        });
        const monthlyTrend = await this.bookingRepository
            .createQueryBuilder('booking')
            .select('DATE_TRUNC(\'month\', booking.requestDate)', 'month')
            .addSelect('COUNT(*)', 'count')
            .where('booking.requestDate >= :sixMonthsAgo', {
            sixMonthsAgo: new Date(Date.now() - 6 * 30 * 24 * 60 * 60 * 1000)
        })
            .groupBy('DATE_TRUNC(\'month\', booking.requestDate)')
            .orderBy('month', 'ASC')
            .getRawMany();
        return {
            totalBookings,
            pendingBookings,
            approvedBookings,
            rejectedBookings,
            cancelledBookings: totalBookings - pendingBookings - approvedBookings - rejectedBookings,
            approvalRate: totalBookings > 0 ? (approvedBookings / totalBookings) * 100 : 0,
            sourceBreakdown: sources,
            monthlyTrend: monthlyTrend.map(row => ({
                month: row.month,
                count: parseInt(row.count)
            }))
        };
    }
    async getPendingBookings() {
        const pendingBookings = await this.bookingRepository.find({
            where: { status: booking_request_entity_1.BookingStatus.PENDING },
            order: { priorityScore: 'DESC', requestDate: 'ASC' }
        });
        return pendingBookings.map(booking => this.transformToApiResponse(booking));
    }
    transformToApiResponse(booking) {
        return {
            id: booking.id,
            name: booking.name,
            phone: booking.phone,
            email: booking.email,
            guardianName: booking.guardianName,
            guardianPhone: booking.guardianPhone,
            preferredRoom: booking.preferredRoom,
            course: booking.course,
            institution: booking.institution,
            requestDate: booking.requestDate,
            checkInDate: booking.checkInDate,
            duration: booking.duration,
            status: booking.status,
            notes: booking.notes,
            emergencyContact: booking.emergencyContact,
            address: booking.address,
            idProofType: booking.idProofType,
            idProofNumber: booking.idProofNumber,
            approvedDate: booking.approvedDate,
            processedBy: booking.processedBy
        };
    }
    async createStudentFromBooking(booking, approvalData) {
        const studentData = {
            id: this.generateStudentId(),
            name: booking.name,
            phone: booking.phone,
            email: booking.email,
            guardianName: booking.guardianName,
            guardianPhone: booking.guardianPhone,
            emergencyContact: booking.emergencyContact,
            address: booking.address,
            course: booking.course,
            institution: booking.institution,
            idProofType: booking.idProofType,
            idProofNumber: booking.idProofNumber,
            enrollmentDate: new Date(),
            status: 'Active',
            roomNumber: approvalData.assignedRoom,
            bookingRequestId: booking.id
        };
        return studentData;
    }
    calculatePriorityScore(bookingData) {
        let score = 0;
        const daysUntilCheckIn = bookingData.checkInDate ?
            Math.floor((new Date(bookingData.checkInDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)) : 0;
        if (daysUntilCheckIn > 30)
            score += 10;
        else if (daysUntilCheckIn > 7)
            score += 5;
        if (bookingData.guardianName && bookingData.guardianPhone)
            score += 5;
        if (bookingData.emergencyContact)
            score += 3;
        if (bookingData.idProofType && bookingData.idProofNumber)
            score += 5;
        if (bookingData.duration > 12)
            score += 10;
        else if (bookingData.duration > 6)
            score += 5;
        return score;
    }
    generateBookingId() {
        return `BKG${Date.now()}`;
    }
    generateStudentId() {
        return `STU${Date.now()}`;
    }
};
exports.BookingsService = BookingsService;
exports.BookingsService = BookingsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(booking_request_entity_1.BookingRequest)),
    __param(1, (0, typeorm_1.InjectRepository)(student_entity_1.Student)),
    __param(2, (0, typeorm_1.InjectRepository)(room_entity_1.Room)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], BookingsService);
//# sourceMappingURL=bookings.service.js.map