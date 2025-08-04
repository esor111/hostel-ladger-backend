import { Controller, Get, Post, Delete, Body, Param, Query, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ReportsService } from './reports.service';
import { 
  GenerateReportDto, 
  GenerateOccupancyReportDto, 
  GenerateFinancialReportDto, 
  GenerateStudentReportDto, 
  GeneratePaymentReportDto, 
  GenerateLedgerReportDto 
} from './dto/generate-report.dto';
import { ResponseUtil } from '../common/response.util';

@ApiTags('reports')
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('stats')
  @ApiOperation({ summary: 'Get report statistics' })
  @ApiResponse({ status: 200, description: 'Report statistics retrieved successfully' })
  async getReportStats() {
    const stats = await this.reportsService.getStats();
    return ResponseUtil.stats(stats);
  }

  @Get('types')
  @ApiOperation({ summary: 'Get available report types' })
  @ApiResponse({ status: 200, description: 'Report types retrieved successfully' })
  async getReportTypes() {
    const types = await this.reportsService.getReportTypes();
    
    // Return EXACT same format as Express API
    return {
      status: HttpStatus.OK,
      data: types
    };
  }

  @Get('download/:id')
  @ApiOperation({ summary: 'Get report download information' })
  @ApiResponse({ status: 200, description: 'Download information retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Report not found' })
  async getReportDownload(@Param('id') id: string) {
    const downloadInfo = await this.reportsService.getReportDownload(id);
    
    // Return EXACT same format as Express API
    return {
      status: HttpStatus.OK,
      data: downloadInfo
    };
  }

  @Get()
  @ApiOperation({ summary: 'Get all reports' })
  @ApiResponse({ status: 200, description: 'List of reports retrieved successfully' })
  async getAllReports(@Query() query: any) {
    const result = await this.reportsService.findAll(query);
    return ResponseUtil.success(result);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get report by ID' })
  @ApiResponse({ status: 200, description: 'Report retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Report not found' })
  async getReportById(@Param('id') id: string) {
    const report = await this.reportsService.findOne(id);
    
    // Return EXACT same format as current Express API
    return {
      status: HttpStatus.OK,
      data: report
    };
  }

  @Get(':id/data')
  @ApiOperation({ summary: 'Get report data by ID' })
  @ApiResponse({ status: 200, description: 'Report data retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Report not found' })
  async getReportData(@Param('id') id: string) {
    const reportData = await this.reportsService.getReportData(id);
    
    // Return EXACT same format as current Express API
    return {
      status: HttpStatus.OK,
      data: reportData
    };
  }

  @Post()
  @ApiOperation({ summary: 'Generate new report' })
  @ApiResponse({ status: 201, description: 'Report generated successfully' })
  async generateReport(@Body() generateReportDto: GenerateReportDto) {
    const report = await this.reportsService.generateReport(
      generateReportDto.type,
      generateReportDto.parameters || {}
    );
    
    // Return EXACT same format as current Express API
    return {
      status: HttpStatus.CREATED,
      data: report
    };
  }

  @Post('generate/occupancy')
  @ApiOperation({ summary: 'Generate occupancy report' })
  @ApiResponse({ status: 200, description: 'Occupancy report generated successfully' })
  async generateOccupancyReport(@Body() parameters: GenerateOccupancyReportDto = {}) {
    const report = await this.reportsService.generateReport('occupancy', parameters);
    
    // Return EXACT same format as current Express API
    return {
      status: HttpStatus.OK,
      data: report
    };
  }

  @Post('generate/financial')
  @ApiOperation({ summary: 'Generate financial report' })
  @ApiResponse({ status: 200, description: 'Financial report generated successfully' })
  async generateFinancialReport(@Body() parameters: GenerateFinancialReportDto = {}) {
    const report = await this.reportsService.generateReport('financial', parameters);
    
    // Return EXACT same format as current Express API
    return {
      status: HttpStatus.OK,
      data: report
    };
  }

  @Post('generate/student')
  @ApiOperation({ summary: 'Generate student report' })
  @ApiResponse({ status: 200, description: 'Student report generated successfully' })
  async generateStudentReport(@Body() parameters: GenerateStudentReportDto = {}) {
    const report = await this.reportsService.generateReport('student', parameters);
    
    // Return EXACT same format as current Express API
    return {
      status: HttpStatus.OK,
      data: report
    };
  }

  @Post('generate/payment')
  @ApiOperation({ summary: 'Generate payment report' })
  @ApiResponse({ status: 200, description: 'Payment report generated successfully' })
  async generatePaymentReport(@Body() parameters: GeneratePaymentReportDto = {}) {
    const report = await this.reportsService.generateReport('payment', parameters);
    
    // Return EXACT same format as current Express API
    return {
      status: HttpStatus.OK,
      data: report
    };
  }

  @Post('generate/ledger')
  @ApiOperation({ summary: 'Generate ledger report' })
  @ApiResponse({ status: 200, description: 'Ledger report generated successfully' })
  async generateLedgerReport(@Body() parameters: GenerateLedgerReportDto = {}) {
    const report = await this.reportsService.generateReport('ledger', parameters);
    
    // Return EXACT same format as current Express API
    return {
      status: HttpStatus.OK,
      data: report
    };
  }

  @Post('schedule')
  @ApiOperation({ summary: 'Schedule recurring report' })
  @ApiResponse({ status: 201, description: 'Report scheduled successfully' })
  async scheduleReport(@Body() scheduleData: any) {
    const scheduledReport = await this.reportsService.scheduleReport(scheduleData);
    
    // Return EXACT same format as Express API
    return {
      status: HttpStatus.CREATED,
      data: scheduledReport
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete report' })
  @ApiResponse({ status: 200, description: 'Report deleted successfully' })
  @ApiResponse({ status: 404, description: 'Report not found' })
  async deleteReport(@Param('id') id: string) {
    const deletedReport = await this.reportsService.deleteReport(id);
    
    // Return EXACT same format as Express API
    return {
      status: HttpStatus.OK,
      data: deletedReport,
      message: 'Report deleted successfully'
    };
  }
}