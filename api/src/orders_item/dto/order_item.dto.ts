import { IsInt, IsOptional, IsString } from "class-validator";
import { OrderCreateDTO, OrderUpdateDTO } from "src/orders/dto/order.dto";
import { ProductCreateDTO, ProductUpdateDTO } from "src/products/dto/product.dto";
import { ProductEntity } from "src/products/enitity/product.entity";

export class OrderItemCreateDTO{
    @IsOptional()
    order_id: OrderCreateDTO;
    @IsOptional()
    product_id: ProductEntity;
    @IsInt()
    quantity: number;
}

export class OrderItemUpdateDTO{
    @IsOptional()
    @IsString()
    order_id: OrderUpdateDTO;
    @IsOptional()
    product_id: ProductEntity;
    @IsInt()
    @IsOptional()
    quantity: number;
}