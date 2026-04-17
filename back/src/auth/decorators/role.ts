import { SetMetadata } from "@nestjs/common";
import { UserRole } from "src/users/entities/user-role.entity";

export const USER_ROLES = 'user_roles';
export const Roles = (...roles: UserRole[]) => SetMetadata( USER_ROLES, roles );