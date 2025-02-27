"use client";

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
      className={` h-16 flex w-full items-center justify-start gap-3 p-3 transition-all duration-200 ${
        isActive ? "bg-gray-700 text-white" : "text-gray-300 hover:bg-gray-700"
      } ${
        text === "Edytuj" ? "h-10 bg-green-800 hover:bg-green-500 mt-24" : ""
      }${text === "Usuń" ? "h-10 bg-red-800 hover:bg-red-500" : ""}`}
    >
      <span>{text}</span>
    </button>
  );
};

export default SidebarButton;
