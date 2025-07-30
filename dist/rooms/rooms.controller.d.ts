import { HttpStatus } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
export declare class RoomsController {
    private readonly roomsService;
    constructor(roomsService: RoomsService);
    getAllRooms(query: any): Promise<{
        status: HttpStatus;
        result: {
            items: any[];
            pagination: {
                page: any;
                limit: any;
                total: number;
                totalPages: number;
            };
        };
    }>;
    getRoomStats(): Promise<{
        status: HttpStatus;
        stats: {
            totalRooms: number;
            activeRooms: number;
            maintenanceRooms: number;
            inactiveRooms: number;
            totalBeds: number;
            occupiedBeds: number;
            availableBeds: number;
            occupancyRate: number;
        };
    }>;
    getAvailableRooms(): Promise<{
        status: HttpStatus;
        data: {
            items: any[];
            count: number;
        };
    }>;
    getRoomById(id: string): Promise<{
        status: HttpStatus;
        room: any;
    }>;
    createRoom(createRoomDto: CreateRoomDto): Promise<{
        status: HttpStatus;
        newRoom: any;
    }>;
    updateRoom(id: string, updateRoomDto: UpdateRoomDto): Promise<{
        status: HttpStatus;
        updatedRoom: any;
    }>;
    assignStudent(id: string, assignDto: any): Promise<{
        status: HttpStatus;
        data: {
            success: boolean;
            message: string;
        };
    }>;
    vacateStudent(id: string, vacateDto: any): Promise<{
        status: HttpStatus;
        data: {
            success: boolean;
            message: string;
        };
    }>;
    scheduleMaintenance(id: string, maintenanceDto: any): Promise<{
        status: HttpStatus;
        data: {
            success: boolean;
            message: string;
            scheduledDate: any;
            notes: any;
        };
    }>;
}
