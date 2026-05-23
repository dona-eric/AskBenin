'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, MessageSquare } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-surface-950 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background orbs */}
      <div className="orb orb-gold w-[300px] h-[300px] top-1/4 -right-20" />
      <div className="orb orb-green w-[250px] h-[250px] bottom-1/4 -left-20" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-md space-y-8 relative z-10"
      >
        {/* 404 */}
        <div className="space-y-3">
          <motion.h1
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="text-8xl sm:text-9xl font-display font-extrabold gradient-text"
          >
            404
          </motion.h1>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-surface-100">
            Page non trouvée
          </h2>
        </div>

        <p className="text-surface-400 text-base sm:text-lg leading-relaxed">
          Oups ! La page que vous recherchez n'existe pas ou a été déplacée.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Link href="/" className="btn-primary justify-center">
            <Home size={18} />
            Retour à l'accueil
          </Link>
          <Link href="/chat" className="btn-secondary justify-center">
            <MessageSquare size={18} />
            Poser une question
          </Link>
        </div>

        {/* Popular pages */}
        <div className="card-glass p-5 text-left">
          <h3 className="font-display font-semibold text-surface-200 text-sm mb-3">Pages populaires</h3>
          <ul className="space-y-2">
            {[
              { href: '/', label: 'Accueil' },
              { href: '/chat', label: 'Chat IA' },
              { href: '/audio', label: 'Mode Audio' },
              { href: '/docs', label: 'Documentation' },
            ].map((page) => (
              <li key={page.href}>
                <Link href={page.href} className="text-surface-400 hover:text-gold-400 transition-colors text-sm flex items-center gap-2">
                  <span className="text-gold-500/50">→</span> {page.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
}
