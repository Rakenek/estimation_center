"use client";
import { Cost, Parameters, Project } from "@prisma/client";
import React, { useState } from "react";
import ComparisonSearchBar from "./ComparisonSearchBar";
import FilterButton from "./FilterButton";
import { X } from "lucide-react";
import MTable from "./MTable";
import { snakeToTitleCase } from "@/lib/customFunctions";

interface MultipleComparisonDashboardProps {
  allProjectsData: {
    id: string;
    name: string;
    city: string;
    status: string;
    cost: Cost | null;
    parameter: Parameters | null;
  }[];
}

type AllProjectsData = {
  id: string;
  name: string;
  city: string;
  status: string;
  cost: Cost | null;
  parameter: Parameters | null;
}[];

export default function MultipleComparisonDashboard({
  allProjectsData,
}: MultipleComparisonDashboardProps) {
  const [chosenProjects, setChosenProjects] = useState<AllProjectsData>([]);

  function handleSelectedProject(projectName: string) {
    const chosen = allProjectsData.filter(
      (project) => project.name === projectName
    );

    setChosenProjects((prev) => [...prev, ...chosen]);
  }

  function handleRemoveSelectedProject(projectName: string) {
    const filteredChosenProjects = chosenProjects.filter(
      (project) => project.name !== projectName
    );
    setChosenProjects(filteredChosenProjects);
  }

  const projectsName = allProjectsData.map((project) => project.name);
  const chosenProjectsName = chosenProjects.map((project) => project.name);
  const finalProjectsName = projectsName.filter(
    (item) => !chosenProjectsName.includes(item)
  );
  const { id, project_id, ...cost } = allProjectsData[0].cost;
  const costLabels = Object.keys(cost);
  const titleCasedCostLabels = costLabels.map((label) =>
    snakeToTitleCase(label)
  );

  const dataTable = chosenProjects.map((project) => {
    const { id, project_id, ...cost } = project.cost;
    const tab = Object.values(cost);
    const tab2 = tab.map((val) => {
      return val / project.parameter.pum_i_puu;
    });
    return tab2;
  });
  console.log(dataTable);

  return (
    <div className="text-white">
      <ComparisonSearchBar
        suggestions={finalProjectsName}
        handleSelectedProject={handleSelectedProject}
      />
      {chosenProjects.length > 0 || (
        <div className="flex justify-center items-center">
          Wybierz projekty z listy aby wyświetlić tabele
        </div>
      )}

      <div className="p-6 flex gap-3 justify-center items-center">
        {chosenProjects.map((project) => (
          <FilterButton
            text={project.name}
            onClick={() => {
              handleRemoveSelectedProject(project.name);
            }}
            key={project.id}
            icon={X}
          />
        ))}
      </div>

      <div className="flex items-center justify-center">
        {chosenProjects.length > 0 ? (
          <MTable
            rowLabels={chosenProjectsName}
            colLabels={titleCasedCostLabels}
            data={dataTable}
          />
        ) : null}
      </div>
    </div>
  );
}
