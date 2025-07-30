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
exports.StudentContact = exports.ContactType = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../common/entities/base.entity");
const student_entity_1 = require("./student.entity");
var ContactType;
(function (ContactType) {
    ContactType["GUARDIAN"] = "guardian";
    ContactType["EMERGENCY"] = "emergency";
    ContactType["PARENT"] = "parent";
    ContactType["RELATIVE"] = "relative";
})(ContactType || (exports.ContactType = ContactType = {}));
let StudentContact = class StudentContact extends base_entity_1.BaseEntity {
};
exports.StudentContact = StudentContact;
__decorate([
    (0, typeorm_1.Column)({ name: 'student_id', length: 50 }),
    __metadata("design:type", String)
], StudentContact.prototype, "studentId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ContactType
    }),
    __metadata("design:type", String)
], StudentContact.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], StudentContact.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20 }),
    __metadata("design:type", String)
], StudentContact.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, nullable: true }),
    __metadata("design:type", String)
], StudentContact.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], StudentContact.prototype, "relationship", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_primary', default: false }),
    __metadata("design:type", Boolean)
], StudentContact.prototype, "isPrimary", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active', default: true }),
    __metadata("design:type", Boolean)
], StudentContact.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => student_entity_1.Student, student => student.contacts, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'student_id' }),
    __metadata("design:type", student_entity_1.Student)
], StudentContact.prototype, "student", void 0);
exports.StudentContact = StudentContact = __decorate([
    (0, typeorm_1.Entity)('student_contacts'),
    (0, typeorm_1.Index)(['studentId', 'type'])
], StudentContact);
//# sourceMappingURL=student-contact.entity.js.map