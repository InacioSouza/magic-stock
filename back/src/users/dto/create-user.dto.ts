import { IsEmail, IsEnum, IsNumber, IsOptional, IsString, MinLength } from "class-validator";
import { UserRole } from "../entities/user-role.entity";

export class CreateUserDTO {

    @IsString()
    name: string;

    @IsEmail({}, { message: 'Formato de email inválido!' })
    email: string;

    @IsString()
    @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres!' })
    password: string;

    @IsOptional()
    @IsEnum(UserRole)
    role?: UserRole;

    @IsNumber()
    enterpriseID: number;
}