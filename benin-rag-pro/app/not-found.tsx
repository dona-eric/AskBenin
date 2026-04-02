'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-benin-50 to-white flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-md space-y-8"
      >
        {/* 404 */}
        <div className="space-y-2">
          <motion.h1
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="text-9xl font-bold gradient-text"
          >
            404
          </motion.h1>
          <h2 className="text-4xl font-bold text-benin-900">Page non trouvée</h2>
        </div>

        {/* Description */}
        <p className="text-xl text-benin-600">
          Oups! La page que vous recherchez n\'existe pas ou a été déplacée.
        </p>

        {/* Search Box */}
        <div className="relative">
          <input
            type="text"
            placeholder="Chercher quelque chose..."
            className="w-full px-4 py-3 border-2 border-benin-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-benin-500"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-gradient-benin rounded-lg text-white hover:shadow-lg transition-all">
            <Search size={20} />
          </button>
        </div>

        {/* Links */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link
            href="/"
            className="btn-primary inline-flex items-center gap-2 justify-center"
          >
            <Home size={20} />
            Retour à l\'accueil
          </Link>
          <Link
            href="/chat"
            className="btn-secondary inline-flex items-center gap-2 justify-center"
          >
            Poser une question
          </Link>
        </div>

        {/* Suggestions */}
        <div className="bg-benin-50 p-6 rounded-lg border border-benin-200 text-left">
          <h3 className="font-bold text-benin-900 mb-3">Pages populaires</h3>
          <ul className="space-y-2 text-benin-700">
            <li>
              <Link href="/" className="text-benin-600 hover:text-gold-600 transition-colors">
                → Accueil
              </Link>
            </li>
            <li>
              <Link href="/chat" className="text-benin-600 hover:text-gold-600 transition-colors">
                → Chat
              </Link>
            </li>
            <li>
              <Link href="/audio" className="text-benin-600 hover:text-gold-600 transition-colors">
                → Audio
              </Link>
            </li>
            <li>
              <Link href="/docs" className="text-benin-600 hover:text-gold-600 transition-colors">
                → Documentation
              </Link>
            </li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
}
