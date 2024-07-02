import { Module } from '@nestjs/common';
import { AuthModule } from './api/auth/auth.module';
import { join } from 'path';
import { DriverVehicleDetailModule } from './api/driver/driver_vehicle_detail/driver_vehicle_detail.module';
import { UserDetailModule } from './api/user/user_detail/user_detail.module';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/public',
    }),
    AuthModule,
    UserDetailModule,
    DriverVehicleDetailModule,
  ],
})
export class AppModule {}
