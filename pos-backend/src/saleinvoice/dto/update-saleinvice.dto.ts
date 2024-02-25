import { SaleDetail } from '@prisma/client';
import { CreateSaleinvoiceDto } from './create-saleinvoice.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateSaleinvoiceDto extends PartialType(CreateSaleinvoiceDto) {
  customerId: number;

  saleDetails: SaleDetail[];

  discount?: number;

  total?: number;

  grandTotal?: number;

  invoiceDate?: Date;
}
