import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { RolesGuard } from '../auth/guards/roles.guard';
import { SaleinvoiceService } from './saleinvoice.service';
import { Role, Roles } from '../auth/roles/role.decorator';
import { AuthGuard } from '@nestjs/passport';
import { CreateSaleinvoiceDto } from './dto/create-saleinvoice.dto';

@Controller('sales')
export class SaleinvoiceController {
  constructor(private readonly saleinvoiceService: SaleinvoiceService) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN, Role.USER)
  @Post()
  async create(@Body() createSaleInvoiceDto: CreateSaleinvoiceDto) {
    return await this.saleinvoiceService.create(createSaleInvoiceDto);
  }
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN, Role.USER)
  @Get()
  findAll() {
    return this.saleinvoiceService.findAll();
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN, Role.USER)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.saleinvoiceService.findOne(id);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateSaleinvoiceDto: UpdateSaleinvoiceDto,
  // ) {
  //   return this.saleinvoiceService.update({ id: +id }, updateSaleinvoiceDto);
  // }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.saleinvoiceService.remove(id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN, Role.USER)
  @Get('autoid')
  async getAutoSaleId() {
    return await this.saleinvoiceService.getSaleInvoiceId();
  }
}
