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
exports.InvoicesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const invoices_service_1 = require("./invoices.service");
const create_invoice_dto_1 = require("./dto/create-invoice.dto");
const update_invoice_dto_1 = require("./dto/update-invoice.dto");
let InvoicesController = class InvoicesController {
    constructor(invoicesService) {
        this.invoicesService = invoicesService;
    }
    async getAllInvoices(query) {
        const result = await this.invoicesService.findAll(query);
        return {
            status: common_1.HttpStatus.OK,
            result: result
        };
    }
    async getInvoiceStats() {
        const stats = await this.invoicesService.getStats();
        return {
            status: common_1.HttpStatus.OK,
            stats: stats
        };
    }
    async getInvoiceById(id) {
        const invoice = await this.invoicesService.findOne(id);
        return {
            status: common_1.HttpStatus.OK,
            data: invoice
        };
    }
    async createInvoice(createInvoiceDto) {
        const invoice = await this.invoicesService.create(createInvoiceDto);
        return {
            status: common_1.HttpStatus.CREATED,
            data: invoice
        };
    }
    async updateInvoice(id, updateInvoiceDto) {
        const invoice = await this.invoicesService.update(id, updateInvoiceDto);
        return {
            status: common_1.HttpStatus.OK,
            data: invoice
        };
    }
    async generateMonthlyInvoices(generateDto) {
        const result = await this.invoicesService.generateMonthlyInvoices(generateDto.month, generateDto.studentIds);
        return {
            status: common_1.HttpStatus.OK,
            data: result
        };
    }
    async sendInvoice(id, sendDto) {
        const result = await this.invoicesService.sendInvoice(id, sendDto.method);
        return {
            status: common_1.HttpStatus.OK,
            data: result
        };
    }
};
exports.InvoicesController = InvoicesController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all invoices' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of invoices retrieved successfully' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], InvoicesController.prototype, "getAllInvoices", null);
__decorate([
    (0, common_1.Get)('stats'),
    (0, swagger_1.ApiOperation)({ summary: 'Get invoice statistics' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Invoice statistics retrieved successfully' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InvoicesController.prototype, "getInvoiceStats", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get invoice by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Invoice retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Invoice not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InvoicesController.prototype, "getInvoiceById", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create new invoice' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Invoice created successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_invoice_dto_1.CreateInvoiceDto]),
    __metadata("design:returntype", Promise)
], InvoicesController.prototype, "createInvoice", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update invoice' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Invoice updated successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_invoice_dto_1.UpdateInvoiceDto]),
    __metadata("design:returntype", Promise)
], InvoicesController.prototype, "updateInvoice", null);
__decorate([
    (0, common_1.Post)('generate-monthly'),
    (0, swagger_1.ApiOperation)({ summary: 'Generate monthly invoices' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Monthly invoices generated successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], InvoicesController.prototype, "generateMonthlyInvoices", null);
__decorate([
    (0, common_1.Post)(':id/send'),
    (0, swagger_1.ApiOperation)({ summary: 'Send invoice to student' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Invoice sent successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], InvoicesController.prototype, "sendInvoice", null);
exports.InvoicesController = InvoicesController = __decorate([
    (0, swagger_1.ApiTags)('invoices'),
    (0, common_1.Controller)('api/v1/invoices'),
    __metadata("design:paramtypes", [invoices_service_1.InvoicesService])
], InvoicesController);
//# sourceMappingURL=invoices.controller.js.map