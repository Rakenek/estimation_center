"use client";
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import ParametersTable from "./ParametersTable";
import { Cost, Parameters } from "@prisma/client";
import CostTable, { dividerType } from "./CostTable";
import { redirect } from "next/navigation";
import { useParams } from "next/navigation";

interface ProjectDetailsPageProp {
  parameters: Parameters;
  cost: Cost;
}

export default function ProjectDetailsPage({
  parameters,
  cost,
}: ProjectDetailsPageProp) {
  const [isCostShown, setIsCostShown] = useState(true);
  const [isCostToPumShown, setIsCostToPumShown] = useState(false);
  const [isCostToNettShown, setIsCostToNettShown] = useState(false);
  const [isIndicatorShown, setIsIndicatorShown] = useState(false);
  const [isParameterShown, setIsParameterShown] = useState(false);
  const params = useParams<{ projectId: string }>();
  const { projectId } = params;

  const toggleCostShown = () => {
    setIsCostShown(!isCostShown);
  };
  const toggleCostToPumShown = () => {
    setIsCostToPumShown(!isCostToPumShown);
  };
  const toggleCostToNettShown = () => {
    setIsCostToNettShown(!isCostToNettShown);
  };
  const toggleIndicatorShown = () => {
    setIsIndicatorShown(!isIndicatorShown);
  };
  const toggleParameterShown = () => {
    setIsParameterShown(!isParameterShown);
  };
  const toggleEdit = () => {
    redirect(`/projects/${projectId}/edit-project`);
  };

  const togglers = [
    toggleCostShown,
    toggleCostToPumShown,
    toggleCostToNettShown,
    toggleIndicatorShown,
    toggleParameterShown,
    toggleEdit,
  ];

  const labels = [
    "Koszt inwestycji [PLN]",
    "Koszt do PUM [PLN/PUM]",
    "Koszt do Netto [PLN/Netto]",
    "Miarodajne wskaźniki",
    "Parametry inwestycji",
    "Edytuj",
  ];

  const sidebarData = togglers.map((toggler, index) => {
    return { toggler, label: labels[index] };
  });

  return (
    <>
      <Sidebar sidebarData={sidebarData} />
      <div className="flex flex-wrap gap-4 items-start justify-center">
        {isCostShown ? (
          <CostTable
            cost={cost}
            parameters={parameters}
            tableName="Koszt inwestycji [PLN]"
          />
        ) : null}
        {isCostToPumShown ? (
          <CostTable
            cost={cost}
            parameters={parameters}
            tableName="Koszt inwestycji do PUM [PLN/PUM]"
            divider={dividerType.PUMPUU}
          />
        ) : null}
        {isCostToNettShown ? (
          <CostTable
            cost={cost}
            parameters={parameters}
            tableName="Koszt inwestycji do Netto [PLN/NETTO]"
            divider={dividerType.NETTO}
          />
        ) : null}
        {isIndicatorShown ? (
          <CostTable
            cost={cost}
            parameters={parameters}
            tableName="Wskaźniki miarodajne"
            divider={dividerType.INDICATORS}
          />
        ) : null}
        {isParameterShown ? <ParametersTable parameters={parameters} /> : null}
      </div>
    </>
  );
}
