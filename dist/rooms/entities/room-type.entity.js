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
exports.RoomType = exports.PricingModel = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../common/entities/base.entity");
const room_entity_1 = require("./room.entity");
var PricingModel;
(function (PricingModel) {
    PricingModel["MONTHLY"] = "monthly";
    PricingModel["DAILY"] = "daily";
    PricingModel["SEMESTER"] = "semester";
    PricingModel["ANNUAL"] = "annual";
})(PricingModel || (exports.PricingModel = PricingModel = {}));
let RoomType = class RoomType extends base_entity_1.BaseEntityWithCustomId {
};
exports.RoomType = RoomType;
__decorate([
    (0, typeorm_1.Column)({ length: 100, unique: true }),
    __metadata("design:type", String)
], RoomType.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, nullable: true }),
    __metadata("design:type", String)
], RoomType.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'base_monthly_rate', type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], RoomType.prototype, "baseMonthlyRate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'base_daily_rate', type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], RoomType.prototype, "baseDailyRate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'pricing_model',
        type: 'enum',
        enum: PricingModel,
        default: PricingModel.MONTHLY
    }),
    __metadata("design:type", String)
], RoomType.prototype, "pricingModel", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'default_bed_count', type: 'int', default: 1 }),
    __metadata("design:type", Number)
], RoomType.prototype, "defaultBedCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'max_occupancy', type: 'int', default: 1 }),
    __metadata("design:type", Number)
], RoomType.prototype, "maxOccupancy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'security_deposit', type: 'decimal', precision: 10, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], RoomType.prototype, "securityDeposit", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active', default: true }),
    __metadata("design:type", Boolean)
], RoomType.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], RoomType.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Array)
], RoomType.prototype, "features", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => room_entity_1.Room, room => room.roomType),
    __metadata("design:type", Array)
], RoomType.prototype, "rooms", void 0);
exports.RoomType = RoomType = __decorate([
    (0, typeorm_1.Entity)('room_types'),
    (0, typeorm_1.Index)(['name'], { unique: true }),
    (0, typeorm_1.Index)(['isActive'])
], RoomType);
//# sourceMappingURL=room-type.entity.js.map