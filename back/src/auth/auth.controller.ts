import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDTO } from './dto/sign-in.dto';
import { Public } from './decorators/public';
import { Request } from 'express';
import { UserRole } from 'src/users/entities/user-role.entity';
import { Roles } from './decorators/role';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Public()
    @Post('login')
    async signIn(@Body() body: SignInDTO) {
        return await this.authService.signIn(body);
    }

    @Get('test')
    async testRoute(@Req() req: Request) {

        const payload = req['payload_token'];
        
        return {
            message: 'Hello, world!'
        }
    }

    @Roles(UserRole.READER)
    @Get('role/read')
    async testRouleReader(@Req() req: Request) {

        const payload = req['payload_token'];
        
        return {
            message: 'Hello, READER!'
        }
    }
}
