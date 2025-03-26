'use client';
import React, { useState } from 'react';
import { Cost, Parameters } from '@prisma/client';
import ProjectDetailsPage from './ProjectDetails';
import ProjectChartReport from './ProjectChartReport';

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
  return (
    <>
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
