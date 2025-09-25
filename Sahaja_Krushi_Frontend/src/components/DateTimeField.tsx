import React from "react";
interface DateTimeFieldProps {
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  name?: string;
  className?: string;
  error?: string;
  min?: string;
  max?: string;
  disabled?: boolean; // <-- add this
}

const DateTimeField: React.FC<DateTimeFieldProps> = ({
  label,
  placeholder = "",
  value = "",
  onChange,
  required = false,
  name,
  className = "",
  error,
  min,
  max,
  disabled,
}) => {
  console.log("min-->", min);
  return (
    <div className={`flex flex-col gap-1 w-full ${className}`}>
      <label className="text-sm text-gray-700 font-medium">
        {label} {required && <span className="text-primary">*</span>}
      </label>
      <input
        type="datetime-local"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        disabled={disabled} // <-- add this line
        className={`px-4 py-2 border rounded-md bg-white text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 ${
          error
            ? "border-primary focus:ring-primary"
            : "border-gray-300 focus:ring-orange-500"
        } ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}`}
      />

      {error && <span className="text-xs text-primary">{error}</span>}
    </div>
  );
};

export default DateTimeField;
