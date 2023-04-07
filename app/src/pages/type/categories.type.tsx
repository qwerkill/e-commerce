import { Product } from "./products.type";

export interface Category {
    id: number;
    title: string;
    description: string;
    products: Product[];
  }