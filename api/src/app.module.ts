import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import databaseConfig from './config/database.config';
import { validate } from './config/env.validation';
import { DatabaseModule } from './database/database.module';
import { ConvertModule } from './convert/convert.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ExchangeModule } from './exchange/exchange.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig],
      isGlobal: true,
      validate,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        ...configService.get('database'),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    DatabaseModule,
    ScheduleModule.forRoot(),
    ExchangeModule,
    ConvertModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}