import { EnterpriseModule } from './../enterprise/enterprise.module';
import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';


@Module({
  imports: [
    EnterpriseModule
  ],
  providers: [
    CategoryService
  ],
  controllers: [
    CategoryController
  ],
  exports: [
    CategoryService
  ]
})
export class CategoryModule {}
