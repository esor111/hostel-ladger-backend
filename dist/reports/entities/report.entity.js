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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Report = exports.ReportStatus = exports.ReportFormat = exports.ReportType = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../common/entities/base.entity");
var ReportType;
(function (ReportType) {
    ReportType["FINANCIAL"] = "financial";
    ReportType["LEDGER"] = "ledger";
    ReportType["PAYMENT"] = "payment";
    ReportType["INVOICE"] = "invoice";
    ReportType["STUDENT"] = "student";
    ReportType["ROOM"] = "room";
    ReportType["OCCUPANCY"] = "occupancy";
    ReportType["BOOKING"] = "booking";
})(ReportType || (exports.ReportType = ReportType = {}));
var ReportFormat;
(function (ReportFormat) {
    ReportFormat["PDF"] = "pdf";
    ReportFormat["EXCEL"] = "excel";
    ReportFormat["CSV"] = "csv";
    ReportFormat["JSON"] = "json";
})(ReportFormat || (exports.ReportFormat = ReportFormat = {}));
var ReportStatus;
(function (ReportStatus) {
    ReportStatus["COMPLETED"] = "completed";
    ReportStatus["PROCESSING"] = "processing";
    ReportStatus["FAILED"] = "failed";
    ReportStatus["QUEUED"] = "queued";
})(ReportStatus || (exports.ReportStatus = ReportStatus = {}));
let Report = class Report extends base_entity_1.BaseEntityWithCustomId {
};
exports.Report = Report;
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], Report.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ReportType
    }),
    __metadata("design:type", String)
], Report.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Report.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'generated_by', length: 100 }),
    __metadata("design:type", String)
], Report.prototype, "generatedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'generated_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], Report.prototype, "generatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Report.prototype, "parameters", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Report.prototype, "data", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ReportFormat,
        default: ReportFormat.PDF
    }),
    __metadata("design:type", String)
], Report.prototype, "format", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'file_path', length: 500, nullable: true }),
    __metadata("design:type", String)
], Report.prototype, "filePath", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'file_size', length: 20, nullable: true }),
    __metadata("design:type", String)
], Report.prototype, "fileSize", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ReportStatus,
        default: ReportStatus.COMPLETED
    }),
    __metadata("design:type", String)
], Report.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_scheduled', default: false }),
    __metadata("design:type", Boolean)
], Report.prototype, "isScheduled", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'schedule_config', type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Report.prototype, "scheduleConfig", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'execution_time_ms', type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Report.prototype, "executionTimeMs", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'error_message', type: 'text', nullable: true }),
    __metadata("design:type", String)
], Report.prototype, "errorMessage", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'download_count', type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Report.prototype, "downloadCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'expires_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Report.prototype, "expiresAt", void 0);
exports.Report = Report = __decorate([
    (0, typeorm_1.Entity)('reports'),
    (0, typeorm_1.Index)(['type']),
    (0, typeorm_1.Index)(['generatedBy']),
    (0, typeorm_1.Index)(['generatedAt']),
    (0, typeorm_1.Index)(['status']),
    (0, typeorm_1.Index)(['isScheduled'])
], Report);
//# sourceMappingURL=report.entity.js.map