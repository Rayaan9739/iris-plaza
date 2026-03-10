import { Injectable, Logger } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const Tesseract = require('tesseract.js');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const pdf = require('pdf-parse');

export interface ExtractedPaymentData {
  transactionId?: string;
  amount?: number;
  date?: Date;
  upiId?: string;
  rawText: string;
}

@Injectable()
export class OcrService {
  private readonly logger = new Logger(OcrService.name);

  async extractFromImage(buffer: Buffer): Promise<ExtractedPaymentData> {
    try {
      const { data: { text } } = await Tesseract.recognize(buffer, 'eng');
      return this.parseText(text);
    } catch (error) {
      this.logger.error('Error during image OCR:', error);
      throw new Error('Failed to process image screenshot');
    }
  }

  async extractFromPdf(buffer: Buffer): Promise<ExtractedPaymentData> {
    try {
      const data = await pdf(buffer);
      return this.parseText(data.text);
    } catch (error) {
      this.logger.error('Error during PDF extraction:', error);
      throw new Error('Failed to process PDF screenshot');
    }
  }

  private parseText(text: string): ExtractedPaymentData {
    const data: ExtractedPaymentData = {
      rawText: text,
    };

    // Amount Extraction (e.g., ₹20,000, Rs. 20000, 20000.00)
    // Matches patterns like ₹ 20,000.00 or Paid ₹20000
    const amountRegex = /(?:₹|Rs\.?|Amount:?)\s?([\d,]+(?:\.\d{2})?)/i;
    const amountMatch = text.match(amountRegex);
    if (amountMatch) {
      data.amount = parseFloat(amountMatch[1].replace(/,/g, ''));
    }

    // Transaction ID Extraction
    // Common patterns: Transaction ID: 12345, Txn ID: 12345, Google Transaction ID: 12345
    const txnRegex = /(?:Transaction\sID|Txn\sID|Google\sTransaction\sID|Ref\sNo|Reference\sNo)[:\s]*([A-Za-z0-9_-]+)/i;
    const txnMatch = text.match(txnRegex);
    if (txnMatch) {
      data.transactionId = txnMatch[1].trim();
    }

    // UPI ID Extraction (e.g., user@okhdfcbank, user@upi)
    const upiRegex = /[a-zA-Z0-9.\-_]+@[a-zA-Z0-9.\-_]+/g;
    const upiMatches = text.match(upiRegex);
    if (upiMatches) {
      // Often there are two UPI IDs (sender and receiver). 
      // We might need to filter or just take the first one if we can't tell.
      // For now, let's just take the first one that isn't obviously a system one.
      data.upiId = upiMatches[0];
    }

    // Date Extraction
    // Patterns: Paid on 08 Mar 2026, Date: 08/03/2026, 08-03-2026
    const dateRegex = /(?:Paid\son|Date)[:\s]*(\d{1,2}[\s\/\-][A-Za-z0-9\s\/\-]{3,12})/i;
    const dateMatch = text.match(dateRegex);
    if (dateMatch) {
      const parsedDate = new Date(dateMatch[1]);
      if (!isNaN(parsedDate.getTime())) {
        data.date = parsedDate;
      }
    }

    return data;
  }
}
