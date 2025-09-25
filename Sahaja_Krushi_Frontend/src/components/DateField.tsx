import React from "react";

interface DateFieldProps {
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  required?: boolean;
  name?: string;
  className?: string;
  error?: string;
  min?: string;
  max?: string;
  type?: "date" | "month" | "week" | "year"; // Added "year"
  startYear?: number;
  endYear?: number;
}

const DateField: React.FC<DateFieldProps> = ({
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
  type = "date",
  startYear = 1950,
  endYear = new Date().getFullYear() + 10,
}) => {
  const renderInput = () => {
    if (type === "year") {
      const years: number[] = [];
      for (let y = endYear; y >= startYear; y--) {
        years.push(y);
      }

      return (
        <select
          name={name}
          value={value}
          onChange={onChange}
          className={`px-4 py-2 border rounded-md bg-white text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 ${
            error
              ? "border-primary focus:ring-primary"
              : "border-gray-300 focus:ring-orange-500"
          }`}
        >
          <option value="">{placeholder || "Select Year"}</option>
          {years.map((year) => (
            <option key={year} value={year.toString()}>
              {year}
            </option>
          ))}
        </select>
      );
    }

    return (
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        className={`px-4 py-2 border rounded-md bg-white text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 ${
          error
            ? "border-primary focus:ring-primary"
            : "border-gray-300 focus:ring-orange-500"
        }`}
      />
    );
  };

  return (
    <div className={`flex flex-col gap-1 w-full ${className}`}>
      <label className="text-sm text-gray-700 font-medium">
        {label} {required && <span className="text-primary">*</span>}
      </label>
      {renderInput()}
      {error && <span className="text-xs text-primary">{error}</span>}
    </div>
  );
};

export default DateField;
