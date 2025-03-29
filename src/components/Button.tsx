import React, { ReactNode } from "react";

interface ButtonProps {
  onClick: () => void;
  children: ReactNode;
  className?: string;
}

export default function Button({ onClick, children, className }: ButtonProps) {
  return (
    <button
      className={`p-3 rounded bg-blue-500 flex hover:bg-blue-300 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
