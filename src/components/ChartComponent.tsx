"use client";

import { Cost, Parameters } from "@prisma/client";
import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import DropdownMenu from "./DropDownMenu";

type AllProjectsData = {
  id: string;
  name: string;
  city: string;
  status: string;
  cost: Cost | null;
  parameter: Parameters | null;
}[];

type CostFields = Omit<Cost, "id" | "project_id">;
type PackageKeys = keyof CostFields;

interface ChartComponentProps {
  allProjectsData: AllProjectsData;
}

interface CustomTickProps {
  x?: number;
  y?: number;
  payload?: {
    value: string;
  };
}

// Utility function to convert snake_case to Title Case
const toTitleCase = (str: string) => {
  return str
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const CustomTick = (props: CustomTickProps) => {
  const { x = 0, y = 0, payload } = props;
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={5}
        textAnchor="end"
        fill="#d1d0d0"
        fontSize={15}
        transform="rotate(-90)"
      >
        {payload?.value}
      </text>
    </g>
  );
};

export default function ChartComponent({
  allProjectsData,
}: ChartComponentProps) {
  const [selectedPackage, setSelectedPackage] = useState<PackageKeys>("n03");
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

  const handleSelectDivider = (option: string) => {
    setSelectedDivider(option);
  };

  const testObject = allProjectsData[0].cost as Cost;
  const dropdownPackageOptions = Object.keys(testObject)
    .filter((key) => key !== "id" && key !== "project_id")
    .map((key) => ({
      value: key as PackageKeys,
      label: toTitleCase(key),
    }));

  const transformedData = allProjectsData
    .map((data) => {
      let divider;
      const cost = data.cost as Cost;
      const parameters = data.parameter as Parameters;

      switch (selectedDivider) {
        case "w [PLN]":
          divider = 1;
          break;
        case "w [PLN/(PUM i PUU)]":
          divider = parameters.pum_i_puu;
          break;
        case "w [PLN/NETTO]":
          divider = parameters.powierzchnia_netto;
          break;
        case "do liczby mieszkań":
          divider = parameters.ilosc_mieszkan;
          break;
        case "do miarodajne wskaźniki":
          divider = {
            n01: parameters.pum_i_puu,
            n03: parameters.pum_i_puu,
            roboty_ziemne:
              parameters.liczba_kondygnacji_podziemnych === 1
                ? parameters.powierzchnia_zabudowy_podziemia +
                  parameters.powierzchnia_zabudowy_nadziemia_poza_obrysem_podziemia
                : parameters.powierzchnia_netto_podziemia,
            zabezpieczenie_wykopow: parameters.powierzchnia_zabudowy_podziemia,
            sciany_szczelinowe: parameters.powierzchnia_zabudowy_podziemia,
            roboty_palowe:
              parameters.powierzchnia_zabudowy_podziemia +
              parameters.powierzchnia_zabudowy_nadziemia_poza_obrysem_podziemia,
            prace_fundamentowe: parameters.powierzchnia_zabudowy_podziemia,
            konstrukcja_podziemia: parameters.powierzchnia_netto_podziemia,
            konstrukcja_nadziemia: parameters.powierzchnia_netto_nadziemia,
            elewacje: parameters.powierzchnia_elewacji,
            dachy: parameters.powierzchnia_dachow,
            wykonczenie_podziemia: parameters.powierzchnia_netto_podziemia,
            wykonczenie_nadziemia: parameters.powierzchnia_netto_nadziemia,
            windy: parameters.pum_i_puu,
            parklifty: parameters.pum_i_puu,
            instalacje_klimatyzacyjne: parameters.powierzchnia_netto,
            instalacje_wodno_kanalizacyjne: parameters.powierzchnia_netto,
            instalacje_gazowe: parameters.powierzchnia_netto,
            instalacje_elektryczne: parameters.powierzchnia_netto,
            instalacje_teletechniczne: parameters.powierzchnia_netto,
            infrastruktura: parameters.powierzchnia_netto,
            dfa: parameters.powierzchnia_niezabudowana_dzialki,
            zielen: parameters.powierzchnia_niezabudowana_dzialki,
            sieci: parameters.powierzchnia_niezabudowana_dzialki,
            koszty_budowy: parameters.pum_i_puu,
            bhp: parameters.pum_i_puu,
            offset_poza_dzialka: parameters.pum_i_puu,
          };
          break;
      }

      if (typeof divider === "number") {
        return {
          name: data.name,
          value: Math.round((cost[selectedPackage] as number) / divider),
        };
      }
      if (typeof divider === "object") {
        return {
          name: data.name,
          value: Math.round(
            (cost[selectedPackage] as number) / divider[selectedPackage]
          ),
        };
      }
    })
    .filter((item) => item.value !== 0);

  const dividerLabel = {
    n01: "[PLN/PUM]",
    n03: "[PLN/PUM]",
    roboty_ziemne: "[PLN/POW FUNDAMENTÓW]",
    zabezpieczenie_wykopow: "[PLN/ZABUDOWY PODZIEMIA]",
    sciany_szczelinowe: "[PLN/ZABUDOWY PODZIEMIA]",
    roboty_palowe: "[PLN/POW FUNDAMENTÓW]",
    prace_fundamentowe: "[PLN/POW FUNDAMENTÓW]",
    konstrukcja_podziemia: "[PLN/NETTO PODZIEMIA]",
    konstrukcja_nadziemia: "[PLN/NETTO NADZIEMIA]",
    elewacje: "[PLN/POW ELEWACJI]",
    dachy: "[PLN/POW DACHÓW]",
    wykonczenie_podziemia: "[PLN/NETTO PODZIEMIA]",
    wykonczenie_nadziemia: "[PLN/NETTO NADZIEMIA]",
    windy: "[PLN/PUM]",
    parklifty: "[PLN/PUM]",
    instalacje_klimatyzacyjne: "[PLN/NETTO]",
    instalacje_wodno_kanalizacyjne: "[PLN/NETTO]",
    instalacje_gazowe: "[PLN/NETTO]",
    instalacje_elektryczne: "[PLN/NETTO]",
    instalacje_teletechniczne: "[PLN/NETTO]",
    infrastruktura: "[PLN/POW NIEZABUDOWANEJ]",
    dfa: "[PLN/NIEZABUDOWANEJ]",
    zielen: "[PLN/NIEZABUDOWANEJ]",
    sieci: "[PLN/PUM]",
    koszty_budowy: "[PLN/PUM]",
    bhp: "[PLN/PUM]",
    offset_poza_dzialka: "[PLN/PUM]",
  };

  return (
    <>
      <div>
        <h1 className="text-white flex items-center justify-center text-4xl pb-4">
          Zestawienie kosztowe projektów
        </h1>
      </div>
      <div className="flex items-center justify-center gap-10 mb-20">
        <DropdownMenu
          options={dropdownPackageOptions.map((option) => option.label)}
          onSelect={(label) => {
            const selectedOption = dropdownPackageOptions.find(
              (opt) => opt.label === label
            );
            if (selectedOption) {
              setSelectedPackage(selectedOption.value);
            }
          }}
          defaultOption={toTitleCase(selectedPackage)}
        />
        <DropdownMenu
          options={dropdownDividerOptions}
          onSelect={handleSelectDivider}
          defaultOption={dropdownDividerOptions[1]}
        />
      </div>
      <div>
        <h2 className="text-white text-2xl flex justify-center items-center">
          Zestawienie kosztów: {toTitleCase(selectedPackage)}{" "}
          {selectedDivider === "do miarodajne wskaźniki"
            ? dividerLabel[selectedPackage]
            : selectedDivider}
        </h2>
      </div>

      <ResponsiveContainer width="100%" height={600}>
        <BarChart
          data={transformedData}
          margin={{ top: 20, right: 50, left: 50, bottom: 200 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={<CustomTick />} interval={0} />
          <YAxis
            tick={{ fill: "#d1d0d0" }} // Brighter text for Y-axis (white)
          />
          <Tooltip
            formatter={(value: number) => [
              value.toLocaleString("fr-FR"),
              toTitleCase(selectedPackage),
            ]}
            labelFormatter={(name) => `Projekt: ${name}`}
          />
          <Bar dataKey="value" barSize={30} fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}
