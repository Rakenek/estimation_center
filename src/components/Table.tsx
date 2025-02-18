import React from 'react';
import TableRow from './TableRow';

interface TableProps {
  dataTable: { name: string; value: string | number }[];
  tableName: string;
}

export default function Table({ dataTable, tableName }: TableProps) {
  return (
    <div className="overflow-x-auto max-w-xl mx-auto">
      <table className="min-w-full table-auto bg-white shadow-lg rounded-lg">
        <thead>
          <tr className="bg-gray-100 text-left text-sm font-medium text-gray-700">
            <th
              colSpan={dataTable[0].name.split('+').length === 2 ? 3 : 2}
              className="px-6 py-3 border-b text-center"
            >
              {tableName}
            </th>
          </tr>
        </thead>
        <tbody>
          {dataTable.map((dataElement) => (
            <TableRow
              key={dataElement.name}
              label={dataElement.name}
              value={dataElement.value}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
