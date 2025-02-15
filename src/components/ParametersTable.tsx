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
    "Powierzchnia nadziemia",
    "Powierzchnia podziemia",
    "Powierzchnia niezabudowana działki",
    "Powierzchnia dachów",
    "Powierzchnia elewacji",
    "Powierzchnia netto",
    "Powierzchnia netto podziemia",
    "Powierzchnia netto nadziemia",
    "PUM + PUU",
    "PUM",
    "PUU",
    "Powierzchnie wspólne nadziemia",
    "Powierzchnia gażu w nadziemiu",
    "Liczba kondygnacji",
    "Liczba miejsc parkingowych w budynkku",
    "Liczba mieszkań",
    "Średnia powierzchnia mieszkania",
    "Udział powierzchni wspólnych nadziemia",
    "Powierzchnia podziemia / PUM+PUU",
    "id projektu",
  ];

  const parameterTable = remappingKeys(parameters, labels, 1, -2);

  return (
    <div>
      <Table dataTable={parameterTable} tableName="Parametry inwestycji" />
    </div>
  );
};

export default ParametersTable;
