import { Controller, Get, Post, Put, Body, Param, Query, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { InvoicesService } from './invoices.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { ResponseUtil } from '../common/response.util';

@ApiTags('invoices')
@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) { }

  @Get()
  @ApiOperation({ summary: 'Get all invoices' })
  @ApiResponse({ status: 200, description: 'List of invoices retrieved successfully' })
  async getAllInvoices(@Query() query: any) {
    const result = await this.invoicesService.findAll(query);
    return ResponseUtil.success(result);
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get invoice statistics' })
  @ApiResponse({ status: 200, description: 'Invoice statistics retrieved successfully' })
  async getInvoiceStats() {
    const stats = await this.invoicesService.getStats();
    return ResponseUtil.stats(stats);
  }

  @Get('pending')
  @ApiOperation({ summary: 'Get pending invoices' })
  @ApiResponse({ status: 200, description: 'Pending invoices retrieved successfully' })
  async getPendingInvoices(@Query() query: any) {
    const result = await this.invoicesService.findPending(query);
    return ResponseUtil.success(result);
  }

  @Post()
  @ApiOperation({ summary: 'Create new invoice' })
  @ApiResponse({ status: 201, description: 'Invoice created successfully' })
  async createInvoice(@Body() invoiceData: CreateInvoiceDto) {
    const newInvoice = await this.invoicesService.create(invoiceData);

    // Return EXACT same format as Express API
    return {
      status: HttpStatus.CREATED,
      data: newInvoice
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get invoice by ID' })
  @ApiResponse({ status: 200, description: 'Invoice retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Invoice not found' })
  async getInvoiceById(@Param('id') id: string) {
    const invoice = await this.invoicesService.findOne(id);

    // Return EXACT same format as current Express API
    return {
      status: HttpStatus.OK,
      data: invoice
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update invoice' })
  @ApiResponse({ status: 200, description: 'Invoice updated successfully' })
  async updateInvoice(@Param('id') id: string, @Body() updateInvoiceDto: UpdateInvoiceDto) {
    const invoice = await this.invoicesService.update(id, updateInvoiceDto);

    // Return EXACT same format as current Express API
    return {
      status: HttpStatus.OK,
      data: invoice
    };
  }

  @Post('generate-monthly')
  @ApiOperation({ summary: 'Generate monthly invoices' })
  @ApiResponse({ status: 200, description: 'Monthly invoices generated successfully' })
  async generateMonthlyInvoices(@Body() generateDto: any) {
    const result = await this.invoicesService.generateMonthlyInvoices(
      generateDto.month,
      generateDto.studentIds
    );

    // Return EXACT same format as current Express API
    return {
      status: HttpStatus.OK,
      data: result
    };
  }

  @Post(':id/send')
  @ApiOperation({ summary: 'Send invoice to student' })
  @ApiResponse({ status: 200, description: 'Invoice sent successfully' })
  async sendInvoice(@Param('id') id: string, @Body() sendDto: any) {
    const result = await this.invoicesService.sendInvoice(id, sendDto.method);

    // Return EXACT same format as current Express API
    return {
      status: HttpStatus.OK,
      data: result
    };
  }
}