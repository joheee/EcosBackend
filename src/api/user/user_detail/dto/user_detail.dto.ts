import { Role } from '@prisma/client';

import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class UserDetailDto {
  @ApiProperty({ example: 'John Doe', description: 'The name of the user' })
  name: string;

  @ApiProperty({
    example: '1234567890',
    description: 'The phone number of the user',
  })
  phone: string;

  @ApiProperty({ example: 'CUSTOMER', description: 'The role of the user' })
  role: Role;

  profile_image: string;

  @ApiProperty({
    example: 'Main Street',
    description: 'The street of the user',
  })
  street: string;

  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  @ApiProperty({ example: 5, description: 'The grade of the user' })
  grade: number;

  @ApiProperty({ example: true, description: 'Is email verified' })
  @Transform(({ value }) => value === 'true' || value === true)
  is_email_verified: boolean;

  @ApiProperty({ example: true, description: 'Is phone verified' })
  @Transform(({ value }) => value === 'true' || value === true)
  is_phone_verified: boolean;
}
