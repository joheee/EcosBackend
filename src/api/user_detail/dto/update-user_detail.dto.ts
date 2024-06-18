import { PartialType } from '@nestjs/swagger';
import { CreateUserDetailDto } from './create-user_detail.dto';

export class UpdateUserDetailDto extends PartialType(CreateUserDetailDto) {}
