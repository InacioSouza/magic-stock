import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class FindProductsByPropertiesDTO {

    @IsString()
    @IsOptional()
    @ApiProperty({ example: 'Vassoura de palha' })
    public name?: string;

    @IsString()
    @IsOptional()

    @ApiProperty({ example: 'Usada para limpeza' })
    public description?: string;

    @IsNumber()
    @IsOptional()
    @ApiProperty({ example: '12.50' })
    public price?: number;

    @IsNumber()
    @IsOptional()
    @ApiProperty({ example: '5' })
    public amount?: number;

    @IsBoolean()
    @IsOptional()
    @ApiProperty({ example: 'true' })
    public active?: boolean;

    @IsNumber()
    @IsOptional()
    @ApiProperty({ example: '1' })
    public category?: number;
    
}