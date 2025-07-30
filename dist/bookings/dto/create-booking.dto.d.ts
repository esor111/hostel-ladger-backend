export declare class CreateBookingDto {
    id?: string;
    name: string;
    phone: string;
    email: string;
    guardianName?: string;
    guardianPhone?: string;
    preferredRoom?: string;
    course?: string;
    institution?: string;
    requestDate?: string;
    checkInDate?: string;
    duration?: number;
    status?: string;
    notes?: string;
    emergencyContact?: string;
    address?: string;
    idProofType?: string;
    idProofNumber?: string;
    source?: string;
}
export declare class ApproveBookingDto {
    processedBy?: string;
    assignedRoom?: string;
    createStudent?: boolean;
    notes?: string;
}
export declare class RejectBookingDto {
    processedBy?: string;
    reason: string;
    notes?: string;
}
