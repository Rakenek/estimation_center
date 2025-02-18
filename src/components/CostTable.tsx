import { divide, remappingKeys } from '@/lib/customFunctions';
import { Cost, Parameters } from '@prisma/client';
import React from 'react';
import Table from './Table';

export enum dividerType {
  PUMPUU = 'pumpuu',
  NETTO = 'netto',
  INDICATORS = 'indicators',
}

interface CostTableProps {
  cost: Cost;
  parameters: Parameters;
  tableName: string;
  divider?: dividerType;
}

export default function CostTable({
  cost,
  parameters,
  tableName,
  divider = dividerType.PUMPUU,
}: CostTableProps) {
  let divideBy: number | number[] = parameters.pum;

  if (divider === dividerType.PUMPUU) {
    divideBy = parameters.pum_i_puu;
  } else if (divider === dividerType.NETTO) {
    divideBy = parameters.powierzchnia_netto;
  } else if (divider === dividerType.INDICATORS) {
    divideBy = [
      parameters.pum_i_puu,
      parameters.pum_i_puu,
      parameters.powierzchnia_netto_podziemia,
      parameters.powierzchnia_netto_podziemia,
      parameters.powierzchnia_netto_nadziemia,
      parameters.powierzchnia_elewacji,
      parameters.powierzchnia_dachow,
      parameters.powierzchnia_netto_nadziemia,
      parameters.powierzchnia_netto_podziemia,
      parameters.pum_i_puu,
      parameters.powierzchnia_netto,
      parameters.powierzchnia_netto,
      parameters.powierzchnia_netto,
      parameters.powierzchnia_netto,
      parameters.powierzchnia_netto,
      parameters.powierzchnia_niezabudowana_dzialki,
      parameters.powierzchnia_niezabudowana_dzialki,
      parameters.pum_i_puu,
      parameters.pum_i_puu,
      parameters.pum_i_puu,
      parameters.pum_i_puu,
    ];
  }

  const labels = [
    'id',
    `N01${divider === dividerType.INDICATORS ? ' +[PLN/PUM]' : ''}`,
    `N03${divider === dividerType.INDICATORS ? ' +[PLN/PUM]' : ''}`,
    `Roboty ziemne${
      divider === dividerType.INDICATORS ? ' +[PLN/NETTO PODZIEMIA]' : ''
    }`,
    `Konstrukcja podziemia${
      divider === dividerType.INDICATORS ? ' +[PLN/NETTO PODZIEMIA]' : ''
    }`,
    `Konstrukcja nadziemia${
      divider === dividerType.INDICATORS ? ' +[PLN/NETTO NADZIEMIA]' : ''
    }`,
    `Elewacje${
      divider === dividerType.INDICATORS ? ' +[PLN/POW ELEWACJI]' : ''
    }`,
    `Dachy${divider === dividerType.INDICATORS ? ' +[PLN/POW DACHÓW]' : ''}`,
    `Wykończenie nadziemia${
      divider === dividerType.INDICATORS ? ' +[PLN/NETTO NADZIEMIA]' : ''
    }`,
    `Wykończenie podziemia${
      divider === dividerType.INDICATORS ? ' +[PLN/NETTO PODZIEMIA]' : ''
    }`,
    `Windy${divider === dividerType.INDICATORS ? ' +[PLN/NETTO PUM]' : ''}`,
    `Instalacje klimatyzacyjne${
      divider === dividerType.INDICATORS ? ' +[PLN/NETTO]' : ''
    }`,
    `Instalacje wodno-kanalizacyjne${
      divider === dividerType.INDICATORS ? ' +[PLN/NETTO]' : ''
    }`,
    `Instalacje gazowe${
      divider === dividerType.INDICATORS ? ' +[PLN/NETTO]' : ''
    }`,
    `Instalacje elektryczne${
      divider === dividerType.INDICATORS ? ' +[PLN/NETTO]' : ''
    }`,
    `Instalacje teletechniczne${
      divider === dividerType.INDICATORS ? ' +[PLN/NETTO]' : ''
    }`,
    `Infrastruktura${
      divider === dividerType.INDICATORS ? ' +[PLN/POW NIEZABUDOWANEJ]' : ''
    }`,
    `DFA${
      divider === dividerType.INDICATORS ? ' +[PLN/POW NIEZABUDOWANEJ]' : ''
    }`,
    `Sieci${divider === dividerType.INDICATORS ? ' +[PLN/PUM]' : ''}`,
    `Koszty budowy${divider === dividerType.INDICATORS ? ' +[PLN/PUM]' : ''}`,
    `BHP${divider === dividerType.INDICATORS ? ' +[PLN/PUM]' : ''}`,
    `Offset podza działką${
      divider === dividerType.INDICATORS ? ' +[PLN/PUM]' : ''
    }`,
    `id projektu`,
  ];

  const updatedCostTableName = remappingKeys(cost, labels, 1, -1);
  const updatedCostTableValues = divide(updatedCostTableName, divideBy);

  return (
    <div>
      <Table dataTable={updatedCostTableValues} tableName={tableName} />
    </div>
  );
}
