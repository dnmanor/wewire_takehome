import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { UserSeeder } from './database/seeders/user.seeder';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3003);

    // Run database seeder
    const seeder = app.get(UserSeeder);
    await seeder.seed();
    
    app.useGlobalPipes(new ValidationPipe());
    app.use(cookieParser());
}
bootstrap();
