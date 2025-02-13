"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/customFunctions"; // Optional utility for Tailwind classes

interface SidebarButtonProps {
  href: string;
  text: string;
}

const SidebarButton: React.FC<SidebarButtonProps> = ({ href, text }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  console.log(pathname, href);

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 p-3 rounded-md transition-all duration-200",
        isActive ? "bg-gray-700 text-white" : "text-gray-300 hover:bg-gray-700"
      )}
    >
      <span>{text}</span>
    </Link>
  );
};

export default SidebarButton;
