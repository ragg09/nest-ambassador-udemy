import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [UsersModule, SharedModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
