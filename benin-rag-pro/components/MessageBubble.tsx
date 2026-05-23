'use client';

import React from 'react';
import { Trash2 } from 'lucide-react';
import clsx from 'clsx';

interface MessageBubbleProps {
  content: string;
  role: 'user' | 'assistant';
  source?: string;
  onDelete?: () => void;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  content,
  role,
  source,
  onDelete,
}) => {
  return (
    <div
      className={clsx(
        'flex mb-4',
        role === 'user' ? 'justify-end' : 'justify-start'
      )}
    >
      <div className="relative group">
        <div
          className={clsx(
            'max-w-xs lg:max-w-md px-4 py-3 rounded-lg',
            role === 'user'
              ? 'bg-gradient-benin text-white rounded-br-none'
              : 'bg-benin-100 text-benin-900 rounded-bl-none border border-benin-200'
          )}
        >
          <p className="text-sm leading-relaxed">{content}</p>
          {source && (
            <p className="text-xs mt-2 opacity-70">Source: {source}</p>
          )}
        </div>

        {/* Delete Button */}
        {onDelete && (
          <button
            onClick={onDelete}
            className="absolute -right-8 top-0 opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-red-100 rounded-lg"
          >
            <Trash2 size={14} className="text-red-500" />
          </button>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
