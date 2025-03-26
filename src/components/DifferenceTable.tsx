import { divide, remappingKeys, combineArrays } from '@/lib/customFunctions';
import { Cost, Parameters } from '@prisma/client';
import React from 'react';
import Table from './Table';
import { dividerType } from './CostTable';

interface CostTableProps {
  proj1: { selectedCost: Cost; selectedParameters: Parameters };
  proj2: { selectedCost: Cost; selectedParameters: Parameters };
  divider?: dividerType;
}

export default function DifferenceTable({
  proj1,
  proj2,
  divider = dividerType.NONE,
}: CostTableProps) {
  let divideBy1: number | number[];
  if (divider === dividerType.NONE) {
    divideBy1 = 1;
  } else if (divider === dividerType.PUMPUU) {
    divideBy1 = proj1.selectedParameters.pum_i_puu;
  } else if (divider === dividerType.NETTO) {
    divideBy1 = proj1.selectedParameters.powierzchnia_netto;
  } else if (divider === dividerType.INDICATORS) {
    divideBy1 = [
      proj1.selectedParameters.pum_i_puu,
      proj1.selectedParameters.pum_i_puu,
      proj1.selectedParameters.liczba_kondygnacji_podziemnych === 1
        ? proj1.selectedParameters.powierzchnia_zabudowy_podziemia +
          proj1.selectedParameters
            .powierzchnia_zabudowy_nadziemia_poza_obrysem_podziemia
        : proj1.selectedParameters.powierzchnia_netto_podziemia,
      proj1.selectedParameters.powierzchnia_zabudowy_podziemia,
      proj1.selectedParameters.powierzchnia_zabudowy_podziemia,
      proj1.selectedParameters.powierzchnia_zabudowy_podziemia +
        proj1.selectedParameters
          .powierzchnia_zabudowy_nadziemia_poza_obrysem_podziemia,
      proj1.selectedParameters.powierzchnia_zabudowy_podziemia +
        proj1.selectedParameters
          .powierzchnia_zabudowy_nadziemia_poza_obrysem_podziemia,
      proj1.selectedParameters.powierzchnia_netto_podziemia,
      proj1.selectedParameters.powierzchnia_netto_nadziemia,
      proj1.selectedParameters.powierzchnia_elewacji,
      proj1.selectedParameters.powierzchnia_dachow,
      proj1.selectedParameters.powierzchnia_netto_podziemia,
      proj1.selectedParameters.powierzchnia_netto_nadziemia,
      proj1.selectedParameters.pum_i_puu,
      proj1.selectedParameters.pum_i_puu,
      proj1.selectedParameters.powierzchnia_netto,
      proj1.selectedParameters.powierzchnia_netto,
      proj1.selectedParameters.powierzchnia_netto,
      proj1.selectedParameters.powierzchnia_netto,
      proj1.selectedParameters.powierzchnia_netto,
      proj1.selectedParameters.powierzchnia_niezabudowana_dzialki,
      proj1.selectedParameters.powierzchnia_niezabudowana_dzialki,
      proj1.selectedParameters.powierzchnia_niezabudowana_dzialki,
      proj1.selectedParameters.pum_i_puu,
      proj1.selectedParameters.pum_i_puu,
      proj1.selectedParameters.pum_i_puu,
      proj1.selectedParameters.pum_i_puu,
    ];
  }
  let divideBy2: number | number[];
  if (divider === dividerType.NONE) {
    divideBy2 = 1;
  } else if (divider === dividerType.PUMPUU) {
    divideBy2 = proj2.selectedParameters.pum_i_puu;
  } else if (divider === dividerType.NETTO) {
    divideBy2 = proj2.selectedParameters.powierzchnia_netto;
  } else if (divider === dividerType.INDICATORS) {
    divideBy2 = [
      proj2.selectedParameters.pum_i_puu,
      proj2.selectedParameters.pum_i_puu,
      proj2.selectedParameters.liczba_kondygnacji_podziemnych === 1
        ? proj2.selectedParameters.powierzchnia_zabudowy_podziemia +
          proj2.selectedParameters
            .powierzchnia_zabudowy_nadziemia_poza_obrysem_podziemia
        : proj2.selectedParameters.powierzchnia_netto_podziemia,
      proj2.selectedParameters.powierzchnia_zabudowy_podziemia,
      proj2.selectedParameters.powierzchnia_zabudowy_podziemia,
      proj2.selectedParameters.powierzchnia_zabudowy_podziemia +
        proj2.selectedParameters
          .powierzchnia_zabudowy_nadziemia_poza_obrysem_podziemia,
      proj2.selectedParameters.powierzchnia_zabudowy_podziemia +
        proj2.selectedParameters
          .powierzchnia_zabudowy_nadziemia_poza_obrysem_podziemia,
      proj2.selectedParameters.powierzchnia_netto_podziemia,
      proj2.selectedParameters.powierzchnia_netto_nadziemia,
      proj2.selectedParameters.powierzchnia_elewacji,
      proj2.selectedParameters.powierzchnia_dachow,
      proj2.selectedParameters.powierzchnia_netto_podziemia,
      proj2.selectedParameters.powierzchnia_netto_nadziemia,
      proj2.selectedParameters.pum_i_puu,
      proj2.selectedParameters.pum_i_puu,
      proj2.selectedParameters.powierzchnia_netto,
      proj2.selectedParameters.powierzchnia_netto,
      proj2.selectedParameters.powierzchnia_netto,
      proj2.selectedParameters.powierzchnia_netto,
      proj2.selectedParameters.powierzchnia_netto,
      proj2.selectedParameters.powierzchnia_niezabudowana_dzialki,
      proj2.selectedParameters.powierzchnia_niezabudowana_dzialki,
      proj2.selectedParameters.powierzchnia_niezabudowana_dzialki,
      proj2.selectedParameters.pum_i_puu,
      proj2.selectedParameters.pum_i_puu,
      proj2.selectedParameters.pum_i_puu,
      proj2.selectedParameters.pum_i_puu,
    ];
  }

  const labels = [
    'id',
    `N01${divider === dividerType.INDICATORS ? ' +[PLN/PUM]' : ''}`,
    `N03${divider === dividerType.INDICATORS ? ' +[PLN/PUM]' : ''}`,
    `Roboty ziemne${
      divider === dividerType.INDICATORS
        ? proj1.selectedParameters.liczba_kondygnacji_podziemnych === 1
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
      divider === dividerType.INDICATORS ? ' +[PLN/POW NIEZABUDOWANEJ]' : ''
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

  const updatedCostTableName1 = remappingKeys(
    proj1.selectedCost,
    labels,
    1,
    -1
  );
  const updatedCostTableValues1 = divide(updatedCostTableName1, divideBy1);

  const updatedCostTableName2 = remappingKeys(
    proj2.selectedCost,
    labels,
    1,
    -1
  );
  const updatedCostTableValues2 = divide(updatedCostTableName2, divideBy2);

  const finalTable = combineArrays(
    updatedCostTableValues1,
    updatedCostTableValues2
  );

  return (
    <div>
      <Table
        dataTable={finalTable}
        tableName={`Różnica`}
        differenceTable={true}
      />
    </div>
  );
}
