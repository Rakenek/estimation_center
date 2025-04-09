// components/MatrixTable.tsx
import React from "react";

type MTableProps = {
  rowLabels: string[];
  colLabels: string[];
  data: number[][];
};

const MTable: React.FC<MTableProps> = ({ rowLabels, colLabels, data }) => {
  return (
    <div className="relative overflow-x-auto rounded-xl shadow-md h-[700px]">
      {" "}
      {/* Increased height to 500px */}
      <table className="text-sm text-left text-gray-700 bg-white rounded-xl">
        <thead className="bg-gray-100 text-xs uppercase text-gray-500 sticky top-0 z-0">
          <tr>
            <th className="w-[250px] px-4 py-3 bg-white rounded-tl-xl"></th>
            {rowLabels.map((label, index) => (
              <th
                key={index}
                className="text-center px-4 py-3 rounded-t-xl" // Apply rounded corners for the top
              >
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {colLabels.map((colLabel, colIndex) => (
            <tr
              key={colIndex}
              className="border-t hover:bg-gray-50 transition-colors"
            >
              <td className="w-[250px] px-4 py-3 font-medium bg-gray-50 rounded-l-xl">
                {colLabel}
              </td>
              {rowLabels.map((_, rowIndex) => (
                <td
                  key={rowIndex}
                  className="w-[180px] px-4 py-3 text-right rounded-r-xl" // Apply text-right to data cells
                >
                  {Math.round(data[rowIndex]?.[colIndex]).toLocaleString(
                    "fr-FR"
                  ) ?? "-"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td
              className="px-4 py-3 rounded-bl-xl"
              colSpan={rowLabels.length + 1}
            ></td>
            <td
              className="px-4 py-3 rounded-br-xl"
              colSpan={rowLabels.length}
            ></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default MTable;
