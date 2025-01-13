"use client";

import Image from "next/image";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import * as Ariakit from "@ariakit/react";
import { matchSorter } from "match-sorter";
import { startTransition, useMemo, useState } from "react";

import Input, { InputErrorMessage } from "../../components/Input";
import Button from "../../components/Button";

const currencyConverterSchema = z.object({
  fromCurrency: z.string().min(1, { message: "From currency is required" }),
  fromAmount: z.number({ required_error: "From amount is required" }),
  toCurrency: z.string().min(1, { message: "To currency is required" }),
  toAmount: z.number({ required_error: "To amount is required" }),
});

type CurrencyConverterSchema = z.infer<typeof currencyConverterSchema>;

const CurrencySelector = ({
  currencies,
  selectedCurrency,
  setSelectedCurrency,
}: {
  currencies: string[];
  selectedCurrency: string;
  setSelectedCurrency: (value: string) => void;
}) => {
  const [searchValue, setSearchValue] = useState("");

  const matches = useMemo(() => {
    return matchSorter(currencies, searchValue, {
      baseSort: (a, b) => (a.index < b.index ? -1 : 1),
    });
  }, [searchValue]);

  return (
    <div className="wrapper">
      <Ariakit.ComboboxProvider
        resetValueOnHide
        setValue={(value) => {
          startTransition(() => {
            setSearchValue(value);
          });
        }}
      >
        <Ariakit.SelectProvider>
          <Ariakit.Select className="items-center flex px-2 h-8 bg-gray-200 border-l border-l-gray-300" />
          <Ariakit.SelectPopover gutter={4} sameWidth className="popover">
            <div className="combobox-wrapper">
              <Ariakit.Combobox
                autoSelect
                placeholder="Search..."
                className="combobox w-36"
              />
            </div>
            <Ariakit.ComboboxList>
              {matches.map((value) => (
                <Ariakit.SelectItem
                  key={value}
                  value={value}
                  className="select-item"
                  render={<Ariakit.ComboboxItem />}
                />
              ))}
            </Ariakit.ComboboxList>
          </Ariakit.SelectPopover>
        </Ariakit.SelectProvider>
      </Ariakit.ComboboxProvider>
    </div>
  );
};

export default function CurrencyConverter() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CurrencyConverterSchema>({
    resolver: zodResolver(currencyConverterSchema),
    defaultValues: {
      fromCurrency: "",
      fromAmount: 0,
      toCurrency: "",
      toAmount: 0,
    },
  });

  const onSubmit = (data: CurrencyConverterSchema) => {
    console.log(data);
  };

  console.log("errors =>", errors);

  return (
    <div className="w-full max-w-[600px] mx-auto my-10 md:my-20 ">
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
                  name="fromCurrency"
                  render={({ field, fieldState: { error } }) => (
                    <Input
                      label="Amount"
                      name="fromCurrency"
                      type="text"
                      className="w-full"
                      register={field}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="fromCurrency"
                  render={({ field, fieldState: { error } }) => (
                    <CurrencySelector
                      currencies={["EUR", "GBP", "USD"]}
                      selectedCurrency={field.value}
                      setSelectedCurrency={field.onChange}
                    />
                  )}
                />
              </div>
              {errors?.fromCurrency && (
                <InputErrorMessage
                  message={errors?.fromCurrency?.message ?? ""}
                />
              )}
            </div>

            <div className=" w-full md:w-20 justify-center items-center flex">
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
                  name="toCurrency"
                  render={({ field, fieldState: { error } }) => (
                    <Input
                      label="Converted to"
                      name="toCurrency"
                      type="text"
                      className="w-full"
                      register={field}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="toCurrency"
                  render={({ field, fieldState: { error } }) => (
                    <CurrencySelector
                      currencies={["EUR", "GBP", "USD"]}
                      selectedCurrency={field.value}
                      setSelectedCurrency={field.onChange}
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
              <p className="text-sm md:text-base">€1.000 EUR = £0.8392 GBP</p>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full md:w-auto"
            >
              Convert
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
