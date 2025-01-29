'use client';
import SearchBar from '@/components/SearchBar';
import React, { useState } from 'react';
import { DATA } from '@/lib/data';
import ListOfInvestments from '@/components/ListOfInvestments';

export default function DashboardPage() {
  const [filteredData, setFilteredData] = useState(DATA);

  function filterdata(name: string) {
    const newFilteredData = DATA.filter((item) => {
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
      <ListOfInvestments data={filteredData} />
    </div>
  );
}
