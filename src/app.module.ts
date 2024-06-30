import { Module } from '@nestjs/common';
import { AuthModule } from './api/auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { DriverVehicleDetailModule } from './api/driver/driver_vehicle_detail/driver_vehicle_detail.module';
import { UserDetailModule } from './api/user/user_detail/user_detail.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    AuthModule,
    UserDetailModule,
    DriverVehicleDetailModule,
  ],
})
export class AppModule {}
