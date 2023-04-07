import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from 'src/orders/entity/order.entity';
import { Repository } from 'typeorm';
import { OrderItemCreateDTO, OrderItemUpdateDTO } from '../dto/order_item.dto';
import { OrderItemEntity } from '../entity/order_item.entity';



Injectable();
export class OrderItemService {
  constructor(
    // on "injecte" le repository de l'entité OrderItem
    // dans la propriété orderitemRepository de la classe OrderItemService
    // pour pouvoir ensuite utiliser les méthodes du repository
    // dans les méthodes de notre service
    @InjectRepository(OrderItemEntity)
    private readonly orderitemRepository: Repository<OrderItemEntity>,
  ) {}

  async getAllOrderItems() {
    return await this.orderitemRepository.find({relations:['order_id','product_id']});
  }

  async createOrderItem(data: OrderItemCreateDTO) {
    try {
      return this.orderitemRepository.save(data);
    } catch (error) {
      console.log(error);
      throw new Error('Error while creating orderitem');
    }
  }
  async getOneOrderItemById(id: number) {
    return await this.orderitemRepository.findOne(
        {
            where: {id},
            relations: ['order_id','product_id']
        }
    );
  }

  async updateOrderItem(id: number, data: OrderItemUpdateDTO) {
    const orderitem = await this.orderitemRepository.createQueryBuilder('order_item')
      .leftJoinAndSelect('order_item.order_id', 'order')
      .leftJoinAndSelect('order_item.product_id', 'product')
      .where('order_item.id = :id', { id })
      .getOne();
  
    const oldAmount = orderitem.order_id.amount;
    const oldQuantity = orderitem.quantity;
    const oldPrice = orderitem.product_id.price;
    const newQuantity = data.quantity;
  
    const newAmount = oldAmount - oldQuantity * oldPrice + newQuantity * oldPrice;
  
    const orderUpdate = {
      amount: newAmount
    };
  
    const orderitemUpdate = { ...orderitem, ...data };
    const updatedOrderItem = await this.orderitemRepository.save(orderitemUpdate);
  
    await this.orderitemRepository
      .createQueryBuilder()
      .update(OrderEntity)
      .set(orderUpdate)
      .where('id = :id', { id: orderitem.order_id.id })
      .execute();
  
    return updatedOrderItem;
  }
  

  
  async deleteOrderItem(id: number) {
    return await this.orderitemRepository.delete(id);
  }
}


