import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { Prisma } from '@prisma/client';
import { UpdateInventoryDto } from './dto/update-inventory.dto';

@Injectable()
export class InventoriesService {
  constructor(private prisma: PrismaService) {}

  increase(createInventoryDto: CreateInventoryDto) {
    const newInvRecord = this.prisma.inventory.create({
      data: createInventoryDto,
    });

    const updateProductQty = this.prisma.product.update({
      data: {
        qtyOnHand: {
          increment: createInventoryDto.inQty,
        },
      },
      where: {
        id: createInventoryDto.productId,
      },
    });
    return this.prisma.$transaction([newInvRecord, updateProductQty]);
  }

  decrease(createInventoryDto: CreateInventoryDto) {
    const newInvRecord = this.prisma.inventory.create({
      data: createInventoryDto,
    });

    const updateProductQty = this.prisma.product.update({
      data: {
        qtyOnHand: {
          decrement: createInventoryDto.outQty,
        },
      },
      where: {
        id: createInventoryDto.productId,
      },
    });
    return this.prisma.$transaction([newInvRecord, updateProductQty]);
  }

  findAll() {
    return this.prisma.inventory.findMany({
      include: {
        product: {
          select: {
            productName: true,
            qtyOnHand: true,
            reorderLvl: true,
          },
        },
      },
    });
  }

  findOne(id: Prisma.InventoryWhereUniqueInput) {
    return this.prisma.inventory.findUnique({
      where: id,
      include: {
        product: {
          select: {
            productName: true,
            qtyOnHand: true,
            reorderLvl: true,
          },
        },
      },
    });
  }

  update(
    id: Prisma.InventoryWhereUniqueInput,
    updateInventoryDto: UpdateInventoryDto,
  ) {
    return this.prisma.inventory.update({
      where: id,
      data: updateInventoryDto,
    });
  }

  remove(id: Prisma.InventoryWhereUniqueInput) {
    return this.prisma.inventory.delete({ where: id });
  }
}
