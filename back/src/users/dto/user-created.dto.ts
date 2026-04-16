import { UserRole } from "../entities/user-role.entity";

export class UserCreatedDTO {
    name: string;
    email: string;
    role: UserRole;
}