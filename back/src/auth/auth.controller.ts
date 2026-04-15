import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDTO } from './dto/sign-in.dto';
import { Public } from './decorators/public';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Public()
    @Post('login')
    async signIn(@Body() body: SignInDTO) {
        return await this.authService.signIn(body);
    }

    @Get('test')
    async testRoute() {
        return {
            message: 'Hello, world!'
        }
    }
}
