import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Prisma, Product } from '@prisma/client';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private prismaService: PrismaService) {}

  async getProductId() {
    const newProductId =
      'P0' + ((await this.prismaService.product.count()) + 1).toString();
    return newProductId;
  }

  async create(createProductInput: CreateProductDto): Promise<Product> {
    // const newProductId =
    //   'P00' + ((await this.prismaService.product.count()) + 1).toString();

    return this.prismaService.product.create({
      data: {
        id: createProductInput.id,
        brandName: createProductInput.brandName,
        buyPrice: createProductInput.buyPrice,
        categoryId: createProductInput.categoryId,
        isActive: createProductInput.isActive,
        productName: createProductInput.productName,
        qtyOnHand: createProductInput.qtyOnHand,
        reorderLvl: createProductInput.reorderLvl,
        sellPriceLevel1: createProductInput.sellPriceLevel1,
        sellPriceLevel2: createProductInput.sellPriceLevel2,
        uom: createProductInput.uom,
      },
    });
  }

  async findAll(): Promise<Product[]> {
    return this.prismaService.product.findMany({
      include: {
        category: {
          select: {
            categoryName: true,
          },
        },
      },
    });
  }

  async findActiveProducts(): Promise<Product[]> {
    return this.prismaService.product.findMany({
      include: {
        category: {
          select: {
            categoryName: true,
          },
        },
      },
      where: { isActive: true },
    });
  }

  async findOne(
    id: Prisma.ProductWhereUniqueInput,
  ): Promise<Product | undefined> {
    return this.prismaService.product.findUnique({
      where: id,
      include: {
        category: {
          select: {
            categoryName: true,
          },
        },
      },
    });
  }

  async update(
    id: Prisma.ProductWhereUniqueInput,
    data: UpdateProductDto,
  ): Promise<Product> {
    return this.prismaService.product.update({ where: id, data });
  }

  async remove(id: Prisma.ProductWhereUniqueInput): Promise<Product> {
    return this.prismaService.product.delete({ where: id });
  }

  async getTotalValue(): Promise<any | number> {
    const result = await this.prismaService.product.aggregate({
      _sum: {
        qtyOnHand: true,
      },
      where: {
        isActive: {
          equals: true,
        },
      },
    });
    return result._sum.qtyOnHand;
  }

  async getTotalProducts(): Promise<any | number> {
    const result = await this.prismaService.product.aggregate({
      _count: {
        _all: true,
      },
      where: {
        isActive: {
          equals: true,
        },
      },
    });
    return result._count._all;
  }

  async getReorderProductCount(): Promise<any | number> {
    const result = await this.prismaService
      .$queryRaw`SELECT count(*)::integer FROM "public"."Product" WHERE "reorderLvl" >= "qtyOnHand" AND "isActive" = true;`;

    return result;
  }

  async getTopfiveSellingProducts(): Promise<any> {
    const result = await this.prismaService
      .$queryRaw`SELECT  "productId", "productName",  sum(qty)::integer
    FROM public."SaleDetail"
    GROUP BY "productName", "productId" 
    ORDER BY SUM(qty) DESC
    fetch first 5 rows with ties;`;

    return result;
  }
}
