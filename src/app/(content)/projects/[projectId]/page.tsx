import { prisma } from "@/lib/prisma";
import React from "react";
import ProjectDetailsPage from "@/components/ProjectDetails";

interface ProjectPageProps {
  params: Promise<{ projectId: string }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { projectId } = await params;
  const cost = await prisma.cost.findUnique({
    where: { project_id: projectId },
  });
  const parameters = await prisma.parameters.findUnique({
    where: { project_id: projectId },
  });
  return (
    <div>
      <ProjectDetailsPage parameters={parameters} cost={cost} />
    </div>
  );
}
