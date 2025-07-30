export declare class CreateInvoiceItemDto {
    description: string;
    quantity: number;
    unitPrice: number;
    discount?: number;
    notes?: string;
}
export declare class CreateInvoiceDto {
    id?: string;
    studentId: string;
    month: string;
    issueDate?: string;
    dueDate?: string;
    items?: CreateInvoiceItemDto[];
    total?: number;
    paidAmount?: number;
    status?: string;
    notes?: string;
    createdBy?: string;
}
