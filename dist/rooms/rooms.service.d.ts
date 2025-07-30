import { Repository } from 'typeorm';
import { Room } from './entities/room.entity';
import { Building } from './entities/building.entity';
import { RoomType } from './entities/room-type.entity';
import { Amenity } from './entities/amenity.entity';
import { RoomAmenity } from './entities/room-amenity.entity';
import { RoomLayout } from './entities/room-layout.entity';
export declare class RoomsService {
    private roomRepository;
    private buildingRepository;
    private roomTypeRepository;
    private amenityRepository;
    private roomAmenityRepository;
    private roomLayoutRepository;
    constructor(roomRepository: Repository<Room>, buildingRepository: Repository<Building>, roomTypeRepository: Repository<RoomType>, amenityRepository: Repository<Amenity>, roomAmenityRepository: Repository<RoomAmenity>, roomLayoutRepository: Repository<RoomLayout>);
    findAll(filters?: any): Promise<{
        items: any[];
        pagination: {
            page: any;
            limit: any;
            total: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<any>;
    create(createRoomDto: any): Promise<any>;
    update(id: string, updateRoomDto: any): Promise<any>;
    getStats(): Promise<{
        totalRooms: number;
        activeRooms: number;
        maintenanceRooms: number;
        inactiveRooms: number;
        totalBeds: number;
        occupiedBeds: number;
        availableBeds: number;
        occupancyRate: number;
    }>;
    getAvailableRooms(): Promise<any[]>;
    private transformToApiResponse;
    private createRoomAmenities;
    private updateRoomAmenities;
    private updateRoomLayout;
    assignStudentToRoom(roomId: string, studentId: string): Promise<{
        success: boolean;
        message: string;
    }>;
    vacateStudentFromRoom(roomId: string, studentId: string): Promise<{
        success: boolean;
        message: string;
    }>;
    scheduleRoomMaintenance(roomId: string, maintenanceData: any): Promise<{
        success: boolean;
        message: string;
        scheduledDate: any;
        notes: any;
    }>;
}
