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

  async findOne(options: {
    id?: number;
    email?: string;
  }): Promise<User | undefined> {
    if (options.id) {
      return this.userRepository.findOne({ where: { id: options.id } });
    } else if (options.email) {
      return this.userRepository.findOne({ where: { email: options.email } });
    }
    return undefined;
  }

  async find(options) {
    return this.userRepository.find(options);
  }

  async update(id: number, options) {
    return this.userRepository.update(id, options);
  }
}
