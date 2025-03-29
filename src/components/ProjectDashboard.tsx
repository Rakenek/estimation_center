"use client";
import React, { useState } from "react";
import { Cost, Parameters } from "@prisma/client";
import ProjectDetailsPage from "./ProjectDetails";
import ProjectChartReport from "./ProjectChartReport";
import Button from "./Button";

interface ProjectDashboardProp {
  parameters: Parameters;
  cost: Cost;
  projectName: string;
}

export default function ProjectDashboard({
  parameters,
  cost,
  projectName,
}: ProjectDashboardProp) {
  const [isTableMode, setIsTableMode] = useState(true);
  const toggleTableMode = () => {
    setIsTableMode((prev) => !prev);
  };

  return (
    <>
      <div className="absolute top-20 left-80 z-5">
        <Button onClick={toggleTableMode}>
          {isTableMode
            ? "Zobacz udział % poszczególnych pakietów"
            : "Pokaż zestawienie tabelaryczne"}
        </Button>
      </div>

      {isTableMode ? (
        <ProjectDetailsPage
          parameters={parameters}
          cost={cost}
          projectName={projectName}
        />
      ) : (
        <ProjectChartReport
          parameters={parameters}
          cost={cost}
          projectName={projectName}
        />
      )}
    </>
  );
}
