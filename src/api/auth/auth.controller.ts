import { Controller, Post, Body, Patch } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RegisterAuthDto } from './dto/register-auth.dto';

@ApiTags('authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
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
  async login(@Body() loginAuthDto: LoginAuthDto) {
    return await this.authService.login(loginAuthDto);
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
