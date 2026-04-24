'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, MapPin, Phone, Facebook, Twitter, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'À propos',
      links: [
        { label: 'Qui sommes-nous?', href: '#about' },
        { label: 'Notre mission', href: '#mission' },
        { label: 'Équipe', href: '#team' },
        { label: 'Carrières', href: '#careers' },
      ],
    },
    {
      title: 'Ressources',
      links: [
        { label: 'Documentation', href: '/docs' },
        { label: 'API Docs', href: '/docs/api' },
        { label: 'Tutoriels', href: '/docs/tutorials' },
        { label: 'FAQ', href: '/docs/faq' },
      ],
    },
    {
      title: 'Légal',
      links: [
        { label: 'Confidentialité', href: '/privacy' },
        { label: 'Conditions', href: '/terms' },
        { label: 'Cookies', href: '/cookies' },
        { label: 'Mentions légales', href: '/legal' },
      ],
    },
  ];

  return (
    <footer className="bg-benin-900 text-white border-t-4 border-gold-500">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 py-8 xs:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 xs:gap-6 sm:gap-8 mb-6 xs:mb-8">
          {/* Brand Section */}
          <div className="space-y-3 xs:space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 xs:w-10 h-8 xs:h-10 bg-gold-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="font-bold text-benin-900 text-sm xs:text-base">A</span>
              </div>
              <h3 className="font-bold text-lg xs:text-xl">AskBenin</h3>
            </div>
            <p className="text-benin-300 text-xs xs:text-sm">
              Plateforme d'IA dédiée à la connaissance, la culture et le patrimoine béninois.
            </p>
            <div className="flex gap-2 xs:gap-3">
              <a href="https://facebook.com/askbenin" className="p-2 bg-benin-800 hover:bg-gold-500 rounded-lg transition-colors flex-shrink-0">
                <Facebook size={16} className="xs:w-4.5 xs:h-4.5" />
              </a>
              <a href="https://x.com/@askbenin" className="p-2 bg-benin-800 hover:bg-gold-500 rounded-lg transition-colors flex-shrink-0">
                <Twitter size={16} className="xs:w-4.5 xs:h-4.5" />
              </a>
              <a href="wwww.linkedin.com/in/askbenin" className="p-2 bg-benin-800 hover:bg-gold-500 rounded-lg transition-colors flex-shrink-0">
                <Linkedin size={16} className="xs:w-4.5 xs:h-4.5" />
              </a>
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold mb-2 xs:mb-4 text-gold-400 text-sm xs:text-base">{section.title}</h4>
              <ul className="space-y-1 xs:space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-benin-300 hover:text-gold-400 transition-colors text-xs xs:text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="border-t border-benin-700 pt-6 xs:pt-8 mb-6 xs:mb-8">
          <h3 className="font-semibold text-gold-400 mb-3 xs:mb-4 text-sm xs:text-base">Nous contacter</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 xs:gap-4">
            <div className="flex gap-2 xs:gap-3 items-start">
              <Mail size={18} className="text-gold-500 mt-0.5 xs:mt-1 flex-shrink-0 w-4 xs:w-5 h-4 xs:h-5" />
              <div className="min-w-0">
                <p className="text-xs xs:text-sm text-benin-300">Email</p>
                <a href="mailto:contact@askbenin.com" className="text-gold-400 hover:text-gold-300 transition-colors text-xs xs:text-sm break-all">
                  contact@askbenin.com
                </a>
              </div>
            </div>
            <div className="flex gap-2 xs:gap-3 items-start">
              <Phone size={16} className="text-gold-500 mt-0.5 xs:mt-1 flex-shrink-0 w-4 xs:w-5 h-4 xs:h-5" />
              <div className="min-w-0">
                <p className="text-xs xs:text-sm text-benin-300">Téléphone</p>
                <a href="tel:+2290141730240" className="text-gold-400 hover:text-gold-300 transition-colors text-xs xs:text-sm">
                  +229 0141 7302 40
                </a>
              </div>
            </div>
            <div className="flex gap-2 xs:gap-3 items-start">
              <MapPin size={16} className="text-gold-500 mt-0.5 xs:mt-1 flex-shrink-0 w-4 xs:w-5 h-4 xs:h-5" />
              <div className="min-w-0">
                <p className="text-xs xs:text-sm text-benin-300">Localisation</p>
                <p className="text-gold-400 text-xs xs:text-sm">Cotonou, Bénin</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-benin-800 px-3 xs:px-4 sm:px-6 py-4 xs:py-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3 xs:gap-4">
          <p className="text-benin-400 text-xs xs:text-sm text-center sm:text-left">
            © {currentYear} AskBenin. Tous droits réservés.
          </p>
          <div className="flex gap-4 xs:gap-6 flex-wrap justify-center sm:justify-end">
            <Link href="/privacy" className="text-benin-400 hover:text-gold-400 text-xs xs:text-sm transition-colors">
              Confidentialité
            </Link>
            <Link href="/terms" className="text-benin-400 hover:text-gold-400 text-xs xs:text-sm transition-colors">
              Conditions
            </Link>
            <Link href="/sitemap" className="text-benin-400 hover:text-gold-400 text-xs xs:text-sm transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative Bottom */}
      <div className="h-0.5 xs:h-1 bg-gradient-to-r from-benin-900 via-gold-500 to-benin-900"></div>
    </footer>
  );
};

export default Footer;
