import { UsersService } from './../users/users.service';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import type { StringValue } from "ms";
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('SECRETKEY'),
        signOptions: {
          expiresIn: configService.get<StringValue>('EXPIRESIN')
        }
      })
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
    AuthService,
    UsersService,
  ],
  controllers: [AuthController]
})
export class AuthModule {}
