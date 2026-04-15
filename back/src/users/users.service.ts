import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDTO } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt'
import { UserApp } from '@prisma/client';

@Injectable()
export class UsersService {

    constructor(private prisma: PrismaService) {}

    async findByEmail(email: string): Promise< UserApp | undefined> {
        return this.prisma.userApp.findUnique({
            where: {email},
        });
    }

    async create(data: CreateUserDTO) {
        
        const possibleUser = await this.findByEmail(data.email);
        if(possibleUser) throw new Error('Email já utilizado!');

        const hash = await bcrypt.hash(data.password, 10);

        return this.prisma.userApp.create({
            data: {
                ...data,
                password: hash
            }
        });
    }

}
