import { prisma } from "@/lib/prisma";
import React, { Suspense } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import ProjectDashboard from "@/components/ProjectDashboard";

interface ProjectPageProps {
  params: Promise<{ projectId: string }>;
}

interface DetailsProps {
  projectId: string;
}

async function Details({ projectId }: DetailsProps) {
  try {
    const cost = await prisma.cost.findUnique({
      where: { project_id: projectId },
    });
    const parameters = await prisma.parameters.findUnique({
      where: { project_id: projectId },
    });
    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (cost === null || parameters == null || project == null)
      return (
        <h1 className="flex grow text-4xl items-center justify-center">
          Projekt o podanym id nie istnieje
        </h1>
      );

    return (
      <ProjectDashboard
        parameters={parameters}
        cost={cost}
        projectName={project.name}
      />
    );
  } catch (e) {
    console.error(e);
    throw new Error(`something went wrong`);
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  try {
    const { projectId } = await params;
    return (
      <Suspense fallback={<LoadingSpinner />}>
        <Details projectId={projectId} />
      </Suspense>
    );
  } catch (e) {
    console.error(e);
    throw new Error(`something went wrong`);
  }
}
