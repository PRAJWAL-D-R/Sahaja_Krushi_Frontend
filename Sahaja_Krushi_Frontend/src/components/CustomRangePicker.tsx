import { useEffect, useRef, useState } from "react";
import { DateRange, RangeKeyDict } from "react-date-range";
import { format } from "date-fns";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface CustomRangePickerProps {
  label?: string;
  value?: string;
  name?: string;
  required?: boolean;
  onDateChange: (startDate: Date, endDate: Date) => void;
  error?: string;
  popupClassName?: string;
}

export default function CustomRangePicker({
  label = "Custom Range",
  value = "Select Range",
  name,
  required,
  onDateChange,
  error,
  popupClassName,
}: CustomRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleApply = () => {
    const { startDate, endDate } = range[0];
    onDateChange(startDate!, endDate!);
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const getDisplayValue = () => {
    const { startDate, endDate } = range[0];
    if (startDate && endDate && startDate.getTime() !== endDate.getTime()) {
      return `${format(startDate, "MM/dd/yyyy")} - ${format(endDate, "MM/dd/yyyy")}`;
    }
    return value;
  };

  return (
    <div className={`relative ${error ? "text-red-500" : ""}`} ref={dropdownRef}>
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}

      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between w-full h-[40px] bg-white border ${
          error ? "border-red-500" : "border-[#D1D5DB]"
        } rounded-[6px] px-3 text-sm text-gray-700 cursor-pointer`}
      >
        <span className="truncate">{getDisplayValue()}</span>
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

      {isOpen && (
        <div className={`absolute z-50 mt-2 bg-white border border-gray-300 rounded shadow-lg p-2 text-sm ${popupClassName || 'w-[280px]'}`}>
          <div className="custom-range-picker">
            <DateRange
              editableDateInputs
              onChange={(item: RangeKeyDict) => {
                const selection = item.selection;
                setRange([
                  {
                    startDate: selection.startDate || new Date(),
                    endDate: selection.endDate || new Date(),
                    key: "selection",
                  },
                ]);
              }}
              moveRangeOnFirstSelection={false}
              ranges={range}
              rangeColors={["#F97316"]}
              months={1}
              direction="horizontal"
              showDateDisplay={false}
              showMonthAndYearPickers={false}
              showPreview={false}
              showSelectionPreview={false}
              staticRanges={[]}
              inputRanges={[]}
            />
          </div>
          <div className="flex justify-end mt-2 gap-2 border-t pt-2">
            <button
              onClick={handleCancel}
              className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 text-xs"
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              className="px-3 py-1 bg-orange-500 text-white rounded hover:bg-orange-600 text-xs"
            >
              Apply
            </button>
          </div>
        </div>
      )}

      {error && <span className="text-xs text-red-500 mt-1">{error}</span>}
    </div>
  );
}
