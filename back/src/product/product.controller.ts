import { FindProductsByPropertiesDTO } from './dto/find-products-by-properties.dto';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, Req } from '@nestjs/common';
import { CreateProductDTO } from './dto/create-product.dto';
import { ProductService } from './product.service';
import { UpdateProductDTO } from './dto/update-product.dto';
import { Product } from '@prisma/client';
import { Request } from 'express';
import { ControllerPagination } from 'src/shared/generic-controller/controller-pagination';
import { CustomPaginationService } from 'src/shared/services/custom-pagination.service';
import { UserRole } from 'src/users/entities/user-role.entity';
import { Roles } from 'src/auth/decorators/role';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { QueryPaginationDTO } from 'src/shared/dtos/query-pagination.dto';
import { ResponsePaginationDTO } from 'src/shared/dtos/response-pagination.dto';

@Controller('product')
@ApiTags('Product')
@ApiBearerAuth('access-token')
export class ProductController extends ControllerPagination {

    constructor(
        private productService: ProductService,
        customPagination: CustomPaginationService) {
        super(customPagination, 'product');
    }

    @Get(':id')
    async findById(@Param('id') id: number) {
        return await this.productService.findById(Number(id));
    }


    @Roles(UserRole.OPERATOR)
    @Post()
    async create(@Req() req: Request, @Body() body: CreateProductDTO): Promise<Product> {
        const enterpriseID: number = req['payload_token']['enterpriseID'];
        return await this.productService.create(body, enterpriseID);
    }

    @Roles(UserRole.OPERATOR)
    @Patch(":id")
    async update(
        @Req() req: Request,
        @Param("id") id: string,
        @Body() body: UpdateProductDTO): Promise<Product> {
        const enterpriseID: number = req['payload_token']['enterpriseID'];

        return await this.productService.update(Number(id), body, enterpriseID);
    }

    @Post("by-properties")
    async findByProperties(
        @Req() req: Request,
        @Query() query: QueryPaginationDTO,
        @Body() dto: FindProductsByPropertiesDTO): Promise<ResponsePaginationDTO> {
        const enterpriseID: number = req['payload_token']['enterpriseID'];
        return await this.productService.findByProperties(dto, query, enterpriseID);
    }

    @Delete(":id")
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteProduct(
        @Req() req: Request,
        @Param("id") id: string) {
        const enterpriseID: number = req['payload_token']['enterpriseID'];
        await this.productService.delete(Number(id), enterpriseID);
    }

}
