import { PurchaseDetail } from '@prisma/client';

export class CreatePurchaseDto {
  id: string;

  grandTotal: number;

  supplierId: number;

  purchaseDate?: Date;

  remark?: string;

  purchaseDetails: PurchaseDetail[];
}
