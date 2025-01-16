"use client"
import Link from "next/link";
import {usePathname} from "next/navigation";

export const NavLink = ({href, children}: {href: string; children: React.ReactNode}) => {
    const pathname = usePathname();
    const isActive = pathname === href;
  
    return (
      <Link
        href={href}
        className={`px-3 py-2 text-gray-600 text-sm md:w-full ${
          isActive ? "md:bg-gray-200 font-bold" : ""
        }`}
      >
        {children}
      </Link>
    );
  };