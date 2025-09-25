import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";

interface DropdownOption {
  label: string;
  path: string;
}

interface DropdownPrimaryButtonProps {
  text: string;
  options: DropdownOption[];
  className?: string;
}

const DropdownPrimaryButton: React.FC<DropdownPrimaryButtonProps> = ({
  text,
  options,
  className = "",
}) => {
  const navigate = useNavigate();

  return (
    <div className={`relative group inline-block ${className}`}>
      {/* Main Button */}
      <button
        className="flex items-center justify-between gap-2 bg-primary text-white font-semibold px-6 py-1 rounded hover:bg-primary-hover transition-all duration-200 min-w-[150px] group-hover:animate-pulse"
      >
        {text}
        <ChevronDown size={16} />
      </button>

      {/* Dropdown List */}
      <div className="absolute left-0 mt-1 w-full bg-white border border-gray-200 rounded shadow-md opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-200 z-10">
        {options.map((option, index) => (
          <button
            key={index}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => navigate(option.path)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DropdownPrimaryButton;