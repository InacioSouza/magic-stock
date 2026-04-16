import { PrismaService } from './../prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDTO } from './dto/create-category.dto';
import { EnterpriseService } from 'src/enterprise/enterprise.service';
import { Category } from '@prisma/client';

@Injectable()
export class CategoryService {

    constructor(
        private prismaService: PrismaService,
        private enterpriseService: EnterpriseService) { }

    async findById(id: number) {
        return this.prismaService.category.findUnique({
            where: { id }
        });
    }

    async categoryExists(id: number) {
        const category = await this.findById(id);

        if(!category) {
            throw new NotFoundException(`Não existe categoria para o id ${id}`);
        }
    }

    async create(category: CreateCategoryDTO): Promise<Category> {

        await this.enterpriseService
            .enterpriseExists(category.enterpriseID);

        return await this.prismaService.category.create({
            data: {
                name: category.name,
                enterpriseID: category.enterpriseID,
            }
        });
    }

    async update(id: number, name: string): Promise<Category> {

        this.categoryExists(id);

        return this.prismaService.category.update({
            where: {
                id: id
            },
            data: {
                name: name
            }
        });
    }
}
