import React from 'react';

export interface Option {
  value: string;
  label: string;
}

interface CommonSelectProps {
  options: Option[];
  value: Option;
  onChange: (option: Option | null) => void;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
}

const CommonSelect: React.FC<CommonSelectProps> = ({
  options,
  value,
  onChange,
  className = '',
  placeholder = 'Select an option',
  disabled = false,
}) => {
  return (
    <select
      value={value.value}
      onChange={(e) => {
        const selectedOption = options.find(opt => opt.value === e.target.value);
        onChange(selectedOption || null);
      }}
      disabled={disabled}
      className={`px-4 py-2 border rounded-md bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 border-gray-300 focus:ring-orange-500 ${className}`}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default CommonSelect; 