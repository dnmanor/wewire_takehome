import {
  Controller,
  Post,
  Body,
  Res,
  HttpCode,
  UseGuards,
  Get,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  private readonly ONE_DAY = 24 * 60 * 60 * 1000;

  @Post('login')
  @HttpCode(200)
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.login(loginDto, response);
  }

  // private setCookie(response: Response, token: string) {
  //   response.cookie('kanijiru', token, {
  //     httpOnly: false,
  //     // secure: process.env.NODE_ENV === 'production',
  //     secure: false,
  //     sameSite: 'lax',
  //     // maxAge: this.ONE_DAY,
  //   });
  // }
}