import React from "react";

interface FormInputProps {
  label: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FormInput({
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
        type="text"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="border p-2 rounded w-full text-black"
      />
    </div>
  );
}
