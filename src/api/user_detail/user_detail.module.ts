import { Module } from '@nestjs/common';
import { UserDetailService } from './user_detail.service';
import { UserDetailController } from './user_detail.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/jwt/constants';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '10 days' },
    }),
  ],
  controllers: [UserDetailController],
  providers: [UserDetailService],
})
export class UserDetailModule {}
