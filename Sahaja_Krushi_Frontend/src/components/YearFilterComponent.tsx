import { useState } from "react";

interface YearFilterProps {
  value?: number;
  defaultValue?: number;
  className?: string;
  onChange?: (year: number) => void;
  error?: string;
  label?: string;
  name?: string;
  placeholder?: string;
  required?: boolean;
}

const generateYearOptions = () => {
  const currentYear = new Date().getFullYear();
  const years: number[] = [];
  // Generate years from 3 years ago to 3 years in future
  for (let i = currentYear - 3; i <= currentYear + 3; i++) {
    years.push(i);
  }
  return years;
};

export default function YearFilterComponent({
  value,
  defaultValue = new Date().getFullYear(),
  className,
  onChange,
  error,
  label,
  name,
}: YearFilterProps) {
  const [selectedYear, setSelectedYear] = useState<number>(value || defaultValue);
  const years = generateYearOptions();

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const year = parseInt(e.target.value);
    setSelectedYear(year);
    onChange?.(year);
  };

  return (
    <div className={`relative ${className || ""}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}

      <select
        name={name}
        value={selectedYear}
        onChange={handleYearChange}
        className={`w-full h-[40px] bg-white border ${
          error ? "border-red-500" : "border-[#D1D5DB]"
        } rounded-[6px] px-3 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-orange-500`}
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>

      {error && <span className="text-xs text-red-500 mt-1">{error}</span>}
    </div>
  );
} 