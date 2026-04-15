import { UserCreatedDTO } from './dto/user-created.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    @Post()
    async createUser(@Body() body: CreateUserDTO) {
        const userSaved = await this.usersService.create(body);

        return {
            name: userSaved.name,
            email: userSaved.email
        } as UserCreatedDTO;
    }

}
