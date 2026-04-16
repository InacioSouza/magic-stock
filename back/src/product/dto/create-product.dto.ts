import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProductDTO {

    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsNumber()
    price: number;

    @IsNumber()
    categoryID: number;

    @IsBoolean()
    active: boolean;

    @IsNumber()
    enterpriseID: number;
}