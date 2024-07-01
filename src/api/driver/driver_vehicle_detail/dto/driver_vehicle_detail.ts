import { ApiProperty } from '@nestjs/swagger';

export class DriverVehicleDetail {
  @ApiProperty({ example: 'images.webp', description: 'driver vehicle image' })
  vehicle_image: string;

  @ApiProperty({ example: 'jeep', description: 'driver vehicle category' })
  vehicle_category: string;

  @ApiProperty({
    example: 'old fashioned jeep',
    description: 'The name of the user',
  })
  vehicle_model: string;

  @ApiProperty({ example: 3, description: 'vehicle capacity' })
  vehicle_capacity: number;

  @ApiProperty({ example: '6961', description: 'vehicle number plate' })
  vehicle_number_plate: string;
}
