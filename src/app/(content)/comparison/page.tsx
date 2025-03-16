import { prisma } from "@/lib/prisma";
import React from "react";
import ComparasionSearchBar from "@/components/ComparasionSearchBar";

export default async function ComparisonPage() {
  try {
    const projects = await prisma.project.findMany();
    const projectsNames = projects.map((project) => project.name);

    return (
      <div className="flex">
        <div className="w-1/2">
          <ComparasionSearchBar suggestions={projectsNames} />
        </div>
        <div className="w-1/2">
          <ComparasionSearchBar suggestions={projectsNames} />
        </div>
      </div>
    );
  } catch (e) {
    console.error(e);
    throw new Error(`something went wrong`);
  }
}
