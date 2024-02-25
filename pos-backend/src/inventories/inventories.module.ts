import { Module } from '@nestjs/common';
import { InventoriesController } from './inventories.controller';
import { InventoriesService } from './inventories.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [InventoriesController],
  providers: [InventoriesService, PrismaService],
})
export class InventoriesModule {}
