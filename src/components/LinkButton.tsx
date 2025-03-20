import Link from "next/link";
import React from "react";

interface LinkButtonProps {
  children: React.ReactNode;
  href: string;
}

export default function LinkButton({ children, href }: LinkButtonProps) {
  return (
    <Link
      href={href}
      className="inline-block px-6 py-2.5 bg-blue-500 text-white font-semibold text-lg rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
    >
      {children}
    </Link>
  );
}
