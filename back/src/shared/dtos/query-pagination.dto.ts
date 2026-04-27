import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsOptional, IsString, Min } from "class-validator";

export class QueryPaginationDTO {

    @ApiPropertyOptional({example: 1})
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page?: number = 1;

    @ApiPropertyOptional({example: 10})
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    limit?: number = 10;

    @ApiPropertyOptional({example: 'id'})
    @IsOptional()
    @IsString()
    propertyOrderBy?: string = 'id';

    @ApiPropertyOptional({example: 'asc'})
    @IsOptional()
    @IsString()
    order?: 'asc' | 'desc' = 'asc';
}