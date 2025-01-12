export class ExchangeRateDto {
    rates: { [key: string]: number };
    base: string;
    license: string;
    disclaimer: string;
    timestamp: number;
  }
  
  export class ExchangeRateResponseDto {
    rates: { [key: string]: number };
    base_currency: string;
  }