"use client";

import {useRouter} from "next/navigation";
import Button from "@/app/components/Button";
import Image from "next/image";

// Things to cover
//  - [] loading state
//  - [] empty state
//  - [] error state

const sampleData = [
  {
    id: "194bfb24-1043-4d91-8090-af817abfb924",
    reference: "5",
    userId: "0f82ef92-743a-442d-9c96-2ff3a61c18d2",
    fromCurrency: "JPY",
    toCurrency: "USD",
    fromAmount: "10000.00",
    toAmount: "63.42",
    status: "completed",
    createdAt: "2025-01-11T00:48:36.557Z",
    updatedAt: "2025-01-11T00:48:36.557Z",
  },
  {
    id: "4cc761da-112d-45e0-ac89-70d22d159b76",
    reference: "6",
    userId: "0f82ef92-743a-442d-9c96-2ff3a61c18d2",
    fromCurrency: "EUR",
    toCurrency: "GBP",
    fromAmount: "50.00",
    toAmount: "41.99",
    status: "completed",
    createdAt: "2025-01-11T00:49:03.922Z",
    updatedAt: "2025-01-11T00:49:03.922Z",
  },
  {
    id: "21154c1d-093a-4f2d-a821-9a9f74b0b411",
    reference: "7",
    userId: "0f82ef92-743a-442d-9c96-2ff3a61c18d2",
    fromCurrency: "EUR",
    toCurrency: "GHS",
    fromAmount: "50.00",
    toAmount: "756.40",
    status: "completed",
    createdAt: "2025-01-11T00:49:15.877Z",
    updatedAt: "2025-01-11T00:49:15.877Z",
  },
  {
    id: "5826f5e0-82a9-43de-9e34-e508995a51df",
    reference: "8",
    userId: "0f82ef92-743a-442d-9c96-2ff3a61c18d2",
    fromCurrency: "EUR",
    toCurrency: "GHS",
    fromAmount: "60.00",
    toAmount: "911.52",
    status: "completed",
    createdAt: "2025-01-11T12:36:33.200Z",
    updatedAt: "2025-01-11T12:36:33.200Z",
  },
  {
    id: "f6a3c32b-89cd-4b97-b0ca-e99cf9100138",
    reference: "9",
    userId: "0f82ef92-743a-442d-9c96-2ff3a61c18d2",
    fromCurrency: "EUR",
    toCurrency: "USD",
    fromAmount: "60.00",
    toAmount: "61.53",
    status: "completed",
    createdAt: "2025-01-11T12:36:37.771Z",
    updatedAt: "2025-01-11T12:36:37.771Z",
  },
  {
    id: "78886b11-ce79-44df-89ea-0642c2722f35",
    reference: "10",
    userId: "0f82ef92-743a-442d-9c96-2ff3a61c18d2",
    fromCurrency: "CAD",
    toCurrency: "USD",
    fromAmount: "60.00",
    toAmount: "41.60",
    status: "completed",
    createdAt: "2025-01-11T12:36:47.060Z",
    updatedAt: "2025-01-11T12:36:47.060Z",
  },
  {
    id: "194bfb24-1043-4d91-8090-af817abfb924",
    reference: "5",
    userId: "0f82ef92-743a-442d-9c96-2ff3a61c18d2",
    fromCurrency: "JPY",
    toCurrency: "USD",
    fromAmount: "10000.00",
    toAmount: "63.42",
    status: "completed",
    createdAt: "2025-01-11T00:48:36.557Z",
    updatedAt: "2025-01-11T00:48:36.557Z",
  },
  {
    id: "4cc761da-112d-45e0-ac89-70d22d159b76",
    reference: "6",
    userId: "0f82ef92-743a-442d-9c96-2ff3a61c18d2",
    fromCurrency: "EUR",
    toCurrency: "GBP",
    fromAmount: "50.00",
    toAmount: "41.99",
    status: "completed",
    createdAt: "2025-01-11T00:49:03.922Z",
    updatedAt: "2025-01-11T00:49:03.922Z",
  },
  {
    id: "21154c1d-093a-4f2d-a821-9a9f74b0b411",
    reference: "7",
    userId: "0f82ef92-743a-442d-9c96-2ff3a61c18d2",
    fromCurrency: "EUR",
    toCurrency: "GHS",
    fromAmount: "50.00",
    toAmount: "756.40",
    status: "completed",
    createdAt: "2025-01-11T00:49:15.877Z",
    updatedAt: "2025-01-11T00:49:15.877Z",
  },
  {
    id: "5826f5e0-82a9-43de-9e34-e508995a51df",
    reference: "8",
    userId: "0f82ef92-743a-442d-9c96-2ff3a61c18d2",
    fromCurrency: "EUR",
    toCurrency: "GHS",
    fromAmount: "60.00",
    toAmount: "911.52",
    status: "completed",
    createdAt: "2025-01-11T12:36:33.200Z",
    updatedAt: "2025-01-11T12:36:33.200Z",
  },
  {
    id: "f6a3c32b-89cd-4b97-b0ca-e99cf9100138",
    reference: "9",
    userId: "0f82ef92-743a-442d-9c96-2ff3a61c18d2",
    fromCurrency: "EUR",
    toCurrency: "USD",
    fromAmount: "60.00",
    toAmount: "61.53",
    status: "completed",
    createdAt: "2025-01-11T12:36:37.771Z",
    updatedAt: "2025-01-11T12:36:37.771Z",
  },
  {
    id: "78886b11-ce79-44df-89ea-0642c2722f35",
    reference: "10",
    userId: "0f82ef92-743a-442d-9c96-2ff3a61c18d2",
    fromCurrency: "CAD",
    toCurrency: "USD",
    fromAmount: "60.00",
    toAmount: "41.60",
    status: "completed",
    createdAt: "2025-01-11T12:36:47.060Z",
    updatedAt: "2025-01-11T12:36:47.060Z",
  },
  {
    id: "194bfb24-1043-4d91-8090-af817abfb924",
    reference: "5",
    userId: "0f82ef92-743a-442d-9c96-2ff3a61c18d2",
    fromCurrency: "JPY",
    toCurrency: "USD",
    fromAmount: "10000.00",
    toAmount: "63.42",
    status: "completed",
    createdAt: "2025-01-11T00:48:36.557Z",
    updatedAt: "2025-01-11T00:48:36.557Z",
  },
  {
    id: "4cc761da-112d-45e0-ac89-70d22d159b76",
    reference: "6",
    userId: "0f82ef92-743a-442d-9c96-2ff3a61c18d2",
    fromCurrency: "EUR",
    toCurrency: "GBP",
    fromAmount: "50.00",
    toAmount: "41.99",
    status: "completed",
    createdAt: "2025-01-11T00:49:03.922Z",
    updatedAt: "2025-01-11T00:49:03.922Z",
  },
  {
    id: "21154c1d-093a-4f2d-a821-9a9f74b0b411",
    reference: "7",
    userId: "0f82ef92-743a-442d-9c96-2ff3a61c18d2",
    fromCurrency: "EUR",
    toCurrency: "GHS",
    fromAmount: "50.00",
    toAmount: "756.40",
    status: "completed",
    createdAt: "2025-01-11T00:49:15.877Z",
    updatedAt: "2025-01-11T00:49:15.877Z",
  },
  {
    id: "5826f5e0-82a9-43de-9e34-e508995a51df",
    reference: "8",
    userId: "0f82ef92-743a-442d-9c96-2ff3a61c18d2",
    fromCurrency: "EUR",
    toCurrency: "GHS",
    fromAmount: "60.00",
    toAmount: "911.52",
    status: "completed",
    createdAt: "2025-01-11T12:36:33.200Z",
    updatedAt: "2025-01-11T12:36:33.200Z",
  },
  {
    id: "f6a3c32b-89cd-4b97-b0ca-e99cf9100138",
    reference: "9",
    userId: "0f82ef92-743a-442d-9c96-2ff3a61c18d2",
    fromCurrency: "EUR",
    toCurrency: "USD",
    fromAmount: "60.00",
    toAmount: "61.53",
    status: "completed",
    createdAt: "2025-01-11T12:36:37.771Z",
    updatedAt: "2025-01-11T12:36:37.771Z",
  },
  {
    id: "78886b11-ce79-44df-89ea-0642c2722f35",
    reference: "10",
    userId: "0f82ef92-743a-442d-9c96-2ff3a61c18d2",
    fromCurrency: "CAD",
    toCurrency: "USD",
    fromAmount: "60.00",
    toAmount: "41.60",
    status: "completed",
    createdAt: "2025-01-11T12:36:47.060Z",
    updatedAt: "2025-01-11T12:36:47.060Z",
  },
  {
    id: "194bfb24-1043-4d91-8090-af817abfb924",
    reference: "5",
    userId: "0f82ef92-743a-442d-9c96-2ff3a61c18d2",
    fromCurrency: "JPY",
    toCurrency: "USD",
    fromAmount: "10000.00",
    toAmount: "63.42",
    status: "completed",
    createdAt: "2025-01-11T00:48:36.557Z",
    updatedAt: "2025-01-11T00:48:36.557Z",
  },
  {
    id: "4cc761da-112d-45e0-ac89-70d22d159b76",
    reference: "6",
    userId: "0f82ef92-743a-442d-9c96-2ff3a61c18d2",
    fromCurrency: "EUR",
    toCurrency: "GBP",
    fromAmount: "50.00",
    toAmount: "41.99",
    status: "completed",
    createdAt: "2025-01-11T00:49:03.922Z",
    updatedAt: "2025-01-11T00:49:03.922Z",
  },
  {
    id: "21154c1d-093a-4f2d-a821-9a9f74b0b411",
    reference: "7",
    userId: "0f82ef92-743a-442d-9c96-2ff3a61c18d2",
    fromCurrency: "EUR",
    toCurrency: "GHS",
    fromAmount: "50.00",
    toAmount: "756.40",
    status: "completed",
    createdAt: "2025-01-11T00:49:15.877Z",
    updatedAt: "2025-01-11T00:49:15.877Z",
  },
  {
    id: "5826f5e0-82a9-43de-9e34-e508995a51df",
    reference: "8",
    userId: "0f82ef92-743a-442d-9c96-2ff3a61c18d2",
    fromCurrency: "EUR",
    toCurrency: "GHS",
    fromAmount: "60.00",
    toAmount: "911.52",
    status: "completed",
    createdAt: "2025-01-11T12:36:33.200Z",
    updatedAt: "2025-01-11T12:36:33.200Z",
  },
  {
    id: "f6a3c32b-89cd-4b97-b0ca-e99cf9100138",
    reference: "9",
    userId: "0f82ef92-743a-442d-9c96-2ff3a61c18d2",
    fromCurrency: "EUR",
    toCurrency: "USD",
    fromAmount: "60.00",
    toAmount: "61.53",
    status: "completed",
    createdAt: "2025-01-11T12:36:37.771Z",
    updatedAt: "2025-01-11T12:36:37.771Z",
  },
  {
    id: "78886b11-ce79-44df-89ea-0642c2722f35",
    reference: "10",
    userId: "0f82ef92-743a-442d-9c96-2ff3a61c18d2",
    fromCurrency: "CAD",
    toCurrency: "USD",
    fromAmount: "60.00",
    toAmount: "41.60",
    status: "completed",
    createdAt: "2025-01-11T12:36:47.060Z",
    updatedAt: "2025-01-11T12:36:47.060Z",
  },
];

type TransactionCardProps = {
  id: string;
  reference: string;
  userId: string;
  fromCurrency: string;
  toCurrency: string;
  fromAmount: string;
  toAmount: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

const TransactionCard = ({transaction}: {transaction: TransactionCardProps}) => {
  return (
    <div className="flex flex-row justify-between p-3 py-3 bg-gray-100 hover:bg-gray-200 transition-colors duration-200 rounded-md cursor-pointer w-full">
      <div className="">
        <div className="text-base font-medium flex items-center gap-x-2">
          <Image src="/arrow-right-left.svg" alt="tnsaction arrow" width={12} height={12} />
          Converted {transaction.fromCurrency} to {transaction.toCurrency}
        </div>
        <p className="text-xs text-gray-500">
          {new Date(transaction.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>

      <div className="flex flex-col text-sm items-end font-semibold">
        <p>
          - {transaction.fromCurrency} {transaction.fromAmount}
        </p>
        <p className="text-gray-700 text-sm">
          + {transaction.toCurrency} {transaction.toAmount}
        </p>
      </div>
    </div>
  );
};

export default function Transactions() {
  const router = useRouter();

  return (
    <div className="md:w-[600px] w-full mx-auto md:my-20 h-full">
      <div className="flex flex-row justify-between items-center mb-8 sticky top-0 bg-white py-4 z-10">
        <h1 className="font-bold">All transactions</h1>
        <Button
          className=" font-medium"
          variant="primary"
          onClick={() => router.push("/dashboard/currency-converter")}
        >
          New transaction
        </Button>
      </div>
      <div className="flex flex-col gap-3 overflow-y-scroll h-[60vh] md:h-4/5">
        {sampleData.map((transaction) => (
          <TransactionCard key={transaction.id} transaction={transaction} />
        ))}
      </div>
    </div>
  );
}
