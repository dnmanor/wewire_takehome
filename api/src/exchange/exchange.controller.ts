import { Controller, Get } from '@nestjs/common';
import { ExchangeService } from './exchange.service';
import { ExchangeRateResponseDto } from './dto/exchange-rates.dto';

@Controller('exchange-rates')
export class ExchangeController {
  constructor(private readonly exchangeService: ExchangeService) {}


  @Get()
  getExchangeRates(): ExchangeRateResponseDto {
    return this.exchangeService.fetchRates();
  }
}
