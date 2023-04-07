import { IsEnum, IsInt, IsOptional, isString, IsString } from "class-validator";
import { OrderItemCreateDTO, OrderItemUpdateDTO } from "src/orders_item/dto/order_item.dto";
import { UserCreateDTO, UserUpdateDTO } from "src/users/dto/user.dto";
import { UserEntity } from "src/users/entity/user.entity";


export class OrderCreateDTO{
    @IsEnum(["pending", "completed"])
    status: "pending" | "completed";
    @IsInt()
    amount: number;
    @IsOptional()
    user_id: UserEntity;
    @IsOptional()
    orderItems: OrderItemCreateDTO[];
}

export class OrderUpdateDTO{
    @IsOptional()
    @IsString()
    id: number;
    @IsOptional()
    @IsEnum(["pending", "completed"])
    status: "pending" | "completed";;
    @IsOptional()
    user_id: UserEntity;
    @IsOptional()
    @IsInt()
    amount: number;
    @IsOptional()
    orderItems: OrderItemUpdateDTO[];
}