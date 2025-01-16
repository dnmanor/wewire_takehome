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
import { UserModule } from './user/user.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { LoggerModule } from './logger/logger.module';

const MAX_REQUESTS = 15;
const ONE_MINUTE = 60_000;

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
    ConvertModule,
    ExchangeModule,
    ConvertModule,
    UserModule,
    ThrottlerModule.forRoot([
      {
        ttl: ONE_MINUTE,
        limit: MAX_REQUESTS,
      },
    ]),
    LoggerModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,

    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
