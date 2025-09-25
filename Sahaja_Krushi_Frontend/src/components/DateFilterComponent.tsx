import { useEffect, useState, useRef } from "react";
import { format } from "date-fns";

export interface DateRangeDropdownProps {
  value?: string;
  defaultValue?: string;
  className?: string;
  onChange?: (option: string) => void;
  onDateChange?: (startDate: Date, endDate: Date) => void;
  error?: string;
  label?: string;
  name?: string;
  placeholder?: string;
  required?: boolean;
}

const options: string[] = [
  "Today",
  "Yesterday",
  "Last 7 Days",
  "Last 30 Days",
  "This Month",
  "Last Month"
];

const getPresetRange = (option: string) => {
  const today = new Date();
  switch (option) {
    case "Today":
      return { startDate: today, endDate: today };
    case "Yesterday":
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      return { startDate: yesterday, endDate: yesterday };
    case "Last 7 Days":
      return {
        startDate: new Date(today.getTime() - 6 * 86400000),
        endDate: today
      };
    case "Last 30 Days":
      return {
        startDate: new Date(today.getTime() - 29 * 86400000),
        endDate: today
      };
    case "This Month":
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      return { startDate: startOfMonth, endDate: endOfMonth };
    case "Last Month":
      const startOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      const endOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      return { startDate: startOfLastMonth, endDate: endOfLastMonth };
    default:
      return { startDate: today, endDate: today };
  }
};

export default function DateRangeDropdown({
  value,
  defaultValue = "Last 7 Days",
  className,
  onChange,
  onDateChange,
  error,
  label
}: DateRangeDropdownProps) {
  const [selectedOption, setSelectedOption] = useState<string>(defaultValue);
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [range, setRange] = useState(() => {
    const preset = getPresetRange(defaultValue);
    return {
      startDate: preset.startDate,
      endDate: preset.endDate
    };
  });

  const handleSelectOption = (option: string) => {
    setSelectedOption(option);
    setShowOptions(false);
    const preset = getPresetRange(option);
    setRange(preset);
    onChange?.(option);
    onDateChange?.(preset.startDate, preset.endDate);
  };

  useEffect(() => {
    if (value) {
      setSelectedOption(value);
      const preset = getPresetRange(value);
      setRange(preset);
      onDateChange?.(preset.startDate, preset.endDate);
    }
  }, [value]);

  // Close dropdown on outside click
  useEffect(() => {
    if (!showOptions) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showOptions]);

  return (
    <div ref={dropdownRef} className={`relative ${className || ""}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}

      <div
        onClick={() => setShowOptions(!showOptions)}
        className={`flex items-center justify-between w-full h-[40px] bg-white border ${
          error ? "border-red-500" : "border-[#D1D5DB]"
        } rounded-[6px] px-3 text-sm text-gray-700 cursor-pointer ${className}`}
      >
        <span className="truncate">{selectedOption}</span>
        <svg
          className="w-4 h-4 text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.584l3.71-4.354a.75.75 0 111.14.976l-4.25 5a.75.75 0 01-1.14 0l-4.25-5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      {showOptions && (
        <ul className="absolute z-30 mt-2 w-40 bg-white border border-gray-300 rounded shadow-lg max-h-[300px] overflow-y-auto">
          {options.map((option) => (
            <li
              key={option}
              className={`px-4 py-2 cursor-pointer ${
                selectedOption === option
                  ? "bg-orange-500 text-white"
                  : "hover:bg-orange-100"
              }`}
              onClick={() => handleSelectOption(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}

      {error && <span className="text-xs text-red-500 mt-1">{error}</span>}
    </div>
  );
}
