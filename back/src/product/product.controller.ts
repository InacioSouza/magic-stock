import { Body, Controller, Param, Patch, Post, Req } from '@nestjs/common';
import { CreateProductDTO } from './dto/create-product.dto';
import { ProductService } from './product.service';
import { UpdateProductDTO } from './dto/update-product.dto';
import { Product } from '@prisma/client';
import { Request } from 'express';

@Controller('product')
export class ProductController {

    constructor(private productService: ProductService) {}

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
