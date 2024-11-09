import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';
dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  const port = process.env.PORT ?? 3000;
  const host = process.env.HOST ?? 'localhost';
  await app.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
  });
}
bootstrap();
