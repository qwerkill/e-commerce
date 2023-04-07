import { ProductEntity } from "src/products/enitity/product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity('category')
export class CategoryEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    title: string;

    @Column({ type: 'varchar' })
    description: string;

    @OneToMany(() => ProductEntity, (product) => product.category_id)
    products?: ProductEntity[];
    }