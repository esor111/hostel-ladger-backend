import { HttpStatus } from '@nestjs/common';
import { DiscountsService } from './discounts.service';
import { CreateDiscountDto, ApplyDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
export declare class DiscountsController {
    private readonly discountsService;
    constructor(discountsService: DiscountsService);
    getDiscounts(query: any): Promise<{
        status: HttpStatus;
        result: {
            items: any[];
            pagination: {
                page: any;
                limit: any;
                total: number;
                totalPages: number;
            };
        };
    }>;
    getDiscountStats(): Promise<{
        status: HttpStatus;
        stats: {
            totalDiscounts: number;
            activeDiscounts: number;
            expiredDiscounts: number;
            cancelledDiscounts: number;
            totalAmount: number;
            averageDiscountAmount: number;
            studentsWithDiscounts: number;
            discountTypes: {};
        };
    }>;
    getDiscountTypes(): Promise<{
        status: HttpStatus;
        data: {
            id: string;
            name: string;
            category: import("./entities/discount-type.entity").DiscountCategory;
            description: string;
            defaultAmount: number;
            isPercentage: boolean;
            percentageValue: number;
            maxAmount: number;
            requiresApproval: boolean;
            autoApply: boolean;
        }[];
    }>;
    getDiscountsByStudentId(studentId: string): Promise<{
        status: HttpStatus;
        data: any[];
    }>;
    getDiscountById(id: string): Promise<{
        status: HttpStatus;
        data: any;
    }>;
    createDiscount(createDiscountDto: CreateDiscountDto): Promise<{
        status: HttpStatus;
        data: any;
    }>;
    updateDiscount(id: string, updateDiscountDto: UpdateDiscountDto): Promise<{
        status: HttpStatus;
        data: any;
    }>;
    applyDiscount(applyDiscountDto: ApplyDiscountDto): Promise<{
        status: HttpStatus;
        data: {
            success: boolean;
            discount: any;
            message: string;
        };
    }>;
    expireDiscount(id: string, expireDto: any): Promise<{
        status: HttpStatus;
        data: {
            success: boolean;
            message: string;
        };
    }>;
}
