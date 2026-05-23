'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, MessageSquare } from 'lucide-react';
import clsx from 'clsx';

const NAV_LINKS = [
  { href: '/', label: 'Accueil' },
  { href: '/chat', label: 'Chat' },
  { href: '/audio', label: 'Audio' },
  { href: '/docs', label: 'Docs' },
];

export const Header: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06]"
      style={{ background: 'rgba(8, 13, 25, 0.8)', backdropFilter: 'blur(20px) saturate(180%)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #D4A017 0%, #065f46 100%)' }}
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <span className="font-display font-bold text-lg text-surface-100 group-hover:text-gold-400 transition-colors duration-300">
              AskBenin
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={clsx(
                    'px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                    isActive
                      ? 'text-gold-400 bg-gold-500/10'
                      : 'text-surface-400 hover:text-surface-200 hover:bg-white/[0.04]'
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/chat" className="btn-primary text-sm !px-5 !py-2.5">
              <MessageSquare size={16} />
              Démarrer le chat
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-surface-400 hover:text-surface-200 hover:bg-white/[0.06] transition-colors"
            aria-label="Menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="md:hidden pb-4 pt-2 space-y-1 animate-fade-in">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={clsx(
                    'block px-4 py-3 text-sm font-medium rounded-xl transition-colors',
                    isActive
                      ? 'text-gold-400 bg-gold-500/10'
                      : 'text-surface-400 hover:text-surface-200 hover:bg-white/[0.04]'
                  )}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-2 px-1">
              <Link
                href="/chat"
                className="btn-primary w-full justify-center text-sm"
                onClick={() => setMobileOpen(false)}
              >
                <MessageSquare size={16} />
                Démarrer le chat
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
