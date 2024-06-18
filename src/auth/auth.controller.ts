import {
  BadRequestException,
  Body,
  Controller,
  NotFoundException,
  Post,
  Res,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Controller()
export class AuthController {
  constructor(
    private userService: UsersService,
    private JwtService: JwtService,
  ) {}

  @Post('admin/register')
  async register(@Body() body: RegisterDto) {
    const { password_confirm, ...data } = body;

    if (body.password !== body.password_confirm) {
      throw new BadRequestException('Password not match');
    }
    const hashed = await bcrypt.hash(body.password, 12);

    return this.userService.save({
      ...data,
      password: hashed,
      is_ambassador: false,
    });
  }

  @Post('admin/login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    if (!email || !password) {
      throw new BadRequestException('Email and password are required');
    }

    const user = await this.userService.findOne({ email });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Incorrect password');
    }

    const jwt = await this.JwtService.signAsync({ id: user.id });

    response.cookie('jwt', jwt, { httpOnly: true });

    return {
      message: 'Success',
    };
  }
}
