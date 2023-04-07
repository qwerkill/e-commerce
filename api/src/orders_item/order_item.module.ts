import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItemController } from './controller/order_item.controller';
import { OrderItemEntity } from './entity/order_item.entity';
import { OrderItemService } from './service/order_item.service';

@Module({
    imports: [TypeOrmModule.forFeature([OrderItemEntity])],
    controllers:[OrderItemController],
    providers: [OrderItemService],
})
export class OrderItemModule {}