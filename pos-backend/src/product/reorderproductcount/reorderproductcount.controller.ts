import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { ProductService } from '../product.service';
import { Role, Roles } from '../../auth/roles/role.decorator';

@Controller('reorderproductcount')
export class ReorderproductcountController {
  constructor(private readonly productsService: ProductService) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN, Role.USER)
  @Get()
  async getReorderProductCount() {
    return await this.productsService.getReorderProductCount();
  }
}
