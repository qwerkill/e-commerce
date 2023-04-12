import { Orders } from "./orders.type";

export interface User {
    id: number;
    username: string;
    password: string;
    email: string;
    adress: string;
    role:'user' | 'admin' ;
    orders: Orders[];
}
