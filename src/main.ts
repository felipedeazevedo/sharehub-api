import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('ShareHub REST API')
    .setDescription('REST API used for ShareHub marketplace.')
    .setVersion('1.0')
    .addTag('Users')
    .addTag('Authentication')
    .addTag('Posts')
    .addTag('Material List')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3001);
  app.enableShutdownHooks();
}
bootstrap();
