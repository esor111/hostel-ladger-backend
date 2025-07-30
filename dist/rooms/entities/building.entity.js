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
exports.Building = exports.BuildingStatus = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../common/entities/base.entity");
const room_entity_1 = require("./room.entity");
var BuildingStatus;
(function (BuildingStatus) {
    BuildingStatus["ACTIVE"] = "Active";
    BuildingStatus["MAINTENANCE"] = "Maintenance";
    BuildingStatus["INACTIVE"] = "Inactive";
})(BuildingStatus || (exports.BuildingStatus = BuildingStatus = {}));
let Building = class Building extends base_entity_1.BaseEntityWithCustomId {
};
exports.Building = Building;
__decorate([
    (0, typeorm_1.Column)({ length: 255, unique: true }),
    __metadata("design:type", String)
], Building.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], Building.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Building.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_floors', type: 'int', default: 1 }),
    __metadata("design:type", Number)
], Building.prototype, "totalFloors", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_rooms', type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Building.prototype, "totalRooms", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: BuildingStatus,
        default: BuildingStatus.ACTIVE
    }),
    __metadata("design:type", String)
], Building.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'construction_year', type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Building.prototype, "constructionYear", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'last_renovation', type: 'date', nullable: true }),
    __metadata("design:type", Date)
], Building.prototype, "lastRenovation", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Building.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Array)
], Building.prototype, "facilities", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => room_entity_1.Room, room => room.building),
    __metadata("design:type", Array)
], Building.prototype, "rooms", void 0);
exports.Building = Building = __decorate([
    (0, typeorm_1.Entity)('buildings'),
    (0, typeorm_1.Index)(['name'], { unique: true }),
    (0, typeorm_1.Index)(['status'])
], Building);
//# sourceMappingURL=building.entity.js.map