export interface ExtractedPaymentData {
    transactionId?: string;
    amount?: number;
    date?: Date;
    upiId?: string;
    rawText: string;
}
export declare class OcrService {
    private readonly logger;
    extractFromImage(buffer: Buffer): Promise<ExtractedPaymentData>;
    extractFromPdf(buffer: Buffer): Promise<ExtractedPaymentData>;
    private parseText;
}
