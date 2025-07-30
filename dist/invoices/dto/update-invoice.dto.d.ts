import { CreateInvoiceDto, CreateInvoiceItemDto } from './create-invoice.dto';
declare const UpdateInvoiceDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateInvoiceDto>>;
export declare class UpdateInvoiceDto extends UpdateInvoiceDto_base {
    studentId?: string;
    month?: string;
    issueDate?: string;
    dueDate?: string;
    items?: CreateInvoiceItemDto[];
    total?: number;
    paidAmount?: number;
    status?: string;
    notes?: string;
    updatedBy?: string;
}
export {};
