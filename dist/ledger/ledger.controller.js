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
exports.LedgerController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const ledger_service_1 = require("./ledger.service");
const create_ledger_entry_dto_1 = require("./dto/create-ledger-entry.dto");
let LedgerController = class LedgerController {
    constructor(ledgerService) {
        this.ledgerService = ledgerService;
    }
    async getAllLedgerEntries(query) {
        const result = await this.ledgerService.findAll(query);
        return {
            status: common_1.HttpStatus.OK,
            result: result
        };
    }
    async getLedgerStats() {
        const stats = await this.ledgerService.getStats();
        return {
            status: common_1.HttpStatus.OK,
            stats: stats
        };
    }
    async getStudentLedger(studentId) {
        const entries = await this.ledgerService.findByStudentId(studentId);
        return {
            status: common_1.HttpStatus.OK,
            data: entries
        };
    }
    async getStudentBalance(studentId) {
        const balance = await this.ledgerService.getStudentBalance(studentId);
        return {
            status: common_1.HttpStatus.OK,
            data: balance
        };
    }
    async createAdjustment(adjustmentDto) {
        const entry = await this.ledgerService.createAdjustmentEntry(adjustmentDto.studentId, adjustmentDto.amount, adjustmentDto.description, adjustmentDto.type, adjustmentDto.createdBy);
        return {
            status: common_1.HttpStatus.CREATED,
            data: entry
        };
    }
    async reverseEntry(entryId, reversalDto) {
        const result = await this.ledgerService.reverseEntry(entryId, reversalDto.reversedBy, reversalDto.reason);
        return {
            status: common_1.HttpStatus.OK,
            data: result
        };
    }
};
exports.LedgerController = LedgerController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all ledger entries' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of ledger entries retrieved successfully' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LedgerController.prototype, "getAllLedgerEntries", null);
__decorate([
    (0, common_1.Get)('stats'),
    (0, swagger_1.ApiOperation)({ summary: 'Get ledger statistics' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Ledger statistics retrieved successfully' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LedgerController.prototype, "getLedgerStats", null);
__decorate([
    (0, common_1.Get)('student/:studentId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get student ledger entries' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Student ledger retrieved successfully' }),
    __param(0, (0, common_1.Param)('studentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LedgerController.prototype, "getStudentLedger", null);
__decorate([
    (0, common_1.Get)('student/:studentId/balance'),
    (0, swagger_1.ApiOperation)({ summary: 'Get student current balance' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Student balance retrieved successfully' }),
    __param(0, (0, common_1.Param)('studentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LedgerController.prototype, "getStudentBalance", null);
__decorate([
    (0, common_1.Post)('adjustment'),
    (0, swagger_1.ApiOperation)({ summary: 'Create balance adjustment entry' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Adjustment entry created successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_ledger_entry_dto_1.CreateAdjustmentDto]),
    __metadata("design:returntype", Promise)
], LedgerController.prototype, "createAdjustment", null);
__decorate([
    (0, common_1.Post)(':entryId/reverse'),
    (0, swagger_1.ApiOperation)({ summary: 'Reverse a ledger entry' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Ledger entry reversed successfully' }),
    __param(0, (0, common_1.Param)('entryId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], LedgerController.prototype, "reverseEntry", null);
exports.LedgerController = LedgerController = __decorate([
    (0, swagger_1.ApiTags)('ledger'),
    (0, common_1.Controller)('api/v1/ledgers'),
    __metadata("design:paramtypes", [ledger_service_1.LedgerService])
], LedgerController);
//# sourceMappingURL=ledger.controller.js.map