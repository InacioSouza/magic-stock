import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { EnterpriseService } from 'src/enterprise/enterprise.service';

@Module({
  providers: [
    CategoryService,
    EnterpriseService
  ],
  controllers: [CategoryController]
})
export class CategoryModule {}
