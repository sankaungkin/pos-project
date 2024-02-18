import { Controller, Get, UseGuards } from '@nestjs/common';
import { ProductService } from '../product.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Role, Roles } from '../../auth/roles/role.decorator';

@Controller('topfivesellingproducts')
export class TopfivesellingproductsController {
  constructor(private readonly productsService: ProductService) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN, Role.USER)
  @Get()
  async getTop5SellingProducts() {
    return await this.productsService.getTopfiveSellingProducts();
  }
}
