import React from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

interface ActionButtonProps {
  type: 'edit' | 'delete';
  onClick: () => void;
  className?: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({ type, onClick, className = '' }) => {
  const buttonStyles = {
    edit: 'bg-blue-500 hover:bg-blue-600',
    delete: 'bg-red-500 hover:bg-red-600'
  };

  const icons = {
    edit: <EditOutlined className="text-base" />,
    delete: <DeleteOutlined className="text-base" />
  };

  const labels = {
    edit: 'Edit',
    delete: 'Delete'
  };

  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 px-3 py-1.5 text-sm text-white rounded transition-colors ${buttonStyles[type]} ${className}`}
    >
      {icons[type]}
      {labels[type]}
    </button>
  );
};

export default ActionButton; 