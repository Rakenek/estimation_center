import { prisma } from "@/lib/prisma";
import React, { Suspense } from "react";
import ProjectDetails from "@/components/ProjectDetails";
import LoadingSpinner from "@/components/LoadingSpinner";

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
      <div className="grid grid-cols-[250px_1fr] gap-4">
        <div className="col-span-2 flex h-20 text-4xl grow items-center justify-center">
          <h1>{project?.name}</h1>
        </div>

        <ProjectDetails parameters={parameters} cost={cost} />
      </div>
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
