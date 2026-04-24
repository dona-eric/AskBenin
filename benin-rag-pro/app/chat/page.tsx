'use client';

import { useState } from 'react';
import { Sidebar } from '@components/Sidebar';
import { ChatWindow } from '@components/ChatWindow';
import { Menu } from 'lucide-react';

export default function ChatPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-white">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full overflow-hidden">
        {/* Top Bar */}
        <div className="border-b border-benin-200 p-3 sm:p-4 flex items-center gap-2 sm:gap-4 bg-white">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-2 hover:bg-benin-50 rounded-lg flex-shrink-0"
          >
            <Menu size={20} />
          </button>
          <h1 className="text-lg sm:text-2xl font-bold text-benin-900 truncate">AskBenin</h1>
        </div>

        {/* Chat Window */}
        <ChatWindow />
      </div>
    </div>
  );
}
