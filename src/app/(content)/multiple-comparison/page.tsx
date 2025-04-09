import MultipleComparisonDashboard from "@/components/MultipleComparisonDashboard";
import { getAllProjectsData } from "@/lib/customFunctions";
import { Cost, Parameters } from "@prisma/client";
import React, { Suspense } from "react";

interface MultipleComparisonPageWrapper {
  allProjectsDataPromise: {
    id: string;
    name: string;
    city: string;
    status: string;
    cost: Cost | null;
    parameter: Parameters | null;
  }[];
}

export default function MultipleComparisonPage() {
  return (
    <div className="pt-20 text-black">
      <Suspense
        fallback={
          <div className="text-white text-center">Ładowanie danych...</div>
        }
      >
        <MultipleComparisonPageWrapper />
      </Suspense>
    </div>
  );
}

async function MultipleComparisonPageWrapper() {
  const allProjectsData = await getAllProjectsData();
  return <MultipleComparisonDashboard allProjectsData={allProjectsData} />;
}
