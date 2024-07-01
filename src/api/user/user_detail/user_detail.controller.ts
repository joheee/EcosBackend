import {
  Controller,
  Get,
  Body,
  Patch,
  UseGuards,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { UserDetailService } from './user_detail.service';
import { UserDetailDto } from './dto/user_detail.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { User } from '@prisma/client';
import { JwtAuthGuard } from 'src/api/auth/guards/jwt.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('user detail (token required)')
@Controller('user-detail')
@ApiBearerAuth('access-token')
export class UserDetailController {
  constructor(private readonly userDetailService: UserDetailService) {}

  @Get('')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'get user detail by token' })
  async findOne(@Req() req: Request) {
    return await this.userDetailService.findOne(req.user as User);
  }

  @Patch('')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('profile_image'))
  @ApiOperation({ summary: 'update user detail by token (optional field)' })
  @ApiBody({
    description: 'endpoint for customer, driver, and admin detail information',
    type: UserDetailDto,
  })
  async update(@Req() req: Request, @Body() userDetailDto: UserDetailDto) {
    return await this.userDetailService.update(req.user as User, userDetailDto);
  }
}
