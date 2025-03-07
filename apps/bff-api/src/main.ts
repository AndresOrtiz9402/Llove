import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';

import { BffModule } from './app/bff.module';

async function bootstrap() {
  const app = await NestFactory.create(BffModule);

  app.enableCors();

  app.use(cookieParser());

  const globalPrefix = 'bff-api';
  app.setGlobalPrefix(globalPrefix);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  const port = process.env.PORT || 3000;
  await app.listen(port);

  Logger.log(`🚀 [Bff-api]: Application is running on: http://localhost:${port}/${globalPrefix}`);
}

bootstrap();

//TODO: add https.
