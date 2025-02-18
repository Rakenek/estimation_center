'use client';
import React from 'react';
import SidebarButton from './SidebarButton';
import { useParams } from 'next/navigation';

interface SidebarProps {
  sidebarData: {
    toggler: () => void;
    label: string;
  }[];
}

export default function Sidebar({ sidebarData }: SidebarProps) {
  return (
    <aside>
      {sidebarData.map((item, index) => {
        const active = index === 0;
        return (
          <SidebarButton
            key={item.label}
            text={item.label}
            onClick={item.toggler}
            active={active}
          />
        );
      })}
    </aside>
  );
}
