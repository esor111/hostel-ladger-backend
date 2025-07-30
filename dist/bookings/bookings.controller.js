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
exports.BookingsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const bookings_service_1 = require("./bookings.service");
const create_booking_dto_1 = require("./dto/create-booking.dto");
const update_booking_dto_1 = require("./dto/update-booking.dto");
let BookingsController = class BookingsController {
    constructor(bookingsService) {
        this.bookingsService = bookingsService;
    }
    async getAllBookingRequests(query) {
        const result = await this.bookingsService.findAll(query);
        return {
            status: common_1.HttpStatus.OK,
            result: result
        };
    }
    async getBookingStats() {
        const stats = await this.bookingsService.getStats();
        return {
            status: common_1.HttpStatus.OK,
            stats: stats
        };
    }
    async getPendingBookings() {
        const bookings = await this.bookingsService.getPendingBookings();
        return {
            status: common_1.HttpStatus.OK,
            data: bookings
        };
    }
    async getBookingRequestById(id) {
        const booking = await this.bookingsService.findOne(id);
        return {
            status: common_1.HttpStatus.OK,
            data: booking
        };
    }
    async createBookingRequest(createBookingDto) {
        const booking = await this.bookingsService.create(createBookingDto);
        return {
            status: common_1.HttpStatus.CREATED,
            data: booking
        };
    }
    async updateBookingRequest(id, updateBookingDto) {
        const booking = await this.bookingsService.update(id, updateBookingDto);
        return {
            status: common_1.HttpStatus.OK,
            data: booking
        };
    }
    async approveBookingRequest(id, approvalDto) {
        const result = await this.bookingsService.approveBooking(id, approvalDto);
        return {
            status: common_1.HttpStatus.OK,
            data: result
        };
    }
    async rejectBookingRequest(id, rejectionDto) {
        const result = await this.bookingsService.rejectBooking(id, rejectionDto);
        return {
            status: common_1.HttpStatus.OK,
            data: result
        };
    }
};
exports.BookingsController = BookingsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all booking requests' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of booking requests retrieved successfully' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BookingsController.prototype, "getAllBookingRequests", null);
__decorate([
    (0, common_1.Get)('stats'),
    (0, swagger_1.ApiOperation)({ summary: 'Get booking statistics' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Booking statistics retrieved successfully' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BookingsController.prototype, "getBookingStats", null);
__decorate([
    (0, common_1.Get)('pending'),
    (0, swagger_1.ApiOperation)({ summary: 'Get pending booking requests' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Pending bookings retrieved successfully' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BookingsController.prototype, "getPendingBookings", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get booking request by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Booking retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Booking not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookingsController.prototype, "getBookingRequestById", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create new booking request' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Booking request created successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_booking_dto_1.CreateBookingDto]),
    __metadata("design:returntype", Promise)
], BookingsController.prototype, "createBookingRequest", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update booking request' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Booking updated successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_booking_dto_1.UpdateBookingDto]),
    __metadata("design:returntype", Promise)
], BookingsController.prototype, "updateBookingRequest", null);
__decorate([
    (0, common_1.Post)(':id/approve'),
    (0, swagger_1.ApiOperation)({ summary: 'Approve booking request' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Booking approved successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_booking_dto_1.ApproveBookingDto]),
    __metadata("design:returntype", Promise)
], BookingsController.prototype, "approveBookingRequest", null);
__decorate([
    (0, common_1.Post)(':id/reject'),
    (0, swagger_1.ApiOperation)({ summary: 'Reject booking request' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Booking rejected successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_booking_dto_1.RejectBookingDto]),
    __metadata("design:returntype", Promise)
], BookingsController.prototype, "rejectBookingRequest", null);
exports.BookingsController = BookingsController = __decorate([
    (0, swagger_1.ApiTags)('bookings'),
    (0, common_1.Controller)('api/v1/booking-requests'),
    __metadata("design:paramtypes", [bookings_service_1.BookingsService])
], BookingsController);
//# sourceMappingURL=bookings.controller.js.map