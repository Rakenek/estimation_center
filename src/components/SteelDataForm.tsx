"use client";
import React, { useState } from "react";

const SteelDataForm = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
    text1: 0,
    text2: "",
    number1: 0,
    number2: 0,
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
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    // Add your form submission logic here
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg text-black">
      <h2 className="text-2xl font-semibold mb-4">Dodaj dane stali</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="text1"
            className="block text-sm font-medium text-gray-700"
          >
            Rok
          </label>
          <input
            type="number"
            id="text1"
            name="text1"
            value={formData.text1}
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
            id="text2"
            name="text2"
            value={formData.text2}
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
            id="number1"
            name="number1"
            value={formData.number1}
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
            id="number2"
            name="number2"
            value={formData.number2}
            onChange={handleChange}
            className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SteelDataForm;
