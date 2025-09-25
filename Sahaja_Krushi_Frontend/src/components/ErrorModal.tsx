import React from 'react';

interface BackendErrorDetail {
  message: string;
  path?: (string | number)[];
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  errors?: BackendErrorDetail[];
}

const ErrorModal: React.FC<ModalProps> = ({ isOpen, onClose, title, message, errors }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
          <p className="text-sm text-gray-500 mb-4">{message}</p>
          {errors && errors.length > 0 && (
            <ul className="text-left text-sm text-red-600 list-disc list-inside mb-4 max-h-40 overflow-y-auto">
              {errors.map((e, idx) => (
                <li key={idx}>
                  {e.message}
                  {e.path && e.path.length > 0 && (
                    <span className="text-gray-500"> {` (field: ${e.path.join('.')})`}</span>
                  )}
                </li>
              ))}
            </ul>
          )}
          <button
            onClick={onClose}
            className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
