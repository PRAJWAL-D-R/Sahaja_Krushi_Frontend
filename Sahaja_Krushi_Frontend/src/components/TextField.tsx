import React from "react";

interface TextFieldProps {
  label: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  name?: string;
  className?: string;
  error?: string;
  maxLength?: number;
  type?: string;
  readOnly?: boolean;
}

const TextField: React.FC<TextFieldProps> = ({
  label,
  placeholder = "",
  value = "",
  onChange,
  required = false,
  name = "",
  className = "",
  error,
  maxLength,
  type = "text",
  readOnly = false, // ✅ Default value set here
}) => {
  const inputId = `textfield-${name}`;

  return (
    <div className={`flex flex-col gap-1 w-full ${className}`}>
      <label htmlFor={inputId} className="text-sm text-gray-700 font-medium">
        {label} {required && <span className="text-primary">*</span>}
      </label>

      <input
        id={inputId}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        readOnly={readOnly} // ✅ Passed to input
        className={`px-4 py-2 border rounded-md bg-white text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 ${
          error
            ? "border-orange-500 focus:ring-orange-500"
            : "border-gray-300 focus:ring-green-500"
        } ${readOnly ? "bg-gray-100 cursor-not-allowed" : ""}`} // Optional: visually indicate read-only
      />

      <div className="flex justify-between items-center">
        {error && <span className="text-xs text-orange-500">{error}</span>}
        {maxLength && (
          <span className="text-xs text-gray-400 ml-auto">
            {String(value).length || 0}/{maxLength}
          </span>
        )}
      </div>
    </div>
  );
};

export default TextField;
