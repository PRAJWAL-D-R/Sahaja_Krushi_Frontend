import React from "react";

interface ButtonPrimaryProps {
  children: React.ReactNode;
  isLoading: boolean;
  onClick: () => void;
  className?: string;
  [key: string]: any;
}

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({ children, isLoading, onClick, className = "", ...props }) => (
  <button
    onClick={onClick}
    disabled={isLoading}
    className={`w-full flex items-center justify-center gap-2 py-3 px-6 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    {...props}
  >
    {isLoading ? (
      <>
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
        Processing...
      </>
    ) : (
      children
    )}
  </button>
);

export default ButtonPrimary;
