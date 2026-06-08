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
  { href: '/patrimoine', label: 'Patrimoine' },
  { href: '/diaspora', label: 'Diaspora' },
  { href: '/docs', label: 'Docs' },
];

export const Header: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50"
      style={{ background: 'rgba(8, 13, 25, 0.8)', backdropFilter: 'blur(20px) saturate(180%)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="w-9 h-6 rounded overflow-hidden flex shadow-sm border border-white/10 relative group-hover:border-gold-500/30 transition-all duration-300">
              {/* Green band on left */}
              <div className="w-[38%] h-full bg-[#059669]" />
              {/* Yellow and Red on right */}
              <div className="w-[62%] h-full flex flex-col">
                <div className="h-1/2 bg-[#D4A017]" />
                <div className="h-1/2 bg-[#E63946]" />
              </div>
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
            <Link href="/chat" className="inline-flex items-center gap-2 px-5 py-2.5 font-semibold text-sm rounded-xl transition-all duration-300 ease-out active:scale-[0.97] bg-gradient-to-br from-gold-500 to-gold-400 text-surface-950 shadow-[0_4px_16px_rgba(212,160,23,0.3)] hover:shadow-[0_6px_28px_rgba(212,160,23,0.5)] hover:-translate-y-[1px]">
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
                className="inline-flex items-center gap-2 w-full justify-center px-6 py-3 font-semibold text-sm rounded-xl transition-all duration-300 ease-out active:scale-[0.97] bg-gradient-to-br from-gold-500 to-gold-400 text-surface-950 shadow-[0_4px_16px_rgba(212,160,23,0.3)] hover:shadow-[0_6px_28px_rgba(212,160,23,0.5)] hover:-translate-y-[1px]"
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
