import { Controller, Get, UseGuards } from '@nestjs/common';
import { SaleinvoiceService } from '../saleinvoice.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Role, Roles } from '../../auth/roles/role.decorator';

@Controller('saleinvoiceautoid')
export class SaleinvoiceautoidController {
  constructor(private saleInvoiceService: SaleinvoiceService) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN, Role.USER)
  @Get()
  async saleinvoiceautoid() {
    return await this.saleInvoiceService.getSaleInvoiceId();
  }
}
