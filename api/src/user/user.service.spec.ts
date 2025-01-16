import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { LoggerService } from '../logger/logger.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: 'TransactionRepository',
          useValue: {
            seedRates: jest.fn(),
            convertCurrency: jest.fn(),
          },
        },
        {
          provide: LoggerService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
