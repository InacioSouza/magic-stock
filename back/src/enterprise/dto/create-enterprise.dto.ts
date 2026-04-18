import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateEnterpriseDTO {

    @IsString()
    @ApiProperty({ example: 'Alemão Ferragista' })
    enterpriseName: string;

    @IsString()
    @ApiProperty({ example: 'João Alemão' })
    userName: string;

    @IsEmail({}, { message: 'Formato de email inválido!' })
    @ApiProperty({ example: 'joao@email.com.br' })
    email: string;

    @IsString()
    @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres!' })
    @ApiProperty({ example: '4Lem4o#389' })
    password: string;
}