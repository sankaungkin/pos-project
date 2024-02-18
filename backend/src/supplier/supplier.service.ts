import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { Prisma, Supplier } from '@prisma/client';
import { UpdateSupplierDto } from './dto/update-supplier.dto';

@Injectable()
export class SupplierService {
  constructor(private prisma: PrismaService) {}

  async create(createSupplierDto: CreateSupplierDto): Promise<Supplier> {
    return this.prisma.supplier.create({ data: createSupplierDto });
  }

  async findAll(): Promise<Supplier[]> {
    return this.prisma.supplier.findMany();
  }

  async findOne(
    id: Prisma.SupplierWhereUniqueInput,
  ): Promise<Supplier | undefined> {
    return this.prisma.supplier.findUnique({ where: id });
  }

  async update(
    id: Prisma.SupplierWhereUniqueInput,
    data: UpdateSupplierDto,
  ): Promise<Supplier> {
    return this.prisma.supplier.update({ where: id, data });
  }

  async remove(id: Prisma.SupplierWhereUniqueInput) {
    return this.prisma.supplier.delete({ where: id });
  }
}
