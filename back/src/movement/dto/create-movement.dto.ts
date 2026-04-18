import { IsEnum, IsNumber, IsString } from "class-validator";
import { MovementType } from "../entities/movement-type";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class CreateMovementDTO {

    @IsEnum(MovementType)
    @ApiProperty({ example: 'ENTRY' })
    type: MovementType;

    @IsNumber()
    @ApiProperty({ example: '5' })
    amount: number;

    @IsString()
    @ApiProperty({ example: 'Entrada de 5 garrafas de água sanitária' })
    description: string;

    @IsNumber()
    @ApiProperty({ example: '1' })
    productID: number;

}
