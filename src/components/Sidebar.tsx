"use client";
import React from "react";
import SidebarButton from "./SidebarButton";

interface SidebarProps {
  sidebarData: {
    toggler: () => void;
    label: string;
  }[];
}

export default function Sidebar({ sidebarData }: SidebarProps) {
  return (
    <aside className="bg-background min-h-screen pt-40">
      {sidebarData.map((item, index) => {
        const active = index !== 3 && index !== 5;
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
