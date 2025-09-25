import React from "react";

interface CheckboxFieldProps {
  label: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  name?: string;
  className?: string;
  error?: string;
}

const CheckboxField: React.FC<CheckboxFieldProps> = ({
  label,
  checked = false,
  onChange,
  required = false,
  name,
  className = "",
  error,
}) => {
  return (
    <div className={`flex flex-col gap-1 w-full ${className}`}>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
          className={`h-4 w-4 text-orange-500 border-gray-300 rounded focus:ring-2 ${
            error ? "focus:ring-primary" : "focus:ring-orange-500"
          }`}
          id={name}
        />
        <label className="text-sm text-gray-700 font-medium" htmlFor={name}>
          {label} {required && <span className="text-primary">*</span>}
        </label>
      </div>
      {error && <span className="text-xs text-primary">{error}</span>}
    </div>
  );
};

export default CheckboxField;
