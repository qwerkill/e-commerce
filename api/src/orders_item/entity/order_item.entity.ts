import { OrderEntity } from "src/orders/entity/order.entity";
import { ProductEntity } from "src/products/enitity/product.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity("order_item")

export class OrderItemEntity {
    @PrimaryGeneratedColumn()
    id: number;

    // null = true
    @Column({ type: 'integer' })
    quantity: number;

    @ManyToOne(type => OrderEntity, order => order.orderItems, {
        cascade: ["insert", "update"]
    })
    order_id: OrderEntity;

    @ManyToOne(type => ProductEntity, product => product.orderItems,{
        cascade: ["insert", "update"]
    })
    product_id: ProductEntity;
    }