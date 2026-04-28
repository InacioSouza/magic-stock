import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDTO } from './dto/create-product.dto';
import { CategoryService } from 'src/category/category.service';
import { EnterpriseService } from 'src/enterprise/enterprise.service';
import { UpdateProductDTO } from './dto/update-product.dto';
import { Prisma, Product } from '@prisma/client';
import { PrismaClient } from '@prisma/client/extension';
import { FindProductsByPropertiesDTO } from './dto/find-products-by-properties.dto';
import { QueryPaginationDTO } from 'src/shared/dtos/query-pagination.dto';
import { ResponsePaginationDTO } from 'src/shared/dtos/response-pagination.dto';

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

    async create(dto: CreateProductDTO, enterpriseID: number): Promise<Product> {

        await this.categoryService.categoryExists(dto.categoryID);
        await this.enterpriseService.enterpriseExists(enterpriseID);

        const product = await this.prismaService.product.create({
            data: {
                ...dto,
                enterpriseID
            }
        });

        return product;
    }

    async update(
        id: number,
        dto: UpdateProductDTO,
        enterpriseID: number,
        client: Prisma.TransactionClient | PrismaClient = this.prismaService
    ): Promise<Product> {

        const product = await this.productExists(id);

        if (product.enterpriseID !== enterpriseID) {
            throw new UnauthorizedException('Não é permitido alterar um registro pertencente a outra empresa!')
        }

        if (dto.categoryID) await this.categoryService.categoryExists(dto.categoryID);

        return await client.product.update({
            where: { id },
            data: {
                ...dto
            }
        });
    }

    async findByProperties(
        dto: FindProductsByPropertiesDTO,
        query: QueryPaginationDTO): Promise<ResponsePaginationDTO> {

        const safePage = Math.max(query.page, 1);
        const safeLimit = Math.max(query.limit, 1);

        const skip = (safePage - 1) * safeLimit;

        const filter = {
                    ...(dto.name && { name: { contains: dto.name, mode: Prisma.QueryMode.insensitive } }),

                    ...(dto.description && { description: { contains: dto.description, mode: Prisma.QueryMode.insensitive  } }),

                    ...(dto.price && { price: { equals: dto.price } }),

                    ...(dto.amount && { amount: { equals: dto.amount } }),

                    ...(dto.active && { active: { equals: dto.active } }),

                    ...(dto.category && { categoryID: { equals: dto.category } })
                };

        const [data, total] = await Promise.all([
            this.prismaService.product.findMany({
                skip,
                take: safeLimit,
                orderBy: {
                    [query.propertyOrderBy]: query.order
                },
                where: filter
            }),
            this.prismaService.product.count({
                where: filter
            }),
        ]);

        const responsePaginationDTO: ResponsePaginationDTO = new ResponsePaginationDTO();
        responsePaginationDTO.data = data;
        responsePaginationDTO.meta.total = total;
        responsePaginationDTO.meta.page = safePage;
        responsePaginationDTO.meta.lastPage = Math.ceil(total / safeLimit);

        return responsePaginationDTO;
    }

}
