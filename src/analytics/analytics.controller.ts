import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AnalyticsService } from './analytics.service';

@ApiTags('analytics')
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('dashboard')
  @ApiOperation({ summary: 'Get dashboard analytics data' })
  @ApiResponse({ status: 200, description: 'Dashboard analytics data retrieved successfully' })
  async getDashboardData() {
    const dashboardData = await this.analyticsService.getDashboardData();
    
    // Return EXACT same format as Express API
    return {
      status: HttpStatus.OK,
      data: dashboardData
    };
  }
}