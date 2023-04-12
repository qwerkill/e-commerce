import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Public } from 'src/auth/decorator/public.decorator';

import { OrderCreateDTO, OrderUpdateDTO } from '../dto/order.dto';
import {OrderService } from '../service/order.service';

// @Controller('orders')
// est un décorateur qui permet de déclarer un controller
// donc une classe qui va contenir des routes (url accessible)
@Controller('orders')
export class OrderController {
  // injection de dépendance
  // permet d'instancier la classe OrderService
  // dans la propriété orderService
  constructor(private readonly orderService: OrderService) {}

  // @Get() est un décorateur qui permet de déclarer
  // une route accessible avec la méthode GET
  
  
@Get()
  getAllOrders() {
    return this.orderService.getAllOrders();
  }

  // on peut passer en parametre du décorateur
  // un segment d'url avec éventuellement des paramètres
  // on peut ensuite récupérer sa valeur avec le décorateur @Param
  @Get(':id')
  getOneOrderById(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.getOneOrderById(id);
  }

  @Post()
  // on utilise le décorateur @Body pour récupérer
  // les données du body de la requête
  // on valide les données du body de la requête
  // avec un DTO (Data Transfer Object)
  createOrder(@Body() data: OrderCreateDTO) {
    return this.orderService.createOrder(data);
  }

  @Put(':id')
  updateOrder(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: OrderUpdateDTO,
  ) {
    return this.orderService.updateOrder(id, data);
  }

  @Public()
  @Get('user/:id')
  getOrderByUserID(id: number) {
    return this.orderService.GetOrderByUserID(id);
  }



  @Delete(':id')
  deleteOrder(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.deleteOrder(id);
  }
}
