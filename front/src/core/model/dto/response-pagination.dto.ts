import type { Product } from "../Product";

export class MetaPaginationType {
    total!: number;
    page!: number;
    lastPage!: number
}

export class ResponsePaginationDTO {
    data!: Product[];
    meta!: MetaPaginationType
}