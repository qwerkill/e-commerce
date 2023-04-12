import { OrderEntity } from "src/orders/entity/order.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    username: string;

    @Column({ type: 'varchar' })
    password: string;

    @Column({ type: 'varchar' })
    email: string;

    @Column({ type: 'varchar' })
    adress: string;

    @Column({type : 'enum' , enum : ['user', 'admin'] ,nullable : true })
    role:'user' | 'admin' = 'user';

    @OneToMany(() => OrderEntity, (order) => order.user_id)
    orders: OrderEntity[];
}