import { PrismaService } from './../prisma/prisma.service';
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
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

    async categoryExists(id: number): Promise<Category> {
        const category = await this.findById(id);

        if(!category) {
            throw new NotFoundException(`Não existe categoria para o id ${id}`);
        }

        return category;
    }

    async create(category: CreateCategoryDTO, enterpriseID: number): Promise<Category> {

        await this.enterpriseService
            .enterpriseExists(enterpriseID);

        return await this.prismaService.category.create({
            data: {
                name: category.name,
                enterpriseID
            }
        });
    }

    async update(id: number, name: string, enterpriseID: number): Promise<Category> {

        const category = await this.categoryExists(id);

        if (category.enterpriseID !== enterpriseID) {
            throw new UnauthorizedException('Não é permitido alterar um registro pertencente a outra empresa!');
        }


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
