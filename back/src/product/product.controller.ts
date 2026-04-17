import { Body, Controller, Param, Patch, Post, Req } from '@nestjs/common';
import { CreateProductDTO } from './dto/create-product.dto';
import { ProductService } from './product.service';
import { UpdateProductDTO } from './dto/update-product.dto';
import { Product } from '@prisma/client';
import { Request } from 'express';
import { ControllerPagination } from 'src/shared/generic-controller/controller-pagination';
import { CustomPaginationService } from 'src/shared/services/custom-pagination.service';

@Controller('product')
export class ProductController extends ControllerPagination{

    constructor(
        private productService: ProductService,
        customPagination: CustomPaginationService) {
            super(customPagination, 'product');
        }

    @Post()
    async create(@Req() req: Request, @Body() body: CreateProductDTO): Promise<Product> {
        const enterpriseID: number = req['payload_token']['enterpriseID'];
        return await this.productService.create(body, enterpriseID);
    }

    @Patch(":id")
    async update(
        @Req() req: Request,
        @Param("id") id: string,
        @Body() body: UpdateProductDTO): Promise<Product> {
        const enterpriseID: number = req['payload_token']['enterpriseID'];

        return await this.productService.update(Number(id), body, enterpriseID);
    }

}
