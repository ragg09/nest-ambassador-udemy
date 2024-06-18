import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async save(options) {
    return this.userRepository.save(options);
  }

  async findOne(options: { email: string }): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email: options.email } });
  }
}
