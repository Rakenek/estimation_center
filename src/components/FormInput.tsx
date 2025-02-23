import React from "react";

interface FormInputProps {
  type: string;
  label: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FormInput({
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
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required
        className="border p-2 rounded w-full text-black"
      />
    </div>
  );
}
