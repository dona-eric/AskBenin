'use client';

import { motion } from 'framer-motion';
import { AudioRecorder } from '@components/AudioRecorder';
import { AudioVisualizer } from '@components/AudioVisualizer';
import { Notification } from '@components/Notification';
import { useAudioStore } from '@lib/store';
import { Header } from '@components/Header';
import { Footer } from '@components/Footer';
import { Headphones, Volume2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function AudioPage() {
  const { transcript, error } = useAudioStore();

  return (
    <div className="min-h-screen bg-surface-950">
      <Header />

      <div className="relative z-10">
        {/* Hero */}
        <section className="pt-12 sm:pt-20 pb-8 px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center space-y-4"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-gold-500/10 border border-gold-500/20 text-yellow-300 mx-auto">
              <Headphones size={14} />
              Mode Audio
            </div>
            <h1 className="text-3xl sm:text-5xl font-display font-bold text-surface-100">
              Interface Audio <span className="bg-gradient-to-r from-gold-500 via-gold-300 to-gold-500 bg-clip-text text-transparent">Avancée</span>
            </h1>
            <p className="text-surface-400 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
              Enregistrez vos questions vocalement et obtenez des réponses instantanées.
            </p>
          </motion.div>
        </section>

        {/* Content */}
        <section className="px-4 sm:px-6 pb-16 sm:pb-24">
          <div className="max-w-3xl mx-auto space-y-6">
            {/* Visualizer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-6 sm:p-8 rounded-2xl transition-all duration-300 bg-white/[0.04] border border-white/[0.08] backdrop-blur-[16px] hover:bg-white/[0.06] hover:border-white/[0.12] hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)]"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-gold-500 to-gold-700">
                  <Volume2 className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-lg font-display font-bold text-surface-100">Visualisation d'Ondes</h2>
              </div>
              <AudioVisualizer />
              <p className="text-xs text-surface-500 mt-4 text-center">
                Les ondes s'afficheront ici lors de l'enregistrement
              </p>
            </motion.div>

            {/* Recorder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-6 sm:p-8 rounded-2xl transition-all duration-300 bg-white/[0.04] border border-white/[0.08] backdrop-blur-[16px] hover:bg-white/[0.06] hover:border-white/[0.12] hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)]"
            >
              <h2 className="text-lg font-display font-bold text-surface-100 mb-6">Contrôles d'Enregistrement</h2>
              <AudioRecorder />
            </motion.div>

            {/* Error */}
            {error && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                <Notification type="error" message={error} />
              </motion.div>
            )}

            {/* Transcript */}
            {transcript && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 sm:p-8 rounded-2xl transition-all duration-300 relative overflow-hidden bg-white/[0.03] border border-gold-500/15 hover:border-gold-500/35 hover:shadow-[0_0_30px_rgba(212,160,23,0.08)]"
              >
                <h2 className="text-lg font-display font-bold text-surface-100 mb-4">Transcription</h2>
                <p className="text-surface-300 p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/15">
                  {transcript}
                </p>
              </motion.div>
            )}

            {/* How it works */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="p-6 sm:p-8 rounded-2xl transition-all duration-300 bg-white/[0.04] border border-white/[0.08] backdrop-blur-[16px] hover:bg-white/[0.06] hover:border-white/[0.12] hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)]"
            >
              <h2 className="text-lg font-display font-bold text-surface-100 mb-5">Comment ça marche ?</h2>
              <div className="space-y-3">
                {[
                  "Cliquez sur « Commencer l'enregistrement »",
                  "Parlez clairement votre question en français",
                  "Cliquez « Arrêter » quand vous avez terminé",
                  "Cliquez « Transcrire & Envoyer » pour obtenir la réponse",
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 bg-gold-500/10 text-gold-400 border border-gold-500/20">
                      {i + 1}
                    </span>
                    <span className="text-sm text-surface-400 pt-0.5">{step}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* CTA to chat */}
            <div className="text-center pt-4">
              <Link href="/chat" className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-sm rounded-xl transition-all duration-300 ease-out active:scale-[0.97] bg-white/5 text-yellow-300 border-[1.5px] border-gold-500/30 backdrop-blur-[8px] hover:bg-gold-500/10 hover:border-gold-500/50">
                Préférer le mode texte ?
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
