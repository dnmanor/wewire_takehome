"use client";

import { Provider } from "react-redux";
import { Toaster } from "sonner";
import { store } from "@/app/store/store";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Toaster />
      <Provider store={store}>{children}</Provider>
    </>
  );
}
