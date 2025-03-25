import Navbar from '@/components/Navbar';
import React from 'react';
import '../globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Estimation Center',
  description: 'Budget Estimation Analysis',
};

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex flex-col ">
      <div className="flex justify-between items-center">
        <Navbar />
      </div>
      <div></div>
      <div className="min-h-screen bg-backgroundLight">{children}</div>
    </div>
  );
}
