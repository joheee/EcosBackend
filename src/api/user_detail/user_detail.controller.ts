import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserDetailService } from './user_detail.service';
import { CreateUserDetailDto } from './dto/create-user_detail.dto';
import { UpdateUserDetailDto } from './dto/update-user_detail.dto';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('user detail')
@Controller('user-detail')
export class UserDetailController {
  constructor(private readonly userDetailService: UserDetailService) {}

  @Get(':email')
  @ApiOperation({ summary: 'get user detail by email' })
  async findOne(@Param('email') email: string) {
    return await this.userDetailService.findOne(email);
  }

  @Post(':email')
  @ApiOperation({ summary: 'create user detail by email' })
  create(@Body() createUserDetailDto: CreateUserDetailDto) {
    return this.userDetailService.create(createUserDetailDto);
  }

  @Patch(':email')
  @ApiOperation({ summary: 'update user detail by email' })
  update(
    @Param('email') email: string,
    @Body() updateUserDetailDto: UpdateUserDetailDto,
  ) {
    return this.userDetailService.update(email, updateUserDetailDto);
  }
}
