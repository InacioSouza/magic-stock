import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateCategoryDTO } from './dto/create-category.dto';
import { EnterpriseService } from 'src/enterprise/enterprise.service';
import { Category } from '@prisma/client';

@Injectable()
export class CategoryService {

    constructor(
        private prismaService: PrismaService,
        private enterpriseService: EnterpriseService) { }

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
        return this.prismaService.category.update({
            where: {
                id
            },
            data: {
                name
            }
        });
    }
}
