'use client';

import React from 'react';
import Link from 'next/link';
import { Menu, X, Sparkles } from 'lucide-react';
import { useState } from 'react';
import clsx from 'clsx';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Accueil' },
    { href: '/chat', label: 'Chat' },
    { href: '/audio', label: 'Audio' },
    { href: '/docs', label: 'Documentation' },
    { href: '/privacy', label: 'Confidentialité' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-benin-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6">
        <div className="flex justify-between items-center h-14 xs:h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1.5 xs:gap-2 group flex-shrink-0">
            <div className="w-8 xs:w-10 h-8 xs:h-10 bg-gradient-benin rounded-lg flex items-center justify-center flex-shrink-0">
              <Sparkles className="text-gold-400 w-5 xs:w-6 h-5 xs:h-6" />
            </div>
            <span className="font-bold text-lg xs:text-xl text-benin-900 group-hover:text-gold-600 transition-colors hidden xs:inline">
              AskBenin
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-2 xs:px-3 py-2 text-xs xs:text-sm text-benin-700 hover:text-benin-900 hover:bg-benin-50 rounded-md transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-benin-50 rounded-lg flex-shrink-0"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-3 py-2 text-sm text-benin-700 hover:bg-benin-50 rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
