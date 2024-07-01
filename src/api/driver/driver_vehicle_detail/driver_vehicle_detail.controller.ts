import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { DriverVehicleDetailService } from './driver_vehicle_detail.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/api/auth/guards/jwt.guard';
import { Request } from 'express';
import { DriverVehicleDetail } from './dto/driver_vehicle_detail';
import { User } from '@prisma/client';

@ApiTags('driver detail (token required)')
@Controller('driver-vehicle-detail')
@ApiBearerAuth('access-token')
export class DriverVehicleDetailController {
  constructor(
    private readonly driverVehicleDetailService: DriverVehicleDetailService,
  ) {}

  @Post('')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary:
      "create or update driver's vehicle detail by email (optional field)",
  })
  @ApiBody({
    description: 'intended for driver only',
    type: DriverVehicleDetail,
  })
  async create(
    @Req() req: Request,
    @Body() driverVehicleDetail: DriverVehicleDetail,
  ) {
    return await this.driverVehicleDetailService.create(
      req.user as User,
      driverVehicleDetail,
    );
  }
}
