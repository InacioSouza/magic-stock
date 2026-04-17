import { RequestPaginationDTO } from './../dtos/request-pagination.dto';
import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { ResponsePaginationDTO } from "../dtos/response-pagination.dto";

@Injectable()
export class CustomPaginationService {

    constructor( private prismaService: PrismaService) {}

    async pagination ({
        model,
        propertyOrderBy,
        orderBy,
        page = 1,
        limit = 10 }: RequestPaginationDTO ): Promise<ResponsePaginationDTO> {

            const safePage = Math.max(page, 1);
            const safeLimit = Math.max(limit, 1);

            const skip = (safePage -1) * safeLimit;

            const [data, total] = await Promise.all([
                this.prismaService[model].findMany({
                    skip,
                    take: safeLimit,
                    orderBy: {
                        [propertyOrderBy]: orderBy
                    },
                }),
                this.prismaService[model].count(),
            ]);

            const responsePaginationDTO: ResponsePaginationDTO = new ResponsePaginationDTO();
            responsePaginationDTO.data = data;
            responsePaginationDTO.meta.total = total;
            responsePaginationDTO.meta.page = safePage;
            responsePaginationDTO.meta.lastPage = Math.ceil(total / safeLimit);

            return responsePaginationDTO;
    }

}
