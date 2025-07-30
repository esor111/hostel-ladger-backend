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
exports.Amenity = exports.AmenityCategory = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../common/entities/base.entity");
const room_amenity_entity_1 = require("./room-amenity.entity");
var AmenityCategory;
(function (AmenityCategory) {
    AmenityCategory["FURNITURE"] = "furniture";
    AmenityCategory["ELECTRONICS"] = "electronics";
    AmenityCategory["UTILITIES"] = "utilities";
    AmenityCategory["COMFORT"] = "comfort";
    AmenityCategory["SAFETY"] = "safety";
    AmenityCategory["CONNECTIVITY"] = "connectivity";
})(AmenityCategory || (exports.AmenityCategory = AmenityCategory = {}));
let Amenity = class Amenity extends base_entity_1.BaseEntity {
};
exports.Amenity = Amenity;
__decorate([
    (0, typeorm_1.Column)({ length: 100, unique: true }),
    __metadata("design:type", String)
], Amenity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: AmenityCategory
    }),
    __metadata("design:type", String)
], Amenity.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Amenity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'maintenance_required', default: false }),
    __metadata("design:type", Boolean)
], Amenity.prototype, "maintenanceRequired", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'maintenance_frequency_days', type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Amenity.prototype, "maintenanceFrequencyDays", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active', default: true }),
    __metadata("design:type", Boolean)
], Amenity.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Amenity.prototype, "specifications", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => room_amenity_entity_1.RoomAmenity, roomAmenity => roomAmenity.amenity),
    __metadata("design:type", Array)
], Amenity.prototype, "roomAmenities", void 0);
exports.Amenity = Amenity = __decorate([
    (0, typeorm_1.Entity)('amenities'),
    (0, typeorm_1.Index)(['name'], { unique: true }),
    (0, typeorm_1.Index)(['category']),
    (0, typeorm_1.Index)(['isActive'])
], Amenity);
//# sourceMappingURL=amenity.entity.js.map