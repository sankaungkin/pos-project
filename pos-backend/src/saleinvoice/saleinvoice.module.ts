import { Module } from '@nestjs/common';
import { SaleinvoiceController } from './saleinvoice.controller';
import { SaleinvoiceService } from './saleinvoice.service';
import { PrismaService } from '../prisma/prisma.service';
import { SaleinvoiceautoidController } from './saleinvoiceautoid/saleinvoiceautoid.controller';

@Module({
  controllers: [SaleinvoiceController, SaleinvoiceautoidController],
  providers: [SaleinvoiceService, PrismaService],
})
export class SaleinvoiceModule {}
