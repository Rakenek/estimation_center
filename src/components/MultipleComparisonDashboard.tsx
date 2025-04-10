"use client";
import { Cost, Parameters } from "@prisma/client";
import React, { useState } from "react";
import ComparisonSearchBar from "./ComparisonSearchBar";
import FilterButton from "./FilterButton";
import { X } from "lucide-react";
import MTable from "./MTable";
import { snakeToTitleCase } from "@/lib/customFunctions";
import DropdownMenu from "./DropDownMenu";

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
  const dropdownDividerOptions = [
    "w [PLN]",
    "w [PLN/(PUM i PUU)]",
    "w [PLN/NETTO]",
    "do liczby mieszkań",
    "do miarodajne wskaźniki",
  ];
  const [selectedDivider, setSelectedDivider] = useState(
    dropdownDividerOptions[1]
  );
  const dividerLabel = [
    "[PLN/PUM]",
    "[PLN/PUM]",
    "-1k[PLN/POW FUNDAMENTÓW] / -2k+[PLN/NETTO PODZIEMIA]",
    "[PLN/ZABUDOWY PODZIEMIA]",
    "[PLN/ZABUDOWY PODZIEMIA]",
    "[PLN/POW FUNDAMENTÓW]",
    "[PLN/POW FUNDAMENTÓW]",
    "[PLN/NETTO PODZIEMIA]",
    "[PLN/NETTO NADZIEMIA]",
    "[PLN/POW ELEWACJI]",
    "[PLN/POW DACHÓW]",
    "[PLN/NETTO PODZIEMIA]",
    "[PLN/NETTO NADZIEMIA]",
    "[PLN/PUM]",
    "[PLN/PUM]",
    "[PLN/NETTO]",
    "[PLN/NETTO]",
    "[PLN/NETTO]",
    "[PLN/NETTO]",
    "[PLN/NETTO]",
    "[PLN/POW NIEZABUDOWANEJ]",
    "[PLN/NIEZABUDOWANEJ]",
    "[PLN/NIEZABUDOWANEJ]",
    "[PLN/PUM]",
    "[PLN/PUM]",
    "[PLN/PUM]",
    "[PLN/PUM]",
  ];

  const handleSelectDivider = (option: string) => {
    setSelectedDivider(option);
  };

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
  const titleCasedCostLabels = costLabels.map((label, index) => {
    const titleCased = snakeToTitleCase(label);
    if (selectedDivider === "do miarodajne wskaźniki")
      return `${titleCased} ${dividerLabel[index]}`;
    return titleCased;
  });

  const dataTable = chosenProjects.map((project) => {
    let divider: number | number[];
    switch (selectedDivider) {
      case "w [PLN]":
        divider = 1;
        break;
      case "w [PLN/(PUM i PUU)]":
        divider = project.parameter.pum_i_puu;
        break;
      case "w [PLN/NETTO]":
        divider = project.parameter.powierzchnia_netto;
        break;
      case "do liczby mieszkań":
        divider = project.parameter.ilosc_mieszkan;
        break;
      case "do miarodajne wskaźniki":
        divider = [
          project.parameter.pum_i_puu,
          project.parameter.pum_i_puu,

          project.parameter.liczba_kondygnacji_podziemnych === 1
            ? project.parameter.powierzchnia_zabudowy_podziemia +
              project.parameter
                .powierzchnia_zabudowy_nadziemia_poza_obrysem_podziemia
            : project.parameter.powierzchnia_netto_podziemia,

          project.parameter.powierzchnia_zabudowy_podziemia,
          project.parameter.powierzchnia_zabudowy_podziemia,

          project.parameter.powierzchnia_zabudowy_podziemia +
            project.parameter
              .powierzchnia_zabudowy_nadziemia_poza_obrysem_podziemia,

          project.parameter.powierzchnia_zabudowy_podziemia +
            project.parameter
              .powierzchnia_zabudowy_nadziemia_poza_obrysem_podziemia,
          project.parameter.powierzchnia_netto_podziemia,
          project.parameter.powierzchnia_netto_nadziemia,
          project.parameter.powierzchnia_elewacji,
          project.parameter.powierzchnia_dachow,
          project.parameter.powierzchnia_netto_podziemia,
          project.parameter.powierzchnia_netto_nadziemia,
          project.parameter.pum_i_puu,
          project.parameter.pum_i_puu,
          project.parameter.powierzchnia_netto,
          project.parameter.powierzchnia_netto,
          project.parameter.powierzchnia_netto,
          project.parameter.powierzchnia_netto,
          project.parameter.powierzchnia_netto,
          project.parameter.powierzchnia_niezabudowana_dzialki,
          project.parameter.powierzchnia_niezabudowana_dzialki,
          project.parameter.powierzchnia_niezabudowana_dzialki,
          project.parameter.pum_i_puu,
          project.parameter.pum_i_puu,
          project.parameter.pum_i_puu,
          project.parameter.pum_i_puu,
        ];
        break;
    }

    const { id, project_id, ...cost } = project.cost;
    const tab = Object.values(cost);
    const tab2 = tab.map((val, index) => {
      if (typeof divider === "number") {
        return val / divider;
      } else if (typeof divider === "object") {
        return val / divider[index];
      }
    });

    return tab2;
  });

  return (
    <div className="text-white">
      <div className="flex justify-center items-center gap-4">
        <div className="w-96">
          <ComparisonSearchBar
            suggestions={finalProjectsName}
            handleSelectedProject={handleSelectedProject}
          />
        </div>
        <div>
          <DropdownMenu
            options={dropdownDividerOptions}
            onSelect={handleSelectDivider}
            defaultOption={dropdownDividerOptions[1]}
          />
        </div>
      </div>
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
