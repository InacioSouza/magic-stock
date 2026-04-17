import { Body, Controller, Param, Patch, Post, Req } from '@nestjs/common';
import { MovementService } from './movement.service';
import { CreateMovementDTO } from './dto/create-movement.dto';
import { Movement } from '@prisma/client';
import { Request } from 'express';

@Controller('movement')
export class MovementController {

    constructor(private movementService: MovementService) {}

    @Post()
    async create(@Req() req: Request, @Body() body: CreateMovementDTO): Promise<Movement> {
        const enterpriseID: number = req['payload_token']['enterpriseID'];
        return await this.movementService.create(body, enterpriseID);
    }

}
