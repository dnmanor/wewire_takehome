'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import * as Ariakit from '@ariakit/react';
import { matchSorter } from 'match-sorter';
import { startTransition, useMemo, useState } from 'react';

import Input from '../../components/Input';
import Button from '../../components/Button';

const currencyConverterSchema = z.object({
  fromCurrency: z.string().min(1, { message: 'From currency is required' }),
  fromAmount: z.number({ required_error: 'From amount is required' }),
  toCurrency: z.string().min(1, { message: 'To currency is required' }),
  toAmount: z.number({ required_error: 'To amount is required' }),
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
  const [searchValue, setSearchValue] = useState('');

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
              <Ariakit.Combobox autoSelect placeholder="Search..." className="combobox" />
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
  const { control, handleSubmit } = useForm<CurrencyConverterSchema>({
    resolver: zodResolver(currencyConverterSchema),
    defaultValues: {
      fromCurrency: '',
      fromAmount: 0,
      toCurrency: '',
      toAmount: 0,
    },
  });

  const onSubmit = (data: CurrencyConverterSchema) => {
    console.log(data);
  };

  return (
    <div className="w-[600px] mx-auto my-20">
      <h1 className="font-bold mb-8">Currency Converter</h1>
      <div className="flex gap-4 mt-4 flex-col">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-row gap-2">
            <div className="w-full flex items-end justify-between">
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
                    errorMessage={error?.message}
                  />
                )}
              />
              <Controller
                control={control}
                name="fromCurrency"
                render={({ field, fieldState: { error } }) => (
                  <CurrencySelector
                    currencies={['EUR', 'GBP', 'USD']}
                    selectedCurrency={field.value}
                    setSelectedCurrency={field.onChange}
                  />
                )}
              />
            </div>

            <div className="w-full flex items-end justify-between">
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
                    errorMessage={error?.message}
                  />
                )}
              />
              <Controller
                control={control}
                name="toCurrency"
                render={({ field, fieldState: { error } }) => (
                  <CurrencySelector
                    currencies={['EUR', 'GBP', 'USD']}
                    selectedCurrency={field.value}
                    setSelectedCurrency={field.onChange}
                  />
                )}
              />
            </div>
          </div>

          <div className="flex flex-row justify-between items-center mt-4">
            <div>
              <p>€1.000 EUR = £0.8392 GBP</p>
            </div>

            <Button type="submit" variant="primary">Convert</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
