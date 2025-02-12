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
  return (
    <>
      <BuildingParameters parameters={parameters} />
    </>
  );
}
