import { UserCreatedDTO } from './dto/user-created.dto';
import { Body, Controller, HttpCode, HttpStatus, Param, Patch, Post, Put, Req } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { Public } from 'src/auth/decorators/public';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UpdatedUserDTO } from './dto/updated-user.dto';
import { Request } from 'express';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    private returnEnterpriseID(req: Request): number {
        return req['payload_token']['enterpriseID'];
    }

    @Public()
    @Post()
    async createUser(@Req() req: Request, @Body() body: CreateUserDTO): Promise<UserCreatedDTO> {
        const userSaved = await this.usersService.create(body, this.returnEnterpriseID(req));

        return {
            name: userSaved.name,
            email: userSaved.email
        } as UserCreatedDTO;
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Put("inactivate/:id")
    async inactivateUser(@Req() req: Request, @Param("id") id: string) {
        await this.usersService.inactivate(Number(id), this.returnEnterpriseID(req));
    }

    @Patch(":id")
    async updateUSer(
        @Req() req: Request,
        @Param("id") id: string,
        @Body() body: UpdateUserDTO): Promise<UpdatedUserDTO> {

        return await this.usersService.updateUser(Number(id), body, this.returnEnterpriseID(req));
    }

}
