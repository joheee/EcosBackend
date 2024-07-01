import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class DriverVehicleDetailDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'vehicle image input',
    required: false,
  })
  vehicle_image_file?: string;

  vehicle_image?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'jeep',
    description: 'driver vehicle category',
    required: false,
  })
  vehicle_category?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'old fashioned jeep',
    description: 'The name of the user',
    required: false,
  })
  vehicle_model?: string;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  @ApiProperty({ example: 3, description: 'vehicle capacity', required: false })
  vehicle_capacity?: number;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: '6961',
    description: 'vehicle number plate',
    required: false,
  })
  vehicle_number_plate?: string;
}
