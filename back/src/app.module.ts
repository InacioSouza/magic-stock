import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { EnterpriseModule } from './enterprise/enterprise.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    PrismaModule,
    UsersModule,
    AuthModule,
    EnterpriseModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
