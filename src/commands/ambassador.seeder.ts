import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
(async () => {
  const app = await NestFactory.createApplicationContext(AppModule);

  const userService = app.get(UsersService);

  const password = await bcrypt.hash('password', 12);

  for (let i = 0; i < 30; i++) {
    await userService.save({
      first_name: `First${i}`,
      last_name: `Last${i}`,
      email: `email${i}@exaple.com`,
      password,
      is_ambassador: true,
    });
  }

  process.exit();
})();
