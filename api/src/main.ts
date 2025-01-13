import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { UserSeeder } from './database/seeders/user.seeder';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Run database seeder
  const seeder = app.get(UserSeeder);
  await seeder.seed();

  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  await app.listen(3003);
}
bootstrap();
