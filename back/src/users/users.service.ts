import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDTO } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt'
import { Prisma, UserApp } from '@prisma/client';
import { PrismaClient } from '@prisma/client/extension';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UpdatedUserDTO } from './dto/updated-user.dto';

@Injectable()
export class UsersService {

    constructor(private prisma: PrismaService) { }

    async findByEmail(email: string): Promise<UserApp | undefined> {
        return this.prisma.userApp.findUnique({
            where: { email },
        });
    }

    async findById(id: number): Promise<UserApp | undefined> {
        return this.prisma.userApp.findUnique({
            where: { id: id }
        });
    }

    async userExists(id: number): Promise<UserApp | undefined> {

        const user = await this.findById(id);

        if (!user) throw new NotFoundException(`Não existe usuário para o id: ${id}`);
        return user;
    }

    async create(
        data: CreateUserDTO,
        enterpriseID: number,
        client: Prisma.TransactionClient | PrismaClient = this.prisma) {

        const possibleUser = await this.findByEmail(data.email);
        if (possibleUser) throw new BadRequestException('Email já utilizado!');

        const hash = await bcrypt.hash(data.password, 10);

        return client.userApp.create({
            data: {
                ...data,
                password: hash,
                enterpriseID
            }
        });
    }

    async inactivate(id: number, enterpriseID: number,) {
        const user = await this.userExists(id);

        if (user.enterpriseID !== enterpriseID) {
            throw new UnauthorizedException('Não é permitido alterar um registro pertencente a outra empresa!')
        }

        await this.prisma.userApp.update({
            where: {
                id: id,
            },
            data: {
                active: false,
            }
        });
    }


    async updateUser(
        id: number,
        dto: UpdateUserDTO,
        enterpriseID: number
    ): Promise<UpdatedUserDTO> {

        const user = await this.userExists(id);

        if (user.enterpriseID !== enterpriseID) {
            throw new UnauthorizedException('Não é permitido alterar um registro pertencente a outra empresa!')
        }

        const attributes = {};

        for (const [key, value] of Object.entries(dto)) {
            if (value) {
                attributes[key] = (key !== 'password') ? value : await bcrypt.hash(value, 10);
            }
        }

        const userUpdated = await this.prisma.userApp.update({
            where: {
                id: id,
            },
            data: {
                ...attributes
            }
        });

        return {
            id: userUpdated.id,
            name: userUpdated.name,
            email: userUpdated.email
        } as UpdatedUserDTO;
    }
}
