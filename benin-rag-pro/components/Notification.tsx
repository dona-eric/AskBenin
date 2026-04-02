'use client';

import React from 'react';
import { AlertCircle, CheckCircle, Info, X } from 'lucide-react';
import clsx from 'clsx';

interface NotificationProps {
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  onClose?: () => void;
  autoClose?: number;
}

export const Notification: React.FC<NotificationProps> = ({
  type,
  message,
  onClose,
  autoClose = 5000,
}) => {
  React.useEffect(() => {
    if (autoClose && onClose) {
      const timer = setTimeout(onClose, autoClose);
      return () => clearTimeout(timer);
    }
  }, [autoClose, onClose]);

  const icons = {
    success: <CheckCircle size={20} className="text-green-500" />,
    error: <AlertCircle size={20} className="text-red-500" />,
    info: <Info size={20} className="text-blue-500" />,
    warning: <AlertCircle size={20} className="text-yellow-500" />,
  };

  const backgrounds = {
    success: 'bg-green-50 border-green-200',
    error: 'bg-red-50 border-red-200',
    info: 'bg-blue-50 border-blue-200',
    warning: 'bg-yellow-50 border-yellow-200',
  };

  const textColors = {
    success: 'text-green-800',
    error: 'text-red-800',
    info: 'text-blue-800',
    warning: 'text-yellow-800',
  };

  return (
    <div
      className={clsx(
        'flex items-center gap-3 px-4 py-3 rounded-lg border',
        backgrounds[type]
      )}
    >
      {icons[type]}
      <span className={clsx('flex-1 text-sm font-medium', textColors[type])}>
        {message}
      </span>
      {onClose && (
        <button
          onClick={onClose}
          className="p-1 hover:bg-black hover:bg-opacity-10 rounded-md transition-colors"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};

export default Notification;
