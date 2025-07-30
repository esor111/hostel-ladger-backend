import { BaseEntity } from '../../common/entities/base.entity';
import { RoomAmenity } from './room-amenity.entity';
export declare enum AmenityCategory {
    FURNITURE = "furniture",
    ELECTRONICS = "electronics",
    UTILITIES = "utilities",
    COMFORT = "comfort",
    SAFETY = "safety",
    CONNECTIVITY = "connectivity"
}
export declare class Amenity extends BaseEntity {
    name: string;
    category: AmenityCategory;
    description: string;
    maintenanceRequired: boolean;
    maintenanceFrequencyDays: number;
    isActive: boolean;
    specifications: Record<string, any>;
    roomAmenities: RoomAmenity[];
}
