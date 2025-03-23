"use client";

import { MaterialPrice } from "@prisma/client";
import React from "react";

interface MaterialPriceTableProps {
  materialPriceData: MaterialPrice[];
}

const labels = [
  "Rok",
  "Miesiąc",
  "Ściany Kominy",
  "Izolacje Wodochronne",
  "Dachy Rynny",
  "Izolacje Termiczne",
  "Chemia Budowlana",
  "Stolarka",
  "Sucha Zabudowa",
  "Płyty OSB",
  "Narzędzia",
  "Cement Wapno",
  "Farby Lakiery",
  "Płytki Łazienki Kuchnie",
  "Instalacje Ogrzewania",
  "Wyposaenie AGD",
  "Ogród Hobby",
  "Dekoracje",
  "Motoryzacja",
  "Wykończenia",
  "Elektryka Oświetlenie",
  "Otoczenie Domu",
];

export default function MaterialPriceTable({
  materialPriceData,
}: MaterialPriceTableProps) {
  // Map the data to exclude 'id'
  const filteredData = materialPriceData.map((obj) => {
    const { id, ...rest } = obj; // Destructure to separate id from other properties
    return rest; // Return object without id
  });
  // console.log(filteredData);

  // Define the type for the accumulator based on MaterialPrice, excluding 'id', 'year', and 'month'
  type SummaryObject = Partial<Omit<MaterialPrice, "id" | "year" | "month">>;

  // Compute the summary object with proper typing
  const summaryObject = [
    filteredData.reduce((acc: SummaryObject, curr) => {
      // Get all keys except 'year' and 'month'
      const keys = Object.keys(curr).filter(
        (key) => key !== "year" && key !== "month"
      );

      // For each key, add its value to the accumulator
      keys.forEach((key) => {
        // Type assertion to ensure key is a valid property of SummaryObject
        const typedKey = key as keyof SummaryObject;
        acc[typedKey] = (acc[typedKey] || 0) + curr[typedKey];
      });

      return acc;
    }, {}),
  ];
  console.log(summaryObject);
  const newObject = summaryObject[0];
  const values = Object.values(newObject);

  // Step 2: Sum all the values
  const sum = values.reduce((acc, curr) => acc + curr, 0);

  // Step 3: Count the number of values
  const count = values.length;

  // Step 4: Calculate the average
  const average = sum / count;

  const finalData = [
    ...filteredData,
    { ...summaryObject[0], year: 0, month: 0 },
  ];

  // Define categories by excluding 'id', 'year', and 'month' from MaterialPrice keys
  const categories = Object.keys(finalData[0]).filter(
    (key) => key !== "year" && key !== "month"
  ) as (keyof Omit<MaterialPrice, "id" | "year" | "month">)[];

  return (
    <>
      <span
        className={`${
          average > 0 ? "text-red-600" : "text-green-500"
        } flex items-center justify-center pt-9`}
      >
        Średnio w roku {filteredData[0].year} ceny{" "}
        {average > 0 ? "wzrosły" : "spadły"} o {average.toFixed(1)} %
      </span>
      <div className="overflow-x-auto p-4 text-black">
        <table className="min-w-full border border-gray-300 text-sm">
          <thead>
            <tr className="bg-gray-200">
              {labels.map((category) => (
                <th
                  key={category}
                  className="border border-gray-300 p-2 capitalize"
                >
                  {category.replace(/_/g, " ")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {finalData.map((row, index) => (
              <tr key={index} className="odd:bg-gray-100 even:bg-white">
                <td className="border border-gray-300 p-2 text-center">
                  {row.year !== 0 ? row.year : "Suma"}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {row.month !== 0 ? row.month : "1-12"}
                </td>
                {categories.map((category) => (
                  <td
                    key={category}
                    className={`border border-gray-300 p-2 text-center ${
                      row[category] < 0 ? "text-green-500" : "text-red-600"
                    }`}
                  >
                    {row[category].toFixed(1)}%
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
