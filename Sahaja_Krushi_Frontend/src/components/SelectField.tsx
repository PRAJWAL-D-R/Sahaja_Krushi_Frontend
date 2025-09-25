import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, Search, Plus } from "lucide-react";
import debounce from "lodash/debounce";

interface Option {
  label: string;
  value: string;
}

interface SelectFieldProps {
  label: string;
  options: Option[];
  value?: string | number | undefined;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
  name?: string;
  className?: string;
  error?: string;
  placeholder?: string;
  isSearchable?: boolean;
  isInfiniteScroll?: boolean;
  onSearch?: (query: string) => void;
  onLoadMore?: () => void;
  loading?: boolean;
  customDropdown?: boolean;
  disabled?: boolean;
  addButtonPath?: string;
  addButtonText?: string;
  showAddButton?: boolean;
}

// Add these styles at the top of the file after imports
const scrollbarStyles = `
  .custom-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: rgba(203, 213, 225, 1) transparent;
  }

  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    display: block !important;
  }

  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 20px;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: rgba(203, 213, 225, 1);
    border-radius: 20px;
    border: transparent;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background-color: rgba(148, 163, 184, 1);
  }
`;

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  options,
  value = "",
  onChange,
  required = false,
  name,
  className = "",
  error,
  placeholder = "Select...",
  isSearchable = false,
  isInfiniteScroll = false,
  onSearch,
  onLoadMore,
  loading = false,
  customDropdown = false,
  disabled = false,
  addButtonPath,
  showAddButton = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  useEffect(() => {
    const option = options.find((opt) => String(opt.value) === String(value));
    setSelectedOption(option || null);
  }, [value, options]);

  // Add new useEffect to handle initial value
  useEffect(() => {
    if (value && options.length > 0) {
      const option = options.find((opt) => String(opt.value) === String(value));
      if (option) {
        setSelectedOption(option);
      }
    }
  }, [options, value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Add style tag for scrollbar
  useEffect(() => {
    const styleTag = document.createElement("style");
    styleTag.textContent = scrollbarStyles;
    document.head.appendChild(styleTag);
    return () => {
      document.head.removeChild(styleTag);
    };
  }, []);

  const debouncedSearch = debounce((query: string) => {
    onSearch?.(query);
  }, 300);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (!isInfiniteScroll || loading) return;

    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight + 50) {
      onLoadMore?.();
    }
  };

  const handleOptionSelect = (option: Option) => {
    if (disabled) return; // Prevent selection when disabled
    const syntheticEvent = {
      target: {
        name,
        value: option.value,
      },
    } as React.ChangeEvent<HTMLSelectElement>;

    onChange?.(syntheticEvent);
    setIsOpen(false);
  };

  if (!customDropdown) {
    return (
      <div className={`flex flex-col gap-1 w-full ${className}`}>
        <div className="flex justify-between items-center">
          <label className="text-sm text-gray-700 font-medium">
            {label} {required && <span className="text-primary">*</span>}
          </label>
        </div>
        <div className="relative">
          <select
            name={name}
            value={value}
            onChange={onChange}
            disabled={disabled}
            className={`px-4 py-2 pr-10 border rounded-md bg-white text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 w-full appearance-none
              ${
                error
                  ? "border-orange-500 focus:ring-orange-500"
                  : "border-gray-300 focus:ring-green-500"
              } ${disabled ? "bg-gray-50 cursor-not-allowed opacity-60" : ""}`}
          >
            <option value="" disabled hidden>
              {placeholder}
            </option>
            {options.map((option) => (
              <option key={String(option.value)} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
            <ChevronDown size={16} />
          </div>
        </div>
        {error && <span className="text-xs text-orange-500">{error}</span>}
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col gap-1 w-full ${className}`}
      ref={dropdownRef}
    >
      <div className="flex justify-between items-center">
        <label className="text-sm text-gray-700 font-medium">
          {label} {required && <span className="text-primary">*</span>}
        </label>
      </div>
      <div className="relative">
        <div
          onClick={() => {
            if (!disabled) {
              setIsOpen(!isOpen);
              if (!isOpen && isSearchable) {
                setTimeout(() => searchInputRef.current?.focus(), 100);
              }
            }
          }}
          className={`px-4 py-2 border rounded-md bg-white text-sm text-gray-700 cursor-pointer flex justify-between items-center
            ${error ? "border-orange-500" : "border-gray-300"}
            ${isOpen && !disabled ? "ring-2 ring-green-500" : ""} 
            ${disabled ? "bg-gray-50 cursor-not-allowed opacity-60" : ""}`}
        >
          <span className={selectedOption ? "" : "text-gray-400"}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown
            size={16}
            className={`text-gray-500 transition-transform ${
              isOpen ? "transform rotate-180" : ""
            }`}
          />
        </div>

        {isOpen && !disabled && (
          <div className="absolute z-50 w-full mt-1">
              <div className="bg-white border border-gray-200 rounded-md shadow-lg">
              {isSearchable && (
                <div className="p-2 border-b border-gray-200 relative flex items-center">
                  <div className="relative flex-1">
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={handleSearchChange}
                      placeholder="Search..."
                        className="w-full px-8 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <Search
                      size={16}
                      className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400"
                    />
                  </div>
                  {showAddButton && addButtonPath && (
                    <a
                      href={addButtonPath}
                      className="ml-2 flex items-center justify-center rounded-full bg-white border border-orange-500 text-orange-500 hover:bg-orange-50 transition-colors"
                      style={{ width: 18, height: 18 }}
                      tabIndex={-1}
                    >
                      <Plus size={18} />
                    </a>
                  )}
                </div>
              )}

              <div
                className="max-h-[200px] overflow-y-auto custom-scrollbar"
                style={{
                  overflowY: "auto",
                  overflowX: "hidden",
                  position: "relative",
                  minHeight: "100px",
                }}
                onScroll={(e) => {
                  e.stopPropagation();
                  handleScroll(e);
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="py-1">
                  {options.length > 0 ? (
                    options.map((option) => (
                      <div
                        key={String(option.value)}
                        onClick={() => handleOptionSelect(option)}
                        className={`px-4 py-2 text-sm cursor-pointer hover:bg-orange-50 
                          ${
                            String(value) === String(option.value)
                              ? "bg-orange-100"
                              : ""
                          }`}
                      >
                        {option.label}
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-sm text-gray-500 text-center">
                      No options found
                    </div>
                  )}
                  {loading && (
                    <div className="px-4 py-2 text-sm text-gray-500 text-center">
                      Loading...
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {error && <span className="text-xs text-primary">{error}</span>}
    </div>
  );
};

export default SelectField;
