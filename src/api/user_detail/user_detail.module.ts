import { Module } from '@nestjs/common';
import { UserDetailService } from './user_detail.service';
import { UserDetailController } from './user_detail.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';

@Module({
  imports: [PrismaModule],
  controllers: [UserDetailController],
  providers: [UserDetailService, JwtStrategy],
})
export class UserDetailModule {}
