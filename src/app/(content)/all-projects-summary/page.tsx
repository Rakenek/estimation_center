import ChartComponent from "@/components/ChartComponent";
import { getAllProjectsData } from "@/lib/customFunctions";
import React, { Suspense } from "react";
import { Cost, Parameters } from "@prisma/client";

// Define the type for allProjectsData (same as in ChartComponent)
type AllProjectsData = {
  id: string;
  name: string;
  city: string;
  status: string;
  cost: Cost | null;
  parameter: Parameters | null;
}[];

export default async function AllProjectsSummaryPage() {
  const allProjectsDataPromise = getAllProjectsData();

  return (
    <div className="pt-20 text-black">
      <Suspense
        fallback={
          <div className="text-white text-center">Ładowanie danych...</div>
        }
      >
        <ChartComponentWrapper
          allProjectsDataPromise={allProjectsDataPromise}
        />
      </Suspense>
    </div>
  );
}

// Helper component to await the promise with proper typing
async function ChartComponentWrapper({
  allProjectsDataPromise,
}: {
  allProjectsDataPromise: Promise<AllProjectsData>;
}) {
  const allProjectsData = await allProjectsDataPromise;
  return <ChartComponent allProjectsData={allProjectsData} />;
}
