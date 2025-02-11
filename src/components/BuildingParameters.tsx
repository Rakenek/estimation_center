import { Parameters } from "@prisma/client";
import React from "react";

interface BuildingProps {
  parameters: Parameters;
}

const BuildingParameters: React.FC<BuildingProps> = ({ parameters }) => {
  // Dummy data for the table
  const data = Array.from({ length: 20 }, (_, index) => ({
    col1: `Row ${index + 1} Col 1`,
    col2: `Row ${index + 1} Col 2`,
  }));

  return (
    <div className="overflow-x-auto max-w-96 mx-auto mt-10">
      <table className="min-w-full table-auto bg-white shadow-lg rounded-lg">
        <thead>
          <tr className="bg-gray-100 text-left text-sm font-medium text-gray-700">
            <th colSpan={2} className="px-6 py-3 border-b text-center">
              Parametry
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b hover:bg-gray-50">
            <td className="px-6 py-4 text-sm text-gray-800 text-center">
              Powierzchnia działki
            </td>
            <td className="px-6 py-4 text-sm text-gray-800 text-center">
              {parameters.powierzchnia_dzialki}
            </td>
          </tr>
          <tr className="border-b hover:bg-gray-50">
            <td className="px-6 py-4 text-sm text-gray-800 text-center">
              Powierzchnia nadziemia
            </td>
            <td className="px-6 py-4 text-sm text-gray-800 text-center">
              {parameters.powierzchnia_nadziemia}
            </td>
          </tr>
          <tr className="border-b hover:bg-gray-50">
            <td className="px-6 py-4 text-sm text-gray-800 text-center">
              Powierzchnia podziemia
            </td>
            <td className="px-6 py-4 text-sm text-gray-800 text-center">
              {parameters.powierzchnia_podziemia}
            </td>
          </tr>
          <tr className="border-b hover:bg-gray-50">
            <td className="px-6 py-4 text-sm text-gray-800 text-center">
              Powierzchnia niezabudowana działki
            </td>
            <td className="px-6 py-4 text-sm text-gray-800 text-center">
              {parameters.powierzchnia_niezabudowana_dzialki}
            </td>
          </tr>
          <tr className="border-b hover:bg-gray-50">
            <td className="px-6 py-4 text-sm text-gray-800 text-center">
              Powierzchnia dachów
            </td>
            <td className="px-6 py-4 text-sm text-gray-800 text-center">
              {parameters.powierzchnia_dachow}
            </td>
          </tr>
          <tr className="border-b hover:bg-gray-50">
            <td className="px-6 py-4 text-sm text-gray-800 text-center">
              Powierzchnia elewacji
            </td>
            <td className="px-6 py-4 text-sm text-gray-800 text-center">
              {parameters.powierzchnia_elewacji}
            </td>
          </tr>
          <tr className="border-b hover:bg-gray-50">
            <td className="px-6 py-4 text-sm text-gray-800 text-center">
              Powierzchnia netto
            </td>
            <td className="px-6 py-4 text-sm text-gray-800 text-center">
              {parameters.powierzchnia_netto}
            </td>
          </tr>
          <tr className="border-b hover:bg-gray-50">
            <td className="px-6 py-4 text-sm text-gray-800 text-center">
              Powierzchnia netto podziemia
            </td>
            <td className="px-6 py-4 text-sm text-gray-800 text-center">
              {parameters.powierzchnia_netto_podziemia}
            </td>
          </tr>
          <tr className="border-b hover:bg-gray-50">
            <td className="px-6 py-4 text-sm text-gray-800 text-center">
              Powierzchnia netto nadziemia
            </td>
            <td className="px-6 py-4 text-sm text-gray-800 text-center">
              {parameters.powierzchnia_netto_nadziemia}
            </td>
          </tr>
          <tr className="border-b hover:bg-gray-50">
            <td className="px-6 py-4 text-sm text-gray-800 text-center">
              PUM + PUU
            </td>
            <td className="px-6 py-4 text-sm text-gray-800 text-center">
              {parameters.pum_i_puu}
            </td>
          </tr>
          <tr className="border-b hover:bg-gray-50">
            <td className="px-6 py-4 text-sm text-gray-800 text-center">PUM</td>
            <td className="px-6 py-4 text-sm text-gray-800 text-center">
              {parameters.pum}
            </td>
          </tr>
          <tr className="border-b hover:bg-gray-50">
            <td className="px-6 py-4 text-sm text-gray-800 text-center">PUU</td>
            <td className="px-6 py-4 text-sm text-gray-800 text-center">
              {parameters.puu}
            </td>
          </tr>
          <tr className="border-b hover:bg-gray-50">
            <td className="px-6 py-4 text-sm text-gray-800 text-center">
              Powierzchnie wspólne nadziemia
            </td>
            <td className="px-6 py-4 text-sm text-gray-800 text-center">
              {parameters.powierzchnie_wspolne_nadziemia}
            </td>
          </tr>
          <tr className="border-b hover:bg-gray-50">
            <td className="px-6 py-4 text-sm text-gray-800 text-center">
              Powierzchnia garażu w nadziemiu
            </td>
            <td className="px-6 py-4 text-sm text-gray-800 text-center">
              {parameters.powierzchnia_garazu_w_nadziemiu}
            </td>
          </tr>
          <tr className="border-b hover:bg-gray-50">
            <td className="px-6 py-4 text-sm text-gray-800 text-center">
              Liczba_kondygnacji
            </td>
            <td className="px-6 py-4 text-sm text-gray-800 text-center">
              {parameters.liczba_kondygnacji}
            </td>
          </tr>
          <tr className="border-b hover:bg-gray-50">
            <td className="px-6 py-4 text-sm text-gray-800 text-center">
              Liczba miejsc parkingowych w budynku
            </td>
            <td className="px-6 py-4 text-sm text-gray-800 text-center">
              {parameters.liczba_miejsc_parkingowych}
            </td>
          </tr>
          <tr className="border-b hover:bg-gray-50">
            <td className="px-6 py-4 text-sm text-gray-800 text-center">
              Liczba kondygnacji
            </td>
            <td className="px-6 py-4 text-sm text-gray-800 text-center">
              {parameters.liczba_kondygnacji}
            </td>
          </tr>
          <tr className="border-b hover:bg-gray-50">
            <td className="px-6 py-4 text-sm text-gray-800 text-center">
              Liczba miejsc parkingowych w budynku
            </td>
            <td className="px-6 py-4 text-sm text-gray-800 text-center">
              {parameters.liczba_miejsc_parkingowych}
            </td>
          </tr>
          <tr className="border-b hover:bg-gray-50">
            <td className="px-6 py-4 text-sm text-gray-800 text-center">
              Liczba mieszkań
            </td>
            <td className="px-6 py-4 text-sm text-gray-800 text-center">
              {parameters.ilosc_mieszkan}
            </td>
          </tr>
          <tr className="border-b hover:bg-gray-50">
            <td className="px-6 py-4 text-sm text-gray-800 text-center">
              Średnia powierzchnia mieszkania
            </td>
            <td className="px-6 py-4 text-sm text-gray-800 text-center">
              {parameters.srednia_powierzchnia_mieszkania}
            </td>
          </tr>
          <tr className="border-b hover:bg-gray-50">
            <td className="px-6 py-4 text-sm text-gray-800 text-center">
              Udział powierzchni wspólnych nadziemia
            </td>
            <td className="px-6 py-4 text-sm text-gray-800 text-center">
              {parameters.udzial_powierzchni_wspolnych_nadziemia}
            </td>
          </tr>
          <tr className="border-b hover:bg-gray-50">
            <td className="px-6 py-4 text-sm text-gray-800 text-center">
              Powierzchnia podziemia / PUM+PUU
            </td>
            <td className="px-6 py-4 text-sm text-gray-800 text-center">
              {parameters.pow_podziemia_do_pum_i_puu}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BuildingParameters;
