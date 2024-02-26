import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    example: 'Construction',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  categoryName: string;
}
