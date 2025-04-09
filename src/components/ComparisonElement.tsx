"use client";
import React, { useState } from "react";
import ComparisonSearchBar from "./ComparisonSearchBar";
import { Cost, Parameters, Project } from "@prisma/client";
import CostTable, { dividerType } from "./CostTable";

interface ComparisonDashboard {
  projects: Project[];
  cost: Cost[];
  parameters: Parameters[];
  handleCost: (selectedCost: Cost, selectedParameters: Parameters) => void;
  divider: dividerType;
}

export default function ComparisonElement({
  projects,
  cost,
  parameters,
  handleCost,
  divider,
}: ComparisonDashboard) {
  const [selectedProject, setSelectedProject] = useState<Project>(null);
  const [selectedCost, setSelectedCost] = useState<Cost>(null);
  const [selectedParameters, setSelectedParameters] =
    useState<Parameters>(null);
  const projectsNames = projects.map((project) => project.name);

  function handleSelectedProject(projectName: string) {
    const selProject = projects.find((project) => project.name === projectName);
    const selCost = cost.find((cost) => cost.project_id === selProject.id);
    const selParameters = parameters.find(
      (parameter) => parameter.project_id === selProject.id
    );
    setSelectedProject(selProject);
    setSelectedCost(selCost);
    setSelectedParameters(selParameters);
    handleCost(selCost, selParameters);
  }

  return (
    <>
      <div className="p-8">
        <ComparisonSearchBar
          suggestions={projectsNames}
          handleSelectedProject={handleSelectedProject}
        />
      </div>
      <div>
        {selectedCost ? (
          <CostTable
            divider={divider}
            cost={selectedCost}
            parameters={selectedParameters}
            tableName={`${selectedProject.name} - wskaźniki miarodajne`}
          />
        ) : null}
      </div>
    </>
  );
}
