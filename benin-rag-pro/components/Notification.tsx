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

const CONFIG = {
  success: {
    icon: CheckCircle,
    bg: 'bg-emerald-500/10 border-emerald-500/20',
    text: 'text-emerald-300',
    iconColor: 'text-emerald-400',
  },
  error: {
    icon: AlertCircle,
    bg: 'bg-accent-500/10 border-accent-500/20',
    text: 'text-accent-300',
    iconColor: 'text-accent-400',
  },
  info: {
    icon: Info,
    bg: 'bg-blue-500/10 border-blue-500/20',
    text: 'text-blue-300',
    iconColor: 'text-blue-400',
  },
  warning: {
    icon: AlertCircle,
    bg: 'bg-gold-500/10 border-gold-500/20',
    text: 'text-gold-300',
    iconColor: 'text-gold-400',
  },
};

export const Notification: React.FC<NotificationProps> = ({ type, message, onClose, autoClose = 5000 }) => {
  React.useEffect(() => {
    if (autoClose && onClose) {
      const timer = setTimeout(onClose, autoClose);
      return () => clearTimeout(timer);
    }
  }, [autoClose, onClose]);

  const { icon: Icon, bg, text, iconColor } = CONFIG[type];

  return (
    <div className={clsx('flex items-center gap-3 px-4 py-3 rounded-xl border', bg)}>
      <Icon size={18} className={iconColor} />
      <span className={clsx('flex-1 text-sm font-medium', text)}>{message}</span>
      {onClose && (
        <button onClick={onClose} className="p-1 hover:bg-white/5 rounded-lg transition-colors">
          <X size={14} className="text-surface-500" />
        </button>
      )}
    </div>
  );
};

export default Notification;
