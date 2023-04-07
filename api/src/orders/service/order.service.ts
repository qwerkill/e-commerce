import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryBuilder, Repository } from 'typeorm';
import { OrderCreateDTO, OrderUpdateDTO } from '../dto/order.dto';
import { OrderEntity } from '../entity/order.entity';


Injectable();
export class OrderService {
  constructor(
    // on "injecte" le repository de l'entité Order
    // dans la propriété orderRepository de la classe OrderService
    // pour pouvoir ensuite utiliser les méthodes du repository
    // dans les méthodes de notre service
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
  ) {}

  async getAllOrders() {
    return await this.orderRepository.createQueryBuilder('order')
    .leftJoinAndSelect('order.user_id', 'user')
    .leftJoinAndSelect('order.orderItems', 'order_item')
    .leftJoinAndSelect('order_item.product_id', 'product')
    .getMany();
  }

  async createOrder(data: OrderCreateDTO) {
    try {
      return this.orderRepository.save(data);
    } catch (error) {
      console.log(error);
      throw new Error('Error while creating order');
    }
  }
  
  async getOneOrderById(id: number) {
    return await this.orderRepository.createQueryBuilder('order')
    .leftJoinAndSelect('order.user_id', 'user')
    .leftJoinAndSelect('order.orderItems', 'order_item')
    .leftJoinAndSelect('order_item.product_id', 'product')
    .where('order.id = :id', { id })
    .getOne();
  }

  async updateOrder(id: number, data: OrderUpdateDTO) {
    const order = await this.orderRepository.findOneBy({ id });
    const orderUpdate = { ...order, ...data };
    await this.orderRepository.save(orderUpdate);

    return orderUpdate;
  }



  async deleteOrder(id: number) {
    return await this.orderRepository.delete(id);
  }
}
