import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDetailDto } from './dto/create-user_detail.dto';
import { UpdateUserDetailDto } from './dto/update-user_detail.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserDetailService {
  constructor(private prisma: PrismaService) {}

  async findOne(email: string) {
    const userDetail = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
      include: {
        user_detail: true,
      },
    });

    if (!userDetail) throw new NotFoundException('user is not found!');

    return userDetail;
  }

  create(createUserDetailDto: CreateUserDetailDto) {
    return 'This action adds a new userDetail';
  }

  update(email: string, updateUserDetailDto: UpdateUserDetailDto) {
    return `This action updates a #${email} userDetail`;
  }
}
