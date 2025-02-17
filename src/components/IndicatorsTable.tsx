import { divide, remappingKeys } from '@/lib/customFunctions';
import { Cost } from '@prisma/client';
import React from 'react';
import Table from './Table';

interface CostTableProps {
  cost: Cost;
  tableName: string;
  divider?: number;
}

export default function IndicatorsTable({
  cost,
  tableName,
  divider = 1,
}: CostTableProps) {
  const labels = [
    'id',
    'N01',
    'N03',
    'Roboty ziemne',
    'Konstrukcja podziemia',
    'Konstrukcja nadziemia',
    'Elewacje',
    'Dachy',
    'Wykończenie nadziemia',
    'Wykończenie podziemia',
    'Windy',
    'Instalacje klimatyzacyjne',
    'Instalacje wodno-kanalizacyjne',
    'Instalacje gazowe',
    'Instalacje elektryczne',
    'Instalacje teletechniczne',
    'Infrastruktura',
    'DFA',
    'Sieci',
    'Koszty budowy',
    'BHP',
    'Offset podza działką',
    'id projektu',
  ];

  const updatedCostTableName = remappingKeys(cost, labels, 1, -1);
  const updatedCostTableValues = divide(updatedCostTableName, divider);

  return (
    <div>
      <Table dataTable={updatedCostTableValues} tableName={tableName} />
    </div>
  );
}
