"use client";

import Image from "next/image";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import Input, { InputErrorMessage } from "../../components/Input";
import Button from "../../components/Button";
import { useConvertMutation, useGetExchangeRatesQuery } from "../../api/api";
import { CurrencySelector } from "@/app/components/CurrencySelector";
import { useEffect, useState } from "react";

const currencyConverterSchema = z.object({
  fromCurrency: z.string().nonempty({ message: "Please select a currency" }),
  fromAmount: z
    .string()
    .refine((value) => /^\d+(\.\d{1,2})?$/.test(value), {
      message: "Invalid amount",
    })
    .refine((value) => parseFloat(value) >= 2, {
      message: "Amount too low",
    }),

  toCurrency: z.string().nonempty({ message: "Please select a currency" }),
  toAmount: z.string().optional(),
});

type CurrencyConverterSchema = z.infer<typeof currencyConverterSchema>;



export default function CurrencyConverter() {
  const {
    getValues,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<CurrencyConverterSchema>({
    resolver: zodResolver(currencyConverterSchema),
    defaultValues: {
      fromCurrency: "USD",
      fromAmount: "0.00",
      toCurrency: "EUR",
      toAmount: "0.00",
    },
  });

  const [exchangeRate, setExchangeRate] = useState("0.00")

  const {
    data: exchangeRates,
    isLoading: isRatesLoading,
    error: ratesError,
    // @ts-ignore
  } = useGetExchangeRatesQuery();

  const [convert, { isLoading: isConverting, error: conversionError }] =
    useConvertMutation();

  const onSubmit = async (data: CurrencyConverterSchema) => {
    try {
      const fromAmount = parseFloat(data.fromAmount);

      if (isNaN(fromAmount)) {
        console.error("Invalid amount entered");
        return;
      }

      const result = await convert({
        fromCurrency: data.fromCurrency,
        fromAmount,
        toCurrency: data.toCurrency,
      }).unwrap();

      console.log("Conversion result:", result);
    } catch (err) {
      console.error("Conversion error:", err);
    }
  };

  useEffect(() => {
    const fromAmount = parseFloat(getValues("fromAmount"));
    const fromCurrency = getValues("fromCurrency");
    const toCurrency = getValues("toCurrency");

    if (exchangeRates && fromCurrency && toCurrency) {
      const rate = exchangeRates.rates[toCurrency] / exchangeRates.rates[fromCurrency];
      setValue("toAmount", (fromAmount * rate).toFixed(2));
      setExchangeRate(rate.toFixed(4))
      // setValue("exchangeRate", rate.toFixed(4));
    }
  }, [getValues("fromAmount"), getValues("fromCurrency"), getValues("toCurrency"), exchangeRates]);

  if (isRatesLoading) return <p>Loading exchange rates...</p>;
  if (ratesError) return <p>Failed to load exchange rates</p>;

  const supportedCurrencies = exchangeRates
    ? Object.keys(exchangeRates.rates)
    : [];

  return (
    <div className="w-full max-w-[600px] mx-auto my-10 md:my-20">
      <h1 className="font-bold mb-6 md:mb-8 text-xl md:text-2xl">
        Currency Converter
      </h1>
      <div className="flex gap-4 mt-4 flex-col">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col md:flex-row gap-4 md:gap-2">
            <div className="w-full flex items-start justify-between flex-col">
              <div className="w-full flex items-end">
                <Controller
                  control={control}
                  name="fromAmount"
                  render={({ field }) => (
                    <Input
                      label="You send exactly"
                      name="fromAmount"
                      type="text"
                      className="w-full"
                      register={field}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const value = e.target.value;

                        if (/^\d*\.?\d{0,2}$/.test(value)) {
                          field.onChange(value);
                        }
                      }}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="fromCurrency"
                  render={({ field }) => (
                    <CurrencySelector
                      currencies={supportedCurrencies}
                      selectedCurrency={field.value}
                      setSelectedCurrency={(value) => {
                        field.onChange(value);
                      }}
                    />
                  )}
                />
              </div>
              {errors?.fromAmount && (
                <InputErrorMessage
                  message={errors?.fromAmount?.message ?? ""}
                />
              )}
              {errors?.fromCurrency && (
                <InputErrorMessage
                  message={errors?.fromCurrency?.message ?? ""}
                />
              )}
            </div>

            <div className="w-full md:w-20 justify-center items-center flex">
              <Image
                className="md:block hidden"
                src="/arrow-right-left.svg"
                alt="tnsaction arrow"
                width={15}
                height={15}
              />
              <Image
                className="md:hidden block"
                src="/arrow-up-down.svg"
                alt="tnsaction arrow"
                width={15}
                height={15}
              />
            </div>

            <div className="w-full flex items-start justify-between flex-col">
              <div className="w-full flex items-end">
                <Controller
                  control={control}
                  name="toAmount"
                  render={({ field }) => (
                    <Input
                      label="Recipient gets"
                      name="toAmount"
                      type="text"
                      className="w-full"
                      register={field}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="toCurrency"
                  render={({ field }) => (
                    <CurrencySelector
                      currencies={supportedCurrencies}
                      selectedCurrency={field.value}
                      setSelectedCurrency={(value) => {
                        field.onChange(value);
                      }}
                    />
                  )}
                />
              </div>
              {errors?.toCurrency && (
                <InputErrorMessage
                  message={errors?.toCurrency?.message ?? ""}
                />
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 mt-4">
            <div>
              <p className="text-sm md:text-base">
                {`1 ${getValues("fromCurrency")} ≈ ${exchangeRate} ${getValues("toCurrency")}`}
              </p>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full md:w-auto"
              disabled={isConverting}
            >
              {isConverting ? "Converting..." : "Convert"}
            </Button>
          </div>
          {/* {conversionError && (
            <p className="text-red-500">
              Error: {conversionError.data.message}
            </p>
          )} */}
        </form>
      </div>
    </div>
  );
}
