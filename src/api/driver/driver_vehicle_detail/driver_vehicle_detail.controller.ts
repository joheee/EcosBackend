import {
  Body,
  Controller,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { DriverVehicleDetailService } from './driver_vehicle_detail.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/api/auth/guards/jwt.guard';
import { Request } from 'express';
import { DriverVehicleDetailDto } from './dto/driver_vehicle_detail.dto';
import { User } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';
import { DriverVehicleDetailUpload } from './upload/driver_vehicle_detail.upload';
import { ParseDriverDetailPipe } from './pipe/parse_driver_detail.pipe';

@ApiTags('driver detail (token required)')
@Controller('driver-vehicle-detail')
@ApiBearerAuth('access-token')
export class DriverVehicleDetailController {
  constructor(
    private readonly driverVehicleDetailService: DriverVehicleDetailService,
  ) {}

  @Post('')
  @UseGuards(JwtAuthGuard)
  @ApiConsumes('multipart/form-data')
  @UsePipes(new ParseDriverDetailPipe())
  @UseInterceptors(
    FileInterceptor('vehicle_image_file', {
      storage: DriverVehicleDetailUpload.storageOptions,
    }),
  )
  @ApiOperation({
    summary:
      "create or update driver's vehicle detail by email (optional field)",
  })
  @ApiBody({
    description: 'intended for driver only',
    type: DriverVehicleDetailDto,
  })
  async create(
    @Req() req: Request,
    @UploadedFile() vehicle_image_file: Express.Multer.File,
    @Body() driverVehicleDetailDto: DriverVehicleDetailDto,
  ) {
    return await this.driverVehicleDetailService.create(
      req.user as User,
      vehicle_image_file,
      driverVehicleDetailDto,
    );
  }
}
