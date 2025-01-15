import { NestFactory, REQUEST } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { UserSeeder } from './database/seeders/user.seeder';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    credentials: true,
    origin: ['http://localhost:3002'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  // Run database seeder
  const seeder = app.get(UserSeeder);
  await seeder.seed();

  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());

  await app.listen(4000);
}
bootstrap();
