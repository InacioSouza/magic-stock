import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { CustomPaginationService } from 'src/shared/services/custom-pagination.service';

@Module({
  providers: [
    UsersService,
    CustomPaginationService,
],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule {}
