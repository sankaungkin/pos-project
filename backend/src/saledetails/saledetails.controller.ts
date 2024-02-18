import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { SaledetailsService } from './saledetails.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Role, Roles } from '../auth/roles/role.decorator';

@Controller('saledetails')
export class SaledetailsController {
  constructor(private readonly saleDetailsService: SaledetailsService) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN, Role.USER)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.saleDetailsService.findAllByInvoiceId(id);
  }

  // @Post()
  // create(@Body() createSaledetailDto: CreateSaledetailDto) {
  //   return this.saledetailsService.create(createSaledetailDto);
  // }

  // @Get()
  // findAll() {
  //   return this.saledetailsService.findAll();
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateSaledetailDto: UpdateSaledetailDto,
  // ) {
  //   return this.saledetailsService.update(+id, updateSaledetailDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.saledetailsService.remove(+id);
  // }
}
