"use client";

import Image from "next/image";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { InputErrorMessage } from "../../components/Input";
import Button from "../../components/Button";
import { useConvertMutation, useGetExchangeRatesQuery } from "../../api/api";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import { toast } from "sonner";

import { CurrencyInput } from "@/app/components/CurrencyInput";

const currencyConverterSchema = z
  .object({
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
  })
  .refine((data) => data.fromCurrency !== data.toCurrency, {
    message: "Please choose different currencies",
    path: ["toCurrency"],
  });

type CurrencyConverterSchema = z.infer<typeof currencyConverterSchema>;

export default function CurrencyConverter() {
  const [exchangeRate, setExchangeRate] = useState("0.00");
  const {
    data: exchangeRates,
    isLoading: isRatesLoading,
    error: ratesError,
  } = useGetExchangeRatesQuery();

  const {
    getValues,
    control,
    setValue,
    handleSubmit,
    reset,
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

  const fromAmount = useWatch({ control, name: "fromAmount" });
  const fromCurrency = useWatch({ control, name: "fromCurrency" });
  const toCurrency = useWatch({ control, name: "toCurrency" });
  const toAmount = useWatch({ control, name: "toAmount" });

  const [convert, { isLoading: isConverting }] = useConvertMutation();

  const supportedCurrencies = exchangeRates
    ? Object.keys(exchangeRates.rates)
    : [];

  const onSubmit = async (data: CurrencyConverterSchema) => {
    try {
      const fromAmount = parseFloat(data.fromAmount);

      if (isNaN(fromAmount) || fromAmount === 0) {
        console.error("Invalid amount entered");
        return;
      }

      await convert({
        from: data.fromCurrency,
        to: data.toCurrency,
        value: fromAmount,
      }).unwrap();

      reset();
      toast.success("Funds successfully converted");
    } catch (err) {
      toast.error("Failed to convert funds");
    }
  };

  // Calculate and update exchange rate
  useEffect(() => {
    if (!isRatesLoading && exchangeRates?.rates) {
      const rate =
        exchangeRates.rates[toCurrency] / exchangeRates.rates[fromCurrency];
      setExchangeRate(rate.toFixed(4));
    }
  }, [exchangeRates, isRatesLoading, fromCurrency, toCurrency]);

  const calculateAmount = (
    amount: number,
    fromCurr: string,
    toCurr: string
  ) => {
    if (!exchangeRates?.rates) return "0.00";
    const rate = exchangeRates.rates[toCurr] / exchangeRates.rates[fromCurr];
    return (amount * rate).toFixed(2);
  };

  const onCurrencyInputChange = (
    type: "fromCurrency" | "toCurrency" | "toAmount" | "fromAmount",
    nextValue: string
  ) => {
    if (!exchangeRates?.rates) return;

    switch (type) {
      case "fromAmount": {
        const amount = Number(nextValue) || 0;
        setValue("toAmount", calculateAmount(amount, fromCurrency, toCurrency));
        break;
      }
      case "toAmount": {
        const amount = Number(nextValue) || 0;
        setValue(
          "fromAmount",
          calculateAmount(amount, toCurrency, fromCurrency)
        );
        break;
      }
      case "fromCurrency": {
        const amount = Number(fromAmount) || 0;
        setValue("toAmount", calculateAmount(amount, nextValue, toCurrency));
        break;
      }
      case "toCurrency": {
        const amount = Number(fromAmount) || 0;
        setValue("toAmount", calculateAmount(amount, fromCurrency, nextValue));
        break;
      }
    }
  };

  if (isRatesLoading) {
    return (
      <div className="w-full flex text-center justify-center items-center h-[60vh] md:h-screen">
        <LoadingSpinner colour="text-black" size={20} />
      </div>
    );
  }
  if (ratesError) {
    return (
      <div className="w-full flex text-center justify-center items-center h-[60vh] md:h-screen text-red-600">
        Failed to fetch rates data
      </div>
    );
  }

  if (!exchangeRates || !exchangeRates.rates) {
    return (
      <div className="w-full flex text-center justify-center items-center h-[60vh] md:h-screen text-red-600">
        No exchange rates available
      </div>
    );
  }

  return (
    <div className="w-full max-w-[600px] mx-auto my-10 md:my-20">
      <h1 className="font-bold mb-6 md:mb-8 text-xl md:text-2xl">
        Currency Converter
      </h1>
      <div className="flex gap-4 mt-4 flex-col">
        <form
          onSubmit={handleSubmit(onSubmit)}
          onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
        >
          <div className="flex flex-col md:flex-row gap-4 md:gap-2">
            <div className="w-full flex items-start justify-between flex-col">
              <div className="w-full flex items-end">
                <CurrencyInput
                  label="You send exactly"
                  inputProps={{
                    name: "fromAmount",
                    type: "text",
                    className: "w-full",
                    onChange: (e) => {
                      onCurrencyInputChange("fromAmount", e.target.value);
                    },
                  }}
                  currencySelectorProps={{
                    name: "fromCurrency",
                    currencies: supportedCurrencies,
                    selectedCurrency: getValues("fromCurrency"),
                    onSelectCurrency: (value) => {
                      onCurrencyInputChange("fromCurrency", value);
                    },
                  }}
                  control={control}
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
                alt="transaction arrow"
                width={15}
                height={15}
              />
              <Image
                className="md:hidden block"
                src="/arrow-up-down.svg"
                alt="transaction arrow"
                width={15}
                height={15}
              />
            </div>

            <div className="w-full flex items-start justify-between flex-col">
              <div className="w-full flex items-end">
                <CurrencyInput
                  label="Recipient gets"
                  inputProps={{
                    name: "toAmount",
                    type: "text",
                    className: "w-full",
                    onChange: (e) => {
                      onCurrencyInputChange("toAmount", e.target.value);
                    },
                  }}
                  control={control}
                  currencySelectorProps={{
                    name: "toCurrency",
                    currencies: supportedCurrencies,
                    selectedCurrency: getValues("toCurrency"),
                    onSelectCurrency: (value) => {
                      onCurrencyInputChange("toCurrency", value);
                    },
                  }}
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
            {isRatesLoading ? (
              <LoadingSpinner colour="text-black" size={20} />
            ) : (
              <div>
                <p className="text-sm md:text-base">
                  {`1 ${fromCurrency} ≈ ${exchangeRate} ${toCurrency}`}
                </p>
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              className="w-full md:w-auto"
              disabled={isConverting}
            >
              {isConverting ? "Converting..." : "Convert"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
