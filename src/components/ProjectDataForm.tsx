"use client";
import React, { useActionState, useEffect, useState } from "react";
import * as XLSX from "xlsx";
import FormInput from "./FormInput";
import { redirect } from "next/navigation";
import { Cost, Parameters, Project } from "@prisma/client";
import UploadImage from "./UploadImage";

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
  "Powierzchnia podziemia / PUM i PUU",
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

interface initialStateInterface {
  name: string;
  city: string;
  image_url: string;
  status: string;
  n03_do_PUM: string | number;
  powierzchnia_dzialki: string | number;
  powierzchnia_nadziemia: string | number;
  powierzchnia_podziemia: string | number;
  powierzchnia_niezabudowana_dzialki: string | number;
  powierzchnia_dachow: string | number;
  powierzchnia_elewacji: string | number;
  powierzchnia_netto: string | number;
  powierzchnia_netto_podziemia: string | number;
  powierzchnia_netto_nadziemia: string | number;
  pum_i_puu: string | number;
  pum: string | number;
  puu: string | number;
  powierzchnie_wspolne_nadziemia: string | number;
  powierzchnia_garazu_w_nadziemiu: string | number;
  liczba_kondygnacji: string | number;
  liczba_miejsc_parkingowych: string | number;
  liczba_parkliftow: string | number;
  ilosc_mieszkan: string | number;
  srednia_powierzchnia_mieszkania: string | number;
  udzial_powierzchni_wspolnych_nadziemia: string | number;
  pow_podziemia_do_pum_i_puu: string | number;
  n01: string | number;
  n03: string | number;
  roboty_ziemne: string | number;
  konstrukcja_podziemia: string | number;
  konstrukcja_nadziemia: string | number;
  elewacje: string | number;
  dachy: string | number;
  wykonczenie_nadziemia: string | number;
  wykonczenie_podziemia: string | number;
  windy: string | number;
  instalacje_klimatyzacyjne: string | number;
  instalacje_wodno_kanalizacyjne: string | number;
  instalacje_gazowe: string | number;
  instalacje_elektryczne: string | number;
  instalacje_teletechniczne: string | number;
  infrastruktura: string | number;
  dfa: string | number;
  sieci: string | number;
  koszty_budowy: string | number;
  bhp: string | number;
  offset_poza_dzialka: string | number;
}

const initialState: initialStateInterface = {
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

interface ProjectDataFormProps {
  action: (
    prevState: { errors?: { form: string }; success?: string },
    formData: FormData
  ) => Promise<{ errors?: { form: string }; success?: string }>;
  newInitialData?: (Project & Parameters & Cost) | null;
}

export default function ProjectDataForm({
  action,
  newInitialData = null,
}: ProjectDataFormProps) {
  useEffect(() => {
    if (newInitialData) {
      setFormData({ ...initialState, ...newInitialData });
    }
  }, [newInitialData]);

  const [formData, setFormData] = useState(initialState);
  const [file, setFile] = useState<File | null>(null);
  const [state, formAction] = useActionState(action, {
    errors: { form: "" },
    success: "",
  });
  const [cloudinaryImg, setCloudinaryImg] = useState("");

  const handleDataFromChild = (data: string) => {
    setCloudinaryImg(data);
  };

  if (state.success?.length > 0) {
    setFormData(initialState);
    redirect("/search");
  }

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      readExcelFile(selectedFile);
    }
  };

  return (
    <div className="p-4 ">
      {newInitialData === null && (
        <h1 className="text-4xl font-semibold mb-4 flex justify-center items-center">
          Dodaj nowy projekt
        </h1>
      )}
      {newInitialData !== null && (
        <h1 className="text-4xl font-semibold mb-4 flex justify-center items-center">
          Edytujesz projekt: {newInitialData.name}
        </h1>
      )}

      <h2 className="text-2xl font-semibold mb-4 flex justify-center items-center">
        Wczytaj dane z pliku Excel
      </h2>

      {/* Button to upload Excel file */}
      <div className="flex justify-center items-center">
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileChange}
          className="border p-2 mb-4"
        />
      </div>

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

      {/* Form with controlled inputs */}

      {/* Submit button */}
      <form action={formAction} className="space-y-4">
        <div className="flex gap-5 justify-center items-center">
          <button className="mt-4 p-2 bg-blue-500 text-white rounded">
            Wyślij dane
          </button>
        </div>

        <div className="flex justify-center items-center">
          <div className="grid grid-cols-4 gap-5 ">
            {Object.keys(formData).map((key, index) => {
              const type = index < 4 ? "text" : "number";
              return (
                <React.Fragment key={key}>
                  {index === 0 && (
                    <div className=" col-span-4 text-2xl font-semibold">
                      Projekt
                    </div>
                  )}
                  {index === 5 && (
                    <div className="mt-10 col-span-4 text-2xl font-semibold">
                      Parametry inwestycji
                    </div>
                  )}
                  {index === 26 && (
                    <div className="mt-10 col-span-4 text-2xl font-semibold">
                      Koszty
                    </div>
                  )}
                  <FormInput
                    key={key}
                    readOnly={key === "image_url" ? true : false}
                    type={type}
                    label={formLabels[index]}
                    name={key}
                    // value={formData[key as keyof typeof formData]}
                    value={
                      key !== "image_url"
                        ? formData[key as keyof typeof formData]
                        : cloudinaryImg
                        ? cloudinaryImg
                        : newInitialData
                        ? newInitialData.image_url
                        : "https://res.cloudinary.com/duv2kieyz/image/upload/v1740656853/my-nextjs-project/sg05cnm7lcq9ccu2jyvb.jpg"
                    }
                    onChange={handleInputChange}
                  />
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Button to upload img file */}
        <div className="pt-16">
          <h2 className="flex justify-center items-center text-2xl font-semibold mb-4 ">
            Wczytaj obraz projektu (opcjonalnie)
          </h2>
          <div className="flex justify-center items-center">
            <UploadImage handleDataFromChild={handleDataFromChild} />
          </div>
        </div>

        <div className="flex  gap-5  justify-center items-center">
          <button className="mt-4 p-2 bg-blue-500 text-white rounded">
            Wyślij Dane
          </button>
        </div>
      </form>
    </div>
  );
}
