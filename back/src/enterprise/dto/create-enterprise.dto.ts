import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateEnterpriseDTO {

    @IsString()
    enterpriseName: string;

    @IsString()
    userName: string;

    @IsEmail({}, { message: 'Formato de email inválido!' })
    email: string;

    @IsString()
    @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres!' })
    password: string;
}