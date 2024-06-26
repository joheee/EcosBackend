import { Module } from '@nestjs/common';
import { UserDetailModule } from './api/user_detail/user_detail.module';
import { AuthModule } from './api/auth/auth.module';

@Module({
  imports: [AuthModule, UserDetailModule],
})
export class AppModule {}
