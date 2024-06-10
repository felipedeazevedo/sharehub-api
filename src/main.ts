import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('ShareHub REST API')
    .setDescription('REST API used for share hub marketplace.')
    .setVersion('1.0')
    .addTag('users')
    .addTag('auth')
    .addTag('post')
    .addTag('material-list')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
  app.enableShutdownHooks();
}
bootstrap();
