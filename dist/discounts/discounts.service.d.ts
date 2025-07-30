import { Repository } from 'typeorm';
import { Discount } from './entities/discount.entity';
import { DiscountType, DiscountCategory } from './entities/discount-type.entity';
import { LedgerService } from '../ledger/ledger.service';
export declare class DiscountsService {
    private discountRepository;
    private discountTypeRepository;
    private ledgerService;
    constructor(discountRepository: Repository<Discount>, discountTypeRepository: Repository<DiscountType>, ledgerService: LedgerService);
    findAll(filters?: any): Promise<{
        items: any[];
        pagination: {
            page: any;
            limit: any;
            total: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<any>;
    findByStudentId(studentId: string): Promise<any[]>;
    create(createDiscountDto: any): Promise<any>;
    update(id: string, updateDiscountDto: any): Promise<any>;
    applyDiscount(studentId: string, discountData: any): Promise<{
        success: boolean;
        discount: any;
        message: string;
    }>;
    expireDiscount(id: string, expiredBy?: string): Promise<{
        success: boolean;
        message: string;
    }>;
    getStats(): Promise<{
        totalDiscounts: number;
        activeDiscounts: number;
        expiredDiscounts: number;
        cancelledDiscounts: number;
        totalAmount: number;
        averageDiscountAmount: number;
        studentsWithDiscounts: number;
        discountTypes: {};
    }>;
    getDiscountTypes(): Promise<{
        id: string;
        name: string;
        category: DiscountCategory;
        description: string;
        defaultAmount: number;
        isPercentage: boolean;
        percentageValue: number;
        maxAmount: number;
        requiresApproval: boolean;
        autoApply: boolean;
    }[]>;
    private transformToApiResponse;
    private generateDiscountId;
}
