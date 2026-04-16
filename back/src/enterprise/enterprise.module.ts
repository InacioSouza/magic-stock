import { Module } from '@nestjs/common';
import { EnterpriseService } from './enterprise.service';
import { EnterpriseController } from './enterprise.controller';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    UsersModule
  ],
  providers: [
    EnterpriseService,
    UsersService
  ],
  exports: [
    EnterpriseService
  ],
  controllers: [EnterpriseController],
})
export class EnterpriseModule {}
