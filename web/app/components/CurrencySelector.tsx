"use client";

import {FC, useState} from "react";

export interface CurrencySelectorProps {
  currencies: string[];
  selectedCurrency: string;
  onSelectCurrency: (value: string) => void;
}

export const CurrencySelector: FC<CurrencySelectorProps> = ({
  currencies,
  selectedCurrency,
  onSelectCurrency,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredCurrencies = currencies.filter((currency) =>
    currency.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="relative w-[120px] h-8">
      <button
        type="button"
        className="w-full flex justify-between items-center border border-gray-300 rounded-md px-3 h-full text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        role="combobox"
      >
        {selectedCurrency || "Select currency"}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg ">
          <input
            type="text"
            placeholder="Search currency..."
            className="w-full px-3 py-2 border-b bg-transparent border-gray-200 text-sm focus:outline-none"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />

          <ul
            className="max-h-60 overflow-y-auto py-1 text-sm"
            role="listbox"
            aria-labelledby="currency-selector"
          >
            {filteredCurrencies.length > 0 ? (
              filteredCurrencies.map((currency) => (
                <li
                  key={currency}
                  role="option"
                  aria-selected={currency === selectedCurrency}
                  className={`px-3 py-2 cursor-pointer hover:bg-indigo-100 ${
                    currency === selectedCurrency ? "bg-indigo-500 text-white" : ""
                  }`}
                  onClick={() => {
                    onSelectCurrency(currency);
                    setIsOpen(false);
                    setSearchValue("");
                  }}
                >
                  {currency}
                </li>
              ))
            ) : (
              <li className="px-3 py-2 text-gray-500">No currency found.</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};
