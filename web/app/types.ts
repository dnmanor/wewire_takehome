export interface Transaction {
  id: string;
  reference: string;
  userId: string;
  fromCurrency: string;
  toCurrency: string;
  fromAmount: number;
  toAmount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Login {
  email: string;
  password: string;
}

export interface Convert {
  from: string;
  to: string;
  value: number;
}

export interface ExchangeRate {
  fromCurrency: string;
  toCurrency: string;
  rate: string;
}

export interface ExchangeRateResponse {
  rates: { [key: string]: number };
  base_currency: string;
}

export interface ApiErrorResponse {
  status: number;
  data: {
    message: string;
    error: string;
    statusCode: number;
  };
}