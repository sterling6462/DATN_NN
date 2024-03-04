import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '../config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
const config = ConfigService.getInstance();

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: ConfigService.getInstance().get('JWT_SECRET'),
      signOptions: { expiresIn: '60m' },
    }), ClientsModule.registerAsync([
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
    ])
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
