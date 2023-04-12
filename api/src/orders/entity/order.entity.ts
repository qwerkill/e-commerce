import { OrderItemEntity } from 'src/orders_item/entity/order_item.entity';
import { UserEntity } from 'src/users/entity/user.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('order')
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ enum: ['pending', 'completed'] } )
  status: 'pending' | 'completed';

  @Column({ type: 'integer', nullable: true })
  amount: number;

  @ManyToOne(() => UserEntity, (user) => user.orders,{
    cascade:["insert", "update"]
  } )
  user_id: UserEntity;

  @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.order_id, {
    cascade: ["insert", "update"]
    })
  orderItems?: OrderItemEntity[];
}
