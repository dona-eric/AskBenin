'use client';

import React from 'react';
import Link from 'next/link';
import { Book, Headphones, MessageSquare, Home, Settings } from 'lucide-react';
import clsx from 'clsx';

interface SidebarProps {
  isOpen: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const menuItems = [
    {
      icon: Home,
      label: 'Accueil',
      href: '/',
      description: 'Page d\'accueil',
    },
    {
      icon: MessageSquare,
      label: 'Chat',
      href: '/chat',
      description: 'Conversation IA',
    },
    {
      icon: Headphones,
      label: 'Audio',
      href: '/audio',
      description: 'Questions par audio',
    },
    {
      icon: Book,
      label: 'Documentation',
      href: '/docs',
      description: 'Guides et tutoriels',
    },
  ];

  const resources = [
    { id: 'database', label: 'Base de données', href: '#' },
    { id: 'models', label: 'Modèles IA', href: '#' },
    { id: 'history', label: 'Historique', href: '#' },
    { id: 'settings-res', label: 'Paramètres', href: '#' },
  ];

  return (
    <>
      {/* Sidebar Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={clsx(
          'fixed left-0 top-16 bottom-0 w-64 bg-white border-r border-benin-200 overflow-y-auto transition-transform duration-300 z-40 md:relative md:top-0 md:translate-x-0 md:w-56 lg:w-64',
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        )}
      >
        <div className="p-4 sm:p-6 space-y-6 sm:space-y-8">
          {/* Main Menu */}
          <nav className="space-y-2">
            <h3 className="px-3 py-2 text-xs font-semibold text-benin-400 uppercase tracking-wider">
              Principal
            </h3>
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex gap-3 px-3 py-2 rounded-lg hover:bg-benin-50 text-benin-700 hover:text-benin-900 transition-colors group"
                onClick={onClose}
              >
                <item.icon size={20} className="text-benin-500 group-hover:text-gold-500 transition-colors" />
                <div>
                  <p className="font-medium text-sm">{item.label}</p>
                  <p className="text-xs text-benin-400">{item.description}</p>
                </div>
              </Link>
            ))}
          </nav>

          {/* Resources */}
          <nav className="space-y-2">
            <h3 className="px-3 py-2 text-xs font-semibold text-benin-400 uppercase tracking-wider">
              Ressources
            </h3>
            {resources.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className="block px-3 py-2 text-sm text-benin-600 hover:text-benin-900 hover:bg-benin-50 rounded-lg transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Settings */}
          <div className="border-t border-benin-200 pt-6">
            <a
              href="#"
              className="flex items-center gap-3 px-3 py-2 text-benin-700 hover:bg-benin-50 rounded-lg transition-colors"
            >
              <Settings size={20} className="text-benin-500" />
              <span className="font-medium text-sm">Paramètres</span>
            </a>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
