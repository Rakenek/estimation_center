import { Cost, Parameters } from '@prisma/client';
import React from 'react';

interface ProjectChartReportProp {
  parameters: Parameters;
  cost: Cost;
  projectName: string;
}

export default function ProjectChartReport({
  parameters,
  cost,
  projectName,
}: ProjectChartReportProp) {
  return (
    <div className="pt-24 flex items-center justify-center">
      <h2 className="text-4xl">ProjectChartReport</h2>
    </div>
  );
}
