import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDTO } from './dto/create-product.dto';
import { CategoryService } from 'src/category/category.service';
import { EnterpriseService } from 'src/enterprise/enterprise.service';
import { UpdateProductDTO } from './dto/update-product.dto';
import { Prisma, Product } from '@prisma/client';
import { PrismaClient } from '@prisma/client/extension';

@Injectable()
export class ProductService {

    constructor(
        private prismaService: PrismaService,
        private enterpriseService: EnterpriseService,
        private categoryService: CategoryService) {

    }

    async findById(id: number) {
        return await this.prismaService.product.findUnique({
            where: { id }
        });
    }

    async productExists(id: number) {
        const product = await this.findById(id);

        if (!product) throw new NotFoundException(`Não existe produto para o id ${id}`);

        return product;
    }

    async create(dto: CreateProductDTO): Promise<Product> {

        await this.categoryService.categoryExists(dto.categoryID);
        await this.enterpriseService.enterpriseExists(dto.enterpriseID);

        const product = await this.prismaService.product.create({
            data: {
                ...dto
            }
        });

        return product;
    }

    async update(
        id: number,
        dto: UpdateProductDTO,
        client: Prisma.TransactionClient | PrismaClient = this.prismaService
    ): Promise<Product> {

        await this.productExists(id);
        if (dto.categoryID) await this.categoryService.categoryExists(dto.categoryID);

        return await client.product.update({
            where: { id },
            data: {
                ...dto
            }
        });
    }
}
