import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Purchase, PurchaseDetail } from '@prisma/client';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { ALL } from 'dns';

@Injectable()
export class PurchaseService {
  constructor(private prisma: PrismaService) {}

  updatePurchaseDetails: PurchaseDetail[];

  //create new purchaserecord
  //update increasement product qty
  async create(createPurchaseDto: CreatePurchaseDto) {
    const newPurchaseRecord = await this.prisma.purchase.create({
      data: {
        id: createPurchaseDto.id,
        grandTotal: createPurchaseDto.grandTotal,
        purchaseDate: createPurchaseDto.purchaseDate,
        supplierId: createPurchaseDto.supplierId,
        remark: createPurchaseDto.remark,
        purchaseDetails: {
          createMany: {
            data: createPurchaseDto.purchaseDetails,
          },
        },
      },
      include: {
        purchaseDetails: true,
      },
    });
    this.updatePurchaseDetails = createPurchaseDto.purchaseDetails;
    this.updatePurchaseDetails.map(
      async (x) =>
        await this.prisma.product.update({
          where: { id: x.productId },
          data: {
            qtyOnHand: {
              increment: x.qty,
            },
          },
        }),
    );

    return this.prisma.$transaction(
      async () => [this.updatePurchaseDetails, newPurchaseRecord] as any,
      { isolationLevel: Prisma.TransactionIsolationLevel.Serializable },
    );
  }

  // findAll() {
  //   return this.prisma.purchase.findMany({
  //     include: { purchaseDetails: {}, supplier: { select: { name: true } } },
  //   });
  // }

  async findAll(): Promise<Purchase[]> {
    return this.prisma.purchase.findMany({
      include: {
        supplier: {
          select: {
            name: true,
          },
        },
        purchaseDetails: true,
      },
    });
  }

  findOne(id: Prisma.PurchaseWhereUniqueInput) {
    return this.prisma.purchase.findUnique({
      where: id,
      include: { purchaseDetails: {}, supplier: {} },
    });
  }

  // update(id: number, updatePurchaseDto: UpdatePurchaseDto) {
  //   return `This action updates a #${id} purchase`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} purchase`;
  // }
}
