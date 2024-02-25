import { PartialType } from '@nestjs/mapped-types';
import { CreateSalesDetailDto } from './create-salesdetail.dto';

export class UpdateSalesDetailDto extends PartialType(CreateSalesDetailDto) {}
