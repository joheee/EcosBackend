import { Module } from '@nestjs/common';
import { UserDetailService } from './user_detail.service';
import { UserDetailController } from './user_detail.controller';

@Module({
  controllers: [UserDetailController],
  providers: [UserDetailService],
})
export class UserDetailModule {}
