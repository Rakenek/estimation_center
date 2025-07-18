"use client";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

interface SearchBarProps {
  suggestions: string[];
  handleSelectedProject: (projectName: string) => void;
}

const ComparisonSearchBar: React.FC<SearchBarProps> = ({
  suggestions,
  handleSelectedProject,
}) => {
  const [query, setQuery] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const url = usePathname();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (value) {
      const filtered = suggestions.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  };

  const handleSelect = (item: string) => {
    if (url !== "/multiple-comparison") {
      setQuery(item);
    } else {
      setQuery("");
    }
    setFilteredSuggestions([]);
    handleSelectedProject(item);
  };

  return (
    <div className="relative w-full max-w-sm mx-auto text-black">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        className="w-full p-2 border rounded-md shadow-md"
        placeholder="Search..."
      />
      {filteredSuggestions.length > 0 && (
        <ul className="absolute w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10">
          {filteredSuggestions.map((item, index) => (
            <li
              key={index}
              onClick={() => handleSelect(item)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ComparisonSearchBar;
