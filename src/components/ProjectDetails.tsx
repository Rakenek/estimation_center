"use client";
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import ParametersTable from "./ParametersTable";
import { Cost, Parameters } from "@prisma/client";
import CostTable from "./CostTable";

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
  const [isParameterShown, setIsParameterShown] = useState(false);

  const toggleParameterShown = () => {
    setIsParameterShown(!isParameterShown);
  };
  const toggleCostShown = () => {
    setIsCostShown(!isCostShown);
  };
  const toggleCostToPumShown = () => {
    setIsCostToPumShown(!isCostToPumShown);
  };
  const toggleCostToNettShown = () => {
    setIsCostToNettShown(!isCostToNettShown);
  };

  const togglers = [
    toggleCostShown,
    toggleCostToPumShown,
    toggleCostToNettShown,
    toggleParameterShown,
  ];

  return (
    <>
      <Sidebar togglers={togglers} />
      <div className="flex gap-4 items-start justify-center">
        {isCostShown ? (
          <CostTable cost={cost} tableName="Koszt inwestycji [PLN]" />
        ) : null}
        {isCostToPumShown ? (
          <CostTable
            cost={cost}
            divider={parameters.pum}
            tableName="Koszt inwestycji do PUM [PLN/PUM]"
          />
        ) : null}
        {isCostToNettShown ? (
          <CostTable
            cost={cost}
            divider={parameters.powierzchnia_netto}
            tableName="Koszt inwestycji do Netto [PLN/NETTO]"
          />
        ) : null}
        {isParameterShown ? <ParametersTable parameters={parameters} /> : null}
      </div>
    </>
  );
}
