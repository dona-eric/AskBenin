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
            className="text-8xl sm:text-9xl font-display font-extrabold bg-gradient-to-r from-gold-500 via-gold-300 to-gold-500 bg-clip-text text-transparent"
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
          <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-sm rounded-xl transition-all duration-300 ease-out active:scale-[0.97] bg-gradient-to-br from-gold-500 to-gold-400 text-surface-950 shadow-[0_4px_16px_rgba(212,160,23,0.3)] hover:shadow-[0_6px_28px_rgba(212,160,23,0.5)] hover:-translate-y-[1px] justify-center">
            <Home size={18} />
            Retour à l'accueil
          </Link>
          <Link href="/chat" className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-sm rounded-xl transition-all duration-300 ease-out active:scale-[0.97] bg-white/5 text-yellow-300 border-[1.5px] border-gold-500/30 backdrop-blur-[8px] hover:bg-gold-500/10 hover:border-gold-500/50 justify-center">
            <MessageSquare size={18} />
            Poser une question
          </Link>
        </div>

        {/* Popular pages */}
        <div className="p-5 text-left rounded-2xl transition-all duration-300 bg-white/[0.04] border border-white/[0.08] backdrop-blur-[16px] hover:bg-white/[0.06] hover:border-white/[0.12] hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)]">
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
