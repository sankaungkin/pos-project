import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SaledetailsService {
  constructor(private readonly prisma: PrismaService) {}

  findAllByInvoiceId(id: string) {
    return this.prisma.saleDetail.findMany({
      where: {
        saleId: id,
      },
      include: {
        product: {
          select: {
            productName: true,
          },
        },
      },
    });
  }
}
