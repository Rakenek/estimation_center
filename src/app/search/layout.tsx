import Navbar from '@/components/Navbar';
import React from 'react';

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex flex-col ">
      <div className="flex justify-between items-center">
        <Navbar />
      </div>
      <div className="flex-grow h-screen ">{children}</div>
    </div>
  );
}
