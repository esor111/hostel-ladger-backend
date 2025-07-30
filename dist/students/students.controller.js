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
exports.StudentsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const students_service_1 = require("./students.service");
const dto_1 = require("./dto");
let StudentsController = class StudentsController {
    constructor(studentsService) {
        this.studentsService = studentsService;
    }
    async getAllStudents(query) {
        const result = await this.studentsService.findAll(query);
        return {
            status: common_1.HttpStatus.OK,
            data: result
        };
    }
    async getStudentStats() {
        const stats = await this.studentsService.getStats();
        return {
            status: common_1.HttpStatus.OK,
            data: stats
        };
    }
    async getStudentById(id) {
        const student = await this.studentsService.findOne(id);
        return {
            status: common_1.HttpStatus.OK,
            data: student
        };
    }
    async createStudent(createStudentDto) {
        const student = await this.studentsService.create(createStudentDto);
        return {
            status: common_1.HttpStatus.CREATED,
            data: student
        };
    }
    async updateStudent(id, updateStudentDto) {
        const student = await this.studentsService.update(id, updateStudentDto);
        return {
            status: common_1.HttpStatus.OK,
            data: student
        };
    }
    async getStudentBalance(id) {
        const balance = await this.studentsService.getStudentBalance(id);
        return {
            status: common_1.HttpStatus.OK,
            data: balance
        };
    }
    async getStudentLedger(id) {
        const ledger = await this.studentsService.getStudentLedger(id);
        return {
            status: common_1.HttpStatus.OK,
            data: ledger
        };
    }
    async getStudentPayments(id) {
        const payments = await this.studentsService.getStudentPayments(id);
        return {
            status: common_1.HttpStatus.OK,
            data: payments
        };
    }
    async getStudentInvoices(id) {
        const invoices = await this.studentsService.getStudentInvoices(id);
        return {
            status: common_1.HttpStatus.OK,
            data: invoices
        };
    }
    async processCheckout(id, checkoutDetails) {
        const result = await this.studentsService.processCheckout(id, checkoutDetails);
        return {
            status: common_1.HttpStatus.OK,
            data: result
        };
    }
    async searchStudents(searchDto) {
        const result = await this.studentsService.advancedSearch(searchDto);
        return {
            status: common_1.HttpStatus.OK,
            data: result
        };
    }
    async bulkUpdateStudents(bulkUpdateDto) {
        const result = await this.studentsService.bulkUpdate(bulkUpdateDto);
        return {
            status: common_1.HttpStatus.OK,
            data: result
        };
    }
    async deleteStudent(id) {
        const result = await this.studentsService.remove(id);
        return {
            status: common_1.HttpStatus.OK,
            data: result
        };
    }
};
exports.StudentsController = StudentsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all students' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of students retrieved successfully' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "getAllStudents", null);
__decorate([
    (0, common_1.Get)('stats'),
    (0, swagger_1.ApiOperation)({ summary: 'Get student statistics' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Student statistics retrieved successfully' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "getStudentStats", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get student by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Student retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Student not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "getStudentById", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create new student' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Student created successfully' }),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateStudentDto]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "createStudent", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update student' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Student updated successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateStudentDto]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "updateStudent", null);
__decorate([
    (0, common_1.Get)(':id/balance'),
    (0, swagger_1.ApiOperation)({ summary: 'Get student balance' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Student balance retrieved successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "getStudentBalance", null);
__decorate([
    (0, common_1.Get)(':id/ledger'),
    (0, swagger_1.ApiOperation)({ summary: 'Get student ledger entries' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Student ledger retrieved successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "getStudentLedger", null);
__decorate([
    (0, common_1.Get)(':id/payments'),
    (0, swagger_1.ApiOperation)({ summary: 'Get student payments' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Student payments retrieved successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "getStudentPayments", null);
__decorate([
    (0, common_1.Get)(':id/invoices'),
    (0, swagger_1.ApiOperation)({ summary: 'Get student invoices' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Student invoices retrieved successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "getStudentInvoices", null);
__decorate([
    (0, common_1.Post)(':id/checkout'),
    (0, swagger_1.ApiOperation)({ summary: 'Process student checkout' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Checkout processed successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.CheckoutStudentDto]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "processCheckout", null);
__decorate([
    (0, common_1.Post)('search'),
    (0, swagger_1.ApiOperation)({ summary: 'Advanced search for students' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Search results retrieved successfully' }),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.SearchStudentDto]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "searchStudents", null);
__decorate([
    (0, common_1.Put)('bulk'),
    (0, swagger_1.ApiOperation)({ summary: 'Bulk update students' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Students updated successfully' }),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.BulkUpdateStudentDto]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "bulkUpdateStudents", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete student' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Student deleted successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "deleteStudent", null);
exports.StudentsController = StudentsController = __decorate([
    (0, swagger_1.ApiTags)('students'),
    (0, common_1.Controller)('api/v1/students'),
    __metadata("design:paramtypes", [students_service_1.StudentsService])
], StudentsController);
//# sourceMappingURL=students.controller.js.map