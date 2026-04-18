import { IsEmail, IsEnum, IsNumber, IsOptional, IsString, MinLength } from "class-validator";
import { UserRole } from "../entities/user-role.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDTO {

    @IsString()
    @ApiProperty({example: 'Inácio Souza Rocha'})
    name: string;

    @IsEmail({}, { message: 'Formato de email inválido!' })
    @ApiProperty({example: 'inacio@email.com'})
    email: string;

    @IsString()
    @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres!' })
    @ApiProperty({example: '123456'})
    password: string;

    @IsOptional()
    @IsEnum(UserRole)
    @ApiProperty({example: 'ADMIN'})
    role?: UserRole;
}