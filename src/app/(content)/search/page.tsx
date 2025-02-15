import DashboardElement from "@/components/DashboardElement";
import LoadingSpinner from "@/components/LoadingSpinner";
import { prisma } from "@/lib/prisma";
import { Suspense } from "react";

async function Dashboard() {
  try {
    const projects = await prisma.project.findMany();
    return <DashboardElement projects={projects} />;
  } catch (e) {
    console.error(e);
    throw new Error(`something went wrong`);
  }
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Dashboard />
    </Suspense>
  );
}
