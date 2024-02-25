import { Body, Controller, Post, Get, Param, UseGuards } from '@nestjs/common';
import { InventoriesService } from './inventories.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { Role, Roles } from '../auth/roles/role.decorator';
import { Prisma } from '@prisma/client';

@Controller('inventories')
export class InventoriesController {
  constructor(private readonly inventoriesService: InventoriesService) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN)
  @Post('/increase')
  increase(@Body() increase: CreateInventoryDto) {
    return this.inventoriesService.increase(increase);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN)
  @Post('/decrease')
  decrease(@Body() decrease: CreateInventoryDto) {
    return this.inventoriesService.decrease(decrease);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN)
  @Get()
  findAll() {
    return this.inventoriesService.findAll();
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: Prisma.InventoryWhereUniqueInput) {
    return this.inventoriesService.findOne(id);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateInventoryDto: UpdateInventoryDto,
  // ) {
  //   return this.inventoriesService.update(+id, updateInventoryDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.inventoriesService.remove(+id);
  // }
}
