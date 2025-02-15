"use client";
import { cn } from "@/lib/customFunctions"; // Optional utility for Tailwind classes
import { useState } from "react";

interface SidebarButtonProps {
  text: string;
  onClick: () => void;
  active?: boolean;
}

const SidebarButton: React.FC<SidebarButtonProps> = ({
  text,
  onClick,
  active = false,
}) => {
  const [isActive, setIsActive] = useState(active);

  return (
    <button
      onClick={() => {
        onClick();
        setIsActive(!isActive);
      }}
      className={cn(
        "flex w-full items-center gap-3 p-3 transition-all duration-200",
        isActive ? "bg-gray-700 text-white" : "text-gray-300 hover:bg-gray-700"
      )}
    >
      <span>{text}</span>
    </button>
  );
};

export default SidebarButton;
