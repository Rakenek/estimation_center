import React from "react";
import { Project, Cost, Parameters } from "@prisma/client";
import { camelCaseToSpaces } from "@/lib/customFunctions";

interface ProjectDetailsProps {
  project: Project | null;
  cost: Cost | null;
  parameters: Parameters | null;
}

export default function ProjectDetails({
  project,
  cost,
  parameters,
}: ProjectDetailsProps) {
  return (
    <>
      <div>
        <h2>Parametry</h2>
        {Object.entries(parameters).map(([key, value]) => {
          return (
            <div key={key}>
              {camelCaseToSpaces(key)} {value}
            </div>
          );
        })}
      </div>
      <div>
        <h2>Koszt</h2>
        {Object.entries(cost).map(([key, value]) => {
          return (
            <div key={key}>
              {camelCaseToSpaces(key)} {value}
            </div>
          );
        })}
      </div>
    </>
  );
}
