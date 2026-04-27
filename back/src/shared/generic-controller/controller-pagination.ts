import { Get, Query } from "@nestjs/common";
import { RequestPaginationDTO } from "../dtos/request-pagination.dto";
import { QueryPaginationDTO } from "../dtos/query-pagination.dto";
import { ResponsePaginationDTO } from "../dtos/response-pagination.dto";
import { CustomPaginationService } from "../services/custom-pagination.service";
import { Roles } from "src/auth/decorators/role";
import { UserRole } from "src/users/entities/user-role.entity";

export abstract class ControllerPagination {

    constructor(
        private customPagination: CustomPaginationService,
        private model: string,
    ) { }

    @Roles(UserRole.ADMIN, UserRole.OPERATOR, UserRole.READER)
    @Get("registers/all")
    async findAll(@Query() query: QueryPaginationDTO): Promise<ResponsePaginationDTO> {

        const dto = new RequestPaginationDTO();
        dto.model = this.model;
        dto.propertyOrderBy = query.propertyOrderBy ?? 'id';
        dto.orderBy = query.order ?? 'asc';
        dto.page = query.page
        dto.limit = query.limit;

        return await this.customPagination.pagination(dto);
    }
}
