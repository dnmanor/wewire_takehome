import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConvertModule } from './convert/convert.module';
import { ExchangeModule } from './exchange/exchange.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, ConvertModule, ExchangeModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
