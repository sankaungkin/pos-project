import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  MinLength,
} from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  productName?: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  uom?: string;

  @IsNumber()
  @IsNotEmpty()
  buyPrice?: number;

  @IsNumber()
  @IsNotEmpty()
  sellPriceLevel1?: number;

  @IsNumber()
  @IsNotEmpty()
  sellPriceLevel2?: number;

  @IsNumber()
  @IsNotEmpty()
  reorderLvl?: number;

  @IsOptional()
  brandName?: string;

  @IsBoolean()
  @IsNotEmpty()
  isActive?: boolean;

  @IsNumber()
  @IsNotEmpty()
  categoryId?: number;
}
