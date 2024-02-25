import { Injectable } from '@nestjs/common';
import { Category, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(private prismaService: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    return this.prismaService.category.create({ data: createCategoryDto });
  }

  async findAll(): Promise<Category[]> {
    return await this.prismaService.category.findMany();
  }

  async findOne(
    id: Prisma.CategoryWhereUniqueInput,
  ): Promise<Category | undefined> {
    return this.prismaService.category.findUnique({
      where: id,
    });
  }

  async update(
    id: Prisma.CategoryWhereUniqueInput,
    data: UpdateCategoryDto,
  ): Promise<Category> {
    return this.prismaService.category.update({ where: id, data });
  }

  async remove(id: Prisma.CategoryWhereUniqueInput): Promise<Category> {
    return this.prismaService.category.delete({ where: id });
  }
}
