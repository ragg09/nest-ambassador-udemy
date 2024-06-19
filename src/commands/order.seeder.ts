import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';

import { OrderService } from '../order/order.service';
import { OrderItemService } from '../order/order-item.service';
import { randomInt } from 'crypto';
(async () => {
  const app = await NestFactory.createApplicationContext(AppModule);

  const orderService = app.get(OrderService);
  const orderItemService = app.get(OrderItemService);

  for (let i = 0; i < 30; i++) {
    const order = await orderService.save({
      user_id: randomInt(1, 31),
      code: `code-${i}-${randomInt(0, 1000)}`,
      ambassador_email: `email${i}@order.com`,
      first_name: `First${i}`,
      last_name: `Last${i}`,
      email: `email${i}@order.com`,
      complete: true,
    });

    for (let j = 0; j < randomInt(1, 5); j++) {
      await orderItemService.save({
        order,
        product_title: `product title ${j}`,
        price: randomInt(10, 100),
        quantity: randomInt(1, 5),
        admin_revenue: randomInt(10, 100),
        ambassador_revenue: randomInt(1, 10),
      });
    }
  }

  process.exit();
})();
