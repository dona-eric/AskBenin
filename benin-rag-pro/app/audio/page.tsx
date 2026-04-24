'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sidebar } from '@components/Sidebar';
import { AudioRecorder } from '@components/AudioRecorder';
import { AudioVisualizer } from '@components/AudioVisualizer';
import { Notification } from '@components/Notification'
import { useAudioStore } from '@lib/store';
import { Menu, Headphones, Volume2 } from 'lucide-react';

export default function AudioPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { transcript, error } = useAudioStore();

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-gradient-to-br from-benin-50 to-white">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full overflow-hidden">
        {/* Top Bar */}
        <div className="border-b border-benin-200 p-3 sm:p-4 flex items-center gap-3 sm:gap-4 bg-white shadow-sm">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-2 hover:bg-benin-50 rounded-lg flex-shrink-0"
          >
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="bg-gradient-benin p-2 rounded-lg flex-shrink-0">
              <Headphones className="text-gold-300 sm:size-24" size={20}/>
            </div>
            <h1 className="text-base sm:text-2xl font-bold text-benin-900 truncate">Audio</h1>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-3 xs:p-4 sm:p-6 md:p-12 overflow-y-auto">
          <div className="max-w-4xl mx-auto space-y-4 xs:space-y-6 sm:space-y-8">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center space-y-2 xs:space-y-3 sm:space-y-4 mb-6 sm:mb-12"
            >
              <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-benin-900 px-2">
                Interface Audio Avancée
              </h2>
              <p className="text-xs xs:text-sm sm:text-lg text-benin-600 max-w-2xl mx-auto px-3">
                Enregistrez vos questions, visualisez les ondes sonores en temps réel, et obtenez
                des réponses instantanées
              </p>
            </motion.div>

            {/* Audio Visualizer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-8 border border-benin-200 sm:border-2 shadow-md sm:shadow-lg"
            >
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <Volume2 className="text-gold-500 flex-shrink-0 sm:w-6 sm:h-6" size={20}/>
                <h3 className="text-lg sm:text-xl font-bold text-benin-900">Visualisation d'Ondes</h3>
              </div>
              <AudioVisualizer />
              <p className="text-xs xs:text-sm text-benin-500 mt-3 sm:mt-4 text-center">
                Les ondes s'afficheront ici lors de votre enregistrement
              </p>
            </motion.div>

            {/* Audio Recorder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-8 border border-benin-200 sm:border-2 shadow-md sm:shadow-lg"
            >
              <h3 className="text-xl font-bold text-benin-900 mb-6">Contrôles d'Enregistrement</h3>
              <AudioRecorder />
            </motion.div>

            {/* Error Notification */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Notification type="error" message={error} />
              </motion.div>
            )}

            {/* Transcript Display */}
            {transcript && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white rounded-xl p-8 border-2 border-green-200 shadow-lg"
              >
                <h3 className="text-xl font-bold text-benin-900 mb-4">Transcription</h3>
                <p className="text-benin-700 p-4 bg-green-50 rounded-lg border border-green-200">
                  {transcript}
                </p>
              </motion.div>
            )}

            {/* Info Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-benin-50 rounded-xl p-8 border border-benin-200"
            >
              <h3 className="text-lg font-bold text-benin-900 mb-4">Comment ça marche?</h3>
              <ul className="space-y-3 text-benin-700">
                <li className="flex gap-3">
                  <span className="text-gold-500 font-bold">1.</span>
                  <span>Cliquez sur "Commencer l'enregistrement" pour démarrer</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-gold-500 font-bold">2.</span>
                  <span>Parlez clairement votre question en français</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-gold-500 font-bold">3.</span>
                  <span>Cliquez "Arrêter" quand vous avez terminé</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-gold-500 font-bold">4.</span>
                  <span>Cliquez "Transcrire & Envoyer" pour obtenir la réponse</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
