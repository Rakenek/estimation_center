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
  const params = useParams();
  console.log(params);

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
      {/* <SidebarButton
        text={'Koszt inwestycji [PLN]'}
        onClick={togglers[0]}
        active
      />
      <SidebarButton text={'Koszt do PUM [PLN/PUM]'} onClick={togglers[1]} />
      <SidebarButton
        text={'Koszt do Netto [PLN/Netto]'}
        onClick={togglers[2]}
      />
      <SidebarButton text={'Parametry inwestycji'} onClick={togglers[3]} /> */}
    </aside>
  );
}
