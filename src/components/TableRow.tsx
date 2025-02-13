import React from "react";

interface TableRowParams {
  label: string;
  value: string | number;
}

export default function TableRow({ label, value }: TableRowParams) {
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="px-6 py-4 text-sm text-gray-800 text-center">{label}</td>
      <td className="px-6 py-4 text-sm text-gray-800 text-center">{value}</td>
    </tr>
  );
}
