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
exports.RoomLayout = void 0;
const typeorm_1 = require("typeorm");
const room_entity_1 = require("./room.entity");
let RoomLayout = class RoomLayout {
};
exports.RoomLayout = RoomLayout;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], RoomLayout.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'room_id', unique: true }),
    __metadata("design:type", String)
], RoomLayout.prototype, "roomId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'layout_type', length: 50, default: 'standard' }),
    __metadata("design:type", String)
], RoomLayout.prototype, "layoutType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], RoomLayout.prototype, "layoutData", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], RoomLayout.prototype, "bedPositions", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], RoomLayout.prototype, "furnitureLayout", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], RoomLayout.prototype, "dimensions", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], RoomLayout.prototype, "floorPlan", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active', default: true }),
    __metadata("design:type", Boolean)
], RoomLayout.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_by', length: 100, nullable: true }),
    __metadata("design:type", String)
], RoomLayout.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'updated_by', length: 100, nullable: true }),
    __metadata("design:type", String)
], RoomLayout.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], RoomLayout.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], RoomLayout.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => room_entity_1.Room, room => room.layout, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'room_id' }),
    __metadata("design:type", room_entity_1.Room)
], RoomLayout.prototype, "room", void 0);
exports.RoomLayout = RoomLayout = __decorate([
    (0, typeorm_1.Entity)('room_layouts')
], RoomLayout);
//# sourceMappingURL=room-layout.entity.js.map