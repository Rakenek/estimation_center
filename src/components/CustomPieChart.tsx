"use client";

import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, LabelProps } from "recharts";

interface CustomPieChartProps {
  newData: { name: string; value: number; color: string }[];
}

export default function CustomPieChart({ newData }: CustomPieChartProps) {
  const renderCustomizedLabel = ({ name, value }: LabelProps) => {
    return `${name}: ${value}%`;
  };
  return (
    <div className="flex flex-col items-center">
      <PieChart width={1200} height={700}>
        <Pie
          data={newData}
          cx="50%"
          cy="50%"
          outerRadius={300}
          fill="#8884d8"
          dataKey="value"
          label={renderCustomizedLabel}
        >
          {newData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>

        <Tooltip />
      </PieChart>
    </div>
  );
}
