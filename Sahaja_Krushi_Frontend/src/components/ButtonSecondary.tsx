import React from "react";

interface ButtonSecondaryProps {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
}

const ButtonSecondary: React.FC<ButtonSecondaryProps> = ({
  text,
  onClick,
  type = "button",
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-gray-200 cursor-pointer text-gray-500 font-medium 
        px-4 py-1 sm:px-5 sm:py-1.5 md:px-6 md:py-2 
        text-sm sm:text-base 
        rounded hover:bg-gray-300 
        transition-all duration-200 
        min-w-[120px] sm:min-w-[140px] md:min-w-[150px] 
        ${className}`}
    >
      {text}
    </button>
  );
};

export default ButtonSecondary;
