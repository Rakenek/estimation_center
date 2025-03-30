"use client";

import {
  ChartColumn,
  HousePlus,
  LineChart,
  LucideIcon,
  Scale,
  SearchCheck,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const iconMap: Record<string, LucideIcon> = {
  LineChart, // Map icon name to actual component
  SearchCheck,
  Scale,
  HousePlus,
  ChartColumn,
};

interface NavigationButtonProps {
  href: string;
  text: string;
  iconName: keyof typeof iconMap;
}

const NavigationButton: React.FC<NavigationButtonProps> = ({
  href,
  text,
  iconName,
}) => {
  const pathname = usePathname();
  const isActive = pathname.includes(href);
  const Icon = iconMap[iconName];

  return (
    <Link
      href={href}
      className={`flex w-64 items-center justify-center gap-3 p-3 h-16  transition-all duration-200 ${
        isActive ? "bg-gray-700 text-white" : "text-gray-300 hover:bg-gray-700"
      }`}
    >
      <span className="flex">
        <Icon className="mr-2" />
        {text}
      </span>
    </Link>
  );
};

export default NavigationButton;
