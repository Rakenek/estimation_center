"use client";
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import ParametersTable from "./ParametersTable";
import { Cost, Parameters } from "@prisma/client";
import CostTable, { dividerType } from "./CostTable";
import { redirect } from "next/navigation";
import { useParams } from "next/navigation";
import Button from "./Button";

interface ProjectDetailsPageProp {
  parameters: Parameters;
  cost: Cost;
  projectName: string;
}

export default function ProjectDetailsPage({
  parameters,
  cost,
  projectName,
}: ProjectDetailsPageProp) {
  const [isCostShown, setIsCostShown] = useState(true);
  const [isCostToPumShown, setIsCostToPumShown] = useState(true);
  const [isCostToNettShown, setIsCostToNettShown] = useState(true);
  const [isIndicatorShown, setIsIndicatorShown] = useState(true);
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
    redirect(`/project/${projectId}/edit-project`);
  };
  const toggleDelete = () => {
    redirect(`/project/${projectId}/delete-project`);
  };

  const togglers = [
    toggleCostShown,
    toggleCostToPumShown,
    toggleCostToNettShown,
    toggleIndicatorShown,
    toggleParameterShown,
    toggleEdit,
    toggleDelete,
  ];

  const labels = [
    "Koszt inwestycji [PLN]",
    "Koszt do PUM [PLN/PUM]",
    "Koszt do Netto [PLN/Netto]",
    "Miarodajne wskaźniki",
    "Parametry inwestycji",
    "Edytuj",
    "Usuń",
  ];

  const sidebarData = togglers.map((toggler, index) => {
    return { toggler, label: labels[index] };
  });

  return (
    <div className="grid grid-cols-[250px_1fr] gap-4">
      <Sidebar sidebarData={sidebarData} />
      <div className="pt-20">
        <div className="text-4xl grow items-center justify-center">
          <div className="flex items-center justify-center">
            <h1 className="text-4xl">{projectName}</h1>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 items-start justify-center pt-5">
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
          {isParameterShown ? (
            <ParametersTable parameters={parameters} />
          ) : null}
        </div>
      </div>
    </div>
  );
}
