import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { JwtAuthGuard } from '../src/auth/guards/jwt-auth.guard';

describe('ConvertController (e2e)', () => {
  let app: INestApplication;
  let jwtToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true }) 
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('/convert (POST)', () => {
    it('should convert currencies successfully', () => {
      return request(app.getHttpServer())
        .post('/convert')
        .send({
          amount: 100,
          fromCurrency: 'USD',
          toCurrency: 'EUR',
        })
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('amount');
          expect(res.body).toHaveProperty('fromCurrency');
          expect(res.body).toHaveProperty('toCurrency');
          expect(res.body).toHaveProperty('exchangeRate');
        });
    });

    it('should validate input data', () => {
      return request(app.getHttpServer())
        .post('/convert')
        .send({
          amount: -100,
          fromCurrency: 'USD',
          toCurrency: 'EUR',
        })
        .expect(400);
    });
  });

  afterAll(async () => {
    await app.close();
  });
}); 