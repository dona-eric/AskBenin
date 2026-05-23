'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight, Mic, MessageSquare, Globe,
  Brain, Zap, Shield,
} from 'lucide-react';
import { Header } from '@components/Header';
import { Footer } from '@components/Footer';

const ROTATING_WORDS = [
  'la Culture', 'le Patrimoine', 'les Traditions',
  "l'Histoire", 'la Sagesse', "l'Innovation",
];

const FEATURES = [
  {
    icon: MessageSquare,
    title: 'Chat Intelligent',
    description: 'Posez vos questions et obtenez des réponses précises sourcées depuis notre base de connaissances.',
    gradient: 'from-gold-500 to-gold-700',
  },
  {
    icon: Mic,
    title: 'Mode Audio',
    description: 'Parlez directement à AskBenin. Transcription et réponse instantanée en français.',
    gradient: 'from-emerald-500 to-emerald-700',
  },
  {
    icon: Brain,
    title: 'IA Agentic RAG',
    description: 'Un agent intelligent qui recherche dans nos bases et sur le web pour des réponses complètes.',
    gradient: 'from-accent-500 to-accent-700',
  },
  {
    icon: Globe,
    title: 'Base de Connaissance',
    description: 'Des milliers de documents sur la culture, l\'économie, la santé et la politique du Bénin.',
    gradient: 'from-blue-500 to-blue-700',
  },
  {
    icon: Shield,
    title: 'Sources Vérifiées',
    description: 'Chaque réponse cite ses sources. Transparence et fiabilité garanties.',
    gradient: 'from-purple-500 to-purple-700',
  },
  {
    icon: Zap,
    title: 'Réponses Instantanées',
    description: 'Architecture optimisée pour des temps de réponse ultra-rapides.',
    gradient: 'from-orange-500 to-orange-700',
  },
];

const CATEGORIES = [
  { name: 'Histoire', icon: '📚', desc: "L'histoire riche du Bénin" },
  { name: 'Traditions', icon: '🎭', desc: 'Culture et coutumes béninoises' },
  { name: 'Art & Musique', icon: '🎵', desc: 'Expression artistique' },
  { name: 'Cuisine', icon: '🍲', desc: 'Gastronomie authentique' },
  { name: 'Patrimoine', icon: '🏛️', desc: 'Sites et monuments' },
  { name: 'Langues', icon: '🗣️', desc: 'Dialectes locaux' },
  { name: 'Économie', icon: '📈', desc: 'Développement et finance' },
  { name: 'Santé', icon: '🏥', desc: 'Système de santé' },
];

const STATS = [
  { label: 'Documents', value: '10K+' },
  { label: 'Utilisateurs', value: '5K+' },
  { label: 'Questions', value: '100K+' },
  { label: 'Disponibilité', value: '99.9%' },
];

export default function HomePage() {
  const [wordIdx, setWordIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIdx((i) => (i + 1) % ROTATING_WORDS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-surface-950 relative">
      <Header />

      {/* Background orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="orb orb-gold w-[500px] h-[500px] -top-40 -right-40" />
        <div className="orb orb-green w-[400px] h-[400px] top-1/3 -left-40" style={{ animationDelay: '3s' }} />
        <div className="orb orb-gold w-[300px] h-[300px] bottom-20 right-1/4" style={{ animationDelay: '5s' }} />
      </div>

      <div className="relative z-10">
        {/* ═══ HERO ═══ */}
        <section className="min-h-[calc(100vh-4rem)] flex items-center">
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-16 sm:py-24">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="badge mb-6 sm:mb-8"
              >
                Plateforme IA dédiée au Bénin
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl xs:text-5xl sm:text-6xl lg:text-7xl font-display font-extrabold leading-[1.08] text-surface-100"
              >
                Découvrez
                <br />
                <span className="gradient-text" key={wordIdx}>
                  {ROTATING_WORDS[wordIdx]}
                </span>
                <br />
                du Bénin
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl text-surface-400 leading-relaxed max-w-2xl mx-auto"
              >
                Explorez le patrimoine, les cultures et les traditions béninoises
                à travers une expérience IA moderne, fluide et accessible.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
              >
                <Link href="/chat" className="btn-primary text-base !px-8 !py-3.5">
                  <MessageSquare size={18} />
                  Commencer le chat
                  <ArrowRight size={18} />
                </Link>
                <Link href="/audio" className="btn-secondary text-base !px-8 !py-3.5">
                  <Mic size={18} />
                  Mode audio
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══ CATEGORIES ═══ */}
        <section className="py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-10 sm:mb-14"
            >
              <h2 className="text-3xl sm:text-5xl font-display font-bold text-surface-100 mb-3">
                Explorez les domaines
              </h2>
              <p className="text-surface-400 text-base sm:text-lg max-w-xl mx-auto">
                Plongez dans les multiples facettes de la culture béninoise.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {CATEGORIES.map((cat, i) => (
                <motion.div
                  key={cat.name}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  viewport={{ once: true }}
                >
                  <Link
                    href={`/chat?q=${encodeURIComponent(`Parle-moi de ${cat.name.toLowerCase()} au Bénin`)}`}
                    className="card-glass p-5 sm:p-6 block group cursor-pointer"
                  >
                    <div className="text-3xl sm:text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                      {cat.icon}
                    </div>
                    <h3 className="text-sm sm:text-base font-semibold text-surface-200 mb-1">
                      {cat.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-surface-500">{cat.desc}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ FEATURES ═══ */}
        <section className="py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-10 sm:mb-14"
            >
              <h2 className="text-3xl sm:text-5xl font-display font-bold text-surface-100 mb-3">
                Fonctionnalités puissantes
              </h2>
              <p className="text-surface-400 text-base sm:text-lg">
                Tout ce qu'il faut pour explorer le Bénin.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {FEATURES.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  viewport={{ once: true }}
                  className="card-glow p-6 sm:p-7 group"
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-display font-bold text-surface-100 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-surface-400 text-sm leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ CTA ═══ */}
        <section className="py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="rounded-3xl p-8 sm:p-12 md:p-16 text-center relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #064e3b 0%, #047857 50%, #065f46 100%)' }}
            >
              {/* Decorative */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-gold-400 blur-[100px]" />
                <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-emerald-300 blur-[80px]" />
              </div>

              <div className="relative z-10">
                <h2 className="text-3xl sm:text-5xl font-display font-bold text-white mb-4">
                  Prêt à explorer le Bénin ?
                </h2>
                <p className="text-emerald-100/80 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-8">
                  Rejoignez des milliers d'utilisateurs qui découvrent chaque jour la richesse
                  du patrimoine béninois grâce à l'intelligence artificielle.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <Link href="/chat" className="btn-primary text-base !px-8 !py-3.5">
                    Commencer maintenant
                    <ArrowRight size={18} />
                  </Link>
                  <Link href="/docs" className="btn-secondary !border-emerald-300/30 !text-emerald-100 hover:!bg-white/10 text-base !px-8 !py-3.5">
                    En savoir plus
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══ STATS ═══ */}
        <section className="py-16 sm:py-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  viewport={{ once: true }}
                  className="card-glass p-6 sm:p-8 text-center"
                >
                  <div className="text-2xl sm:text-4xl font-display font-extrabold gradient-text mb-1.5">
                    {stat.value}
                  </div>
                  <p className="text-surface-500 text-sm font-medium">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
