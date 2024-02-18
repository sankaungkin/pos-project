import { SaleDetail } from '@prisma/client';

export class CreateSaleinvoiceDto {
  id: string;

  customerId: number;

  saleDetails: SaleDetail[];

  discount?: number;

  total?: number;

  grandTotal?: number;

  invoiceDate?: Date;
}
