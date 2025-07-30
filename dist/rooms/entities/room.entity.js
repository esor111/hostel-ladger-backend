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
exports.Room = exports.MaintenanceStatus = exports.Gender = exports.RoomStatus = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../common/entities/base.entity");
const student_entity_1 = require("../../students/entities/student.entity");
const room_amenity_entity_1 = require("./room-amenity.entity");
const room_occupant_entity_1 = require("./room-occupant.entity");
const room_layout_entity_1 = require("./room-layout.entity");
const building_entity_1 = require("./building.entity");
const room_type_entity_1 = require("./room-type.entity");
var RoomStatus;
(function (RoomStatus) {
    RoomStatus["ACTIVE"] = "Active";
    RoomStatus["MAINTENANCE"] = "Maintenance";
    RoomStatus["INACTIVE"] = "Inactive";
    RoomStatus["RESERVED"] = "Reserved";
})(RoomStatus || (exports.RoomStatus = RoomStatus = {}));
var Gender;
(function (Gender) {
    Gender["MALE"] = "Male";
    Gender["FEMALE"] = "Female";
    Gender["MIXED"] = "Mixed";
    Gender["ANY"] = "Any";
})(Gender || (exports.Gender = Gender = {}));
var MaintenanceStatus;
(function (MaintenanceStatus) {
    MaintenanceStatus["EXCELLENT"] = "Excellent";
    MaintenanceStatus["GOOD"] = "Good";
    MaintenanceStatus["FAIR"] = "Fair";
    MaintenanceStatus["UNDER_REPAIR"] = "Under Repair";
    MaintenanceStatus["NEEDS_ATTENTION"] = "Needs Attention";
})(MaintenanceStatus || (exports.MaintenanceStatus = MaintenanceStatus = {}));
let Room = class Room extends base_entity_1.BaseEntityWithCustomId {
    get availableBeds() {
        return this.bedCount - this.occupancy;
    }
    get isAvailable() {
        return this.status === RoomStatus.ACTIVE && this.availableBeds > 0;
    }
};
exports.Room = Room;
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], Room.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'room_number', length: 20, unique: true }),
    __metadata("design:type", String)
], Room.prototype, "roomNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'bed_count', type: 'int', default: 1 }),
    __metadata("design:type", Number)
], Room.prototype, "bedCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 1 }),
    __metadata("design:type", Number)
], Room.prototype, "capacity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Room.prototype, "occupancy", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Room.prototype, "rent", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: Gender,
        default: Gender.ANY
    }),
    __metadata("design:type", String)
], Room.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: RoomStatus,
        default: RoomStatus.ACTIVE
    }),
    __metadata("design:type", String)
], Room.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'maintenance_status',
        type: 'enum',
        enum: MaintenanceStatus,
        default: MaintenanceStatus.GOOD
    }),
    __metadata("design:type", String)
], Room.prototype, "maintenanceStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'last_cleaned', type: 'date', nullable: true }),
    __metadata("design:type", Date)
], Room.prototype, "lastCleaned", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'last_maintenance', type: 'date', nullable: true }),
    __metadata("design:type", Date)
], Room.prototype, "lastMaintenance", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Room.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Room.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'building_id', nullable: true }),
    __metadata("design:type", String)
], Room.prototype, "buildingId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'room_type_id', nullable: true }),
    __metadata("design:type", String)
], Room.prototype, "roomTypeId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => building_entity_1.Building, building => building.rooms, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'building_id' }),
    __metadata("design:type", building_entity_1.Building)
], Room.prototype, "building", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => room_type_entity_1.RoomType, roomType => roomType.rooms, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'room_type_id' }),
    __metadata("design:type", room_type_entity_1.RoomType)
], Room.prototype, "roomType", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => student_entity_1.Student, student => student.room),
    __metadata("design:type", Array)
], Room.prototype, "students", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => room_amenity_entity_1.RoomAmenity, amenity => amenity.room, { cascade: true }),
    __metadata("design:type", Array)
], Room.prototype, "amenities", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => room_occupant_entity_1.RoomOccupant, occupant => occupant.room, { cascade: true }),
    __metadata("design:type", Array)
], Room.prototype, "occupants", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => room_layout_entity_1.RoomLayout, layout => layout.room, { cascade: true }),
    __metadata("design:type", room_layout_entity_1.RoomLayout)
], Room.prototype, "layout", void 0);
exports.Room = Room = __decorate([
    (0, typeorm_1.Entity)('rooms'),
    (0, typeorm_1.Index)(['roomNumber'], { unique: true }),
    (0, typeorm_1.Index)(['status']),
    (0, typeorm_1.Index)(['buildingId']),
    (0, typeorm_1.Index)(['roomTypeId']),
    (0, typeorm_1.Index)(['gender'])
], Room);
//# sourceMappingURL=room.entity.js.map