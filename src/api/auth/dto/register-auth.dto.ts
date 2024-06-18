import { PartialType } from '@nestjs/swagger';
import { LoginAuthDto } from './login-auth.dto';
import { Role } from '@prisma/client';

export class RegisterAuthDto extends PartialType(LoginAuthDto) {
  role: Role;
}
