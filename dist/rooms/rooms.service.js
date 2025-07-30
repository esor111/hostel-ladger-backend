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
exports.RoomsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const room_entity_1 = require("./entities/room.entity");
const building_entity_1 = require("./entities/building.entity");
const room_type_entity_1 = require("./entities/room-type.entity");
const amenity_entity_1 = require("./entities/amenity.entity");
const room_amenity_entity_1 = require("./entities/room-amenity.entity");
const room_layout_entity_1 = require("./entities/room-layout.entity");
let RoomsService = class RoomsService {
    constructor(roomRepository, buildingRepository, roomTypeRepository, amenityRepository, roomAmenityRepository, roomLayoutRepository) {
        this.roomRepository = roomRepository;
        this.buildingRepository = buildingRepository;
        this.roomTypeRepository = roomTypeRepository;
        this.amenityRepository = amenityRepository;
        this.roomAmenityRepository = roomAmenityRepository;
        this.roomLayoutRepository = roomLayoutRepository;
    }
    async findAll(filters = {}) {
        const { status = 'all', type = 'all', search = '', page = 1, limit = 20 } = filters;
        const queryBuilder = this.roomRepository.createQueryBuilder('room')
            .leftJoinAndSelect('room.building', 'building')
            .leftJoinAndSelect('room.roomType', 'roomType')
            .leftJoinAndSelect('room.students', 'students')
            .leftJoinAndSelect('room.amenities', 'roomAmenities')
            .leftJoinAndSelect('roomAmenities.amenity', 'amenity')
            .leftJoinAndSelect('room.layout', 'layout');
        if (status !== 'all') {
            queryBuilder.andWhere('room.status = :status', { status });
        }
        if (type !== 'all') {
            queryBuilder.andWhere('roomType.name = :type', { type });
        }
        if (search) {
            queryBuilder.andWhere('(room.name ILIKE :search OR room.roomNumber ILIKE :search)', { search: `%${search}%` });
        }
        const offset = (page - 1) * limit;
        queryBuilder.skip(offset).take(limit);
        queryBuilder.orderBy('room.createdAt', 'DESC');
        const [rooms, total] = await queryBuilder.getManyAndCount();
        const transformedItems = rooms.map(room => this.transformToApiResponse(room));
        return {
            items: transformedItems,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        };
    }
    async findOne(id) {
        const room = await this.roomRepository.findOne({
            where: { id },
            relations: [
                'building',
                'roomType',
                'students',
                'amenities',
                'amenities.amenity',
                'layout'
            ]
        });
        if (!room) {
            throw new common_1.NotFoundException('Room not found');
        }
        return this.transformToApiResponse(room);
    }
    async create(createRoomDto) {
        let roomType = null;
        if (createRoomDto.type) {
            roomType = await this.roomTypeRepository.findOne({
                where: { name: createRoomDto.type }
            });
            if (!roomType) {
                roomType = await this.roomTypeRepository.save({
                    name: createRoomDto.type,
                    baseMonthlyRate: createRoomDto.monthlyRate || 0,
                    baseDailyRate: createRoomDto.dailyRate || 0,
                    defaultBedCount: createRoomDto.bedCount || 1,
                    maxOccupancy: createRoomDto.bedCount || 1,
                    isActive: true
                });
            }
        }
        const room = this.roomRepository.create({
            id: createRoomDto.id,
            name: createRoomDto.name,
            roomNumber: createRoomDto.roomNumber,
            bedCount: createRoomDto.bedCount || 1,
            occupancy: createRoomDto.occupancy || 0,
            gender: createRoomDto.gender || 'Any',
            status: createRoomDto.status || room_entity_1.RoomStatus.ACTIVE,
            maintenanceStatus: createRoomDto.maintenanceStatus || 'Good',
            lastCleaned: createRoomDto.lastCleaned,
            description: createRoomDto.description,
            roomTypeId: roomType?.id,
            buildingId: null
        });
        const savedRoom = await this.roomRepository.save(room);
        if (createRoomDto.amenities && createRoomDto.amenities.length > 0) {
            await this.createRoomAmenities(savedRoom.id, createRoomDto.amenities);
        }
        if (createRoomDto.occupants && createRoomDto.occupants.length > 0) {
        }
        if (createRoomDto.layout) {
            await this.roomLayoutRepository.save({
                roomId: savedRoom.id,
                name: 'Default Layout',
                layoutData: createRoomDto.layout,
                isActive: true,
                version: 1,
                dimensions: createRoomDto.layout.dimensions,
                theme: createRoomDto.layout.theme
            });
        }
        return this.findOne(savedRoom.id);
    }
    async update(id, updateRoomDto) {
        const room = await this.findOne(id);
        await this.roomRepository.update(id, {
            name: updateRoomDto.name,
            bedCount: updateRoomDto.bedCount,
            occupancy: updateRoomDto.occupancy,
            gender: updateRoomDto.gender,
            status: updateRoomDto.status,
            maintenanceStatus: updateRoomDto.maintenanceStatus,
            lastCleaned: updateRoomDto.lastCleaned,
            description: updateRoomDto.description
        });
        if (updateRoomDto.amenities !== undefined) {
            await this.updateRoomAmenities(id, updateRoomDto.amenities);
        }
        if (updateRoomDto.layout !== undefined) {
            await this.updateRoomLayout(id, updateRoomDto.layout);
        }
        return this.findOne(id);
    }
    async getStats() {
        const totalRooms = await this.roomRepository.count();
        const activeRooms = await this.roomRepository.count({
            where: { status: room_entity_1.RoomStatus.ACTIVE }
        });
        const maintenanceRooms = await this.roomRepository.count({
            where: { status: room_entity_1.RoomStatus.MAINTENANCE }
        });
        const occupancyResult = await this.roomRepository
            .createQueryBuilder('room')
            .select('SUM(room.bedCount)', 'totalBeds')
            .addSelect('SUM(room.occupancy)', 'totalOccupied')
            .where('room.status = :status', { status: room_entity_1.RoomStatus.ACTIVE })
            .getRawOne();
        const totalBeds = parseInt(occupancyResult?.totalBeds) || 0;
        const totalOccupied = parseInt(occupancyResult?.totalOccupied) || 0;
        const availableBeds = totalBeds - totalOccupied;
        const occupancyRate = totalBeds > 0 ? (totalOccupied / totalBeds) * 100 : 0;
        return {
            totalRooms,
            activeRooms,
            maintenanceRooms,
            inactiveRooms: totalRooms - activeRooms - maintenanceRooms,
            totalBeds,
            occupiedBeds: totalOccupied,
            availableBeds,
            occupancyRate: Math.round(occupancyRate * 100) / 100
        };
    }
    async getAvailableRooms() {
        const availableRooms = await this.roomRepository.find({
            where: { status: room_entity_1.RoomStatus.ACTIVE },
            relations: ['roomType', 'amenities', 'amenities.amenity']
        });
        const filtered = availableRooms.filter(room => room.availableBeds > 0);
        return filtered.map(room => this.transformToApiResponse(room));
    }
    transformToApiResponse(room) {
        const activeLayout = room.layout;
        const amenities = room.amenities?.map(ra => ra.amenity.name) || [];
        const occupants = room.students?.map(student => ({
            id: student.id,
            name: student.name,
            phone: student.phone,
            email: student.email
        })) || [];
        return {
            id: room.id,
            name: room.name,
            type: room.roomType?.name || 'Private',
            bedCount: room.bedCount,
            occupancy: room.occupancy,
            gender: room.gender,
            monthlyRate: room.roomType?.baseMonthlyRate || 0,
            dailyRate: room.roomType?.baseDailyRate || 0,
            amenities: amenities,
            status: room.status,
            layout: activeLayout?.layoutData || null,
            floor: room.building?.name || 'Ground Floor',
            roomNumber: room.roomNumber,
            occupants: occupants,
            availableBeds: room.availableBeds,
            lastCleaned: room.lastCleaned,
            maintenanceStatus: room.maintenanceStatus,
            pricingModel: room.roomType?.pricingModel || 'monthly',
            description: room.description,
            createdAt: room.createdAt,
            updatedAt: room.updatedAt
        };
    }
    async createRoomAmenities(roomId, amenityNames) {
        for (const amenityName of amenityNames) {
            let amenity = await this.amenityRepository.findOne({
                where: { name: amenityName }
            });
            if (!amenity) {
                amenity = await this.amenityRepository.save({
                    name: amenityName,
                    category: amenity_entity_1.AmenityCategory.UTILITIES,
                    isActive: true
                });
            }
            await this.roomAmenityRepository.save({
                roomId,
                amenityId: amenity.id,
                isActive: true,
                installedDate: new Date()
            });
        }
    }
    async updateRoomAmenities(roomId, amenityNames) {
        await this.roomAmenityRepository.update({ roomId }, { isActive: false });
        if (amenityNames.length > 0) {
            await this.createRoomAmenities(roomId, amenityNames);
        }
    }
    async updateRoomLayout(roomId, layoutData) {
        await this.roomLayoutRepository.update({ roomId }, { isActive: false });
        if (layoutData) {
            const existingLayouts = await this.roomLayoutRepository.count({
                where: { roomId }
            });
            await this.roomLayoutRepository.save({
                roomId,
                name: `Layout v${existingLayouts + 1}`,
                layoutData,
                isActive: true,
                version: existingLayouts + 1,
                dimensions: layoutData.dimensions,
                theme: layoutData.theme
            });
        }
    }
    async assignStudentToRoom(roomId, studentId) {
        const room = await this.roomRepository.findOne({ where: { id: roomId } });
        if (!room) {
            throw new common_1.NotFoundException('Room not found');
        }
        if (room.availableBeds <= 0) {
            throw new Error('No available beds in this room');
        }
        return { success: true, message: 'Student assigned to room successfully' };
    }
    async vacateStudentFromRoom(roomId, studentId) {
        const room = await this.roomRepository.findOne({ where: { id: roomId } });
        if (!room) {
            throw new common_1.NotFoundException('Room not found');
        }
        return { success: true, message: 'Student vacated from room successfully' };
    }
    async scheduleRoomMaintenance(roomId, maintenanceData) {
        await this.roomRepository.update(roomId, {
            status: room_entity_1.RoomStatus.MAINTENANCE,
            maintenanceStatus: room_entity_1.MaintenanceStatus.UNDER_REPAIR,
            lastMaintenance: new Date()
        });
        return {
            success: true,
            message: 'Room maintenance scheduled successfully',
            scheduledDate: maintenanceData.scheduleDate,
            notes: maintenanceData.notes
        };
    }
};
exports.RoomsService = RoomsService;
exports.RoomsService = RoomsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(room_entity_1.Room)),
    __param(1, (0, typeorm_1.InjectRepository)(building_entity_1.Building)),
    __param(2, (0, typeorm_1.InjectRepository)(room_type_entity_1.RoomType)),
    __param(3, (0, typeorm_1.InjectRepository)(amenity_entity_1.Amenity)),
    __param(4, (0, typeorm_1.InjectRepository)(room_amenity_entity_1.RoomAmenity)),
    __param(5, (0, typeorm_1.InjectRepository)(room_layout_entity_1.RoomLayout)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], RoomsService);
//# sourceMappingURL=rooms.service.js.map