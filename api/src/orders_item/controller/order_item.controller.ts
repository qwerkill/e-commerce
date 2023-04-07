import { Controller, Get, Post, Body, Param, Delete, Put,ParseIntPipe } from '@nestjs/common';
import { OrderItemService } from '../service/order_item.service';

@Controller('orders_item')
export class OrderItemController {

    constructor(private readonly orderItemService: OrderItemService) {}

    @Get()
    getAllOrderItems() {
        return this.orderItemService.getAllOrderItems();
    }

    @Get(':id')
    getOneOrderItemById(@Param('id', ParseIntPipe) id: number) {
        return this.orderItemService.getOneOrderItemById(id);
    }

    @Post()
    createOrderItem(@Body() data: any) {
        return this.orderItemService.createOrderItem(data);
    }

    @Put(':id')
    updateOrderItem(
        @Param('id', ParseIntPipe) id: number,
        @Body() data: any,
    ) {
        return this.orderItemService.updateOrderItem(id, data);
    }

    @Delete(':id')
    deleteOrderItem(@Param('id',ParseIntPipe) id: number) {
        return this.orderItemService.deleteOrderItem(id);
    }

} 