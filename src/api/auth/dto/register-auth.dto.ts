import { PartialType } from '@nestjs/swagger';
import { LoginAuthDto } from './login-auth.dto';

export class RegisterAuthDto extends PartialType(LoginAuthDto) {
  phone: string;
  name: string;
  street: string;
  grade: number;
}
