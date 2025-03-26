// app/components/Dropdown.tsx
'use client';

import { useState } from 'react';

type DropdownProps = {
  options: string[];
  onSelect: (option: string) => void;
};

const DropdownMenu: React.FC<DropdownProps> = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="w-96 relative text-black">
      <button
        onClick={toggleDropdown}
        className="bg-blue-500  p-2 rounded-md w-full focus:outline-none"
      >
        {selectedOption ? selectedOption : options[3]}
      </button>

      {isOpen && (
        <ul className="absolute left-0 mt-2 w-full bg-white shadow-lg rounded-md border border-gray-300 z-10">
          {options.map((option) => (
            <li
              key={option}
              onClick={() => handleOptionClick(option)}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownMenu;
