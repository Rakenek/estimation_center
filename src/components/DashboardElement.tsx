"use client";
import SearchBar from "@/components/SearchBar";
import React, { useState } from "react";
import ListOfInvestments from "@/components/ListOfInvestments";

interface DashboardElementProps {
  projects: { id: string; name: string; city: string; imageUrl: string }[];
}

export default function DashboardElement({ projects }: DashboardElementProps) {
  const [filteredData, setFilteredData] = useState(projects);

  function filterdata(name: string) {
    const newFilteredData = projects.filter((item) => {
      return item.name.toLowerCase().includes(name.toLowerCase());
    });
    setFilteredData(newFilteredData);
  }

  return (
    <div>
      <SearchBar
        onSearch={(value) => {
          filterdata(value);
        }}
      />
      <ListOfInvestments projects={filteredData} />
    </div>
  );
}
