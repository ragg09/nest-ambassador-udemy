import { Injectable } from '@nestjs/common';
import { AbstracService } from '../shared/abstract.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderItem } from './entities/order-item';

@Injectable()
export class OrderItemService extends AbstracService {
  constructor(
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
  ) {
    super(orderItemRepository);
  }
}
