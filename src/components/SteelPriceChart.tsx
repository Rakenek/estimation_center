"use client";

import { SteelPrice } from "@prisma/client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface SteelPriceChartProps {
  steelPrice: SteelPrice[];
}

const SteelPriceChart = ({ steelPrice }: SteelPriceChartProps) => {
  return (
    <div className="w-full p-4 bg-white shadow-md rounded-2xl text-black">
      <h2 className="text-xl font-semibold text-gray-700 mb-4 flex justify-center items-center">
        Pręt żebrowany fi 12.
      </h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={steelPrice}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="week"
            tickFormatter={(week, index) => `${steelPrice[index].year} ${week}`}
            style={{ fontSize: "14px" }}
          />
          <YAxis style={{ fontSize: "14px" }} />
          <Tooltip
            itemStyle={{ fontSize: "14px" }}
            labelStyle={{ fontSize: "16px" }}
          />
          <Legend wrapperStyle={{ fontSize: "14px" }} />
          <Line
            type="monotone"
            dataKey="complete"
            name="Komplet (PLN/t)"
            stroke="#ec920b"
            strokeWidth={3}
          />
          <Line
            type="monotone"
            dataKey="prefabricated"
            name="Prefabrykaty (PLN/t)"
            stroke="#e639cc"
            strokeWidth={3}
          />
          <Line
            type="monotone"
            dataKey="max_PUDS"
            name="Cena max. wg PUDS (PLN/t)"
            stroke="#E63946"
            strokeWidth={3}
          />
          <Line
            type="monotone"
            dataKey="avg_PUDS"
            name="Cena średnia (PLN/t)"
            stroke="#39e642"
            strokeWidth={3}
          />
          <Line
            type="monotone"
            dataKey="min_PUDS"
            name="Cena min. wg PUDS (PLN/t)"
            stroke="#1E40AF"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SteelPriceChart;
