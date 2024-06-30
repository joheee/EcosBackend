import { Module } from '@nestjs/common';
import { UserDetailModule } from './api/user_detail/user_detail.module';
import { AuthModule } from './api/auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    AuthModule,
    UserDetailModule,
  ],
})
export class AppModule {}
