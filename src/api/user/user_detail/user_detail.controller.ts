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
import { ParseUserDetailPipe } from './pipe/ParseUserDetailPipe';
import { UserDetailUpload } from './upload/user_detail_upload';

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
  @ApiOperation({ summary: 'update user detail by token (optional field)' })
  @UseInterceptors(
    FileInterceptor('profile_image', {
      storage: UserDetailUpload.storageOptions,
    }),
  )
  @ApiConsumes('multipart/form-data')
  @UsePipes(new ParseUserDetailPipe())
  @ApiBody({
    description: 'endpoint for customer, driver, and admin detail information',
    required: true,
    schema: {
      type: 'object',
      properties: {
        profile_image: {
          type: 'string',
          format: 'binary',
        },
        name: { type: 'string', example: 'John Doe' },
        phone: { type: 'string', example: '1234567890' },
        role: {
          type: 'string',
          enum: ['DEFAULT', 'ADMIN', 'DRIVER', 'CUSTOMER'],
          example: 'CUSTOMER',
        },
        street: { type: 'string', example: 'Main Street' },
        grade: { type: 'number', example: 5 },
        is_email_verified: { type: 'boolean', example: true },
        is_phone_verified: { type: 'boolean', example: true },
      },
    },
  })
  async update(
    @Req() req: Request,
    @UploadedFile() profile_image: Express.Multer.File,
    @Body() userDetailDto: UserDetailDto,
  ) {
    if (profile_image !== undefined) {
      userDetailDto.profile_image = profile_image.filename;
    }
    console.log(userDetailDto);
    return await this.userDetailService.update(req.user as User, userDetailDto);
  }
}
