import DashboardElement from "@/components/DashboardElement";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const projects = await prisma.project.findMany();

  return <DashboardElement projects={projects} />;
}
