"use client";
import React from "react";
import SidebarButton from "./SidebarButton";
import { useParams } from "next/navigation";

interface SidebarProps {
  togglers: (() => void)[];
}

export default function Sidebar({ togglers }: SidebarProps) {
  const params = useParams();
  console.log(params);

  return (
    <aside>
      <SidebarButton
        text={"Koszt inwestycji [PLN]"}
        onClick={togglers[0]}
        active
      />
      <SidebarButton text={"Koszt do PUM [PLN/PUM]"} onClick={togglers[1]} />
      <SidebarButton
        text={"Koszt do Netto [PLN/Netto]"}
        onClick={togglers[2]}
      />
      <SidebarButton text={"Parametry inwestycji"} onClick={togglers[3]} />
    </aside>
  );
}
