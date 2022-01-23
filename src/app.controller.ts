import {
  Controller,
  Request,
  Post,
  Get,
  UseGuards,
  Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { CreateUserDto } from './user/dto/create-user.dto';
import { UserExistGuard } from './user/user.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('auth/sign')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(UserExistGuard)
  @Post('auth/register')
  register(@Body() userDto: CreateUserDto) {
    return this.authService.register(userDto);
  }
}
