import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConvertController } from './convert.controller';
import { ConvertService } from './convert.service';
import { Transaction } from './entities/transaction.entity';
import { ExchangeModule } from '../exchange/exchange.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction]),
    ExchangeModule
  ],
  controllers: [ConvertController],
  providers: [ConvertService],
  exports: [ConvertService]
})
export class ConvertModule {}