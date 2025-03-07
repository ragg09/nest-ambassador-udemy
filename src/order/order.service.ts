import { Injectable } from '@nestjs/common';
import { AbstracService } from '../shared/abstract.service';
import { Order } from './entities/order';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService extends AbstracService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {
    super(orderRepository);
  }
}
