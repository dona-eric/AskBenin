'use client';

import { motion } from 'framer-motion';

export default function GlobalBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-surface-950">
      {/* Blooming Benin Flag Background */}
      <motion.div
        initial={{ opacity: 0.30, scale: 0.96 }}
        animate={{ opacity: 0.50, scale: 1 }}
        transition={{ duration: 2.2, ease: "easeOut" }}
        className="absolute inset-0 bg-[url('/images/drapeau_officielle_page.webp')] bg-cover bg-center filter blur-[1px]"
      />
      
      {/* Radial overlay to make the flag bloom from the center and fade into the deep gold/dark theme at the edges */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at center, rgba(8, 13, 25, 0.3) 0%, rgba(8, 13, 25, 0.85) 50%, rgba(8, 13, 25, 0.98) 100%)'
        }}
      />

      {/* Floating cultural color orbs (Green, Yellow, Red) representing Benin flag */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="orb orb-green orb-1 w-[600px] h-[600px] -top-40 -right-40" />
        <div className="orb orb-yellow orb-2 w-[550px] h-[550px] top-1/3 -left-40" style={{ animationDelay: '2s' }} />
        <div className="orb orb-red orb-3 w-[500px] h-[500px] bottom-10 right-1/4" style={{ animationDelay: '4s' }} />
      </div>
    </div>
  );
}
