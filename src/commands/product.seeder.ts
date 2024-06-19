import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { ProductService } from '../product/product.service';
import { randomInt } from 'crypto';
(async () => {
  const app = await NestFactory.createApplicationContext(AppModule);

  const productService = app.get(ProductService);

  for (let i = 0; i < 30; i++) {
    await productService.save({
      title: `Product ${i}`,
      description: `New Product`,
      image: `https://c8.alamy.com/comp/KAT041/example-red-stamp-illustration-KAT041.jpg`,
      price: randomInt(10, 100),
    });
  }

  process.exit();
})();
