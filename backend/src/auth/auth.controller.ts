import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth') // base route = /auth
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register') // POST /auth/register
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login') // POST /auth/login
  @HttpCode(HttpStatus.OK) // override default 201 → 200
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}