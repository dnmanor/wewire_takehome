import { Injectable } from '@nestjs/common';
import {
  ExchangeRateDto,
  ExchangeRateResponseDto,
} from './dto/exchange-rates.dto';

@Injectable()
export class ExchangeService {
  fetchRates(): ExchangeRateResponseDto {
    const fs = require('fs');
    const path = require('path');
    try {
      const ratesData: ExchangeRateDto = JSON.parse(
        fs.readFileSync(
          path.join(process.cwd(), 'data', 'exchange-rates.json'),
          'utf8',
        ),
      );
      return {
        rates: ratesData.rates,
        base_currency: ratesData.base,
      };
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
      return { rates: {}, base_currency: '' };
    }
  }
}
