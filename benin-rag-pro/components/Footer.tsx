'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const sections = [
    {
      title: 'Plateforme',
      links: [
        { label: 'Chat IA', href: '/chat' },
        { label: 'Mode Audio', href: '/audio' },
        { label: 'Patrimoine 3D', href: '/patrimoine' },
        { label: 'Portail Diaspora', href: '/diaspora' },
        { label: 'Documentation', href: '/docs' },
      ],
    },
    {
      title: 'Ressources',
      links: [
        { label: 'API Docs', href: '/docs' },
        { label: 'FAQ', href: '/docs' },
        { label: 'Contribuer', href: '#' },
      ],
    },
    {
      title: 'Légal',
      links: [
        { label: 'Confidentialité', href: '/privacy' },
        { label: 'Conditions', href: '/privacy' },
        { label: 'Mentions légales', href: '/privacy' },
      ],
    },
  ];

  return (
    <footer className="bg-surface-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-6 rounded overflow-hidden flex shadow-sm border border-white/10 relative">
                {/* Green band on left */}
                <div className="w-[38%] h-full bg-[#059669]" />
                {/* Yellow and Red on right */}
                <div className="w-[62%] h-full flex flex-col">
                  <div className="h-1/2 bg-[#D4A017]" />
                  <div className="h-1/2 bg-[#E63946]" />
                </div>
              </div>
              <span className="font-display font-bold text-lg text-surface-100">AskBenin</span>
            </div>
            <p className="text-surface-500 text-sm leading-relaxed max-w-xs">
              Plateforme IA dédiée à la connaissance et au patrimoine béninois.
            </p>
          </div>

          {/* Link sections */}
          {sections.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold text-sm text-gold-400/80 uppercase tracking-wider mb-4">
                {section.title}
              </h4>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={`${section.title}-${link.label}`}>
                    <Link
                      href={link.href}
                      className="text-surface-500 hover:text-gold-400 transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact row */}
        <div className="h-[1px] bg-gradient-to-r from-transparent to-transparent mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="flex items-center gap-3">
            <Mail size={20} className="text-gold-500/60 flex-shrink-0" />
            <a href="mailto:contact@askbenin.com" className="text-surface-400 hover:text-gold-400 text-sm transition-colors">
              contact@askbenin.com
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Phone size={20} className="text-gold-500/60 flex-shrink-0" />
            <a href="tel:+2290141730240" className="text-surface-400 hover:text-gold-400 text-sm transition-colors">
              +229 0141 7302 40
            </a>
          </div>
          <div className="flex items-center gap-3">
            <MapPin size={20} className="text-gold-500/60 flex-shrink-0" />
            <span className="text-surface-400 text-sm">Cotonou, Bénin</span>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="h-[1px] bg-gradient-to-r from-transparent to-transparent mb-6" />
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-surface-600 text-xs">
            © {currentYear} AskBenin. Tous droits réservés.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-surface-600 hover:text-gold-400 text-xs transition-colors">
              Confidentialité
            </Link>
            <Link href="/docs" className="text-surface-600 hover:text-gold-400 text-xs transition-colors">
              Documentation
            </Link>
          </div>
        </div>
      </div>

      {/* Accent bar */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />
    </footer>
  );
};

export default Footer;
