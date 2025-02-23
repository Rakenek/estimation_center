import { createProject, updateProject } from "@/actions/actions";
import ProjectDataForm from "@/components/ProjectDataForm";
import { prisma } from "@/lib/prisma";

import React from "react";

interface EditProjectPageProps {
  params: Promise<{ projectId: string }>;
}

export default async function EditProjectPage({
  params,
}: EditProjectPageProps) {
  const { projectId } = await params;
  const project = await prisma.project.findUnique({
    where: {
      id: projectId,
    },
  });
  delete project["id"];
  delete project["user_id"];

  const parameters = await prisma.parameters.findUnique({
    where: { project_id: projectId },
  });
  delete parameters["id"];
  delete parameters["project_id"];

  const cost = await prisma.cost.findUnique({
    where: {
      project_id: projectId,
    },
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
