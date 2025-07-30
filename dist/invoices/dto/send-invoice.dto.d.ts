export declare enum SendMethod {
    EMAIL = "email",
    SMS = "sms",
    WHATSAPP = "whatsapp"
}
export declare class SendInvoiceDto {
    method: SendMethod;
    customMessage?: string;
}
