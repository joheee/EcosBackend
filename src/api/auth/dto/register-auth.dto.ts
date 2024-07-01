import { ApiProperty, PartialType } from '@nestjs/swagger';
import { LoginAuthDto } from './login-auth.dto';

export class RegisterAuthDto extends PartialType(LoginAuthDto) {
  @ApiProperty({ example: '8052', description: 'phone number' })
  phone: string;

  @ApiProperty({ example: 'John Doe', description: 'first name + last name' })
  name: string;

  @ApiProperty({ example: 'Jl Syahdan', description: 'guest address' })
  street: string;

  @ApiProperty({ example: 5, description: 'guest current grade' })
  grade: number;
}
