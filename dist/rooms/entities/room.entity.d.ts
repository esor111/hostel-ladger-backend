import { BaseEntityWithCustomId } from '../../common/entities/base.entity';
import { Student } from '../../students/entities/student.entity';
import { RoomAmenity } from './room-amenity.entity';
import { RoomOccupant } from './room-occupant.entity';
import { RoomLayout } from './room-layout.entity';
import { Building } from './building.entity';
import { RoomType } from './room-type.entity';
export declare enum RoomStatus {
    ACTIVE = "Active",
    MAINTENANCE = "Maintenance",
    INACTIVE = "Inactive",
    RESERVED = "Reserved"
}
export declare enum Gender {
    MALE = "Male",
    FEMALE = "Female",
    MIXED = "Mixed",
    ANY = "Any"
}
export declare enum MaintenanceStatus {
    EXCELLENT = "Excellent",
    GOOD = "Good",
    FAIR = "Fair",
    UNDER_REPAIR = "Under Repair",
    NEEDS_ATTENTION = "Needs Attention"
}
export declare class Room extends BaseEntityWithCustomId {
    name: string;
    roomNumber: string;
    bedCount: number;
    capacity: number;
    occupancy: number;
    rent: number;
    gender: Gender;
    status: RoomStatus;
    maintenanceStatus: MaintenanceStatus;
    lastCleaned: Date;
    lastMaintenance: Date;
    description: string;
    notes: string;
    buildingId: string;
    roomTypeId: string;
    get availableBeds(): number;
    get isAvailable(): boolean;
    building: Building;
    roomType: RoomType;
    students: Student[];
    amenities: RoomAmenity[];
    occupants: RoomOccupant[];
    layout: RoomLayout;
}
