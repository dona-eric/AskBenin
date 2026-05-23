'use client';
import React from 'react';
import Link from 'next/link';
import { Plus, BookOpen, X, MessageSquare, Trash2 } from 'lucide-react';
import clsx from 'clsx';
import { useChatStore } from '@lib/store';

interface SidebarProps {
  isOpen: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { conversations, sessionId, loadSession, deleteSession, newSession } = useChatStore();

  const handleNewChat = (e: React.MouseEvent) => {
    e.preventDefault();
    newSession();
    onClose?.();
  };

  const handleLoadSession = (id: string) => {
    loadSession(id);
    onClose?.();
  };

  const handleDeleteSession = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    deleteSession(id);
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm md:hidden z-40 animate-fade-in"
          onClick={onClose}
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={clsx(
          'fixed left-0 top-0 bottom-0 w-72 z-50 flex flex-col transition-transform duration-300 ease-out',
          'md:relative md:translate-x-0 md:w-64 lg:w-72',
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        )}
        style={{
          background: 'linear-gradient(180deg, #0c1220 0%, #080d19 100%)',
          borderRight: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/[0.06]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #D4A017, #065f46)' }}
            >
            </div>
            <span className="font-display font-bold text-surface-200 text-sm">AskBenin</span>
          </div>
          <button onClick={onClose} className="md:hidden p-1.5 rounded-lg text-surface-500 hover:text-surface-300 hover:bg-white/[0.06] transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* New Chat */}
        <div className="p-3">
          <button
            onClick={handleNewChat}
            className="flex items-center gap-2.5 w-full px-3.5 py-2.5 rounded-xl text-sm font-medium text-gold-400 border border-gold-500/20 hover:bg-gold-500/10 transition-all duration-200"
          >
            <Plus size={16} />
            Nouvelle conversation
          </button>
        </div>

        {/* Sessions History */}
        <div className="flex-1 overflow-y-auto no-scrollbar px-3 py-2">
          {conversations.length > 0 && (
            <div className="mb-4">
              <p className="px-3 py-2 text-[10px] font-semibold text-surface-600 uppercase tracking-widest">
                Historique
              </p>
              <div className="space-y-0.5 mt-1">
                {conversations.map((conv) => (
                  <div
                    key={conv.id}
                    onClick={() => handleLoadSession(conv.id)}
                    className={clsx(
                      "flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-all duration-200 cursor-pointer group",
                      sessionId === conv.id
                        ? "bg-white/[0.06] text-surface-200 font-medium"
                        : "text-surface-400 hover:bg-white/[0.03] hover:text-surface-300"
                    )}
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <MessageSquare size={16} className={sessionId === conv.id ? "text-gold-500/70" : "text-surface-500 group-hover:text-surface-400"} />
                      <span className="truncate">{conv.title}</span>
                    </div>
                    <button
                      onClick={(e) => handleDeleteSession(e, conv.id)}
                      className="opacity-0 group-hover:opacity-100 p-1 text-surface-500 hover:text-red-400 transition-all"
                      title="Supprimer la conversation"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom / Documentation */}
        <div className="p-3 border-t border-white/[0.06]">
          <Link
            href="/docs"
            onClick={onClose}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-surface-400 hover:text-surface-200 hover:bg-white/[0.04] transition-all duration-200 group mb-2"
          >
            <BookOpen size={18} className="text-surface-500 group-hover:text-gold-500/70 transition-colors" />
            <span className="text-sm font-medium">Documentation</span>
          </Link>

          <div className="card-glass p-3 rounded-xl">
            <p className="text-[11px] text-surface-500 leading-relaxed">
              Plateforme IA dédiée au patrimoine béninois.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
