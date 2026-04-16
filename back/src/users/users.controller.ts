import { UserCreatedDTO } from './dto/user-created.dto';
import { Body, Controller, HttpCode, HttpStatus, Param, Patch, Post, Put } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { Public } from 'src/auth/decorators/public';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UpdatedUserDTO } from './dto/updated-user.dto';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    @Public()
    @Post()
    async createUser(@Body() body: CreateUserDTO): Promise<UserCreatedDTO> {
        const userSaved = await this.usersService.create(body);

        return {
            name: userSaved.name,
            email: userSaved.email
        } as UserCreatedDTO;
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Put("inactivate/:id")
    async inactivateUser(@Param("id") id: string) {
        await this.usersService.inactivate(Number(id));
    }

    @Patch(":id")
    async updateUSer(
        @Param("id") id: string,
        @Body() body: UpdateUserDTO): Promise<UpdatedUserDTO> {

        return await this.usersService.updateUser(Number(id), body);
    }

}
