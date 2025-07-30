import { CreatePaymentDto, PaymentMethod } from './create-payment.dto';
declare const UpdatePaymentDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreatePaymentDto>>;
export declare class UpdatePaymentDto extends UpdatePaymentDto_base {
    studentId?: string;
    amount?: number;
    paymentDate?: string;
    paymentMethod?: PaymentMethod;
    transactionId?: string;
    referenceNumber?: string;
    notes?: string;
    processedBy?: string;
    status?: string;
    bankName?: string;
    chequeNumber?: string;
    chequeDate?: string;
}
export {};
