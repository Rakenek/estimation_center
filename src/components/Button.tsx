import React, { ReactNode } from 'react';

interface ButtonProps {
  onClick: () => void;
  children: ReactNode;
}

export default function Button({ onClick, children }: ButtonProps) {
  return (
    <button className="p-3 rounded bg-blue-400 flex" onClick={onClick}>
      {children}
    </button>
  );
}
