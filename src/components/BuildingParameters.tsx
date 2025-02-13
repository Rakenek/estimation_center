import { Parameters } from "@prisma/client";
import React from "react";
import TableRow from "./TableRow";

interface BuildingProps {
  parameters: Parameters;
}

const BuildingParameters: React.FC<BuildingProps> = ({ parameters }) => {
  const labels = [
    "id",
    "Powierzchnia działki",
    "Powierzchnia nadziemia",
    "Powierzchnia podziemia",
    "Powierzchnia niezabudowana działki",
    "Powierzchnia dachów",
    "Powierzchnia elewacji",
    "Powierzchnia netto",
    "Powierzchnia netto podziemia",
    "Powierzchnia netto nadziemia",
    "PUM + PUU",
    "PUM",
    "PUU",
    "Powierzchnie wspólne nadziemia",
    "Powierzchnia gażu w nadziemiu",
    "Liczba kondygnacji",
    "Liczba miejsc parkingowych w budynkku",
    "Liczba mieszkań",
    "Średnia powierzchnia mieszkania",
    "Udział powierzchni wspólnych nadziemia",
    "Powierzchnia podziemia / PUM+PUU",
    "id projektu",
  ];
  const parameterTable = Object.entries(parameters)
    .map(([key, value], index) => {
      return { propertyName: labels[index], value };
    })
    .slice(1, -2);

  return (
    <div className="overflow-x-auto max-w-96 mx-auto mt-10">
      <table className="min-w-full table-auto bg-white shadow-lg rounded-lg">
        <thead>
          <tr className="bg-gray-100 text-left text-sm font-medium text-gray-700">
            <th colSpan={2} className="px-6 py-3 border-b text-center">
              Parametry
            </th>
          </tr>
        </thead>
        <tbody>
          {parameterTable.map((parameter) => (
            <TableRow
              key={parameter.propertyName}
              label={parameter.propertyName}
              value={parameter.value}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BuildingParameters;
