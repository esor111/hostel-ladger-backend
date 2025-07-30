"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const students_controller_1 = require("./students.controller");
const students_service_1 = require("./students.service");
const student_entity_1 = require("./entities/student.entity");
const student_contact_entity_1 = require("./entities/student-contact.entity");
const student_academic_info_entity_1 = require("./entities/student-academic-info.entity");
const student_financial_info_entity_1 = require("./entities/student-financial-info.entity");
let StudentsModule = class StudentsModule {
};
exports.StudentsModule = StudentsModule;
exports.StudentsModule = StudentsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([
                student_entity_1.Student,
                student_contact_entity_1.StudentContact,
                student_academic_info_entity_1.StudentAcademicInfo,
                student_financial_info_entity_1.StudentFinancialInfo
            ])],
        controllers: [students_controller_1.StudentsController],
        providers: [students_service_1.StudentsService],
        exports: [students_service_1.StudentsService],
    })
], StudentsModule);
//# sourceMappingURL=students.module.js.map