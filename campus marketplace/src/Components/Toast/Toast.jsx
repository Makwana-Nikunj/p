import React, { useEffect } from 'react';
import { FiX, FiCheckCircle, FiAlertCircle, FiInfo, FiAlertTriangle } from 'react-icons/fi';

/**
 * Toast component for displaying temporary notifications
 * @param {string} message - The notification message
 * @param {string} type - success | error | info | warning
 * @param {number} duration - Milliseconds before auto-close (0 for no auto-close)
 * @param {function} onClose - Callback when toast closes
 */
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
    success: <FiCheckCircle className="w-5 h-5 text-green-600" />,
    error: <FiAlertCircle className="w-5 h-5 text-red-600" />,
    info: <FiInfo className="w-5 h-5 text-blue-600" />,
    warning: <FiAlertTriangle className="w-5 h-5 text-amber-600" />,
  };

  const bgColors = {
    success: 'bg-green-50 border-green-300 border-l-4 border-l-green-600',
    error: 'bg-red-50 border-red-300 border-l-4 border-l-red-600',
    info: 'bg-blue-50 border-blue-300 border-l-4 border-l-blue-600',
    warning: 'bg-amber-50 border-amber-300 border-l-4 border-l-amber-600',
  };

  const textColors = {
    success: 'text-green-900',
    error: 'text-red-900',
    info: 'text-blue-900',
    warning: 'text-amber-900',
  };

  return (
    <div
      role="alert"
      className={`flex items-start gap-3 min-w-72 max-w-md p-4 rounded-md border shadow-lg animate-slideIn transition-all ${bgColors[type]}`}
    >
      <div className="shrink-0 pt-0.5">
        {icons[type]}
      </div>
      <p className={`flex-1 text-sm font-medium ${textColors[type]}`}>{message}</p>
      <button
        onClick={onClose}
        className="shrink-0 p-1 hover:bg-white/30 rounded transition-colors"
        aria-label="Close notification"
      >
        <FiX className="w-4 h-4 text-gray-600" />
      </button>
    </div>
  );
};

export default Toast;
