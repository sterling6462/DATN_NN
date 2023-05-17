import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { LoggingInterceptor } from '../interception';
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.setGlobalPrefix('api');
  app.useGlobalInterceptors(new LoggingInterceptor());
  const port =  3001;
  const host =  'localhost';
  await app.listen(port, host);

  new Logger().log(`Application is running on http://${host}:${port}`);
}
bootstrap();
