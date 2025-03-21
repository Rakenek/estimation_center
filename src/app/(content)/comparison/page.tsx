import { prisma } from "@/lib/prisma";
import React, { Suspense } from "react";

import ComparasionDashboard from "@/components/ComparasionDashboard";

export default async function ComparisonPage() {
  try {
    const projects = await prisma.project.findMany();
    const cost = await prisma.cost.findMany();
    const parameters = await prisma.parameters.findMany();

    return (
      <Suspense fallback={<div>Loading...</div>}>
        <ComparasionDashboard
          projects={projects}
          cost={cost}
          parameters={parameters}
        />
      </Suspense>
    );
  } catch (e) {
    console.error(e);
    throw new Error(`something went wrong`);
  }
}
