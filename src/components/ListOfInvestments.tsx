import React from "react";
import Card from "./Card";

interface ListOfInvestmentsProps {
  data: any;
}

export default function ListOfInvestments({ data }: ListOfInvestmentsProps) {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="flex flex-wrap items-center justify-start w-5/6 gap-6">
        {data.map((item: any) => {
          return (
            <Card
              key={item.name}
              city={item.city}
              name={item.name}
              imageUrl={item.imageUrl}
            />
          );
        })}
      </div>
    </div>
  );
}
