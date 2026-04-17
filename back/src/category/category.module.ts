import { EnterpriseModule } from './../enterprise/enterprise.module';
import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { CustomPaginationService } from 'src/shared/services/custom-pagination.service';


@Module({
  imports: [
    EnterpriseModule
  ],
  providers: [
    CategoryService,
    CustomPaginationService
  ],
  controllers: [
    CategoryController
  ],
  exports: [
    CategoryService
  ]
})
export class CategoryModule {}
