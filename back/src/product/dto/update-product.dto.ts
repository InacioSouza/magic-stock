import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateProductDTO {

    @IsString()
    @IsOptional()
    name: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsNumber()
    @IsOptional()
    price: number;

    @IsNumber()
    @IsOptional()
    categoryID: number;

    @IsBoolean()
    @IsOptional()
    active: boolean;
}