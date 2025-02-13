import React from "react";
import BuildingParameters from "@/components/BuildingParameters";
import { prisma } from "@/lib/prisma";

interface ParametersPageProps {
  params: Promise<{ projectId: string }>;
}

export default async function ParametersPage({ params }: ParametersPageProps) {
  const { projectId } = await params;

  const parameters = await prisma.parameters.findUnique({
    where: { project_id: projectId },
  });
  return (
    <div>
      <BuildingParameters parameters={parameters} />
    </div>
  );
}
