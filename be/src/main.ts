import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { LoggingInterceptor } from './interception';
import { AppModule } from './app.module';
import { ConfigService } from './config';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.setGlobalPrefix('api');
  app.useGlobalInterceptors(new LoggingInterceptor());
  const port = ConfigService.getInstance().getNumber('PORT') || 3001;
  const host = ConfigService.getInstance().get('HOST') || 'localhost';
  await app.listen(port, host);

  new Logger().log(`Application is running on http://${host}:${port}`);
}
bootstrap();
