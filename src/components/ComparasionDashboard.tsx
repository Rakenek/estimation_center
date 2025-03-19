'use client';
import React, { useState } from 'react';
import ComparasionElement from './ComparasionElement';
import { Cost, Parameters, Project } from '@prisma/client';
import { subtractObjects } from '@/lib/customFunctions';
import DifferenceTable from './DifferenceTable';
import { dividerType } from './CostTable';
import DropdownMenu from './DropDownMenu';

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
  const [indicatorType, setIndicatorType] = useState<dividerType>(
    dividerType.INDICATORS
  );
  const [selectedProject1, setSelectedProject1] = useState<{
    selectedCost: Cost;
    selectedParameters: Parameters;
  } | null>(null);

  const [selectedProject2, setSelectedProject2] = useState<{
    selectedCost: Cost;
    selectedParameters: Parameters;
  } | null>(null);

  const handleCost1 = (selectedCost: Cost, selectedParameters: Parameters) => {
    setSelectedProject1({
      selectedCost: selectedCost,
      selectedParameters: selectedParameters,
    });
  };

  const handleCost2 = (selectedCost: Cost, selectedParameters: Parameters) => {
    setSelectedProject2({
      selectedCost: selectedCost,
      selectedParameters: selectedParameters,
    });
  };

  const dropdownOptions = [
    '[PLN]',
    '[PLN/(PUM i PUU)]',
    '[PLN/NETTO]',
    'Wskaźniki miarodajne',
  ];

  const onDropdownChange = (option: string) => {
    if (option === '[PLN]') {
      setIndicatorType(dividerType.NONE);
    } else if (option === '[PLN/(PUM i PUU)]') {
      setIndicatorType(dividerType.PUMPUU);
    } else if (option === '[PLN/NETTO]') {
      setIndicatorType(dividerType.NETTO);
    } else if (option === 'Wskaźniki miarodajne') {
      setIndicatorType(dividerType.INDICATORS);
    }
  };

  return (
    <div className="flex">
      <div className="w-1/3">
        <ComparasionElement
          projects={projects}
          cost={cost}
          parameters={parameters}
          handleCost={handleCost1}
          divider={indicatorType}
        />
      </div>
      <div className="w-1/3">
        <ComparasionElement
          projects={projects}
          cost={cost}
          parameters={parameters}
          handleCost={handleCost2}
          divider={indicatorType}
        />
      </div>
      <div className="w-1/3">
        <div className="flex justify-center items-center">
          <DropdownMenu options={dropdownOptions} onSelect={onDropdownChange} />
        </div>
        {selectedProject1 && selectedProject2 ? (
          <div className="pt-[34.5px]">
            <DifferenceTable
              proj1={selectedProject1}
              proj2={selectedProject2}
              divider={indicatorType}
            />
          </div>
        ) : (
          <p>Proszę wybierz dwa projekty do porównania</p> // Add a fallback or loading state
        )}
      </div>
    </div>
  );
}
