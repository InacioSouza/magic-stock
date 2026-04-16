import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { MovementService } from './movement.service';
import { CreateMovementDTO } from './dto/create-movement.dto';
import { Movement } from '@prisma/client';

@Controller('movement')
export class MovementController {

    constructor(private movementService: MovementService) {}

    @Post()
    async create(@Body() body: CreateMovementDTO): Promise<Movement> {
        return await this.movementService.create(body);
    }

}
