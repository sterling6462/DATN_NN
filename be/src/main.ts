import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { LoggingInterceptor } from './interception';
import { AppModule } from './app.module';
import { ConfigService } from './config';
import { Transport } from '@nestjs/microservices';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.setGlobalPrefix('api');
  app.useGlobalInterceptors(new LoggingInterceptor());
  const port = ConfigService.getInstance().getNumber('PORT') || 3001;
  const host = ConfigService.getInstance().get('HOST') || 'localhost';
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [`${ConfigService.getInstance().get('RABBITMQ_URL')}`],
      queue: `${ConfigService.getInstance().get('RABBITMQ_BE_QUEUE')}`,
      queueOptions: { durable: false },
      prefetchCount: 1,
    },
  });
  await app.startAllMicroservices();
  await app.listen(port, host);

  new Logger().log(`Application is running on http://${host}:${port}`);
}
bootstrap();
