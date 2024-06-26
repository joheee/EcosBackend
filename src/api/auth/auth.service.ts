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
import { Role } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(loginAuthDto: LoginAuthDto) {
    const { email, password } = loginAuthDto;

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
    const emailCheckUser = await this.prisma.user.findUnique({
      where: { email: registerAuthDto.email },
    });
    if (emailCheckUser) {
      throw new BadRequestException('Email already used!');
    }

    const phoneCheckUser = await this.prisma.userDetail.findUnique({
      where: { phone: registerAuthDto.phone },
    });
    if (phoneCheckUser) {
      throw new BadRequestException('Phone number already used!');
    }

    // DEFAULT DUMMY DATA
    const dummyData = {
      role: Role.DEFAULT,
      is_email_verified: false,
      is_phone_verified: false,
    };

    const hashedPassword = await bcrypt.hash(registerAuthDto.password, 10);
    await this.prisma.user.create({
      data: {
        email: registerAuthDto.email,
        password: hashedPassword,

        role: dummyData.role,
      },
    });

    await this.prisma.userDetail.create({
      data: {
        email: registerAuthDto.email,
        profile_image: 'dummy.png',
        phone: registerAuthDto.phone,
        name: registerAuthDto.name,
        street: registerAuthDto.street,
        grade: registerAuthDto.grade,

        is_email_verified: dummyData.is_email_verified,
        is_phone_verified: dummyData.is_phone_verified,
      },
    });

    const payload = {
      email: registerAuthDto.email,
      role: dummyData.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
