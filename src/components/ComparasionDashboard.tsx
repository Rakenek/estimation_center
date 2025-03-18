'use client';
import React, { useState } from 'react';
import ComparasionElement from './ComparasionElement';
import { Cost, Parameters, Project } from '@prisma/client';

interface ComparasionDashboardProps {
  projects: Project[];
  cost: Cost[];
  parameters: Parameters[];
}

export default function ComparasionDashboard({
  projects,
  cost,
  parameters,
}: ComparasionDashboardProps) {
  const [selectedCost1, setSelectedCost1] = useState<Cost>(null);
  const [selectedCost2, setSelectedCost2] = useState<Cost>(null);

  const handleCost1 = (selectedCost: Cost) => {
    setSelectedCost1(selectedCost);
  };
  const handleCost2 = (selectedCost: Cost) => {
    setSelectedCost2(selectedCost);
  };

  return (
    <div className="flex">
      <div className="w-1/3">
        <ComparasionElement
          projects={projects}
          cost={cost}
          parameters={parameters}
          handleCost={handleCost1}
        />
      </div>
      <div className="w-1/3">
        <ComparasionElement
          projects={projects}
          cost={cost}
          parameters={parameters}
          handleCost={handleCost2}
        />
      </div>
      <div className="w-1/3"></div>
    </div>
  );
}
