import { BaseEntityWithCustomId } from '../../common/entities/base.entity';
import { Room } from './room.entity';
export declare enum BuildingStatus {
    ACTIVE = "Active",
    MAINTENANCE = "Maintenance",
    INACTIVE = "Inactive"
}
export declare class Building extends BaseEntityWithCustomId {
    name: string;
    code: string;
    address: string;
    totalFloors: number;
    totalRooms: number;
    status: BuildingStatus;
    constructionYear: number;
    lastRenovation: Date;
    description: string;
    facilities: string[];
    rooms: Room[];
}
