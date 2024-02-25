import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, SaleDetail } from '@prisma/client';
import { CreateSaleinvoiceDto } from './dto/create-saleinvoice.dto';

@Injectable()
export class SaleinvoiceService {
  constructor(private prisma: PrismaService) {}

  updateSaleDetails: SaleDetail[];

  //create new saleRecord
  //update decreament product qty
  async create(createSaleinvoiceDto: CreateSaleinvoiceDto) {
    console.log(createSaleinvoiceDto);
    const newSaleRecord = await this.prisma.sale.create({
      data: {
        id: createSaleinvoiceDto.id,
        discount: createSaleinvoiceDto.discount,
        grandTotal: createSaleinvoiceDto.grandTotal,
        customerId: createSaleinvoiceDto.customerId,
        total: createSaleinvoiceDto.total,
        saleDetails: {
          createMany: {
            data: createSaleinvoiceDto.saleDetails,
          },
        },
      },
      include: {
        saleDetails: true,
      },
    });

    this.updateSaleDetails = createSaleinvoiceDto.saleDetails;
    this.updateSaleDetails.map(
      async (x) =>
        await this.prisma.product.update({
          where: { id: x.productId },
          data: {
            qtyOnHand: {
              decrement: x.qty,
            },
          },
        }),
    );

    return this.prisma.$transaction(
      async () => [(this.updateSaleDetails, newSaleRecord)] as any,
      {
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
      },
    );
  }

  async findAll() {
    return await this.prisma.sale.findMany({
      include: {
        saleDetails: {},
        customer: {
          select: {
            name: true,
          },
        },
      },
    });
  }
  findOne(id: string) {
    return this.prisma.sale.findUnique({
      where: { id },
      include: { saleDetails: {}, customer: { select: { name: true } } },
    });
  }

  findInvDetailsById(id: string) {
    return this.prisma.saleDetail.findUnique({
      where: { id },
    });
  }

  remove(id: string) {
    return this.prisma.sale.delete({ where: { id } });
  }

  async getSaleInvoiceId() {
    const newInvoiceId =
      'SIV00' + ((await this.prisma.sale.count()) + 1).toString();
    return newInvoiceId;
  }
}
