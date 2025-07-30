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
exports.StudentAcademicInfo = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../common/entities/base.entity");
const student_entity_1 = require("./student.entity");
let StudentAcademicInfo = class StudentAcademicInfo extends base_entity_1.BaseEntity {
};
exports.StudentAcademicInfo = StudentAcademicInfo;
__decorate([
    (0, typeorm_1.Column)({ name: 'student_id', length: 50 }),
    __metadata("design:type", String)
], StudentAcademicInfo.prototype, "studentId", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], StudentAcademicInfo.prototype, "course", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], StudentAcademicInfo.prototype, "institution", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'academic_year', length: 20, nullable: true }),
    __metadata("design:type", String)
], StudentAcademicInfo.prototype, "academicYear", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, nullable: true }),
    __metadata("design:type", String)
], StudentAcademicInfo.prototype, "semester", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'start_date', type: 'date', nullable: true }),
    __metadata("design:type", Date)
], StudentAcademicInfo.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'expected_end_date', type: 'date', nullable: true }),
    __metadata("design:type", Date)
], StudentAcademicInfo.prototype, "expectedEndDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'student_id_number', length: 100, nullable: true }),
    __metadata("design:type", String)
], StudentAcademicInfo.prototype, "studentIdNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active', default: true }),
    __metadata("design:type", Boolean)
], StudentAcademicInfo.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => student_entity_1.Student, student => student.academicInfo, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'student_id' }),
    __metadata("design:type", student_entity_1.Student)
], StudentAcademicInfo.prototype, "student", void 0);
exports.StudentAcademicInfo = StudentAcademicInfo = __decorate([
    (0, typeorm_1.Entity)('student_academic_info'),
    (0, typeorm_1.Index)(['studentId']),
    (0, typeorm_1.Index)(['isActive'])
], StudentAcademicInfo);
//# sourceMappingURL=student-academic-info.entity.js.map