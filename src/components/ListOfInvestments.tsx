import React from "react";
import Card from "./Card";
import { Project } from "@prisma/client";

interface ListOfInvestmentsProps {
  projects: Project[];
}

export default function ListOfInvestments({
  projects,
}: ListOfInvestmentsProps) {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="flex flex-wrap items-center justify-start w-5/6 gap-6">
        {projects.map((item) => {
          return (
            <Card
              key={item.id}
              id={item.id}
              city={item.city}
              name={item.name}
              imageUrl={item.image_url}
              status={item.status}
              n03={item.n03_do_PUM}
            />
          );
        })}
      </div>
    </div>
  );
}
