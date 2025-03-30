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
import { dividerType } from "./CostTable";

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
  const [selectedPackage, setSelectedPackage] =
    useState<PackageKeys>("roboty_ziemne");
  const dropdownDividerOptions = [
    "w [PLN]",
    "w [PLN/(PUM i PUU)]",
    "w [PLN/NETTO]",
    "do liczby mieszkań",
  ];
  const [selectedDivider, setSelectedDivider] = useState(
    dropdownDividerOptions[0]
  );

  const handleSelectPackage = (option: string) => {
    setSelectedPackage(option as PackageKeys);
  };

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
      let divider = 1;
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
      }

      return {
        name: data.name,
        value: Math.round((cost[selectedPackage] as number) / divider),
      };
    })
    .filter((item) => item.value !== 0);

  return (
    <>
      <div>
        <h1 className="text-white flex items-center justify-center text-4xl pb-8">
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
          defaultOption={dropdownDividerOptions[0]}
        />
      </div>
      <div>
        <h2 className="text-white text-2xl flex justify-center items-center">
          Zestawienie kosztów: {toTitleCase(selectedPackage)} {selectedDivider}
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
            formatter={(value: number) => [value, toTitleCase(selectedPackage)]}
            labelFormatter={(name) => `Projekt: ${name}`}
          />
          <Bar dataKey="value" barSize={30} fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}
