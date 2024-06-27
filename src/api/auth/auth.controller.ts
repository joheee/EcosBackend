import { Controller, Post, Body, Patch, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { Request } from 'express';
import { LocalGuard } from '../auth/guards/local.guard';
import { LoginAuthDto } from './dto/login-auth.dto';

@ApiTags('authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @UseGuards(LocalGuard)
  @ApiOperation({ summary: 'login for all users' })
  @ApiBody({
    description: 'endpoint for customer, driver, and admin login',
    type: LoginAuthDto,
    examples: {
      example1: {
        summary: 'sample input',
        description: 'Example payload for login new user',
        value: {
          email: 'customer@gmail.com',
          password: 'customer123',
        },
      },
    },
  })
  async login(@Req() req: Request) {
    return req.user;
  }

  @Patch()
  @ApiOperation({ summary: 'register for customer, driver, and admin' })
  @ApiBody({
    description: 'endpoint for register new customer, driver, and admin',
    type: RegisterAuthDto,
    examples: {
      example1: {
        summary: 'sample input',
        description: 'Example payload for login new user',
        value: {
          email: 'customer@gmail.com',
          password: 'customer123',
          phone: '0852',
          name: 'first customer',
          street: 'string',
          grade: 5,
        },
      },
    },
  })
  customer(@Body() registerAuthDto: RegisterAuthDto) {
    return this.authService.register(registerAuthDto);
  }
}
