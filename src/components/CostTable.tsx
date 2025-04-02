import { divide, remappingKeys } from '@/lib/customFunctions';
import { Cost, Parameters } from '@prisma/client';
import React from 'react';
import Table from './Table';

export enum dividerType {
  NONE = 'none',
  PUMPUU = 'pumpuu',
  NETTO = 'netto',
  APARTMENTS = 'apartments',
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
  divider = dividerType.NONE,
}: CostTableProps) {
  let divideBy: number | number[];
  if (divider === dividerType.NONE) {
    divideBy = 1;
  } else if (divider === dividerType.PUMPUU) {
    divideBy = parameters.pum_i_puu;
  } else if (divider === dividerType.NETTO) {
    divideBy = parameters.powierzchnia_netto;
  } else if (divider === dividerType.APARTMENTS) {
    divideBy = parameters.ilosc_mieszkan;
  } else if (divider === dividerType.INDICATORS) {
    divideBy = [
      parameters.pum_i_puu,
      parameters.pum_i_puu,
      parameters.liczba_kondygnacji_podziemnych === 1
        ? parameters.powierzchnia_zabudowy_podziemia +
          parameters.powierzchnia_zabudowy_nadziemia_poza_obrysem_podziemia
        : parameters.powierzchnia_netto_podziemia,
      parameters.powierzchnia_zabudowy_podziemia,
      parameters.powierzchnia_zabudowy_podziemia,
      parameters.powierzchnia_zabudowy_podziemia +
        parameters.powierzchnia_zabudowy_nadziemia_poza_obrysem_podziemia,
      parameters.powierzchnia_zabudowy_podziemia +
        parameters.powierzchnia_zabudowy_nadziemia_poza_obrysem_podziemia,
      parameters.powierzchnia_netto_podziemia,
      parameters.powierzchnia_netto_nadziemia,
      parameters.powierzchnia_elewacji,
      parameters.powierzchnia_dachow,
      parameters.powierzchnia_netto_podziemia,
      parameters.powierzchnia_netto_nadziemia,
      parameters.pum_i_puu,
      parameters.pum_i_puu,
      parameters.powierzchnia_netto,
      parameters.powierzchnia_netto,
      parameters.powierzchnia_netto,
      parameters.powierzchnia_netto,
      parameters.powierzchnia_netto,
      parameters.powierzchnia_niezabudowana_dzialki,
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
      divider === dividerType.INDICATORS
        ? parameters.liczba_kondygnacji_podziemnych === 1
          ? ' +[PLN/POW FUNDAMENTÓW]'
          : ' +[PLN/NETTO PODZIEMIA]'
        : ''
    }`,
    `Zabezpieczenie wykopów${
      divider === dividerType.INDICATORS ? ' +[PLN/ZABUDOWY PODZIEMIA]' : ''
    }`,
    `Ściany szczelinowe${
      divider === dividerType.INDICATORS ? ' +[PLN/ZABUDOWY PODZIEMIA]' : ''
    }`,
    `Roboty palowe${
      divider === dividerType.INDICATORS ? ' +[PLN/POW FUNDAMENTÓW]' : ''
    }`,
    `Prace fundamentowe${
      divider === dividerType.INDICATORS ? ' +[PLN/POW FUNDAMENTÓW]' : ''
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
    `Wykończenie podziemia${
      divider === dividerType.INDICATORS ? ' +[PLN/NETTO PODZIEMIA]' : ''
    }`,
    `Wykończenie nadziemia${
      divider === dividerType.INDICATORS ? ' +[PLN/NETTO NADZIEMIA]' : ''
    }`,
    `Windy${divider === dividerType.INDICATORS ? ' +[PLN/PUM]' : ''}`,
    `Parklifty${divider === dividerType.INDICATORS ? ' +[PLN/PUM]' : ''}`,
    `Instalacje klimatyzacyjne${
      divider === dividerType.INDICATORS ? ' +[PLN/NETTO]' : ''
    }`,
    `Instalacje wod-kan${
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
      divider === dividerType.INDICATORS ? ' +[PLN/NIEZABUDOWANEJ]' : ''
    }`,
    `DFA${divider === dividerType.INDICATORS ? ' +[PLN/NIEZABUDOWANEJ]' : ''}`,
    `Zieleń${
      divider === dividerType.INDICATORS ? ' +[PLN/NIEZABUDOWANEJ]' : ''
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
