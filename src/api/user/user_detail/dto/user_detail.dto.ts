import { Role } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsNumber,
  IsOptional,
  IsString,
  IsBoolean,
  IsEnum,
} from 'class-validator';

export class UserDetailDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the user',
    required: false,
  })
  name?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: '1234567890',
    description: 'The phone number of the user',
    required: false,
  })
  phone?: string;

  @IsOptional()
  @IsEnum(Role)
  @ApiProperty({
    example: 'CUSTOMER',
    description: 'The role of the user',
    required: false,
  })
  role?: Role;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'user image input',
    required: false,
  })
  profile_image_file?: string;

  @IsOptional()
  @IsString()
  profile_image?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'Main Street',
    description: 'The street of the user',
    required: false,
  })
  street?: string;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  @ApiProperty({
    example: 5,
    description: 'The grade of the user',
    required: false,
  })
  grade?: number;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  @ApiProperty({
    example: true,
    description: 'Is email verified',
    required: false,
  })
  is_email_verified?: boolean;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  @ApiProperty({
    example: true,
    description: 'Is phone verified',
    required: false,
  })
  is_phone_verified?: boolean;
}
