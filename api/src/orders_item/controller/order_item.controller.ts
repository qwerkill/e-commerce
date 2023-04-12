import { Controller, Get, Post, Body, Param, Delete, Put,ParseIntPipe } from '@nestjs/common';
import { Public } from 'src/auth/decorator/public.decorator';
import { OrderItemService } from '../service/order_item.service';

@Controller('orders_item')
export class OrderItemController {

    constructor(private readonly orderItemService: OrderItemService) {}

    @Public()
    @Get()
    getAllOrderItems() {
        return this.orderItemService.getAllOrderItems();
    }

    @Public()
    @Get(':id')
    getOneOrderItemById(@Param('id', ParseIntPipe) id: number) {
        return this.orderItemService.getOneOrderItemById(id);
    }

    @Public()
    @Post()
    createOrderItem(@Body() data: any) {
        return this.orderItemService.createOrderItem(data);
    }

    @Public()
    @Put(':id')
    updateOrderItem(
        @Param('id', ParseIntPipe) id: number,
        @Body() data: any,
    ) {
        return this.orderItemService.updateOrderItem(id, data);
    }

    @Public()
    @Delete(':id')
    deleteOrderItem(@Param('id',ParseIntPipe) id: number) {
        return this.orderItemService.deleteOrderItem(id);
    }

} 