import React from "react";

interface FormInputProps {
  readOnly: boolean;
  type: string;
  label: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FormInput({
  readOnly,
  type,
  label,
  name,
  value,
  onChange,
}: FormInputProps) {
  return (
    <div className="max-w-xs">
      <label className="text-sm font-medium" htmlFor="image_url">
        {label}
      </label>
      <input
        readOnly={readOnly}
        type={type}
        id={name}
        name={name}
        value={typeof value === "number" ? value.toFixed(2) : value}
        onChange={onChange}
        required
        className="border p-2 rounded w-full text-black"
      />
    </div>
  );
}
