import { divide, remappingKeys } from "@/lib/customFunctions";
import { Cost, Parameters } from "@prisma/client";
import React from "react";
import Table from "./Table";

export enum dividerType {
  PUMPUU = "pumpuu",
  NETTO = "netto",
  INDICATORS = "indicators",
}

interface CostTableProps {
  cost: Cost;
  parameters: Parameters;
  tableName: string;
  divider?: dividerType;
}

export default function IndicatorsTable({
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
      parameters.powierzchnia_niezabudowana_dzialki,
      parameters.powierzchnia_niezabudowana_dzialki,
      parameters.pum_i_puu,
      parameters.pum_i_puu,
      parameters.pum_i_puu,
      parameters.pum_i_puu,
    ];
  }

  const labels = [
    "id",
    "N01",
    "N03",
    "Roboty ziemne",
    "Konstrukcja podziemia",
    "Konstrukcja nadziemia",
    "Elewacje",
    "Dachy",
    "Wykończenie nadziemia",
    "Wykończenie podziemia",
    "Windy",
    "Instalacje klimatyzacyjne",
    "Instalacje wodno-kanalizacyjne",
    "Instalacje gazowe",
    "Instalacje elektryczne",
    "Instalacje teletechniczne",
    "Infrastruktura",
    "DFA",
    "Sieci",
    "Koszty budowy",
    "BHP",
    "Offset podza działką",
    "id projektu",
  ];

  const updatedCostTableName = remappingKeys(cost, labels, 1, -1);
  const updatedCostTableValues = divide(updatedCostTableName, divideBy);

  return (
    <div>
      <Table dataTable={updatedCostTableValues} tableName={tableName} />
    </div>
  );
}
