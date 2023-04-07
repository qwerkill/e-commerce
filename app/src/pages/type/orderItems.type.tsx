import { Product } from './products.type';

export interface OrderItems {
    id: number;
    product_id: Product;
    quantity: number;
}