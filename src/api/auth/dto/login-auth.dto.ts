import { ApiProperty } from '@nestjs/swagger';

export class LoginAuthDto {
  @ApiProperty({
    example: 'customer@gmail.com',
    description: 'The email of the user',
  })
  email: string;

  @ApiProperty({
    example: 'customer123',
    description: 'The password of the user',
  })
  password: string;
}
