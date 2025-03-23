import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';

//modules
import { BffModule } from './app/bff.module';

async function bootstrap() {
  const app = await NestFactory.create(BffModule);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('The Letter Love API')
    .setDescription('The letter love endpoints.')
    .setVersion('1.0')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('api', app, documentFactory);

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
