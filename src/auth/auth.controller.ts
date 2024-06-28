import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  NotFoundException,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
import { AuthGuard } from './auth.guard';
import { UsersService } from '../users/users.service';

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(
    private userService: UsersService,
    private JwtService: JwtService,
  ) {}

  @Post(['admin/register', 'ambassador/register'])
  async register(@Req() request: Request, @Body() body: RegisterDto) {
    const { password_confirm, ...data } = body;

    if (body.password !== body.password_confirm) {
      throw new BadRequestException('Password not match');
    }

    const hashed = await bcrypt.hash(body.password, 12);

    return this.userService.save({
      ...data,
      password: hashed,
      is_ambassador: request.path === '/api/ambassador/register',
    });
  }

  @Post(['admin/login', 'ambassador/login'])
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

  @UseGuards(AuthGuard)
  @Get(['admin/user', 'ambassador/user'])
  async user(@Req() request: Request) {
    const cookie = request.cookies['jwt'];

    const { id } = await this.JwtService.verifyAsync(cookie);

    const user = await this.userService.findOne({ id });

    return user;
  }

  @Post(['admin/logout', 'ambassador/logout'])
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');

    return {
      message: 'logout successfully',
    };
  }

  @UseGuards(AuthGuard)
  @Put(['admin/users/info', 'ambassador/users/info'])
  async updateInfo(
    @Req() request: Request,
    @Body('first_name') first_name: string,
    @Body('last_name') last_name: string,
    @Body('email') email: string,
  ) {
    const cookie = request.cookies['jwt'];

    const { id } = await this.JwtService.verifyAsync(cookie);

    await this.userService.update(id, { first_name, last_name, email });

    return this.userService.findOne({ id });
  }

  @UseGuards(AuthGuard)
  @Put(['admin/users/password', 'ambassador/users/password'])
  async updatePassword(
    @Req() request: Request,
    @Body('password') password: string,
    @Body('password_confirm') password_confirm: string,
  ) {
    const cookie = request.cookies['jwt'];

    if (password !== password_confirm) {
      throw new BadRequestException('Password not match');
    }

    const { id } = await this.JwtService.verifyAsync(cookie);

    await this.userService.update(id, {
      password: await bcrypt.hash(password, 12),
    });

    return this.userService.findOne({ id });
  }
}
