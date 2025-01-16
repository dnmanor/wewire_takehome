import { Metadata } from "next";
import { NavLink } from "../components/NavLink";

export const metadata: Metadata = {
  title: "WeWire | Dashboard",
  description: "Convert money, quick and easy",
};


export default function DashboardLayout({children}: {children: React.ReactNode}) {
  return (
      <div className="flex flex-col min-h-screen">
        <section className="flex flex-col md:flex-row h-screen">
          <div className="flex md:flex-col flex-row gap-y-3 py-8 items-start md:border-r border-gray-200 md:w-64 w-full md:h-screen md:overflow-y-auto">
            <h1 className="hidden md:block sm:text-2xl font-bold px-3 mb-3">Dashboard</h1>
            <NavLink href="/dashboard/currency-converter">Convert</NavLink>
            <NavLink href="/dashboard/transactions">Transactions</NavLink>
          </div>
          <div className="flex-1 pb-10 overflow-y-auto">
            <h1 className="block md:hidden text-2xl font-bold px-4 mb-3">Dashboard</h1>
            <div className="flex-1 mx-5">{children}</div>
          </div>
        </section>
      </div>
  );
}
