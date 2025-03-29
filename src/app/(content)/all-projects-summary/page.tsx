import ChartComponent from "@/components/ChartComponent";
import { getAllProjectsData } from "@/lib/customFunctions";
import React from "react";

export default async function AllProjectsSummaryPage() {
  const allProjectsData = await getAllProjectsData();

  return (
    <div className="pt-24 text-black">
      <ChartComponent allProjectsData={allProjectsData} />
    </div>
  );
}
