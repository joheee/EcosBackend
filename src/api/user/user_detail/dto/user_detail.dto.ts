import { Role } from '@prisma/client';

import { ApiProperty } from '@nestjs/swagger';

export class UserDetailDto {
  @ApiProperty({ example: 'John Doe', description: 'The name of the user' })
  name: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The email of the user',
  })
  email: string;

  @ApiProperty({
    example: '1234567890',
    description: 'The phone number of the user',
  })
  phone: string;

  @ApiProperty({ example: 'CUSTOMER', description: 'The role of the user' })
  role: Role;

  @ApiProperty({
    example: 'images.webp',
    description: 'The profile image of the user',
  })
  profile_image: string;

  @ApiProperty({
    example: 'Main Street',
    description: 'The street of the user',
  })
  street: string;

  @ApiProperty({ example: 5, description: 'The grade of the user' })
  grade: number;

  @ApiProperty({ example: true, description: 'Is email verified' })
  is_email_verified: boolean;

  @ApiProperty({ example: true, description: 'Is phone verified' })
  is_phone_verified: boolean;
}
