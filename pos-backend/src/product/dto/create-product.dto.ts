import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
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

  @ApiProperty({
    example: 'Cement, CROWN, 4.25 ',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  productName: string;

  @ApiProperty({
    example: 'EACH',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  uom: string;

  @ApiProperty({
    example: '4800',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  buyPrice: number;

  @ApiProperty({
    example: '5200',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  sellPriceLevel1: number;

  @ApiProperty({
    example: '5100',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  sellPriceLevel2: number;

  @ApiProperty({
    example: '5',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  reorderLvl: number;

  @ApiProperty({
    example: '10',
    required: false,
  })
  @IsNumber()
  @IsNotEmpty()
  @Optional()
  qtyOnHand: number;

  @ApiProperty({
    example: 'CROWN',
    required: false,
  })
  @IsOptional()
  brandName: string;

  @ApiProperty({
    example: 'TRUE',
    required: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;

  @ApiProperty({
    example: '2',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  categoryId: number;
}
