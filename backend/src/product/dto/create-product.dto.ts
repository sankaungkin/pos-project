import { Optional } from '@nestjs/common';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  productName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  uom: string;

  @IsNumber()
  @IsNotEmpty()
  buyPrice: number;

  @IsNumber()
  @IsNotEmpty()
  sellPriceLevel1: number;

  @IsNumber()
  @IsNotEmpty()
  sellPriceLevel2: number;

  @IsNumber()
  @IsNotEmpty()
  reorderLvl: number;

  @IsNumber()
  @IsNotEmpty()
  @Optional()
  qtyOnHand: number;

  @IsOptional()
  brandName: string;

  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;

  @IsNumber()
  @IsNotEmpty()
  categoryId: number;
}
