import CostTable from "@/components/CostTable";
import { prisma } from "@/lib/prisma";
import React from "react";

interface CostToNettPageProps {
  params: Promise<{ projectId: string }>;
}

export default async function CostToNettPage({ params }: CostToNettPageProps) {
  const { projectId } = await params;
  const cost = await prisma.cost.findUnique({
    where: { project_id: projectId },
  });
  const parameters = await prisma.parameters.findUnique({
    where: { project_id: projectId },
  });

  return (
    <CostTable
      cost={cost}
      tableName={"Koszt inwestycji [PLN/NETTO]"}
      divider={parameters.powierzchnia_netto}
    />
  );
}
