import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Headers,
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

@ApiTags('user detail (token required)')
@Controller('user-detail')
@ApiBearerAuth()
export class UserDetailController {
  constructor(private readonly userDetailService: UserDetailService) {}

  @Get('')
  @ApiOperation({ summary: 'get user detail by email' })
  async findOne(@Headers('authorization') headers: string) {
    return await this.userDetailService.findOne(headers);
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
