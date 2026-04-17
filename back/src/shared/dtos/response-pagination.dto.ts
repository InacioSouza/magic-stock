
export class MetaPaginationType {
    total: number;
    page: number;
    lastPage: number
}

export class ResponsePaginationDTO {

    constructor() {
        this.meta = new MetaPaginationType();
    }

    data: any[];
    meta: MetaPaginationType
}