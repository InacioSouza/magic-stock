import type { Category } from "./Category";

export class Product {
    id!: number;
    name!: string;
    description!: string;
    price!: number;
    amount!: number;
    active!: boolean;
    category!: Category;
    categoryID!: number;
    enterpriseID!: number;
}