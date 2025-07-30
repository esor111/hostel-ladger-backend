import { Room } from './room.entity';
export declare class RoomLayout {
    id: string;
    roomId: string;
    layoutType: string;
    layoutData: any;
    bedPositions: any;
    furnitureLayout: any;
    dimensions: any;
    floorPlan: any;
    isActive: boolean;
    createdBy: string;
    updatedBy: string;
    createdAt: Date;
    updatedAt: Date;
    room: Room;
}
