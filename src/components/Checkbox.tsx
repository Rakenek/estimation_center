"use client";

import { useState } from "react";

type CheckboxProps = {
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
};

export default function Checkbox({
  label,
  checked = false,
  onChange,
}: CheckboxProps) {
  const [isChecked, setIsChecked] = useState(checked);

  const handleChange = () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    onChange?.(newChecked);
  };

  return (
    <label className="flex items-center space-x-2 cursor-pointer">
      <input
        type="checkbox"
        className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
        checked={isChecked}
        onChange={handleChange}
      />
      <span className="text-white">{label}</span>
    </label>
  );
}
