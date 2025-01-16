import { Test, TestingModule } from '@nestjs/testing';
import { ConvertService } from './convert.service';
import { ExchangeService } from '../exchange/exchange.service';
import { LoggerService } from '../logger/logger.service';

describe('ConvertService', () => {
  let service: ConvertService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConvertService,
        {
          provide: 'TransactionRepository',
          useValue: {
            seedRates: jest.fn(),
            convertCurrency: jest.fn(),
          },
        },
        {
          provide: ExchangeService,
          useValue: {
            getExchangeRate: jest.fn(),
          },
        },
        {
          provide: LoggerService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<ConvertService>(ConvertService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
