import { BaseEntityWithCustomId } from '../../common/entities/base.entity';
import { Room } from './room.entity';
export declare enum PricingModel {
    MONTHLY = "monthly",
    DAILY = "daily",
    SEMESTER = "semester",
    ANNUAL = "annual"
}
export declare class RoomType extends BaseEntityWithCustomId {
    name: string;
    code: string;
    baseMonthlyRate: number;
    baseDailyRate: number;
    pricingModel: PricingModel;
    defaultBedCount: number;
    maxOccupancy: number;
    securityDeposit: number;
    isActive: boolean;
    description: string;
    features: string[];
    rooms: Room[];
}
