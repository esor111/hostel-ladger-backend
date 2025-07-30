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
exports.ReportsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const reports_service_1 = require("./reports.service");
const generate_report_dto_1 = require("./dto/generate-report.dto");
let ReportsController = class ReportsController {
    constructor(reportsService) {
        this.reportsService = reportsService;
    }
    async getAllReports(query) {
        const result = await this.reportsService.findAll(query);
        return {
            status: common_1.HttpStatus.OK,
            result: result
        };
    }
    async getReportById(id) {
        const report = await this.reportsService.findOne(id);
        return {
            status: common_1.HttpStatus.OK,
            data: report
        };
    }
    async getReportData(id) {
        const reportData = await this.reportsService.getReportData(id);
        return {
            status: common_1.HttpStatus.OK,
            data: reportData
        };
    }
    async generateReport(generateReportDto) {
        const report = await this.reportsService.generateReport(generateReportDto.type, generateReportDto.parameters || {});
        return {
            status: common_1.HttpStatus.CREATED,
            data: report
        };
    }
    async generateOccupancyReport(parameters = {}) {
        const report = await this.reportsService.generateReport('occupancy', parameters);
        return {
            status: common_1.HttpStatus.OK,
            data: report
        };
    }
    async generateFinancialReport(parameters = {}) {
        const report = await this.reportsService.generateReport('financial', parameters);
        return {
            status: common_1.HttpStatus.OK,
            data: report
        };
    }
    async generateStudentReport(parameters = {}) {
        const report = await this.reportsService.generateReport('student', parameters);
        return {
            status: common_1.HttpStatus.OK,
            data: report
        };
    }
    async generatePaymentReport(parameters = {}) {
        const report = await this.reportsService.generateReport('payment', parameters);
        return {
            status: common_1.HttpStatus.OK,
            data: report
        };
    }
    async generateLedgerReport(parameters = {}) {
        const report = await this.reportsService.generateReport('ledger', parameters);
        return {
            status: common_1.HttpStatus.OK,
            data: report
        };
    }
};
exports.ReportsController = ReportsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all reports' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of reports retrieved successfully' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "getAllReports", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get report by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Report retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Report not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "getReportById", null);
__decorate([
    (0, common_1.Get)(':id/data'),
    (0, swagger_1.ApiOperation)({ summary: 'Get report data by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Report data retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Report not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "getReportData", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Generate new report' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Report generated successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [generate_report_dto_1.GenerateReportDto]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "generateReport", null);
__decorate([
    (0, common_1.Post)('generate/occupancy'),
    (0, swagger_1.ApiOperation)({ summary: 'Generate occupancy report' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Occupancy report generated successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [generate_report_dto_1.GenerateOccupancyReportDto]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "generateOccupancyReport", null);
__decorate([
    (0, common_1.Post)('generate/financial'),
    (0, swagger_1.ApiOperation)({ summary: 'Generate financial report' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Financial report generated successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [generate_report_dto_1.GenerateFinancialReportDto]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "generateFinancialReport", null);
__decorate([
    (0, common_1.Post)('generate/student'),
    (0, swagger_1.ApiOperation)({ summary: 'Generate student report' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Student report generated successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [generate_report_dto_1.GenerateStudentReportDto]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "generateStudentReport", null);
__decorate([
    (0, common_1.Post)('generate/payment'),
    (0, swagger_1.ApiOperation)({ summary: 'Generate payment report' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Payment report generated successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [generate_report_dto_1.GeneratePaymentReportDto]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "generatePaymentReport", null);
__decorate([
    (0, common_1.Post)('generate/ledger'),
    (0, swagger_1.ApiOperation)({ summary: 'Generate ledger report' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Ledger report generated successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [generate_report_dto_1.GenerateLedgerReportDto]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "generateLedgerReport", null);
exports.ReportsController = ReportsController = __decorate([
    (0, swagger_1.ApiTags)('reports'),
    (0, common_1.Controller)('api/v1/reports'),
    __metadata("design:paramtypes", [reports_service_1.ReportsService])
], ReportsController);
//# sourceMappingURL=reports.controller.js.map