import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProductDTO {

    @IsString()
    @ApiProperty({example: 'Vassoura de palha'})
    name: string;

    @IsString()
    @IsOptional()
    @ApiProperty({example: 'Usada para limpeza'})
    description: string;

    @IsNumber()
    @ApiProperty({example: '12.50'})
    price: number;

    @IsNumber()
    @ApiProperty({example: '1'})
    categoryID: number;

    @IsNumber()
    @ApiProperty({example: '5'})
    amount: number;

    @IsBoolean()
    @ApiProperty({example: 'true'})
    active: boolean;
}