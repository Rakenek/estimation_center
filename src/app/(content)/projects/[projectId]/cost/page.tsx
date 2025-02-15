import CostTable from "@/components/CostTable";
import { prisma } from "@/lib/prisma";
import React from "react";

interface CostPageProps {
  params: Promise<{ projectId: string }>;
}

export default async function CostPage({ params }: CostPageProps) {
  const { projectId } = await params;
  const cost = await prisma.cost.findUnique({
    where: { project_id: projectId },
  });

  return <CostTable cost={cost} tableName={"Koszt inwestycji [PLN]"} />;
}
