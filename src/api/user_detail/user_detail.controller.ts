import { Controller, Get, Body, Patch, UseGuards, Req } from '@nestjs/common';
import { UserDetailService } from './user_detail.service';
import { UpdateUserDetailDto } from './dto/update-user_detail.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { Request } from 'express';
import { Role, User } from '@prisma/client';

@ApiTags('user detail (token required)')
@Controller('user-detail')
@ApiBearerAuth('access-token')
export class UserDetailController {
  constructor(private readonly userDetailService: UserDetailService) {}

  @Get('')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'get user detail by email' })
  async findOne(@Req() req: Request) {
    return await this.userDetailService.findOne(req.user as User);
  }

  @Patch('')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'update user detail by email' })
  @ApiBody({
    description: 'endpoint for customer, driver, and admin login',
    type: UpdateUserDetailDto,
    examples: {
      sample_input: {
        summary: 'sample input',
        description: 'Example payload for update user detail',
        value: {
          role: Role.CUSTOMER,
          profile_image: 'images.webp',
          phone: '1234',
          name: 'dummy user 1',
          street: 'kh syahdan',
          grade: 5,
          is_phone_verified: true,
          is_email_verified: true,
        },
      },
    },
  })
  async update(
    @Req() req: Request,
    @Body() updateUserDetailDto: UpdateUserDetailDto,
  ) {
    return await this.userDetailService.update(
      req.user as User,
      updateUserDetailDto,
    );
  }
}
