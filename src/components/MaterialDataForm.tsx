"use client";

import { MaterialPrice } from "@prisma/client";
import { useActionState, useEffect, useState } from "react";

const initialData = {
  year: 0,
  month: 0,
  sciany_kominy: 0,
  izolacje_wodochronne: 0,
  dachy_rynny: 0,
  izolacje_termiczne: 0,
  chemia_budowlana: 0,
  stolarka: 0,
  sucha_zabudowa: 0,
  plyty_osb: 0,
  narzedzia: 0,
  cement_wapno: 0,
  farby_lakiery: 0,
  plytki_lazienki_kuchnie: 0,
  instalacje_ogrzewania: 0,
  wyposazenie_agd: 0,
  ogrod_hobby: 0,
  dekoracje: 0,
  motoryzacja: 0,
  wykonczenia: 0,
  elektryka_oswietlenie: 0,
  otoczenie_domu: 0,
};

interface MaterialDataFormProps {
  materialPrice: MaterialPrice;
  action: (
    prevState: { errors?: { form: string }; success?: string },
    formData: FormData
  ) => Promise<{ errors?: { form: string }; success?: string }>;
}

export default function MaterialDataForm({
  materialPrice,
  action,
}: MaterialDataFormProps) {
  const [formData, setFormData] = useState({
    ...initialData,
    year:
      materialPrice.month === 12 ? materialPrice.year + 1 : materialPrice.year,
    month: materialPrice.month === 12 ? 1 : materialPrice.month + 1,
  });
  const [state, formAction] = useActionState(action, {
    errors: { form: "" },
    success: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-lg rounded-lg text-black">
      <h2 className="flex items-center justify-center font-bold text-2xl pb-4 ">
        Dodaj dane zmiany ceny materiałów budowlanych
      </h2>
      <form action={formAction} className="space-y-4">
        {Object.keys(formData).map((key) => (
          <div key={key} className="flex flex-col">
            <label className="font-medium capitalize" htmlFor={key}>
              {key.replace(/_/g, " ")}
            </label>
            <input
              id={key}
              name={key}
              type="number"
              step="0.1"
              value={formData[key as keyof typeof formData]}
              onChange={handleChange}
              className="p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
