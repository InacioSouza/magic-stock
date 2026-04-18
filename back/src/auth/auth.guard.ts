import { JwtService } from '@nestjs/jwt';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './decorators/public';
import { Request } from 'express';
import { UserRole } from 'src/users/entities/user-role.entity';
import { USER_ROLES } from './decorators/role';

@Injectable()
export class AuthGuard implements CanActivate{

    constructor(
        private JwtService: JwtService,
        private reflector: Reflector
    ) { }


    async canActivate(context: ExecutionContext): Promise<boolean> {

        const isPublic: boolean = this.reflector.getAllAndOverride<boolean>(
            IS_PUBLIC_KEY,
            [
                context.getHandler(),
                context.getClass()
            ]
        );

        if (isPublic) return true;

        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);

        if (!token) {
            throw new UnauthorizedException('Informe um token!');
        }

        try {

            const payload = await this.JwtService.verifyAsync(token, {
                secret: process.env.SECRETKEY
            });

            const listRoles: UserRole[] = this.reflector.getAllAndOverride<UserRole[]>(
                USER_ROLES,
                [
                    context.getHandler(),
                    context.getClass()
                ]
            );

            const hasRole = listRoles?.filter(role => {
                return role.toString() === payload.userRole;
            });

            const isAdmin = payload.userRole.startsWith(UserRole.ADMIN.toString());

            // User ADMIN pode acessar qualquer rota
            if ((!hasRole || hasRole.length === 0) && !isAdmin) {
                throw new UnauthorizedException('Você não tem permissão para acessar o recurso!');
            }

            request['payload_token'] = payload;
        } catch(error){

            if (error instanceof UnauthorizedException) {
                throw error;
            }

            throw new UnauthorizedException('Token inválido ou expirado!');
        }

        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}