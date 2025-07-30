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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const rooms_service_1 = require("./rooms.service");
const create_room_dto_1 = require("./dto/create-room.dto");
const update_room_dto_1 = require("./dto/update-room.dto");
let RoomsController = class RoomsController {
    constructor(roomsService) {
        this.roomsService = roomsService;
    }
    async getAllRooms(query) {
        const result = await this.roomsService.findAll(query);
        return {
            status: common_1.HttpStatus.OK,
            result: result
        };
    }
    async getRoomStats() {
        const stats = await this.roomsService.getStats();
        return {
            status: common_1.HttpStatus.OK,
            stats: stats
        };
    }
    async getAvailableRooms() {
        const availableRooms = await this.roomsService.getAvailableRooms();
        return {
            status: common_1.HttpStatus.OK,
            data: {
                items: availableRooms,
                count: availableRooms.length
            }
        };
    }
    async getRoomById(id) {
        const room = await this.roomsService.findOne(id);
        return {
            status: common_1.HttpStatus.OK,
            room: room
        };
    }
    async createRoom(createRoomDto) {
        const room = await this.roomsService.create(createRoomDto);
        return {
            status: common_1.HttpStatus.CREATED,
            newRoom: room
        };
    }
    async updateRoom(id, updateRoomDto) {
        const room = await this.roomsService.update(id, updateRoomDto);
        return {
            status: common_1.HttpStatus.OK,
            updatedRoom: room
        };
    }
    async assignStudent(id, assignDto) {
        const result = await this.roomsService.assignStudentToRoom(id, assignDto.studentId);
        return {
            status: common_1.HttpStatus.OK,
            data: result
        };
    }
    async vacateStudent(id, vacateDto) {
        const result = await this.roomsService.vacateStudentFromRoom(id, vacateDto.studentId);
        return {
            status: common_1.HttpStatus.OK,
            data: result
        };
    }
    async scheduleMaintenance(id, maintenanceDto) {
        const result = await this.roomsService.scheduleRoomMaintenance(id, maintenanceDto);
        return {
            status: common_1.HttpStatus.OK,
            data: result
        };
    }
};
exports.RoomsController = RoomsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all rooms' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of rooms retrieved successfully' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RoomsController.prototype, "getAllRooms", null);
__decorate([
    (0, common_1.Get)('stats'),
    (0, swagger_1.ApiOperation)({ summary: 'Get room statistics' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Room statistics retrieved successfully' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RoomsController.prototype, "getRoomStats", null);
__decorate([
    (0, common_1.Get)('available'),
    (0, swagger_1.ApiOperation)({ summary: 'Get available rooms' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Available rooms retrieved successfully' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RoomsController.prototype, "getAvailableRooms", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get room by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Room retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Room not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RoomsController.prototype, "getRoomById", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create new room' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Room created successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_room_dto_1.CreateRoomDto]),
    __metadata("design:returntype", Promise)
], RoomsController.prototype, "createRoom", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update room' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Room updated successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_room_dto_1.UpdateRoomDto]),
    __metadata("design:returntype", Promise)
], RoomsController.prototype, "updateRoom", null);
__decorate([
    (0, common_1.Post)(':id/assign'),
    (0, swagger_1.ApiOperation)({ summary: 'Assign student to room' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Student assigned successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RoomsController.prototype, "assignStudent", null);
__decorate([
    (0, common_1.Post)(':id/vacate'),
    (0, swagger_1.ApiOperation)({ summary: 'Vacate student from room' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Student vacated successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RoomsController.prototype, "vacateStudent", null);
__decorate([
    (0, common_1.Post)(':id/maintenance'),
    (0, swagger_1.ApiOperation)({ summary: 'Schedule room maintenance' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Maintenance scheduled successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RoomsController.prototype, "scheduleMaintenance", null);
exports.RoomsController = RoomsController = __decorate([
    (0, swagger_1.ApiTags)('rooms'),
    (0, common_1.Controller)('api/v1/rooms'),
    __metadata("design:paramtypes", [rooms_service_1.RoomsService])
], RoomsController);
//# sourceMappingURL=rooms.controller.js.map