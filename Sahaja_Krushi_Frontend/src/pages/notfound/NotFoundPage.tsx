import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Sprout } from "lucide-react";

const ComingSoonPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-sm p-8 text-center border border-green-100">
        {/* Icon */}
        <div className="mb-6 flex justify-center">
          <Sprout className="w-12 h-12 text-green-600" />
        </div>

        {/* Content */}
        <h1 className="text-2xl font-semibold text-gray-800 mb-3">
          Coming Soon
        </h1>
        <p className="text-gray-600 mb-6">
          We're working on this feature for your agriculture project. 
          Check back later for updates!
        </p>

        {/* Simple Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="w-full max-w-xs mx-auto flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Go Back
        </button>

        {/* Minimal Version Info */}
        <p className="mt-8 text-xs text-gray-400">
          AgriApp v2.0
        </p>
      </div>
    </div>
  );
};

export default ComingSoonPage;