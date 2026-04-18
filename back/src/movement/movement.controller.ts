import { CustomPaginationService } from './../shared/services/custom-pagination.service';
import { Body, Controller, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { MovementService } from './movement.service';
import { CreateMovementDTO } from './dto/create-movement.dto';
import { Movement } from '@prisma/client';
import { Request } from 'express';
import { ControllerPagination } from 'src/shared/generic-controller/controller-pagination';
import { UserRole } from 'src/users/entities/user-role.entity';
import { Roles } from 'src/auth/decorators/role';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('movement')
@ApiTags('Movement')
@ApiBearerAuth('access-token')
export class MovementController extends ControllerPagination {

    constructor(
        private movementService: MovementService,
        customPagination: CustomPaginationService) {
        super(customPagination, 'movement');
    }

    @Get(':id')
    async findById(@Param('id') id: number) {
        return await this.movementService.findById(id);
    }

    @Roles(UserRole.OPERATOR)
    @Post()
    async create(@Req() req: Request, @Body() body: CreateMovementDTO): Promise<Movement> {
        const enterpriseID: number = req['payload_token']['enterpriseID'];
        return await this.movementService.create(req['userEmail'], body, enterpriseID);
    }

}
