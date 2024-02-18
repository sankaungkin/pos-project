import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateInventoryDto } from './create-inventory.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateInventoryDto extends PartialType(CreateInventoryDto) {
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
