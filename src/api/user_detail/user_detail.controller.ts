import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserDetailService } from './user_detail.service';
import { CreateUserDetailDto } from './dto/create-user_detail.dto';
import { UpdateUserDetailDto } from './dto/update-user_detail.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { Request } from 'express';
import { User } from '@prisma/client';

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

  @Post(':email')
  @ApiOperation({ summary: 'create user detail by email' })
  @ApiParam({
    name: 'email',
    required: true,
    description: 'Email of the user',
    example: 'customer@gmail.com',
  })
  create(@Body() createUserDetailDto: CreateUserDetailDto) {
    return this.userDetailService.create(createUserDetailDto);
  }

  @Patch(':email')
  @ApiOperation({ summary: 'update user detail by email' })
  @ApiParam({
    name: 'email',
    required: true,
    description: 'Email of the user',
    example: 'customer@gmail.com',
  })
  update(
    @Param('email') email: string,
    @Body() updateUserDetailDto: UpdateUserDetailDto,
  ) {
    return this.userDetailService.update(email, updateUserDetailDto);
  }
}
