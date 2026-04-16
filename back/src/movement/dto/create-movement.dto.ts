import { IsDate, IsEnum, IsNumber, IsString } from "class-validator";
import { MovementType } from "../entities/movement-type";
import { Type } from "class-transformer";

export class CreateMovementDTO {

    @IsEnum(MovementType)
    type: MovementType;

    @IsNumber()
    amount: number;

    @IsDate()
    @Type(() => Date)
    cratedAt: Date;

    @IsString()
    description: string;

    @IsNumber()
    productID: number;

    @IsNumber()
    userID: number;

    @IsNumber()
    enterpriseID: number;
}