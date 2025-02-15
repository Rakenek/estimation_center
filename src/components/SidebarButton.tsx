"use client";
import { cn } from "@/lib/customFunctions"; // Optional utility for Tailwind classes
import { useState } from "react";

interface SidebarButtonProps {
  text: string;
  onClick: () => void;
}

const SidebarButton: React.FC<SidebarButtonProps> = ({ text, onClick }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <button
      onClick={() => {
        onClick();
        setIsActive(!isActive);
      }}
      className={cn(
        "flex items-center gap-3 p-3 rounded-md transition-all duration-200",
        isActive ? "bg-gray-700 text-white" : "text-gray-300 hover:bg-gray-700"
      )}
    >
      <span>{text}</span>
    </button>
  );
};

export default SidebarButton;
