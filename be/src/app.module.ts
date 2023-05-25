import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { HouseModule } from './modules/house/house.module';
import { ConfigService } from './config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './gaurd/auth.gaurd';
import { RoomModule } from './modules/room/room.module';

const config = ConfigService.getInstance();
@Module({
  imports: [
    MongooseModule.forRoot(config.get('DATABASE_URL'), {
      dbName: config.get('DATABASE_NAME'),
    }),
    UserModule,
    HouseModule,
    AuthModule,
    RoomModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
