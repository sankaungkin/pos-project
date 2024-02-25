import { IsOptional } from 'class-validator';

export class Inventory {
  qtyOnHand: number;

  @IsOptional()
  inQty: number;

  @IsOptional()
  outQty: number;

  productId: number;

  remark: string;
}
