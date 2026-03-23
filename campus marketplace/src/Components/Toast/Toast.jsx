import React, { useEffect, useState } from 'react';
import { FiX, FiCheckCircle, FiAlertCircle, FiInfo, FiAlertTriangle } from 'react-icons/fi';

/**
 * Toast component for displaying temporary notifications
 * @param {string} message - The notification message
 * @param {string} type - success | error | info | warning
 * @param {number} duration - Milliseconds before auto-close (0 for no auto-close)
 * @param {function} onClose - Callback when toast closes
 */
const Toast = ({ message, type = 'info', duration = 3000, onClose }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsExiting(true);
        setTimeout(onClose, 300);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(onClose, 300);
  };

  const icons = {
    success: <FiCheckCircle className="w-5 h-5" />,
    error: <FiAlertCircle className="w-5 h-5" />,
    info: <FiInfo className="w-5 h-5" />,
    warning: <FiAlertTriangle className="w-5 h-5" />,
  };

  const bgColors = {
    success: 'bg-green-50 dark:bg-green-900/30 border-green-500 border-l-4',
    error: 'bg-red-50 dark:bg-red-900/30 border-red-500 border-l-4',
    info: 'bg-blue-50 dark:bg-blue-900/30 border-blue-500 border-l-4',
    warning: 'bg-amber-50 dark:bg-amber-900/30 border-amber-500 border-l-4',
  };

  const textColors = {
    success: 'text-green-800 dark:text-green-200',
    error: 'text-red-800 dark:text-red-200',
    info: 'text-blue-800 dark:text-blue-200',
    warning: 'text-amber-800 dark:text-amber-200',
  };

  const iconColors = {
    success: 'text-green-600 dark:text-green-400',
    error: 'text-red-600 dark:text-red-400',
    info: 'text-blue-600 dark:text-blue-400',
    warning: 'text-amber-600 dark:text-amber-400',
  };

  return (
    <div
      role="alert"
      className={`
        flex items-start gap-3 min-w-72 max-w-md p-4 rounded-lg border shadow-lg
        backdrop-blur-sm
        transition-all duration-300 ease-out
        ${bgColors[type]}
        ${isExiting ? 'opacity-0 translate-x-8' : 'opacity-100 translate-x-0 animate-slideIn'}
      `}
    >
      <div className={`shrink-0 pt-0.5 ${iconColors[type]}`}>
        {icons[type]}
      </div>
      <p className={`flex-1 text-sm font-medium ${textColors[type]}`}>
        {message}
      </p>
      <button
        onClick={handleClose}
        className="shrink-0 p-1 hover:bg-black/5 dark:hover:bg-white/10 rounded transition-colors"
        aria-label="Close notification"
      >
        <FiX className={`w-4 h-4 ${textColors[type]}`} />
      </button>
    </div>
  );
};

export default Toast;