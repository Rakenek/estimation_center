// app/excel-upload/page.tsx
'use client';

import React, { useState } from 'react';
import * as XLSX from 'xlsx';

const ExcelUploadForm = () => {
  // State to store form data and file
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    image_url: '',
    status: '',
    n03_do_PUM: '',
  }); // Initially empty form fields
  console.log(formData);
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
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0]; // Get the first sheet name
      const sheet = workbook.Sheets[sheetName];
      const json: string[][] = XLSX.utils.sheet_to_json(sheet, { header: 1 }); // Convert sheet to JSON (rows)
      // Populate form data using the first row of values from Excel (skip header row)
      console.log(json);

      setFormData({
        name: json[1]?.[0] || '', // Assuming data starts from the second row
        city: json[1]?.[1] || '',
        image_url: json[1]?.[2] || '',
        status: json[1]?.[3] || '',
        n03_do_PUM: json[1]?.[4] || '',
      });
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

  // Handle submit (e.g., send data to a backend)
  const handleSubmit = () => {
    // For now, just log the data to the console
    console.log('Form submitted with data:', formData);
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-4">
        Upload Excel File and Enter Data
      </h2>

      {/* Button to upload Excel file */}
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileChange}
        className="border p-2 mb-4"
      />

      {/* Form with empty values initially */}
      <form className="space-y-4">
        {/* Name */}
        <div>
          <label className="text-sm font-medium" htmlFor="name">
            Nazwa
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="border p-2 rounded w-full text-black"
          />
        </div>

        {/* Age */}
        <div>
          <label className="text-sm font-medium" htmlFor="age">
            Miasto
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            className="border p-2 rounded w-full text-black"
          />
        </div>

        {/* Email */}
        <div>
          <label className="text-sm font-medium" htmlFor="email">
            Adres obrazu
          </label>
          <input
            type="text"
            id="image_url"
            name="image_url"
            value={formData.image_url}
            onChange={handleInputChange}
            className="border p-2 rounded w-full text-black"
          />
        </div>

        {/* Country */}
        <div>
          <label className="text-sm font-medium" htmlFor="country">
            Status
          </label>
          <input
            type="text"
            id="status"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className="border p-2 rounded w-full text-black"
          />
        </div>
        <div>
          <label className="text-sm font-medium" htmlFor="country">
            Koszt n03/PUM
          </label>
          <input
            type="text"
            id="n03_do_PUM"
            name="n03_do_PUM"
            value={formData.n03_do_PUM}
            onChange={handleInputChange}
            className="border p-2 rounded w-full text-black"
          />
        </div>
      </form>

      {/* Submit button */}
      <button
        onClick={handleSubmit}
        className="mt-4 p-2 bg-blue-500 text-white rounded"
      >
        Submit Data
      </button>
    </div>
  );
};

export default ExcelUploadForm;
