import { Body, Controller, Param, Post, Put, Query } from '@nestjs/common';
import { CreateCategoryDTO } from './dto/create-category.dto';
import { CategoryService } from './category.service';
import { promises } from 'dns';
import { Category } from '@prisma/client';

@Controller('category')
export class CategoryController {

    constructor (private categoryService: CategoryService) {}

    @Post()
    async create(@Body() body: CreateCategoryDTO): Promise<Category> {
        return await this.categoryService.create(body); 
    }

    @Put(":id")
    async update(
        @Param("id") id: string,
        @Query("name") name: string): Promise<Category> {
        return await this.categoryService.update(Number(id), name);
    }
}
