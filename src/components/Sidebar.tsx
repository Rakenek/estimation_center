"use client";
import React from "react";
import NavigationButton from "./NavigationButton";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function Sidebar() {
  const params = useParams();
  console.log(params);

  return (
    <aside className="min-w-64">
      <NavigationButton
        href={`/projects/${params.projectId}/cost`}
        text={"Koszt inwestycji [PLN]"}
      />
      <NavigationButton
        href={`/projects/${params.projectId}/cost-to-pum`}
        text={"Koszt do PUM"}
      />
      <NavigationButton
        href={`/projects/${params.projectId}/cost-to-nett`}
        text={"Koszt do Netto"}
      />
      <NavigationButton
        href={`/projects/${params.projectId}/indicators`}
        text={"Wskaźniki miarodajne"}
      />
      <NavigationButton
        href={`/projects/${params.projectId}/parameters`}
        text={"Parametry inwestycji"}
      />
      <NavigationButton
        href={`/projects/${params.projectId}/edit-project`}
        text={"Edytuj projekt"}
      />
    </aside>
  );
}
