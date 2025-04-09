// components/Button.tsx
import React from "react";
import { LucideIcon } from "lucide-react";

type ButtonProps = {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
};

const FilterButton: React.FC<ButtonProps> = ({
  text,
  onClick,
  type = "button",
  className = "",
  icon: Icon,
  iconPosition = "left",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-md ${className}`}
    >
      {Icon && iconPosition === "left" && <Icon size={18} />}
      <span className="text-xs">{text}</span>
      {Icon && iconPosition === "right" && <Icon size={18} />}
    </button>
  );
};

export default FilterButton;
