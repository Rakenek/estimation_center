"use client";
import { SteelPrice } from "@prisma/client";
import { redirect } from "next/navigation";

import React, { useActionState, useState } from "react";

interface SteelDataFormProps {
  steelPrice: SteelPrice;
  action: (
    prevState: { errors?: { form: string }; success?: string },
    formData: FormData
  ) => Promise<{ errors?: { form: string }; success?: string }>;
}

const SteelDataForm = ({ steelPrice, action }: SteelDataFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const weekNumber = steelPrice
    ? `Tydzień ${parseInt(steelPrice.week.replace(/\D/g, ""), 10) + 1}`
    : "Tydzień 1";
  const [formData, setFormData] = useState({
    year: steelPrice ? steelPrice.year : 2025,
    week: weekNumber,
    minPUDS: 0,
    maxPUDS: 0,
  });
  const [state, formAction] = useActionState(action, {
    errors: { form: "" },
    success: "",
  });

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission

  if (state.success.length > 0) {
    redirect("/market-price-changes/steel");
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg text-black">
      <h2 className="text-2xl font-semibold mb-4">Dodaj dane stali</h2>
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
      <form action={formAction}>
        <div className="mb-4">
          <label
            htmlFor="text1"
            className="block text-sm font-medium text-gray-700"
          >
            Rok
          </label>
          <input
            type="number"
            id="year"
            name="year"
            value={formData.year}
            onChange={handleChange}
            className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="text2"
            className="block text-sm font-medium text-gray-700"
          >
            Tydzień
          </label>
          <input
            type="text"
            id="week"
            name="week"
            value={formData.week}
            onChange={handleChange}
            className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="number1"
            className="block text-sm font-medium text-gray-700"
          >
            Cena stali minimalna
          </label>
          <input
            type="number"
            id="minPUDS"
            name="minPUDS"
            value={formData.minPUDS}
            onChange={handleChange}
            className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="number2"
            className="block text-sm font-medium text-gray-700"
          >
            Cena stali maksymalna
          </label>
          <input
            type="number"
            id="maxPUDS"
            name="maxPUDS"
            value={formData.maxPUDS}
            onChange={handleChange}
            className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div
          onClick={() => {
            setIsLoading(true);
          }}
        >
          <button
            type="submit"
            className={`w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isLoading && state.errors?.form?.length === 0 ? "bg-blue-900" : ""
            }`}
          >
            {isLoading && state.errors?.form?.length === 0
              ? "Przesyłanie..."
              : "Dodaj dane"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SteelDataForm;
