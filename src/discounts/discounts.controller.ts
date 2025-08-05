import { Controller, Get, Post, Put, Delete, Body, Param, Query, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DiscountsService } from './discounts.service';
import { ApplyDiscountDto, UpdateDiscountDto, ExpireDiscountDto } from './dto';
import { ResponseUtil } from '../common/response.util';

@ApiTags('discounts')
@Controller('discounts')
export class DiscountsController {
  constructor(private readonly discountsService: DiscountsService) {}

  @Post()
  @ApiOperation({ summary: 'Apply discount to student' })
  @ApiResponse({ status: 201, description: 'Discount applied successfully' })
  async applyDiscount(@Body() applyDiscountDto: ApplyDiscountDto) {
    const discount = await this.discountsService.applyDiscount(applyDiscountDto);
    return ResponseUtil.data(discount, HttpStatus.CREATED);
  }

  @Get()
  @ApiOperation({ summary: 'Get all discounts' })
  @ApiResponse({ status: 200, description: 'Discounts retrieved successfully' })
  async getAllDiscounts(@Query() query: any) {
    const result = await this.discountsService.findAll(query);
    return ResponseUtil.success(result);
  }

  @Get('history')
  @ApiOperation({ summary: 'Get discount history' })
  @ApiResponse({ status: 200, description: 'Discount history retrieved successfully' })
  async getDiscountHistory(@Query() query: any) {
    const result = await this.discountsService.getDiscountHistory(query);
    return ResponseUtil.success(result);
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get discount statistics' })
  @ApiResponse({ status: 200, description: 'Discount statistics retrieved successfully' })
  async getDiscountStats() {
    const stats = await this.discountsService.getDiscountStats();
    return ResponseUtil.stats(stats);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get discount by ID' })
  @ApiResponse({ status: 200, description: 'Discount retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Discount not found' })
  async getDiscountById(@Param('id') id: string) {
    const discount = await this.discountsService.findOne(id);
    return ResponseUtil.data(discount);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update discount' })
  @ApiResponse({ status: 200, description: 'Discount updated successfully' })
  async updateDiscount(@Param('id') id: string, @Body() updateDto: UpdateDiscountDto) {
    const discount = await this.discountsService.updateDiscount(id, updateDto);
    return ResponseUtil.data(discount);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Expire discount' })
  @ApiResponse({ status: 200, description: 'Discount expired successfully' })
  async expireDiscount(@Param('id') id: string, @Body() expireDto: ExpireDiscountDto) {
    const result = await this.discountsService.expireDiscount(id, expireDto.expiredBy, expireDto.reason);
    return ResponseUtil.data(result);
  }
}

@ApiTags('discount-types')
@Controller('discount-types')
export class DiscountTypesController {
  constructor(private readonly discountsService: DiscountsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all discount types' })
  @ApiResponse({ status: 200, description: 'Discount types retrieved successfully' })
  async getAllDiscountTypes() {
    const discountTypes = await this.discountsService.findAllDiscountTypes();
    return ResponseUtil.data(discountTypes);
  }

  @Post()
  @ApiOperation({ summary: 'Create new discount type' })
  @ApiResponse({ status: 201, description: 'Discount type created successfully' })
  async createDiscountType(@Body() createDto: any) {
    const discountType = await this.discountsService.createDiscountType(createDto);
    return ResponseUtil.data(discountType, HttpStatus.CREATED);
  }
}