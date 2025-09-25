// components/MultiSelectField.tsx
import React from "react";
import Select from "react-select";

interface OptionType {
  label: string;
  value: string;
}

interface MultiSelectFieldProps {
  label: string;
  name: string;
  options: OptionType[];
  value: OptionType[];
  onChange: (selected: OptionType[]) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  className?: string;
  disabled?: boolean;
}

const MultiSelectField: React.FC<MultiSelectFieldProps> = ({
  label,
  options,
  value,
  name,
  onChange,
  placeholder = "Select...",
  required = false,
  error,
  className = "",
  disabled = false,
}) => {
  return (
    <div className={`flex flex-col gap-1 w-full ${className}`}>
      <label className="text-sm text-gray-700 font-medium">
        {label} {required && <span className="text-primary">*</span>}
      </label>
      <Select
        isDisabled={disabled}
        name={name}
        isMulti
        options={options}
        value={value}
        onChange={(selected) => onChange(selected as OptionType[])}
        placeholder={placeholder}
        classNamePrefix="react-select"
        className={`react-select-container ${
          error ? "border border-primary rounded-md" : ""
        }`}
      />
      {error && <span className="text-xs text-primary">{error}</span>}
    </div>
  );
};

export default MultiSelectField;
