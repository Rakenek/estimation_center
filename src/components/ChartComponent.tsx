"use client";
import { Cost, Parameters } from "@prisma/client";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
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

interface ChartComponentProps {
  allProjectsData: AllProjectsData;
}

// Define a type for the tick props
interface CustomTickProps {
  x?: number;
  y?: number;
  payload?: {
    value: string;
  };
}

const CustomTick = (props: CustomTickProps) => {
  const { x = 0, y = 0, payload } = props;

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={5}
        textAnchor="end"
        fill="#666"
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
  const transformedData = allProjectsData.map((data) => {
    return {
      name: data.name,
      value: Math.round(data.cost.elewacje / data.parameter.pum_i_puu),
    };
  });

  console.log(transformedData);

  return (
    <>
      <div className="flex items-center justify-center gap-10 mb-20">
        <DropdownMenu
          options={["1", "2"]}
          onSelect={() => {}}
          defaultOption={"1"}
        />
        <DropdownMenu
          options={["1", "2"]}
          onSelect={() => {}}
          defaultOption={"1"}
        />
      </div>

      <ResponsiveContainer width="100%" height={600}>
        <BarChart
          data={transformedData}
          margin={{ top: 20, right: 30, left: 20, bottom: 200 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={<CustomTick />} interval={0} />
          <YAxis />
          <Tooltip />

          <Bar dataKey="value" barSize={30} fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}
