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

    @IsNumber()
    amount: number;

    @IsBoolean()
    active: boolean;
}