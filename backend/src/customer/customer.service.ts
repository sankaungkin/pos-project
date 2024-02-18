import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Customer, Prisma } from '@prisma/client';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}

  async create(createCustomerDto: CreateCustomerDto) {
    return this.prisma.customer.create({ data: createCustomerDto });
  }

  async findAll(): Promise<Customer[]> {
    return this.prisma.customer.findMany();
  }

  async findOne(
    id: Prisma.CustomerWhereUniqueInput,
  ): Promise<Customer | undefined> {
    return this.prisma.customer.findUnique({ where: id });
  }

  async update(
    id: Prisma.CustomerWhereUniqueInput,
    data: UpdateCustomerDto,
  ): Promise<Customer> {
    return this.prisma.customer.update({ where: id, data });
  }

  async remove(id: Prisma.CustomerWhereUniqueInput): Promise<Customer> {
    return this.prisma.customer.delete({ where: id });
  }
}
