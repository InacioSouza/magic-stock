import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateCategoryDTO {

    @ApiProperty({ example: 'Limpeza' })
    @IsString()
    name: string
}