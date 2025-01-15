import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { ConvertModule } from '../src/convert/convert.module';
import { ConvertService } from '../src/convert/convert.service';
import { JwtAuthGuard } from '../src/auth/guards/jwt-auth.guard';
import * as cookieParser from 'cookie-parser';
import { BadRequestException } from '@nestjs/common';

describe('ConvertController (e2e)', () => {
  let app: INestApplication;
  let convertService = {
    convertCurrency: jest.fn((convertDto) => {
      const { fromCurrency, toCurrency, amount } = convertDto;

      const MIN_AMOUNT_ALLOWED = 2.0;

      if (amount < MIN_AMOUNT_ALLOWED) {
        throw new BadRequestException('Invalid amount');
      }

      if (fromCurrency === toCurrency) {
        throw new BadRequestException('Cannot convert same currency');
      }

      return {
        from: fromCurrency,
        to: toCurrency,
        fromAmount: amount,
        toAmount: amount * 0.85,
        exchangeRate: 0.85,
        transactionId: '12345',
      };
    }),
  };

  const mockToken = 'valid.jwt.token';

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, ConvertModule],
    })
      .overrideProvider(ConvertService)
      .useValue(convertService)
      .overrideGuard(JwtAuthGuard)
      .useValue({
        canActivate: (context: ExecutionContext) => {
          const request = context.switchToHttp().getRequest();
          const cookie = request.cookies?.kanijiru;
          return cookie === mockToken;
        },
      })
      .compile();

    app = moduleFixture.createNestApplication();
    app.use(cookieParser());
    await app.init();
  });

  describe('/convert (POST)', () => {
    it('should convert currencies successfully', () => {
      return request(app.getHttpServer())
        .post('/convert')
        .withCredentials(true)
        .set('Cookie', `kanijiru=${mockToken}`)
        .send({
          amount: 100,
          fromCurrency: 'USD',
          toCurrency: 'EUR',
        })
        .expect(201)
        .expect({
          from: 'USD',
          to: 'EUR',
          fromAmount: 100,
          toAmount: 85,
          exchangeRate: 0.85,
          transactionId: '12345',
        });
    });

    it('should return 401 Unauthorized or 403 Forbidden if invalid cookie is provided', () => {
      return request(app.getHttpServer())
        .post('/convert')
        .set('Cookie', 'kanijiru=invalid.token')
        .send({
          amount: 100,
          fromCurrency: 'USD',
          toCurrency: 'EUR',
        })
        .expect((res) => {
          if (![401, 403].includes(res.status)) {
            throw new Error(
              `Expected status code 401 or 403, but got ${res.status}`,
            );
          }
        });
    });

    it('should return 400 Bad Request for invalid input data (negative amount)', async () => {
      const response = await request(app.getHttpServer())
        .post('/convert')
        .set('Cookie', `kanijiru=${mockToken}`)
        .send({
          amount: -100,
          fromCurrency: 'USD',
          toCurrency: 'EUR',
        });
      expect(response.status).toBe(400);
      expect(response.body.message).toContain('Invalid amount');
    });

    it('should return 400 Bad Request for invalid input data (same currency)', async () => {
      const response = await request(app.getHttpServer())
        .post('/convert')
        .set('Cookie', `kanijiru=${mockToken}`)
        .send({
          amount: 100,
          fromCurrency: 'USD',
          toCurrency: 'USD',
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toContain('Cannot convert same currency');
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
