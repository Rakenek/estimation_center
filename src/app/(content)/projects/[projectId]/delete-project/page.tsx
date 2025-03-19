import DeleteProjectButton from '@/components/DeleteProjectButton';
import { prisma } from '@/lib/prisma';
import React from 'react';

export default async function DeleteProjectPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const project = await prisma.project.findUnique({
    where: {
      id: projectId,
    },
  });

  return (
    <div className="flex flex-col mt-64 items-center justify-center">
      <h1 className="text-4xl mb-10">
        Czy jesteś pewny że chcesz usunąć projekt {project?.name}?
      </h1>
      <DeleteProjectButton />
    </div>
  );
}
