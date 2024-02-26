import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty({
    example: 'Daniel',
    required: true,
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '123 Street, DEF Quarter',
    required: false,
  })
  address: string;

  @ApiProperty({
    example: '09-12345678',
    required: false,
  })
  phone: string;
}
