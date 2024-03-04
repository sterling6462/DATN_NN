import { Module } from '@nestjs/common';
import { ConfigService } from './config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './gaurd/auth.gaurd';
import { RolesGuard } from './gaurd/roles.gaurd';
import { ClientsModule, Transport } from '@nestjs/microservices';

const config = ConfigService.getInstance();
@Module({
  imports: [
    MongooseModule.forRoot(config.get('DATABASE_URL'), {
      dbName: config.get('DATABASE_NAME'),
    }),
    AuthModule,
    ClientsModule.registerAsync([
      {
        name: 'BE_SERVICE',
        useFactory: () => ({
          transport: Transport.RMQ,
          options: {
            urls: [`${config.get('RABBITMQ_URL')}`],
            queue: `${config.get('RABBITMQ_BE_QUEUE')}`,
            queueOptions: {
              durable: false,
            },
          },
        }),
      },
    ]),
  ],
  // controllers:[AppController]
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
