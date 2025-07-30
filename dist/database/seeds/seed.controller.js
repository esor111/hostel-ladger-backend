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
exports.SeedController = void 0;
const common_1 = require("@nestjs/common");
const seed_service_1 = require("./seed.service");
let SeedController = class SeedController {
    constructor(seedService) {
        this.seedService = seedService;
    }
    async getSeedStatus() {
        try {
            const status = await this.seedService.checkSeedStatus();
            return {
                status: 200,
                message: 'Seed status retrieved successfully',
                data: status
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                status: 500,
                message: 'Failed to get seed status',
                error: error.message
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async seedAll(force) {
        try {
            const forceReseed = force === 'true';
            const result = await this.seedService.seedAll(forceReseed);
            return {
                status: 201,
                message: 'Database seeded successfully',
                data: result
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                status: 500,
                message: 'Failed to seed database',
                error: error.message
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async seedBuildings(force) {
        try {
            const forceReseed = force === 'true';
            const result = await this.seedService.seedBuildings(forceReseed);
            return {
                status: 201,
                message: 'Buildings seeded successfully',
                data: result
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                status: 500,
                message: 'Failed to seed buildings',
                error: error.message
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async seedRoomTypes(force) {
        try {
            const forceReseed = force === 'true';
            const result = await this.seedService.seedRoomTypes(forceReseed);
            return {
                status: 201,
                message: 'Room types seeded successfully',
                data: result
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                status: 500,
                message: 'Failed to seed room types',
                error: error.message
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async seedAmenities(force) {
        try {
            const forceReseed = force === 'true';
            const result = await this.seedService.seedAmenities(forceReseed);
            return {
                status: 201,
                message: 'Amenities seeded successfully',
                data: result
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                status: 500,
                message: 'Failed to seed amenities',
                error: error.message
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async seedRooms(force) {
        try {
            const forceReseed = force === 'true';
            const result = await this.seedService.seedRooms(forceReseed);
            return {
                status: 201,
                message: 'Rooms seeded successfully',
                data: result
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                status: 500,
                message: 'Failed to seed rooms',
                error: error.message
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async seedStudents(force) {
        try {
            const forceReseed = force === 'true';
            const result = await this.seedService.seedStudents(forceReseed);
            return {
                status: 201,
                message: 'Students seeded successfully',
                data: result
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                status: 500,
                message: 'Failed to seed students',
                error: error.message
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async seedInvoices(force) {
        try {
            const forceReseed = force === 'true';
            const result = await this.seedService.seedInvoices(forceReseed);
            return {
                status: 201,
                message: 'Invoices seeded successfully',
                data: result
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                status: 500,
                message: 'Failed to seed invoices',
                error: error.message
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async seedPayments(force) {
        try {
            const forceReseed = force === 'true';
            const result = await this.seedService.seedPayments(forceReseed);
            return {
                status: 201,
                message: 'Payments seeded successfully',
                data: result
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                status: 500,
                message: 'Failed to seed payments',
                error: error.message
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async seedDiscounts(force) {
        try {
            const forceReseed = force === 'true';
            const result = await this.seedService.seedDiscounts(forceReseed);
            return {
                status: 201,
                message: 'Discounts seeded successfully',
                data: result
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                status: 500,
                message: 'Failed to seed discounts',
                error: error.message
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async seedRoomOccupants(force) {
        try {
            const forceReseed = force === 'true';
            const result = await this.seedService.seedRoomOccupants(forceReseed);
            return {
                status: 201,
                message: 'Room occupants seeded successfully',
                data: result
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                status: 500,
                message: 'Failed to seed room occupants',
                error: error.message
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async seedDiscountTypes(force) {
        try {
            const forceReseed = force === 'true';
            const result = await this.seedService.seedDiscountTypes(forceReseed);
            return {
                status: 201,
                message: 'Discount types seeded successfully',
                data: result
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                status: 500,
                message: 'Failed to seed discount types',
                error: error.message
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async seedPaymentAllocations(force) {
        try {
            const forceReseed = force === 'true';
            const result = await this.seedService.seedPaymentAllocations(forceReseed);
            return {
                status: 201,
                message: 'Payment allocations seeded successfully',
                data: result
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                status: 500,
                message: 'Failed to seed payment allocations',
                error: error.message
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async seedLedgerEntries(force) {
        try {
            const forceReseed = force === 'true';
            const result = await this.seedService.seedLedgerEntries(forceReseed);
            return {
                status: 201,
                message: 'Ledger entries seeded successfully',
                data: result
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                status: 500,
                message: 'Failed to seed ledger entries',
                error: error.message
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async seedBookings(force) {
        try {
            const forceReseed = force === 'true';
            const result = await this.seedService.seedBookings(forceReseed);
            return {
                status: 201,
                message: 'Booking requests seeded successfully',
                data: result
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                status: 500,
                message: 'Failed to seed booking requests',
                error: error.message
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async seedCustomData(seedData) {
        try {
            const result = await this.seedService.seedCustomData(seedData);
            return {
                status: 201,
                message: 'Custom data seeded successfully',
                data: result
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                status: 500,
                message: 'Failed to seed custom data',
                error: error.message
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async clearAllData(confirm) {
        if (confirm !== 'yes') {
            throw new common_1.HttpException({
                status: 400,
                message: 'Please add ?confirm=yes to confirm data deletion',
                error: 'Confirmation required'
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        try {
            const result = await this.seedService.clearAllData();
            return {
                status: 200,
                message: 'All data cleared successfully',
                data: result
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                status: 500,
                message: 'Failed to clear data',
                error: error.message
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async clearEntityData(entity, confirm) {
        if (confirm !== 'yes') {
            throw new common_1.HttpException({
                status: 400,
                message: 'Please add ?confirm=yes to confirm data deletion',
                error: 'Confirmation required'
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        try {
            const result = await this.seedService.clearEntityData(entity);
            return {
                status: 200,
                message: `${entity} data cleared successfully`,
                data: result
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                status: 500,
                message: `Failed to clear ${entity} data`,
                error: error.message
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.SeedController = SeedController;
__decorate([
    (0, common_1.Get)('status'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SeedController.prototype, "getSeedStatus", null);
__decorate([
    (0, common_1.Post)('all'),
    __param(0, (0, common_1.Query)('force')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SeedController.prototype, "seedAll", null);
__decorate([
    (0, common_1.Post)('buildings'),
    __param(0, (0, common_1.Query)('force')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SeedController.prototype, "seedBuildings", null);
__decorate([
    (0, common_1.Post)('room-types'),
    __param(0, (0, common_1.Query)('force')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SeedController.prototype, "seedRoomTypes", null);
__decorate([
    (0, common_1.Post)('amenities'),
    __param(0, (0, common_1.Query)('force')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SeedController.prototype, "seedAmenities", null);
__decorate([
    (0, common_1.Post)('rooms'),
    __param(0, (0, common_1.Query)('force')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SeedController.prototype, "seedRooms", null);
__decorate([
    (0, common_1.Post)('students'),
    __param(0, (0, common_1.Query)('force')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SeedController.prototype, "seedStudents", null);
__decorate([
    (0, common_1.Post)('invoices'),
    __param(0, (0, common_1.Query)('force')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SeedController.prototype, "seedInvoices", null);
__decorate([
    (0, common_1.Post)('payments'),
    __param(0, (0, common_1.Query)('force')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SeedController.prototype, "seedPayments", null);
__decorate([
    (0, common_1.Post)('discounts'),
    __param(0, (0, common_1.Query)('force')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SeedController.prototype, "seedDiscounts", null);
__decorate([
    (0, common_1.Post)('room-occupants'),
    __param(0, (0, common_1.Query)('force')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SeedController.prototype, "seedRoomOccupants", null);
__decorate([
    (0, common_1.Post)('discount-types'),
    __param(0, (0, common_1.Query)('force')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SeedController.prototype, "seedDiscountTypes", null);
__decorate([
    (0, common_1.Post)('payment-allocations'),
    __param(0, (0, common_1.Query)('force')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SeedController.prototype, "seedPaymentAllocations", null);
__decorate([
    (0, common_1.Post)('ledger-entries'),
    __param(0, (0, common_1.Query)('force')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SeedController.prototype, "seedLedgerEntries", null);
__decorate([
    (0, common_1.Post)('bookings'),
    __param(0, (0, common_1.Query)('force')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SeedController.prototype, "seedBookings", null);
__decorate([
    (0, common_1.Post)('custom'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SeedController.prototype, "seedCustomData", null);
__decorate([
    (0, common_1.Delete)('all'),
    __param(0, (0, common_1.Query)('confirm')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SeedController.prototype, "clearAllData", null);
__decorate([
    (0, common_1.Delete)(':entity'),
    __param(0, (0, common_1.Query)('entity')),
    __param(1, (0, common_1.Query)('confirm')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], SeedController.prototype, "clearEntityData", null);
exports.SeedController = SeedController = __decorate([
    (0, common_1.Controller)('api/v1/seed'),
    __metadata("design:paramtypes", [seed_service_1.SeedService])
], SeedController);
//# sourceMappingURL=seed.controller.js.map