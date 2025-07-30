import { CreateRoomDto, CreateRoomAmenityDto, CreateRoomLayoutDto } from './create-room.dto';
declare const UpdateRoomDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateRoomDto>>;
export declare class UpdateRoomDto extends UpdateRoomDto_base {
    roomNumber?: string;
    type?: string;
    capacity?: number;
    rent?: number;
    floor?: number;
    status?: string;
    description?: string;
    amenities?: CreateRoomAmenityDto[];
    layout?: CreateRoomLayoutDto;
    isActive?: boolean;
    notes?: string;
}
export {};
