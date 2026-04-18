import { IsBoolean, IsEnum } from 'class-validator';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { UserRole } from '../entities/user-role.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDTO {

    @IsString()
    @IsOptional()
    @ApiProperty({example: 'Inácio Souza Rocha'})
    name: string;

    @IsEmail()
    @IsOptional()
    @ApiProperty({example: 'inacio@email.com'})
    email: string;

    @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres!' })
    @IsOptional()
    @ApiProperty({example: '123456'})
    password: string;

    @IsEnum(UserRole)
    @IsOptional()
    @ApiProperty({example: 'OPERATOR'})
    role: UserRole;

    @IsBoolean()
    @IsOptional()
    @ApiProperty({example: 'true'})
    active: boolean;

}