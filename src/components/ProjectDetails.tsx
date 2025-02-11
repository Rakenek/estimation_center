import React from "react";
import { Project, Cost, Parameters } from "@prisma/client";
import BuildingParameters from "./BuildingParameters";

interface ProjectDetailsProps {
  project: Project;
  cost: Cost;
  parameters: Parameters;
}

export default function ProjectDetails({
  project,
  cost,
  parameters,
}: ProjectDetailsProps) {
  console.log(project, cost, parameters);
  return (
    <>
      <BuildingParameters parameters={parameters} />
    </>
  );
}
