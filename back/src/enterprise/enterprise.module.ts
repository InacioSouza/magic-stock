import { Module } from '@nestjs/common';
import { EnterpriseService } from './enterprise.service';
import { EnterpriseController } from './enterprise.controller';
import { UsersService } from 'src/users/users.service';

@Module({
  providers: [
    EnterpriseService,
    UsersService
  ],
  controllers: [EnterpriseController]
})
export class EnterpriseModule {}
