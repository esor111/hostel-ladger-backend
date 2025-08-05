import { Controller, Get, Post, Delete, Body, Param, Query, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AdminChargesService } from './admin-charges.service';
import { CreateAdminChargeDto, CreateBulkAdminChargeDto, ReverseAdminChargeDto } from './dto';
import { ResponseUtil } from '../common/response.util';

@ApiTags('admin-charges')
@Controller('admin/charges')
export class AdminChargesController {
  constructor(private readonly adminChargesService: AdminChargesService) {}

  @Post()
  @ApiOperation({ summary: 'Add charge to student' })
  @ApiResponse({ status: 201, description: 'Charge added successfully' })
  async createCharge(@Body() createChargeDto: CreateAdminChargeDto) {
    const charge = await this.adminChargesService.createCharge(createChargeDto);
    return ResponseUtil.data(charge, HttpStatus.CREATED);
  }

  @Post('bulk')
  @ApiOperation({ summary: 'Add charges to multiple students' })
  @ApiResponse({ status: 201, description: 'Bulk charges processed' })
  async createBulkCharges(@Body() createBulkDto: CreateBulkAdminChargeDto) {
    const result = await this.adminChargesService.createBulkCharges(createBulkDto);
    return ResponseUtil.data(result, HttpStatus.CREATED);
  }

  @Get()
  @ApiOperation({ summary: 'Get all admin charges' })
  @ApiResponse({ status: 200, description: 'Admin charges retrieved successfully' })
  async getAllCharges(@Query() query: any) {
    const result = await this.adminChargesService.findAll(query);
    return ResponseUtil.success(result);
  }

  @Get('overdue-students')
  @ApiOperation({ summary: 'Get students with overdue payments' })
  @ApiResponse({ status: 200, description: 'Overdue students retrieved successfully' })
  async getOverdueStudents() {
    const students = await this.adminChargesService.getOverdueStudents();
    return ResponseUtil.data(students);
  }

  @Get('summary/today')
  @ApiOperation({ summary: 'Get today\'s charge summary' })
  @ApiResponse({ status: 200, description: 'Today\'s summary retrieved successfully' })
  async getTodayChargeSummary() {
    const summary = await this.adminChargesService.getTodayChargeSummary();
    return ResponseUtil.data(summary);
  }

  @Get('history/:studentId')
  @ApiOperation({ summary: 'Get student charge history' })
  @ApiResponse({ status: 200, description: 'Student charge history retrieved successfully' })
  async getStudentChargeHistory(@Param('studentId') studentId: string, @Query() query: any) {
    const history = await this.adminChargesService.getStudentChargeHistory(studentId, query);
    return ResponseUtil.success(history);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get admin charge by ID' })
  @ApiResponse({ status: 200, description: 'Admin charge retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Admin charge not found' })
  async getChargeById(@Param('id') id: string) {
    const charge = await this.adminChargesService.findOne(id);
    return ResponseUtil.data(charge);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Reverse admin charge' })
  @ApiResponse({ status: 200, description: 'Charge reversed successfully' })
  async reverseCharge(@Param('id') id: string, @Body() reverseDto: ReverseAdminChargeDto) {
    const result = await this.adminChargesService.reverseCharge(id, reverseDto);
    return ResponseUtil.data(result);
  }
}

@ApiTags('admin-charge-types')
@Controller('admin/charge-types')
export class ChargeTypesController {
  constructor(private readonly adminChargesService: AdminChargesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all charge types' })
  @ApiResponse({ status: 200, description: 'Charge types retrieved successfully' })
  async getAllChargeTypes() {
    const chargeTypes = await this.adminChargesService.findAllChargeTypes();
    return ResponseUtil.data(chargeTypes);
  }

  @Post()
  @ApiOperation({ summary: 'Create new charge type' })
  @ApiResponse({ status: 201, description: 'Charge type created successfully' })
  async createChargeType(@Body() createDto: any) {
    const chargeType = await this.adminChargesService.createChargeType(createDto);
    return ResponseUtil.data(chargeType, HttpStatus.CREATED);
  }
}