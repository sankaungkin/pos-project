import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { PrismaService } from '../prisma/prisma.service';
import { ReorderproductcountController } from './reorderproductcount/reorderproductcount.controller';
import { TopfivesellingproductsController } from './topfivesellingproducts/topfivesellingproducts.controller';
import { TotalproductsController } from './totalproducts/totalproducts.controller';

@Module({
  controllers: [
    ProductController,
    ReorderproductcountController,
    TopfivesellingproductsController,
    TotalproductsController,
  ],
  providers: [ProductService, PrismaService],
})
export class ProductModule {}
