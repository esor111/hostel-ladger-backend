import { BaseEntity } from '../../common/entities/base.entity';
import { Discount } from './discount.entity';
export declare enum DiscountCategory {
    ACADEMIC = "academic",
    FINANCIAL_HARDSHIP = "financial_hardship",
    EARLY_PAYMENT = "early_payment",
    LOYALTY = "loyalty",
    PROMOTIONAL = "promotional",
    STAFF = "staff",
    SIBLING = "sibling"
}
export declare class DiscountType extends BaseEntity {
    name: string;
    category: DiscountCategory;
    description: string;
    defaultAmount: number;
    isPercentage: boolean;
    percentageValue: number;
    maxAmount: number;
    requiresApproval: boolean;
    autoApply: boolean;
    isActive: boolean;
    conditions: Record<string, any>;
    discounts: Discount[];
}
