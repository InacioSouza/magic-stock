import { CustomPaginationService } from './../shared/services/custom-pagination.service';
import { Body, Controller, Get, Param, Post, Put, Query, Req } from '@nestjs/common';
import { CreateCategoryDTO } from './dto/create-category.dto';
import { CategoryService } from './category.service';
import { Category } from '@prisma/client';
import { Request } from 'express';
import { ControllerPagination } from 'src/shared/generic-controller/controller-pagination';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('category')
@ApiTags('Category')
@ApiBearerAuth('access-token')
export class CategoryController extends ControllerPagination{

    constructor(
        private categoryService: CategoryService,
        customPagination: CustomPaginationService,
    ) { 
        super(customPagination, 'category');
    }

    @Get(':id')
    async findById(@Param('id') id: number) {
        return await this.categoryService.findById(id);
    }

    @Post()
    async create(@Req() req: Request, @Body() body: CreateCategoryDTO): Promise<Category> {
        const enterpriseID: number = req['payload_token']['enterpriseID'];
        return await this.categoryService.create(body, enterpriseID);
    }

    @Put(":id")
    async update(
        @Req() req: Request,
        @Param("id") id: string,
        @Query("name") name: string): Promise<Category> {
        const enterpriseID: number = req['payload_token']['enterpriseID'];
        return await this.categoryService.update(Number(id), name, enterpriseID);
    }

}
