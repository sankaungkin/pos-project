import { PurchaseDetail } from '@prisma/client';
import { CreatePurchaseDto } from './create-purchase.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdatePurchaseDto extends PartialType(CreatePurchaseDto) {
  grandTotal: number;

  supplierId: number;

  purchaseDate?: Date;

  purchaseDetails: PurchaseDetail[];
}
