import { UsersService } from './../users/users.service';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Movement } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMovementDTO } from './dto/create-movement.dto';
import { ProductService } from 'src/product/product.service';
import { EnterpriseService } from 'src/enterprise/enterprise.service';
import { MovementType } from './entities/movement-type';
import { UpdateProductDTO } from 'src/product/dto/update-product.dto';

@Injectable()
export class MovementService {

    constructor(
        private prismaService: PrismaService,
        private productService: ProductService,
        private usersService: UsersService,
        private enterpriseService: EnterpriseService
    ) { }

    async findById(id: number): Promise<Movement | undefined> {
        return await this.prismaService.movement.findUnique({
            where: { id },
        });
    }

    async movementExists(id: number): Promise<Movement> {
        const product = await this.findById(id);

        if (!product) {
            throw new NotFoundException(`Não existe movimentação para o id ${id}`);
        }

        return product;
    }

    async create(dto: CreateMovementDTO): Promise<Movement> {
        const product = await this.productService.productExists(dto.productID);
        await this.usersService.userExists(dto.userID);
        await this.enterpriseService.enterpriseExists(dto.enterpriseID);

        if (!dto.amount || dto.amount <= 0) {
            throw new BadRequestException(
                'Não é possível fazer uma movimentação com a quantidade menor ou igual a zero!'
            );
        }

        let newProductAmount: number = product.amount;

        if (dto.type === MovementType.EXIT) {
            newProductAmount = product.amount - dto.amount;

            if (newProductAmount < 0) {
                throw new BadRequestException(
                    'Para uma movimentação de saída a quantidade deve ser menor ou igual a quantidadade disponível do produto!'
                );
            }
        } else {
            newProductAmount = newProductAmount + dto.amount;
        }

        let movement: Movement;
        this.prismaService.$transaction(async (tx) => {

            const productDTO = new UpdateProductDTO();
            productDTO.amount = newProductAmount;

            await this.productService.update(dto.productID, productDTO, tx);

            movement = await tx.movement.create({
                data: {
                    ...dto
                }
            });

        });
        
        return movement;
    }
}
