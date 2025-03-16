import { Parameters } from "@prisma/client";
import React from "react";
import Table from "./Table";
import { remappingKeys } from "@/lib/customFunctions";

interface ParametersTableProps {
  parameters: Parameters;
}

const ParametersTable: React.FC<ParametersTableProps> = ({ parameters }) => {
  const labels = [
    "id",
    "Powierzchnia działki",
    "Powierzchnia zabudowy nadziemia",
    "Powierzchnia zabudowy podziemia",
    "Nadziemie poza obrysem podziemia",
    "Powierzchnia niezabudowana działki",
    "Powierzchnia dachów",
    "Powierzchnia elewacji",
    "Powierzchnia netto",
    "Powierzchnia netto podziemia",
    "Powierzchnia netto nadziemia",
    "PUM i PUU",
    "PUM",
    "PUU",
    "Powierzchnie wspólne nadziemia",
    "Powierzchnia garażu w nadziemiu",
    "Liczba kondygnacji podziemnych",
    "Liczba kondygnacji nadziemnych",
    "Liczba miejsc parkingowych w budynku",
    "Liczba parkliftów",
    "Liczba mieszkań",
    "Średnia powierzchnia mieszkania",
    "Udział powierzchni wspólnych nadziemia",
    "Powierzchnia podziemia / PUM i PUU",
    "id projektu",
  ];

  const parameterTable = remappingKeys(parameters, labels, 1, -1);

  return (
    <div>
      <Table dataTable={parameterTable} tableName="Parametry inwestycji" />
    </div>
  );
};

export default ParametersTable;
