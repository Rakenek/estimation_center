import ProjectDetails from "@/components/ProjectDetails";
import { prisma } from "@/lib/prisma";

interface ProjectPageProps {
  params: { projectId: string };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { projectId } = params;
  const project = await prisma.project.findUnique({
    where: { id: projectId },
  });
  const cost = await prisma.cost.findUnique({
    where: { projectId: projectId },
  });
  const parameters = await prisma.parameters.findUnique({
    where: { projectId: projectId },
  });

  console.log(project, cost, parameters);

  return (
    <div>
      <h1>Project: {project?.name}</h1>
      <ProjectDetails project={project} cost={cost} parameters={parameters} />
    </div>
  );
}
