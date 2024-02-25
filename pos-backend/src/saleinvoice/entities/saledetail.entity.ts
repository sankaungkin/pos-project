import { Customer, SaleDetail } from '@prisma/client';

export class Saleinvoice {
  customerId: number;

  saleDetails: SaleDetail[];

  discount?: number;

  grandTotal?: number;

  customer: Customer;
}
