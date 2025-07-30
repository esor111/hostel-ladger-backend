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
exports.RoomAmenity = void 0;
const typeorm_1 = require("typeorm");
const room_entity_1 = require("./room.entity");
const amenity_entity_1 = require("./amenity.entity");
let RoomAmenity = class RoomAmenity {
};
exports.RoomAmenity = RoomAmenity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], RoomAmenity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'room_id' }),
    __metadata("design:type", String)
], RoomAmenity.prototype, "roomId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'amenity_id' }),
    __metadata("design:type", String)
], RoomAmenity.prototype, "amenityId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active', default: true }),
    __metadata("design:type", Boolean)
], RoomAmenity.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'installed_date', type: 'date', nullable: true }),
    __metadata("design:type", Date)
], RoomAmenity.prototype, "installedDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], RoomAmenity.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], RoomAmenity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], RoomAmenity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => room_entity_1.Room, room => room.amenities, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'room_id' }),
    __metadata("design:type", room_entity_1.Room)
], RoomAmenity.prototype, "room", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => amenity_entity_1.Amenity, amenity => amenity.roomAmenities, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'amenity_id' }),
    __metadata("design:type", amenity_entity_1.Amenity)
], RoomAmenity.prototype, "amenity", void 0);
exports.RoomAmenity = RoomAmenity = __decorate([
    (0, typeorm_1.Entity)('room_amenities')
], RoomAmenity);
//# sourceMappingURL=room-amenity.entity.js.map