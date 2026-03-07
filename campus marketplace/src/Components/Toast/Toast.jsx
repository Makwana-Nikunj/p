import React, { useEffect } from 'react';
import { FiX, FiCheckCircle, FiAlertCircle, FiInfo } from 'react-icons/fi';

const Toast = ({ message, type = 'info', duration = 3000, onClose }) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const icons = {
    success: <FiCheckCircle className="w-5 h-5 text-green-500" />,
    error: <FiAlertCircle className="w-5 h-5 text-red-500" />,
    info: <FiInfo className="w-5 h-5 text-blue-500" />,
  };

  const bgColors = {
    success: 'bg-green-50 border-green-200',
    error: 'bg-red-50 border-red-200',
    info: 'bg-blue-50 border-blue-200',
  };

  return (
    <div
      className={`flex items-center gap-3 min-w-75 max-w-md p-4 rounded-lg border shadow-lg animate-fadeIn ${bgColors[type]}`}
    >
      {icons[type]}
      <p className="flex-1 text-sm font-medium text-gray-800">{message}</p>
      <button
        onClick={onClose}
        className="shrink-0 p-1 hover:bg-white/50 rounded transition-colors"
        aria-label="Close notification"
      >
        <FiX className="w-4 h-4 text-gray-600" />
      </button>
    </div>
  );
};

export default Toast;
