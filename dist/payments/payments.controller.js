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
exports.PaymentsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const payments_service_1 = require("./payments.service");
const create_payment_dto_1 = require("./dto/create-payment.dto");
const update_payment_dto_1 = require("./dto/update-payment.dto");
let PaymentsController = class PaymentsController {
    constructor(paymentsService) {
        this.paymentsService = paymentsService;
    }
    async getAllPayments(query) {
        const result = await this.paymentsService.findAll(query);
        return {
            status: common_1.HttpStatus.OK,
            result: result
        };
    }
    async getPaymentStats() {
        const stats = await this.paymentsService.getStats();
        return {
            status: common_1.HttpStatus.OK,
            stats: stats
        };
    }
    async getPaymentsByStudentId(studentId) {
        const payments = await this.paymentsService.findByStudentId(studentId);
        return {
            status: common_1.HttpStatus.OK,
            data: payments
        };
    }
    async getPaymentById(id) {
        const payment = await this.paymentsService.findOne(id);
        return {
            status: common_1.HttpStatus.OK,
            data: payment
        };
    }
    async recordPayment(createPaymentDto) {
        const payment = await this.paymentsService.create(createPaymentDto);
        return {
            status: common_1.HttpStatus.CREATED,
            data: payment
        };
    }
    async updatePayment(id, updatePaymentDto) {
        const payment = await this.paymentsService.update(id, updatePaymentDto);
        return {
            status: common_1.HttpStatus.OK,
            data: payment
        };
    }
    async processBulkPayments(bulkPaymentDto) {
        const result = await this.paymentsService.processBulkPayments(bulkPaymentDto.payments);
        return {
            status: common_1.HttpStatus.OK,
            data: result
        };
    }
    async allocatePaymentToInvoices(id, allocationDto) {
        const result = await this.paymentsService.allocatePaymentToInvoices(id, allocationDto.invoiceAllocations);
        return {
            status: common_1.HttpStatus.OK,
            data: result
        };
    }
};
exports.PaymentsController = PaymentsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all payments' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of payments retrieved successfully' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "getAllPayments", null);
__decorate([
    (0, common_1.Get)('stats'),
    (0, swagger_1.ApiOperation)({ summary: 'Get payment statistics' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Payment statistics retrieved successfully' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "getPaymentStats", null);
__decorate([
    (0, common_1.Get)('student/:studentId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get payments by student ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Student payments retrieved successfully' }),
    __param(0, (0, common_1.Param)('studentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "getPaymentsByStudentId", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get payment by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Payment retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Payment not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "getPaymentById", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Record new payment' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Payment recorded successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_payment_dto_1.CreatePaymentDto]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "recordPayment", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update payment' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Payment updated successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_payment_dto_1.UpdatePaymentDto]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "updatePayment", null);
__decorate([
    (0, common_1.Post)('bulk'),
    (0, swagger_1.ApiOperation)({ summary: 'Process bulk payments' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Bulk payments processed successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "processBulkPayments", null);
__decorate([
    (0, common_1.Post)(':id/allocate'),
    (0, swagger_1.ApiOperation)({ summary: 'Allocate payment to invoices' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Payment allocated successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "allocatePaymentToInvoices", null);
exports.PaymentsController = PaymentsController = __decorate([
    (0, swagger_1.ApiTags)('payments'),
    (0, common_1.Controller)('api/v1/payments'),
    __metadata("design:paramtypes", [payments_service_1.PaymentsService])
], PaymentsController);
//# sourceMappingURL=payments.controller.js.map