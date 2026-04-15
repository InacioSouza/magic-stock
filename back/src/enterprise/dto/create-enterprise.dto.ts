import { Type } from "class-transformer";
import { IsObject, IsString, ValidateNested } from "class-validator";
import { CreateUserDTO } from "src/users/dto/create-user.dto";

export class CreateEnterpriseDTO {

    @IsString()
    name: string;

    @ValidateNested()
    @Type(() => CreateUserDTO)
    user: CreateUserDTO;
}