import { CategoryEntity } from 'src/category/entity/category.entity';
import { OrderItemEntity } from 'src/orders_item/entity/order_item.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';


@Entity('product')
export class ProductEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ type: 'varchar'})
    name: string;
    
    @Column({ type: 'varchar'})
    description: string;

    @Column({ type: 'integer'})
    price: number;
    
    @Column({ type: 'varchar'})
    img: string;

    @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.product_id)
    orderItems: OrderItemEntity[];

    @ManyToOne(() => CategoryEntity, (category) => category.products ,{
        cascade:["insert", "update"]
    })
    category_id: CategoryEntity;
    }
