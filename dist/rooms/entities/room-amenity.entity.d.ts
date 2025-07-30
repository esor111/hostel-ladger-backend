import { Room } from './room.entity';
import { Amenity } from './amenity.entity';
export declare class RoomAmenity {
    id: string;
    roomId: string;
    amenityId: string;
    isActive: boolean;
    installedDate: Date;
    notes: string;
    createdAt: Date;
    updatedAt: Date;
    room: Room;
    amenity: Amenity;
}
