import { Role } from '@prisma/client';

export class UpdateUserDetailDto {
  role: Role;
  profile_image: string;
  phone: string;
  name: string;
  street: string;
  grade: number;
  is_email_verified: boolean;
  is_phone_verified: boolean;
}
