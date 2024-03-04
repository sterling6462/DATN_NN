import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { HouseModule } from './modules/house/house.module';
import { ConfigService } from './config';
import { MongooseModule } from '@nestjs/mongoose';
// import { AuthModule } from './modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './gaurd/auth.gaurd';
import { RoomModule } from './modules/room/room.module';
import { BillModule } from './modules/bill/bill.module';
import { RolesGuard } from './gaurd/roles.gaurd';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TerminusModule } from '@nestjs/terminus';

const config = ConfigService.getInstance();
@Module({
  imports: [
    MongooseModule.forRoot(config.get('DATABASE_URL'), {
      dbName: config.get('DATABASE_NAME'),
    }),
    UserModule,
    HouseModule,
    TerminusModule,
    // AuthModule,
    RoomModule,
    BillModule,
    DashboardModule,
    ClientsModule.registerAsync([
      {
        name: 'AUTH_SERVICE',
        useFactory: async () => ({
          transport: Transport.RMQ,
          options: {
            urls: [`${config.get('RABBITMQ_URL')}`],
            queue: `${config.get('RABBITMQ_AUTH_QUEUE')}`,
            queueOptions: {
              durable: false,
            },
          },
        }),
      },
    ]),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
