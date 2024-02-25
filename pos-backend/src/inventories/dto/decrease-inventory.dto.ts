import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class DecreaseInventoryDto {
  @IsNumber()
  @IsNotEmpty()
  outQty: number;

  @IsNumber()
  @IsNotEmpty()
  productId: string;

  @IsString()
  @IsOptional()
  remark: string;
}
