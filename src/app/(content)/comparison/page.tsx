import { prisma } from "@/lib/prisma";
import React, { Suspense } from "react";
import ComparisonDashboard from "@/components/ComparisonDashboard";
import LoadingSpinner from "@/components/LoadingSpinner";

// Child component that fetches data
async function DataFetcher() {
  const projects = await prisma.project.findMany();
  const cost = await prisma.cost.findMany();
  const parameters = await prisma.parameters.findMany();

  return (
    <ComparisonDashboard
      projects={projects}
      cost={cost}
      parameters={parameters}
    />
  );
}

export default function ComparisonPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <DataFetcher />
    </Suspense>
  );
}
