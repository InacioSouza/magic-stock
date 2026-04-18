import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateProductDTO {

    @IsString()
    @IsOptional()
    @ApiProperty({example: 'Vassoura de palha'})
    name: string;

    @IsString()
    @IsOptional()
    @ApiProperty({example: 'Usada para limpeza'})
    description: string;

    @IsNumber()
    @IsOptional()
    @ApiProperty({example: '12.50'})
    price: number;

    @IsNumber()
    @IsOptional()
    @ApiProperty({example: '1'})
    categoryID: number;

    @IsNumber()
    @IsOptional()
    @ApiProperty({example: '5'})
    amount: number;

    @IsBoolean()
    @IsOptional()
    @ApiProperty({example: 'true'})
    active: boolean;
}