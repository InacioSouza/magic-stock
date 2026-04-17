import { Module } from '@nestjs/common';
import { MovementController } from './movement.controller';
import { MovementService } from './movement.service';
import { ProductModule } from 'src/product/product.module';
import { UsersModule } from 'src/users/users.module';
import { EnterpriseModule } from 'src/enterprise/enterprise.module';
import { CustomPaginationService } from 'src/shared/services/custom-pagination.service';

@Module({
  imports: [
    ProductModule,
    UsersModule,
    EnterpriseModule
  ],
  controllers: [MovementController],
  providers: [
    MovementService,
    CustomPaginationService
  ],
})
export class MovementModule { }
