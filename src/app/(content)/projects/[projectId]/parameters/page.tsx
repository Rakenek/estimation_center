import React from "react";
import ParametersTable from "@/components/ParametersTable";
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
      <ParametersTable parameters={parameters} />
    </div>
  );
}
