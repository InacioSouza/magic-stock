import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class SignInDTO {

    @IsString()
    @ApiProperty({ example: 'fulano@email.com' })
    email: string;

    @IsString()
    @ApiProperty({ example: '123Abc' })
    password: string;
}