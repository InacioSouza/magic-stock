import { CustomPaginationService } from './../shared/services/custom-pagination.service';
import { Body, Controller, Param, Patch, Post, Req } from '@nestjs/common';
import { MovementService } from './movement.service';
import { CreateMovementDTO } from './dto/create-movement.dto';
import { Movement } from '@prisma/client';
import { Request } from 'express';
import { ControllerPagination } from 'src/shared/generic-controller/controller-pagination';

@Controller('movement')
export class MovementController extends ControllerPagination {

    constructor(
        private movementService: MovementService,
        customPagination: CustomPaginationService) {
        super(customPagination, 'movement');
    }

    @Post()
    async create(@Req() req: Request, @Body() body: CreateMovementDTO): Promise<Movement> {
        const enterpriseID: number = req['payload_token']['enterpriseID'];
        return await this.movementService.create(body, enterpriseID);
    }

}
