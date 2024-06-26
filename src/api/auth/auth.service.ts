import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
  InternalServerErrorException,
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
    try {
      const { email, password } = loginAuthDto;

      if (typeof email === 'undefined' || typeof password === 'undefined') {
        throw new BadRequestException(
          'All fields must be provided! [email, password]',
        );
      }

      const loggedUser = await this.prisma.user.findUnique({
        where: { email },
      });

      if (!loggedUser) {
        throw new UnauthorizedException('Invalid credentials!');
      }

      const verifyPass = await bcrypt.compare(password, loggedUser.password);
      if (!verifyPass) {
        throw new UnauthorizedException('Invalid credentials!');
      }

      const payload = {
        email,
        role: loggedUser.role,
      };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      if (
        error instanceof UnauthorizedException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new InternalServerErrorException(
        'An unexpected error occurred during login.',
      );
    }
  }

  async register(registerAuthDto: RegisterAuthDto) {
    try {
      const { email, password, phone, name, street, grade } = registerAuthDto;

      if (
        typeof email === 'undefined' ||
        typeof password === 'undefined' ||
        typeof phone === 'undefined' ||
        typeof name === 'undefined' ||
        typeof street === 'undefined' ||
        typeof grade === 'undefined'
      ) {
        throw new BadRequestException(
          'All fields must be provided [email, password, phone, name, street, grade]',
        );
      }

      const emailCheckUser = await this.prisma.user.findUnique({
        where: { email },
      });
      if (emailCheckUser) {
        throw new BadRequestException('Email already used!');
      }

      const phoneCheckUser = await this.prisma.userDetail.findUnique({
        where: { phone },
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

      const hashedPassword = await bcrypt.hash(password, 10);
      await this.prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          role: dummyData.role,
        },
      });

      await this.prisma.userDetail.create({
        data: {
          email,
          profile_image: 'dummy.png',
          phone,
          name,
          street,
          grade,
          is_email_verified: dummyData.is_email_verified,
          is_phone_verified: dummyData.is_phone_verified,
        },
      });

      const payload = {
        email,
        role: dummyData.role,
      };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'An unexpected error occurred during registration.',
      );
    }
  }
}
