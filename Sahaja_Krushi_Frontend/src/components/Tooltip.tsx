import React from "react";

interface TooltipProps {
  text: string;
  maxLength?: number;
}

const Tooltip: React.FC<TooltipProps> = ({ text, maxLength = 15 }) => {
  const displayText =
    maxLength && text?.length > maxLength
      ? `${text.slice(0, maxLength)}...`
      : text;

  return (
    <div className="group relative inline-block w-full">
      <span className="cursor-pointer truncate block">{displayText}</span>

      {maxLength && text?.length > maxLength && (
        <div
          className="absolute z-[9999] w-auto p-2 min-w-max rounded-md shadow-md
    text-white bg-gray-900 text-xs whitespace-normal
    font-bold transition-all duration-100 scale-0 group-hover:scale-100
    bottom-full mb-2 origin-bottom left-0"
        >
          {text}
          <div
            className="absolute w-2 h-2 bg-gray-900 rotate-45 
        bottom-[-4px] left-[10px]"
          ></div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
