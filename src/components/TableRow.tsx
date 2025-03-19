import React from 'react';

interface TableRowParams {
  label: string;
  value: string | number;
  differenceTable?: boolean;
}

export default function TableRow({
  label,
  value,
  differenceTable = false,
}: TableRowParams) {
  const separatedLabel = label.split('+');
  const color = differenceTable
    ? +value > 0
      ? 'text-red-600 font-bold'
      : +value < 0
      ? 'text-green-500 font-bold'
      : ''
    : '';

  return (
    <tr className="border-b hover:bg-gray-50">
      <td className={`px-6 py-4 text-sm text-gray-800 text-left ${color}`}>
        {separatedLabel[0]}
      </td>
      <td className={`px-6 py-4 text-sm text-gray-800  text-center ${color}`}>
        {value.toLocaleString('fr-FR')}
      </td>
      {separatedLabel.length === 2 ? (
        <td className={`px-6 py-4 text-sm text-gray-800 text-left  ${color}`}>
          {separatedLabel[1]}
        </td>
      ) : null}
    </tr>
  );
}
