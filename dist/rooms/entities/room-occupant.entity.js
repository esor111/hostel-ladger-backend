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
exports.RoomOccupant = void 0;
const typeorm_1 = require("typeorm");
const room_entity_1 = require("./room.entity");
const student_entity_1 = require("../../students/entities/student.entity");
let RoomOccupant = class RoomOccupant {
};
exports.RoomOccupant = RoomOccupant;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], RoomOccupant.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'room_id' }),
    __metadata("design:type", String)
], RoomOccupant.prototype, "roomId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'student_id' }),
    __metadata("design:type", String)
], RoomOccupant.prototype, "studentId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'check_in_date', type: 'date' }),
    __metadata("design:type", Date)
], RoomOccupant.prototype, "checkInDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'check_out_date', type: 'date', nullable: true }),
    __metadata("design:type", Date)
], RoomOccupant.prototype, "checkOutDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'bed_number', nullable: true }),
    __metadata("design:type", String)
], RoomOccupant.prototype, "bedNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20, default: 'Active' }),
    __metadata("design:type", String)
], RoomOccupant.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], RoomOccupant.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'assigned_by', length: 100, nullable: true }),
    __metadata("design:type", String)
], RoomOccupant.prototype, "assignedBy", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], RoomOccupant.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], RoomOccupant.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => room_entity_1.Room, room => room.occupants, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'room_id' }),
    __metadata("design:type", room_entity_1.Room)
], RoomOccupant.prototype, "room", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => student_entity_1.Student, student => student.roomOccupancy, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'student_id' }),
    __metadata("design:type", student_entity_1.Student)
], RoomOccupant.prototype, "student", void 0);
exports.RoomOccupant = RoomOccupant = __decorate([
    (0, typeorm_1.Entity)('room_occupants')
], RoomOccupant);
//# sourceMappingURL=room-occupant.entity.js.map