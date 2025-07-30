export declare class CreateRoomAmenityDto {
    name: string;
    description?: string;
    isActive?: boolean;
}
export declare class CreateRoomLayoutDto {
    layoutType?: string;
    bedPositions?: any;
    furnitureLayout?: any;
    dimensions?: any;
}
export declare class CreateRoomDto {
    id?: string;
    roomNumber: string;
    type?: string;
    capacity: number;
    rent: number;
    floor?: number;
    status?: string;
    description?: string;
    amenities?: CreateRoomAmenityDto[];
    layout?: CreateRoomLayoutDto;
    isActive?: boolean;
    notes?: string;
}
