"use client";
import { snakeToTitleCase } from "@/lib/customFunctions";
import { Cost, Parameters } from "@prisma/client";
import React, { useState } from "react";
import { LabelProps } from "recharts";
import CustomPieChart from "./CustomPieChart";
import Button from "./Button";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#A28CD3",
  "#ed00fe",
  "#874824",
  "#9c8f74",
  "#6a9365",
  "#624c92",
  "#606f7b",
  "#d70850",
  "#429191",
  "#ae420c",
  "#4d5686",
  "#889daf",
  "#584584",
  "#458450",
  "#de9f64",
  "#d32d2d",
  "#84921d",
  "#2e5e89",
  "#996b9c",
  "#8c5f2f",
  "#1ea529",
];

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
  const { id, n01, n03, project_id, ...rest } = cost;

  const newData = Object.entries(rest)
    .map(([name, value], index) => {
      return {
        name: snakeToTitleCase(name),
        value: Math.round((value / n03) * 100),
        color: COLORS[index],
      };
    })
    .filter((obj) => obj.value !== 0);

  const [actualUsedData, setActualUsedData] = useState(newData);

  const shortedData = [
    {
      name: "Stan surowy otwarty",
      value: Math.round(
        ((rest.roboty_ziemne +
          rest.zabezpieczenie_wykopow +
          rest.sciany_szczelinowe +
          rest.roboty_palowe +
          rest.prace_fundamentowe +
          rest.konstrukcja_podziemia +
          rest.konstrukcja_nadziemia) /
          n03) *
          100
      ),
      color: "#874824",
    },
    {
      name: "Elewacje",
      value: Math.round((rest.elewacje / n03) * 100),
      color: "#ed00fe",
    },
    {
      name: "Dachy",
      value: Math.round((rest.dachy / n03) * 100),
      color: "#e5fe00",
    },
    {
      name: "Wykończenie budowlane",
      value: Math.round(
        ((rest.wykonczenie_podziemia + rest.wykonczenie_nadziemia) / n03) * 100
      ),
      color: "#ed604b",
    },
    {
      name: "Windy i parklifty",
      value: Math.round(((rest.windy + rest.parklifty) / n03) * 100),
      color: "#edb74b",
    },
    {
      name: "Instalacje sanitarne",
      value: Math.round(
        ((rest.instalacje_klimatyzacyjne +
          rest.instalacje_wodno_kanalizacyjne +
          rest.instalacje_gazowe) /
          n03) *
          100
      ),
      color: "#4bd7ed",
    },
    {
      name: "Instalacje elektryczne i teletechniczne",
      value: Math.round(
        ((rest.instalacje_elektryczne + rest.instalacje_teletechniczne) / n03) *
          100
      ),
      color: "#eaed4b",
    },
    {
      name: "Prace zewnętrzne",
      value: Math.round(
        ((rest.infrastruktura + rest.dfa + rest.zielen + rest.sieci) / n03) *
          100
      ),
      color: "#5fc68d",
    },
    {
      name: "Koszty budowy i bhp",
      value: Math.round(((rest.koszty_budowy + rest.bhp) / n03) * 100),
      color: "#8f7022",
    },
    {
      name: "Offset",
      value: Math.round((rest.offset_poza_dzialka / n03) * 100),
      color: "#8329d1",
    },
  ].filter((element) => element.value !== 0);

  const toggleData = () => {
    const data =
      actualUsedData.length !== newData.length ? newData : shortedData;
    setActualUsedData(data);
  };
  return (
    <>
      <div className="pt-20 flex items-center justify-center">
        <h2 className="text-4xl">{projectName}</h2>
      </div>
      <div className="flex items-center justify-center">
        <h2 className="text-xl font-semibold mb-4">
          N03 - procentowy udział poszczególnych prac
        </h2>
      </div>
      <div className="flex items-center justify-center">
        <Button
          onClick={() => {
            toggleData();
          }}
        >
          {actualUsedData.length !== newData.length
            ? "Rozwiń na większą ilość pakietów"
            : "Scal w miejszą ilość pakietów"}
        </Button>
      </div>
      <CustomPieChart newData={actualUsedData} />
    </>
  );
}
