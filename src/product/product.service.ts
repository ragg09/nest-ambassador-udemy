import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product';
import { Repository } from 'typeorm';
// import { AbstracService } from 'src/shared/abstract.service';

import { AbstracService } from '../shared/abstract.service';

@Injectable()
export class ProductService extends AbstracService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {
    super(productRepository);
  }
}
