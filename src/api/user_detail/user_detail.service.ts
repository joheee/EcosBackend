import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUserDetailDto } from './dto/update-user_detail.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserDetailService {
  constructor(private prisma: PrismaService) {}

  async findOne(user: User) {
    const userDetail = await this.prisma.user.findUnique({
      where: {
        email: user.email,
      },
      include: {
        user_detail: true,
      },
    });

    if (!userDetail)
      throw new NotFoundException(
        `user with email ${user.email} is not found!`,
      );

    return new HttpException(userDetail, HttpStatus.CREATED);
  }

  async update(user: User, updateUserDetailDto: UpdateUserDetailDto) {
    try {
      const emailCheck = await this.prisma.user.findUnique({
        where: {
          email: user.email,
        },
      });
      if (!emailCheck) {
        throw new NotFoundException(`email ${user.email} is not found!`);
      }

      const phoneCheck = await this.prisma.userDetail.findUnique({
        where: {
          phone: updateUserDetailDto.phone,
        },
      });
      if (phoneCheck) {
        throw new BadRequestException(
          `phone ${updateUserDetailDto.phone} is already used!`,
        );
      }

      const updateUser = await this.prisma.user.update({
        where: {
          email: user.email,
        },
        data: {
          role: updateUserDetailDto.role,
          user_detail: {
            update: {
              data: {
                profile_image: updateUserDetailDto.profile_image,
                phone: updateUserDetailDto.phone,
                name: updateUserDetailDto.name,
                street: updateUserDetailDto.street,
                grade: updateUserDetailDto.grade,
                is_email_verified: updateUserDetailDto.is_email_verified,
                is_phone_verified: updateUserDetailDto.is_phone_verified,
              },
            },
          },
        },
        include: {
          user_detail: true,
        },
      });

      return new HttpException(updateUser, HttpStatus.CREATED);
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      } else {
        throw new InternalServerErrorException('An unexpected error occurred');
      }
    }
  }
}
