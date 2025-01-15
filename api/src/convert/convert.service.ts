import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction, TransactionStatus } from './entities/transaction.entity';
import { ConvertCurrencyDto } from './dto/convert.dto';
import { ExchangeService } from '../exchange/exchange.service';
import { User } from '../user/entities/user.entity';
import { Interval } from '@nestjs/schedule';

export function calculateConversion(
  amount: number,
  fromCurrency: string,
  toCurrency: string,
  exchangeRate: number
): number {
  if (fromCurrency === toCurrency) {
    return amount;
  }
  return amount * exchangeRate;
}

@Injectable()
export class ConvertService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    private exchangeService: ExchangeService,
  ) {}

  private readonly OPEN_EXCHANGE_API_URL = `https://openexchangerates.org/api/latest.json?app_id=${process.env.OPEN_EXCHANGE_APP_ID}`;
  private static readonly FIVE_HOURS = 5 * 60 * 60 * 1000;

  onModuleInit() {
    this.seedRates();
  }

  @Interval(ConvertService.FIVE_HOURS)
  seedRates() {
    fetch(this.OPEN_EXCHANGE_API_URL, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error seeding rates: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const fs = require('fs');
        const path = require('path');
        const dataDir = path.join(process.cwd(), 'data');

        if (!fs.existsSync(dataDir)) {
          fs.mkdirSync(dataDir, { recursive: true });
        }

        fs.writeFileSync(
          path.join(dataDir, 'exchange-rates.json'),
          JSON.stringify(data, null, 2),
        );
        console.log('Exchange rates saved successfully');
      })
      .catch((error) => {
        console.error('Error seeding rates:', error);
      });
  }

  async convertCurrency(convertDto: ConvertCurrencyDto, user: User) {
    const { from, to, value } = convertDto;
    const exchangeRates = this.loadExchangeRates();

    if (!exchangeRates.rates[from] || !exchangeRates.rates[to]) {
        throw new NotFoundException('Invalid currency code');
    }

    if (from === to) {
        throw new BadRequestException('Cannot convert same currency');
    }

    const convertedAmount = calculateConversion(value, from, to, exchangeRates.rates[to] / exchangeRates.rates[from]);

    const transaction = this.transactionRepository.create({
        user,
        userId: user.id,
        fromCurrency: from,
        toCurrency: to,
        fromAmount: value,
        toAmount: convertedAmount,
        status: TransactionStatus.COMPLETED,
    });

    await this.transactionRepository.save(transaction);

    return {
        from,
        to,
        fromAmount: value,
        toAmount: convertedAmount,
        exchangeRate: exchangeRates.rates[to] / exchangeRates.rates[from],
        transactionId: transaction.id,
    };
  }

  private loadExchangeRates() {
    const fs = require('fs');
    const path = require('path');
    const dataDir = path.join(process.cwd(), 'data', 'exchange-rates.json');

    if (!fs.existsSync(dataDir)) {
        throw new NotFoundException('Exchange rates data not found');
    }

    const data = fs.readFileSync(dataDir, 'utf-8');
    return JSON.parse(data);
  }
}
