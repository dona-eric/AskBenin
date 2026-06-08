'use client';

import { useState } from 'react';
import { Sidebar } from '@components/Sidebar';
import { ChatWindow } from '@components/ChatWindow';
import { Menu } from 'lucide-react';

export default function ChatPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-transparent overflow-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main chat area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile top bar */}
        <div className="md:hidden flex items-center gap-3 px-4 py-3 border-b border-white/[0.06]"
          style={{ background: 'rgba(8,13,25,0.9)', backdropFilter: 'blur(12px)' }}
        >
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg text-surface-400 hover:text-surface-200 hover:bg-white/[0.06] transition-colors"
          >
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #D4A017, #065f46)' }}
            >
            </div>
            <span className="font-display font-bold text-surface-200 text-sm">AskBenin</span>
          </div>
        </div>

        {/* Chat */}
        <div className="flex-1 overflow-hidden">
          <ChatWindow />
        </div>
      </main>
    </div>
  );
}