import { IsBoolean, IsEnum } from 'class-validator';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { UserRole } from '../entities/user-role.entity';

export class UpdateUserDTO {

    @IsString()
    @IsOptional()
    name: string;

    @IsEmail()
    @IsOptional()
    email: string;

    @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres!' })
    @IsOptional()
    password: string;

    @IsEnum(UserRole)
    @IsOptional()
    role: UserRole;

    @IsBoolean()
    @IsOptional()
    active: boolean;

}