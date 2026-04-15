import { Enterprise } from './../../node_modules/.prisma/client/index.d';
import { Injectable } from '@nestjs/common';
import { CreateEnterpriseDTO } from './dto/create-enterprise.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { UserRole } from 'src/users/entities/user-role.entity';
import { CreatedEnterpriseDTO } from './dto/created-enterprise.dto';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';

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

        const enterprise = await this.prismaService.enterprise.create({
            data: {
                name: data.enterpriseName
            }
        });

        const createUser = new CreateUserDTO();
        createUser.name = data.userName;
        createUser.email = data.email;
        createUser.password = data.password;
        createUser.role = UserRole.ADMIN;
        createUser.enterpriseID = enterprise.id;

        const user = await this.usersService.create(createUser);

        return {
            enterpriseName: enterprise.name,
            userEmail: user.email
        } as CreatedEnterpriseDTO;
    }
}
