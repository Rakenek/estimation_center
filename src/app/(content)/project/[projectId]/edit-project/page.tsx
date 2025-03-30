import { updateProject } from "@/actions/actions";
import ProjectDataForm from "@/components/ProjectDataForm";
import { prisma } from "@/lib/prisma";
import React, { Suspense } from "react";
import LoadingSpinner from "@/components/LoadingSpinner"; // Assuming you have this component

interface EditProjectPageProps {
  params: Promise<{ projectId: string }>;
}

// Child component to handle data fetching
async function ProjectDataFetcher({ projectId }: { projectId: string }) {
  const project = await prisma.project.findUnique({
    where: { id: projectId },
  });
  delete project["id"];
  delete project["user_id"];

  const parameters = await prisma.parameters.findUnique({
    where: { project_id: projectId },
  });
  delete parameters["id"];
  delete parameters["project_id"];

  const cost = await prisma.cost.findUnique({
    where: { project_id: projectId },
  });
  delete cost["id"];
  delete cost["project_id"];

  const newInitialData = {
    ...project,
    ...parameters,
    ...cost,
  };

  return (
    <ProjectDataForm
      action={updateProject.bind(null, projectId)}
      newInitialData={newInitialData}
    />
  );
}

export default async function EditProjectPage({
  params,
}: EditProjectPageProps) {
  const { projectId } = await params;

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ProjectDataFetcher projectId={projectId} />
    </Suspense>
  );
}
