"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const rooms_controller_1 = require("./rooms.controller");
const rooms_service_1 = require("./rooms.service");
const room_entity_1 = require("./entities/room.entity");
const building_entity_1 = require("./entities/building.entity");
const room_type_entity_1 = require("./entities/room-type.entity");
const amenity_entity_1 = require("./entities/amenity.entity");
const room_amenity_entity_1 = require("./entities/room-amenity.entity");
const room_occupant_entity_1 = require("./entities/room-occupant.entity");
const room_layout_entity_1 = require("./entities/room-layout.entity");
let RoomsModule = class RoomsModule {
};
exports.RoomsModule = RoomsModule;
exports.RoomsModule = RoomsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([
                room_entity_1.Room,
                building_entity_1.Building,
                room_type_entity_1.RoomType,
                amenity_entity_1.Amenity,
                room_amenity_entity_1.RoomAmenity,
                room_occupant_entity_1.RoomOccupant,
                room_layout_entity_1.RoomLayout
            ])],
        controllers: [rooms_controller_1.RoomsController],
        providers: [rooms_service_1.RoomsService],
        exports: [rooms_service_1.RoomsService],
    })
], RoomsModule);
//# sourceMappingURL=rooms.module.js.map