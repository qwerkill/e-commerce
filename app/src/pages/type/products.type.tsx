import { Category } from "./categories.type";

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    img: string;
    category_id : Category
  }