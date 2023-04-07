import { OrderItems } from "./orderItems.type";
import { User } from "./user.type";

export interface Orders {
    id: number;
    user_id: User;
    status: 'pending' | 'completed';
    orderItems : OrderItems[];
    amount: number;
}