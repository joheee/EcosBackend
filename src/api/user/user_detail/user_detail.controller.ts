import {
  Controller,
  Get,
  Body,
  Patch,
  UseGuards,
  Req,
  UseInterceptors,
  UploadedFile,
  UsePipes,
} from '@nestjs/common';
import { UserDetailService } from './user_detail.service';
import { UserDetailDto } from './dto/user_detail.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { User } from '@prisma/client';
import { JwtAuthGuard } from 'src/api/auth/guards/jwt.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { ParseUserDetailPipe } from './pipe/parse_user_detail.pipe';
import { UserDetailUpload } from './upload/user_detail.upload';

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
  @ApiConsumes('multipart/form-data')
  @UsePipes(new ParseUserDetailPipe())
  @UseInterceptors(
    FileInterceptor('profile_image_file', {
      storage: UserDetailUpload.storageOptions,
    }),
  )
  @ApiOperation({ summary: 'update user detail by token (optional field)' })
  @ApiBody({
    description: 'endpoint for customer, driver, and admin detail information',
    type: UserDetailDto,
  })
  async update(
    @Req() req: Request,
    @UploadedFile() profile_image_file: Express.Multer.File,
    @Body() userDetailDto: UserDetailDto,
  ) {
    if (profile_image_file !== undefined) {
      userDetailDto.profile_image = profile_image_file.filename;
    }
    return await this.userDetailService.update(req.user as User, userDetailDto);
  }
}
