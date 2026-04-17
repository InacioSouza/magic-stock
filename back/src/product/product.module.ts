import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { EnterpriseService } from 'src/enterprise/enterprise.service';
import { CategoryService } from 'src/category/category.service';
import { EnterpriseModule } from 'src/enterprise/enterprise.module';
import { CategoryModule } from 'src/category/category.module';
import { UsersModule } from 'src/users/users.module';
import { CustomPaginationService } from 'src/shared/services/custom-pagination.service';

@Module({
  imports: [
    UsersModule,
    CategoryModule,
    EnterpriseModule
  ],
  controllers: [ProductController],
  providers: [
    ProductService,
    CustomPaginationService,
  ],
  exports: [
    ProductService
  ]
})
export class ProductModule {}
