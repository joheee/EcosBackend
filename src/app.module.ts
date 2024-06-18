import { Module } from '@nestjs/common';
import { AuthModule } from './api/auth/auth.module';
import { UserDetailModule } from './api/user_detail/user_detail.module';

@Module({
  imports: [AuthModule, UserDetailModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
