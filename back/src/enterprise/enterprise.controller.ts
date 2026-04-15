import { Body, Controller, Post } from '@nestjs/common';
import { Public } from 'src/auth/decorators/public';
import { CreateEnterpriseDTO } from './dto/create-enterprise.dto';
import { EnterpriseService } from './enterprise.service';

@Controller('enterprise')
export class EnterpriseController {

    constructor (
        private enterpriseService: EnterpriseService
    ) {}

    @Public()
    @Post()
    async create(@Body() body: CreateEnterpriseDTO) {
        return this.enterpriseService.create(body);
    }
}
