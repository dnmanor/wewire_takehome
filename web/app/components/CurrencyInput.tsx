import {FC} from "react";

import {Control, useController} from "react-hook-form";
import Input, {InputProps} from "./Input";
import {CurrencySelector, CurrencySelectorProps} from "./CurrencySelector";

interface CurrencyInputProps {
  inputProps: InputProps;
  currencySelectorProps: CurrencySelectorProps & {name: string};
  label?: string;
  control: Control<any>;
}

export const CurrencyInput: FC<CurrencyInputProps> = ({
  inputProps,
  currencySelectorProps,
  control,
  label,
}) => {
  const {field: inputField} = useController({control, name: inputProps.name});
  const {field: currencySelectorField} = useController({control, name: currencySelectorProps.name});

  return (
    <div className="w-full flex items-start  flex-col gap-2">
      {label && <label htmlFor={inputProps.name}>{label}</label>}
      <div className="flex items-end border bg-gray-200 rounded-md hover:bg-gray-300 transition-all">
        <Input
          {...inputProps}
          value={inputField.value}
          inputClassName="p-0"
          onChange={(e) => {
            const value = e.target.value;
            if (/^\d*\.?\d{0,2}$/.test(value)) {
              inputProps.onChange?.(e);
              inputField.onChange(value);
            }
          }}
        />
        <CurrencySelector
          {...currencySelectorProps}
          selectedCurrency={currencySelectorField.value}
          onSelectCurrency={(value) => {
            const finalValue = currencySelectorProps?.onSelectCurrency(value);
            currencySelectorField.onChange(finalValue);
          }}
        />
      </div>
    </div>
  );
};
