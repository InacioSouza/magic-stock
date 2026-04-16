import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDTO } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt'
import { Prisma, UserApp } from '@prisma/client';
import { PrismaClient } from '@prisma/client/extension';

@Injectable()
export class UsersService {

    constructor(private prisma: PrismaService) {}

    async findByEmail(email: string): Promise< UserApp | undefined> {
        return this.prisma.userApp.findUnique({
            where: {email},
        });
    }

    async create(
        data: CreateUserDTO,
        client: Prisma.TransactionClient | PrismaClient = this.prisma ) {
        
        const possibleUser = await this.findByEmail(data.email);
        if(possibleUser) throw new Error('Email já utilizado!');

        const hash = await bcrypt.hash(data.password, 10);

        return client.userApp.create({
            data: {
                ...data,
                password: hash
            }
        });
    }

}
