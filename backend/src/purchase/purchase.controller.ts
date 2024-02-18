import { Body, Controller, Post, Get, Param, UseGuards } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Role, Roles } from '../auth/roles/role.decorator';
import { CreatePurchaseDto } from './dto/create-purchase.dto';

@Controller('purchase')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN, Role.USER)
  @Post()
  create(@Body() createPurchaseDto: CreatePurchaseDto) {
    return this.purchaseService.create(createPurchaseDto);
  }
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN, Role.USER)
  @Get()
  findAll() {
    return this.purchaseService.findAll();
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN, Role.USER)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.purchaseService.findOne({ id });
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.purchaseService.remove(+id);
  // }
}
