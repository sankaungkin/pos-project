import { Controller, Get, UseGuards } from '@nestjs/common';
import { ProductService } from '../product.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Role, Roles } from '../../auth/roles/role.decorator';

@Controller('totalproducts')
export class TotalproductsController {
  constructor(private readonly productService: ProductService) {}
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN, Role.USER)
  @Get()
  async getTotalProducts() {
    return await this.productService.getTotalProducts();
  }
}
