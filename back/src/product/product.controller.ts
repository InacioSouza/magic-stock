import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { CreateProductDTO } from './dto/create-product.dto';
import { ProductService } from './product.service';
import { UpdateProductDTO } from './dto/update-product.dto';
import { Product } from '@prisma/client';

@Controller('product')
export class ProductController {

    constructor(private productService: ProductService) {}

    @Post()
    async create(@Body() body: CreateProductDTO): Promise<Product> {
        return await this.productService.create(body);
    }

    @Patch(":id")
    async update(
        @Param("id") id: string,
        @Body() body: UpdateProductDTO): Promise<Product> {
        return await this.productService.update(Number(id), body);
    }

}
