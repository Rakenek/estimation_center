"use client";

import { createProject } from "@/actions/actions";
import FormInput from "@/components/FormInput";
import { getKeys } from "@/lib/customFunctions";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import { useActionState } from "react";
import * as XLSX from "xlsx";

const formLabels = [
  "Nazwa",
  "Miasto",
  "Adres obrazu",
  "Status",
  "Koszt n03/PUM",
  "Powierzchnia działki",
  "Powierzchnia zabudowy nadziemia",
  "Powierzchnia zabudowy podziemia",
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
  "Powierzchnia garazu w nadziemiu",
  "Liczba kondygnacji",
  "Liczba miejsc parkingowych",
  "Liczba parkliftów",
  "Liczba mieszkań",
  "Średnia powierzchnia mieszkania",
  "Udział powierzchni wspólnych nadziemia",
  "Powierzchnia podziemia PUM i PUU",
  "n01",
  "n03",
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
];

const initialState = {
  name: "",
  city: "",
  image_url: "",
  status: "",
  n03_do_PUM: "",
  powierzchnia_dzialki: "",
  powierzchnia_nadziemia: "",
  powierzchnia_podziemia: "",
  powierzchnia_niezabudowana_dzialki: "",
  powierzchnia_dachow: "",
  powierzchnia_elewacji: "",
  powierzchnia_netto: "",
  powierzchnia_netto_podziemia: "",
  powierzchnia_netto_nadziemia: "",
  pum_i_puu: "",
  pum: "",
  puu: "",
  powierzchnie_wspolne_nadziemia: "",
  powierzchnia_garazu_w_nadziemiu: "",
  liczba_kondygnacji: "",
  liczba_miejsc_parkingowych: "",
  liczba_parkliftow: "",
  ilosc_mieszkan: "",
  srednia_powierzchnia_mieszkania: "",
  udzial_powierzchni_wspolnych_nadziemia: "",
  pow_podziemia_do_pum_i_puu: "",
  n01: "",
  n03: "",
  roboty_ziemne: "",
  konstrukcja_podziemia: "",
  konstrukcja_nadziemia: "",
  elewacje: "",
  dachy: "",
  wykonczenie_nadziemia: "",
  wykonczenie_podziemia: "",
  windy: "",
  instalacje_klimatyzacyjne: "",
  instalacje_wodno_kanalizacyjne: "",
  instalacje_gazowe: "",
  instalacje_elektryczne: "",
  instalacje_teletechniczne: "",
  infrastruktura: "",
  dfa: "",
  sieci: "",
  koszty_budowy: "",
  bhp: "",
  offset_poza_dzialka: "",
};

const ExcelUploadForm = () => {
  const [state, formAction] = useActionState(createProject, {
    errors: { form: "" },
    success: "",
  });

  if (state.success?.length > 0) {
    redirect("/search");
  }

  // State to store form data and file
  const [formData, setFormData] = useState(initialState);

  const [file, setFile] = useState<File | null>(null);

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      readExcelFile(selectedFile);
    }
  };

  // Parse the Excel file using xlsx library
  const readExcelFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target?.result;
      const workbook = XLSX.read(data, { type: "array" });
      const sheet = workbook.Sheets["EC"];
      const json: string[][] = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      const newObj = Object.keys(formData).reduce<typeof initialState>(
        (acc, key, index) => {
          const typedKey = key as keyof typeof initialState;
          acc[typedKey] = json[index][1];
          return acc;
        },
        initialState
      );
      setFormData({ ...newObj });
    };
    reader.readAsArrayBuffer(file);
  };

  // Handle change in form data (from keyboard)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-4">
        Upload Excel File and Enter Data
      </h2>

      {/* Display error message */}
      {state.errors?.form && (
        <div className="bg-red-100 text-red-700 p-2 rounded mb-4">
          {state.errors.form}
        </div>
      )}

      {/* Display success message */}
      {state.success && (
        <div className="bg-green-100 text-green-700 p-2 rounded mb-4">
          {state.success}
        </div>
      )}

      {/* Button to upload Excel file */}
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileChange}
        className="border p-2 mb-4"
      />

      {/* Form with controlled inputs */}

      {/* Submit button */}
      <form action={formAction} className="space-y-4">
        {Object.keys(formData).map((key, index) => (
          <FormInput
            key={key}
            label={formLabels[index]}
            name={key}
            value={formData[key as keyof typeof formData]}
            onChange={handleInputChange}
          />
        ))}

        <button className="mt-4 p-2 bg-blue-500 text-white rounded">
          Submit Data
        </button>
      </form>
    </div>
  );
};

export default ExcelUploadForm;
