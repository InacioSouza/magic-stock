import { JwtService } from '@nestjs/jwt';
import { UsersService } from './../users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDTO } from './dto/sign-in.dto';
import { TokenDTO } from './dto/token.dto';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor (
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async signIn(data: SignInDTO): Promise<TokenDTO>{

        const user = await this.usersService.findByEmail(data.email);

        if(!user) {
            throw new UnauthorizedException('Usuário não encontrado!');
        }

        const correctPassword = await bcrypt.compare(data.password, user.password);
        if(!correctPassword) {
            throw new UnauthorizedException();
        }

        const payload = {userEmail: user.email, userRole: user.role, enterpriseID: user.enterpriseID};

        const token = {
            access_token: await this.jwtService.signAsync(payload)
        } as TokenDTO;

        return token;
    }
}
