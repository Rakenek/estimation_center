import { prisma } from '@/lib/prisma';
import React from 'react';

import ComparasionDashboard from '@/components/ComparasionDashboard';

export default async function ComparisonPage() {
  try {
    const projects = await prisma.project.findMany();
    const cost = await prisma.cost.findMany();
    const parameters = await prisma.parameters.findMany();

    return (
      <ComparasionDashboard
        projects={projects}
        cost={cost}
        parameters={parameters}
      />
    );
  } catch (e) {
    console.error(e);
    throw new Error(`something went wrong`);
  }
}
