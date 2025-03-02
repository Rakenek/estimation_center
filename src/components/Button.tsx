import React, { ReactNode } from "react";

interface ButtonProps {
  onClick: () => void;
  children: ReactNode;
}

export default function Button({ onClick, children }: ButtonProps) {
  return (
    <button className="p-7 rounded bg-blue-400" onClick={onClick}>
      {children}
    </button>
  );
}
