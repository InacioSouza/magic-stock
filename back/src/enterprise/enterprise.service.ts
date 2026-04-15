import { Enterprise } from './../../node_modules/.prisma/client/index.d';
import { Injectable } from '@nestjs/common';
import { CreateEnterpriseDTO } from './dto/create-enterprise.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { UserRole } from 'src/users/entities/user-role.entity';
import { CreatedEnterpriseDTO } from './dto/created-enterprise.dto';

@Injectable()
export class EnterpriseService {

    constructor(
        private prismaService: PrismaService,
        private usersService: UsersService
    ) { }

    async findById(id: number): Promise<Enterprise | undefined> {
        return this.prismaService.enterprise.findUnique({
            where: { id },
        });
    }

    async create(data: CreateEnterpriseDTO) {

        data.user.role = UserRole.ADMIN;
        const user = await this.usersService.create(data.user);

        const enterprise = await this.prismaService.enterprise.create({
            data: {
                ...data
            }
        });

        return {
            enterpriseName: enterprise.name,
            userEmail: user.name
        } as CreatedEnterpriseDTO;
    }
}
