import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(loginAuthDto: LoginAuthDto) {
    const { email, password } = loginAuthDto;
    console.log(email, password);

    if (email === undefined || password === undefined) {
      throw new UnauthorizedException('invalid credentials!');
    }

    const loggedUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!loggedUser) {
      throw new UnauthorizedException('invalid credentials!');
    }

    const verifyPass = await bcrypt.compare(password, loggedUser.password);
    if (!verifyPass) {
      throw new UnauthorizedException('invalid credentials!');
    }

    const payload = {
      email,
      role: loggedUser.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(registerAuthDto: RegisterAuthDto) {
    const { email, password, role } = registerAuthDto;
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role,
      },
    });

    const payload = {
      email,
      role: role,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
