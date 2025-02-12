"use client";
import React from "react";
import SidebarButton from "./SidebarButton";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="min-w-64">
      <div>Koszt inwestycji [PLN]</div>
      <div>Koszt do PUM [PLN/PUM]</div>
      <div>Koszt do Netto [PLN/NETTO]</div>
      <div>Wskaźniki miarodajne</div>
      <div>Parametry inwestycji</div>
      <div>Edytuj projekt</div>
    </aside>
  );
}
