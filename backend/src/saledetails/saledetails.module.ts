import { Module } from '@nestjs/common';
import { SaledetailsController } from './saledetails.controller';
import { SaledetailsService } from './saledetails.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [SaledetailsController],
  providers: [SaledetailsService, PrismaService],
})
export class SaledetailsModule {}
