import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { DriverVehicleDetailDto } from './dto/driver_vehicle_detail.dto';

@Injectable()
export class DriverVehicleDetailService {
  constructor(private prisma: PrismaService) {}

  async create(user: User, driverVehicleDetailDto: DriverVehicleDetailDto) {
    try {
      const currDrriver = await this.prisma.user.findUnique({
        where: {
          email: user.email,
        },
      });
      if (!currDrriver) {
        throw new NotFoundException(
          `driver with email ${user.email} is not found!`,
        );
      }
      const createUpdateDriverVehicle = await this.prisma.userDetail.update({
        where: {
          email: user.email,
        },
        data: {
          vehicle_image: driverVehicleDetailDto.vehicle_image,
          vehicle_category: driverVehicleDetailDto.vehicle_category,
          vehicle_model: driverVehicleDetailDto.vehicle_model,
          vehicle_capacity: driverVehicleDetailDto.vehicle_capacity,
          vehicle_number_plate: driverVehicleDetailDto.vehicle_number_plate,
        },
      });
      return new HttpException(createUpdateDriverVehicle, HttpStatus.CREATED);
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      } else {
        throw new InternalServerErrorException(
          `An unexpected error occurred: ${error}`,
        );
      }
    }
    return driverVehicleDetailDto;
  }
}
