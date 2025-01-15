"use client";

import { useRouter } from "next/navigation";
import Button from "@/app/components/Button";
import Image from "next/image";

import { Transaction } from "@/app/types";
import { FC } from "react";
import { useGetUserTransactionsQuery } from "@/app/api/api";
import LoadingSpinner from "@/app/components/LoadingSpinner";

type TransactionCardProps = {
  transaction: Transaction;
};

const TransactionCard: FC<TransactionCardProps> = ({ transaction }) => {
  return (
    <div className="flex flex-row justify-between p-3 py-3 bg-gray-100 hover:bg-gray-200 transition-colors duration-200 rounded-md cursor-pointer w-full">
      <div className="">
        <div className="text-base font-medium flex items-center gap-x-2">
          <Image
            src="/arrow-right-left.svg"
            alt="tnsaction arrow"
            width={12}
            height={12}
          />
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
  const { data, isLoading, error } = useGetUserTransactionsQuery();

  if (error) {
    return <div className="w-full flex text-center justify-center items-center h-[60vh] md:h-screen text-red-600">Failed to load transaction history</div>;
  }

  if (isLoading) {
    return (
      <div className="w-full flex text-center justify-center items-center h-[60vh] md:h-screen">
        <LoadingSpinner colour="text-black" size={20} />
      </div>
    );
  }

  const renderTransactions = () => {
    if (data?.length === 0) {
      return (
        <div className="w-full text-center">
          You have made no transactions yet
        </div>
      );
    }

    return (
      <>
        {data && [...data].reverse().map((transaction) => (
          <TransactionCard key={transaction.id} transaction={transaction} />
        ))}
      </>
    );
  };

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
        {renderTransactions()}
      </div>
    </div>
  );
}
