import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { ExchangeRateResponse, Login, Transaction, Convert } from "@/app/types";

export const currencyAPI = createApi({
  reducerPath: "currencyAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getUserTransactions: builder.query<Transaction[], void>({
      query: () => ({
        url: "/user/transactions",
        method: "GET",
        credentials: "include",
      }),
    }),
    getExchangeRates: builder.query<ExchangeRateResponse, void>(
      {
        query: () => ({
          method: "GET",
          url: "/exchange-rates",
        }),
      }
    ),
    login: builder.mutation<Login, Login>({
      query: (loginData) => ({
        method: "POST",
        url: "/auth/login",
        body: loginData,
        credentials: "include",
      }),
    }),
    convert: builder.mutation<Convert, Convert>({
      query: (convertData) => ({
        method: "POST",
        url: "/convert",
        body: convertData,
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useGetUserTransactionsQuery,
  useGetExchangeRatesQuery,
  useConvertMutation,
  useLoginMutation,
} = currencyAPI;
