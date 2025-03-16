import React from "react";

interface TableRowParams {
  label: string;
  value: string | number;
}

export default function TableRow({ label, value }: TableRowParams) {
  const separatedLabel = label.split("+");
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="px-6 py-4 text-sm text-gray-800 text-left">
        {separatedLabel[0]}
      </td>
      <td className="px-6 py-4 text-sm text-gray-800 text-center">
        {value.toLocaleString("fr-FR")}
      </td>
      {separatedLabel.length === 2 ? (
        <td className="px-6 py-4 text-sm text-gray-800 text-left">
          {separatedLabel[1]}
        </td>
      ) : null}
    </tr>
  );
}
