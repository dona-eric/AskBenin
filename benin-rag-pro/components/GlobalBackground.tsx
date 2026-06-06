'use client';

import { motion } from 'framer-motion';

export default function GlobalBackground() {
  return (
    <>
      {/* Blooming Benin Flag Background */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 0.08, scale: 1 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
        className="fixed inset-0 bg-[url('/images/drapeau_officielle_page.webp')] bg-cover bg-center filter blur-[6px] pointer-events-none z-0"
        style={{ mixBlendMode: 'soft-light' }}
      />

      {/* Background orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="orb orb-green orb-1 w-[600px] h-[600px] -top-40 -right-40" />
        <div className="orb orb-yellow orb-2 w-[500px] h-[500px] top-1/3 -left-40" style={{ animationDelay: '2s' }} />
        <div className="orb orb-red orb-3 w-[450px] h-[450px] bottom-10 right-1/4" style={{ animationDelay: '4s' }} />
      </div>
    </>
  );
}
