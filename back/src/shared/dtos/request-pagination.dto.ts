
export class RequestPaginationDTO {

    model: string;
    propertyOrderBy: string;
    orderBy: 'desc' | 'asc';
    page: number;
    limit: number;
}