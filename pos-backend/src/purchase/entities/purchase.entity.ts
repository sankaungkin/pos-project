import { PurchaseDetail } from '@prisma/client';

export class Purchase {
  grandTotal: number;

  supplierId: number;

  purchaseDate?: Date;

  purchaseDetails: PurchaseDetail[];
}
