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
exports.DiscountsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const discounts_service_1 = require("./discounts.service");
const create_discount_dto_1 = require("./dto/create-discount.dto");
const update_discount_dto_1 = require("./dto/update-discount.dto");
let DiscountsController = class DiscountsController {
    constructor(discountsService) {
        this.discountsService = discountsService;
    }
    async getDiscounts(query) {
        const result = await this.discountsService.findAll(query);
        return {
            status: common_1.HttpStatus.OK,
            result: result
        };
    }
    async getDiscountStats() {
        const stats = await this.discountsService.getStats();
        return {
            status: common_1.HttpStatus.OK,
            stats: stats
        };
    }
    async getDiscountTypes() {
        const types = await this.discountsService.getDiscountTypes();
        return {
            status: common_1.HttpStatus.OK,
            data: types
        };
    }
    async getDiscountsByStudentId(studentId) {
        const discounts = await this.discountsService.findByStudentId(studentId);
        return {
            status: common_1.HttpStatus.OK,
            data: discounts
        };
    }
    async getDiscountById(id) {
        const discount = await this.discountsService.findOne(id);
        return {
            status: common_1.HttpStatus.OK,
            data: discount
        };
    }
    async createDiscount(createDiscountDto) {
        const discount = await this.discountsService.create(createDiscountDto);
        return {
            status: common_1.HttpStatus.CREATED,
            data: discount
        };
    }
    async updateDiscount(id, updateDiscountDto) {
        const discount = await this.discountsService.update(id, updateDiscountDto);
        return {
            status: common_1.HttpStatus.OK,
            data: discount
        };
    }
    async applyDiscount(applyDiscountDto) {
        const result = await this.discountsService.applyDiscount(applyDiscountDto.studentId, applyDiscountDto);
        return {
            status: common_1.HttpStatus.OK,
            data: result
        };
    }
    async expireDiscount(id, expireDto) {
        const result = await this.discountsService.expireDiscount(id, expireDto.expiredBy);
        return {
            status: common_1.HttpStatus.OK,
            data: result
        };
    }
};
exports.DiscountsController = DiscountsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all discounts' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of discounts retrieved successfully' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DiscountsController.prototype, "getDiscounts", null);
__decorate([
    (0, common_1.Get)('stats'),
    (0, swagger_1.ApiOperation)({ summary: 'Get discount statistics' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Discount statistics retrieved successfully' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DiscountsController.prototype, "getDiscountStats", null);
__decorate([
    (0, common_1.Get)('types'),
    (0, swagger_1.ApiOperation)({ summary: 'Get discount types' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Discount types retrieved successfully' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DiscountsController.prototype, "getDiscountTypes", null);
__decorate([
    (0, common_1.Get)('student/:studentId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get discounts by student ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Student discounts retrieved successfully' }),
    __param(0, (0, common_1.Param)('studentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DiscountsController.prototype, "getDiscountsByStudentId", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get discount by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Discount retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Discount not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DiscountsController.prototype, "getDiscountById", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create new discount' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Discount created successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_discount_dto_1.CreateDiscountDto]),
    __metadata("design:returntype", Promise)
], DiscountsController.prototype, "createDiscount", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update discount' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Discount updated successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_discount_dto_1.UpdateDiscountDto]),
    __metadata("design:returntype", Promise)
], DiscountsController.prototype, "updateDiscount", null);
__decorate([
    (0, common_1.Post)('apply'),
    (0, swagger_1.ApiOperation)({ summary: 'Apply discount to student' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Discount applied successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_discount_dto_1.ApplyDiscountDto]),
    __metadata("design:returntype", Promise)
], DiscountsController.prototype, "applyDiscount", null);
__decorate([
    (0, common_1.Put)(':id/expire'),
    (0, swagger_1.ApiOperation)({ summary: 'Expire discount' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Discount expired successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DiscountsController.prototype, "expireDiscount", null);
exports.DiscountsController = DiscountsController = __decorate([
    (0, swagger_1.ApiTags)('discounts'),
    (0, common_1.Controller)('api/v1/discounts'),
    __metadata("design:paramtypes", [discounts_service_1.DiscountsService])
], DiscountsController);
//# sourceMappingURL=discounts.controller.js.map