import DashboardElement from '@/components/DashboardElement';
import { prisma } from '@/lib/prisma';

export default async function DashboardPage() {
  const projects = await prisma.project.findMany();
  const cost = await prisma.cost.findMany();
  console.log(cost);

  return <DashboardElement projects={projects} />;
}
