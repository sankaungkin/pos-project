import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { AuthService } from './auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { CategoryController } from './category/category.controller';
import { CategoryService } from './category/category.service';
import { CategoryModule } from './category/category.module';
import { ProductController } from './product/product.controller';
import { ProductService } from './product/product.service';
import { ProductModule } from './product/product.module';
import { InventoriesModule } from './inventories/inventories.module';
import { SaledetailsModule } from './saledetails/saledetails.module';
import { SaleinvoiceModule } from './saleinvoice/saleinvoice.module';
import { CustomerModule } from './customer/customer.module';
import { SupplierModule } from './supplier/supplier.module';
import { PurchaseModule } from './purchase/purchase.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    CategoryModule,
    ProductModule,
    InventoriesModule,
    SaledetailsModule,
    SaleinvoiceModule,
    CustomerModule,
    SupplierModule,
    PurchaseModule,
  ],
  controllers: [
    AppController,
    AuthController,
    CategoryController,
    ProductController,
  ],
  providers: [
    AppService,
    PrismaService,
    AuthService,
    JwtService,
    CategoryService,
    ProductService,
  ],
})
export class AppModule {}
