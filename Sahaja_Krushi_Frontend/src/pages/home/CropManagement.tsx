import React from "react";

const CropManagementPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-md p-8 text-center border border-green-100">
        <h1 className="text-3xl font-bold text-green-700 mb-4">Crop Management</h1>
        <p className="text-gray-600 mb-6">
          This page will help you monitor crops, manage agricultural data, and access crop-related services.
        </p>
        <div className="text-gray-400 italic">(Crop management features coming soon...)</div>
      </div>
    </div>
  );
};

export default CropManagementPage; 