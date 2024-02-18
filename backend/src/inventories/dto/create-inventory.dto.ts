import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateInventoryDto {
  @IsNumber()
  @IsNotEmpty()
  inQty: number;

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
