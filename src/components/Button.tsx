'use client';
import React, { ReactNode } from 'react';

interface ButtonProps {
  onClick: () => void;
  children: ReactNode;
  className?: string;
}

export default function Button({ onClick, children, className }: ButtonProps) {
  return (
    <button
      className={`p-3 rounded flex hover:bg-blue-300 ${
        className?.includes('bg-blue-300') ? '' : 'bg-blue-500'
      } ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
