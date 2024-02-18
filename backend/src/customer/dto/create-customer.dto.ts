import { IsNotEmpty } from 'class-validator';

export class CreateCustomerDto {
  @IsNotEmpty()
  name: string;

  address: string;

  phone: string;
}
