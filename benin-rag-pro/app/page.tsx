'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Sparkles,
  Mic,
  MessageSquare,
  Zap,
  Globe,
  Brain,
  Music,
  BookOpen,
  Users,
} from 'lucide-react';

const BENIN_WORDS = [
  'Connaissance',
  'Culture',
  'Traditions',
  'Patrimoine',
  'Sagesse',
  'Futur',
  'Communauté',
  'Innovation',
];

const FEATURES = [
  {
    icon: MessageSquare,
    title: 'Chat Intelligent',
    description: 'Posez vos questions en texte et obtenez des réponses instantanées',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Mic,
    title: 'Audio Avancé',
    description: 'Parlez et écoutez les réponses avec visualisation d\'ondes',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Brain,
    title: 'IA Agentic',
    description: 'Agents IA intelligents pour répondre vos questions complexes',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Globe,
    title: 'Base de Connaissance Bénin',
    description: 'Accédez au patrimoine culturel et aux traditions béninoise',
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: BookOpen,
    title: 'Documentation Riche',
    description: 'Explorez des guides complets et des tutoriels détaillés',
    color: 'from-indigo-500 to-blue-500',
  },
  {
    icon: Users,
    title: 'Communauté Active',
    description: 'Connectez-vous avec d\'autres utilisateurs et contributeurs',
    color: 'from-yellow-500 to-orange-500',
  },
];

const CATEGORIES = [
  {
    name: 'Histoire',
    icon: '📚',
    color: 'bg-amber-100',
    description: 'L\'histoire riche du Bénin',
  },
  {
    name: 'Traditions',
    icon: '🎭',
    color: 'bg-rose-100',
    description: 'Les traditions et coutumes béninoise',
  },
  {
    name: 'Art & Musique',
    icon: '🎵',
    color: 'bg-purple-100',
    description: 'Expression artistique béninoise',
  },
  {
    name: 'Cuisine',
    icon: '🍲',
    color: 'bg-orange-100',
    description: 'Gastronomie béninoise authentique',
  },
  {
    name: 'Patrimoine',
    icon: '🏛️',
    color: 'bg-blue-100',
    description: 'Sites et monuments importants',
  },
  {
    name: 'Langues',
    icon: '🗣️',
    color: 'bg-green-100',
    description: 'Langues et dialectes locaux',
  },
];

export default function HomePage() {
  const [wordIdx, setWordIdx] = useState(0);
  const [fade, setFade] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Animated word rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setWordIdx((i) => (i + 1) % BENIN_WORDS.length);
        setFade(true);
      }, 300);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Background animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf: number;
    let t = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resize();
    window.addEventListener('resize', resize);

    const circles = Array.from({ length: 8 }, (_, i) => ({
      x: Math.random() * canvas.offsetWidth,
      y: Math.random() * canvas.offsetHeight,
      r: 50 + Math.random() * 200,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      color: i % 2 === 0 ? 'rgba(92, 78, 132, 0.1)' : 'rgba(255, 215, 0, 0.05)',
    }));

    const animate = () => {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      circles.forEach((circle) => {
        circle.x += circle.vx;
        circle.y += circle.vy;

        if (circle.x - circle.r < 0 || circle.x + circle.r > canvas.offsetWidth)
          circle.vx *= -1;
        if (
          circle.y - circle.r < 0 ||
          circle.y + circle.r > canvas.offsetHeight
        )
          circle.vy *= -1;

        ctx.fillStyle = circle.color;
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.r, 0, Math.PI * 2);
        ctx.fill();
      });

      t += 0.01;
      raf = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="overflow-hidden">
      {/* Hero Background */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-screen pointer-events-none z-0"
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-3 xs:px-4 sm:px-6 py-12 sm:py-20">
          <div className="max-w-4xl mx-auto text-center space-y-4 xs:space-y-6 sm:space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="flex justify-center"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-benin-600 to-gold-500 rounded-2xl blur-2xl opacity-30"></div>
                <div className="relative bg-gradient-benin p-3 xs:p-4 rounded-xl xs:rounded-2xl">
                  <Sparkles className="w-12 xs:w-14 sm:w-16 h-12 xs:h-14 sm:h-16 text-gold-300" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-benin-900 leading-tight">
                Découvrez le
                <br />
                <span className="gradient-text">
                  {BENIN_WORDS[wordIdx]}
                </span>
                <br />
                Béninois
              </h1>
            </motion.div>

            <motion.p
              key={wordIdx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: fade ? 1 : 0, y: fade ? 0 : 10 }}
              transition={{ duration: 0.5 }}
              className="text-sm xs:text-base sm:text-lg md:text-xl text-benin-600 max-w-2xl mx-auto px-2"
            >
              Explorez le patrimoine, les traditions et la sagesse béninoise à travers une
              plateforme d'IA révolutionnaire
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col xs:flex-col sm:flex-row gap-2 xs:gap-3 sm:gap-4 justify-center pt-6 xs:pt-8 px-2"
            >
              <Link
                href="/chat"
                className="btn-primary inline-flex items-center gap-2 justify-center"
              >
                <MessageSquare size={20} />
                Commencer le Chat
                <ArrowRight size={20} />
              </Link>
              <Link
                href="/audio"
                className="btn-secondary inline-flex items-center gap-2 justify-center"
              >
                <Mic size={20} />
                Mode Audio
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 py-12 sm:py-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-16"
          >
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-benin-900 mb-2 xs:mb-3 sm:mb-4 px-2">
              Explorez les Catégories
            </h2>
            <p className="text-xs xs:text-sm sm:text-lg md:text-xl text-benin-600 px-2">
              Plongez dans différents aspects de la culture béninoise
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 xs:gap-4 sm:gap-6">
            {CATEGORIES.map((category, i) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className={`card p-3 xs:p-4 sm:p-6 hover:shadow-lg cursor-pointer group ${category.color} rounded-lg`}
              >
                <div className="text-3xl xs:text-4xl sm:text-5xl mb-2 xs:mb-3 group-hover:scale-110 transition-transform">
                  {category.icon}
                </div>
                <h3 className="text-base xs:text-lg sm:text-xl font-bold text-benin-900 mb-1 xs:mb-2">
                  {category.name}
                </h3>
                <p className="text-xs xs:text-sm sm:text-base text-benin-600">{category.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="max-w-7xl mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-benin-900 mb-4">
              Fonctionnalités Puissantes
            </h2>
            <p className="text-xl text-benin-600">
              Tout ce dont vous avez besoin pour explorer et apprendre
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="card p-8 group hover:shadow-xl"
              >
                <div
                  className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-benin-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-benin-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-7xl mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-benin rounded-2xl p-12 md:p-20 text-white text-center space-y-6"
          >
            <h2 className="text-4xl md:text-5xl font-bold">
              Prêt à Explorer le Bénin?
            </h2>
            <p className="text-lg text-benin-100 max-w-2xl mx-auto">
              Rejoignez des milliers d'utilisateurs qui découvrent le patrimoine béninois
              à travers notre plateforme d'IA révolutionnaire
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Link
                href="/chat"
                className="bg-gold-500 hover:bg-gold-600 text-benin-900 px-8 py-4 rounded-lg font-bold inline-flex items-center gap-2 justify-center transition-all hover:shadow-lg"
              >
                Commencer Maintenant
                <ArrowRight size={20} />
              </Link>
              <a
                href="#"
                className="border-2 border-gold-400 hover:bg-benin-800 text-white px-8 py-4 rounded-lg font-bold transition-all"
              >
                En Savoir Plus
              </a>
            </div>
          </motion.div>
        </section>

        {/* Stats Section */}
        <section className="max-w-7xl mx-auto px-4 py-20">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { label: 'Documents', value: '10K+' },
              { label: 'Utilisateurs Actifs', value: '5K+' },
              { label: 'Questions Répondues', value: '100K+' },
              { label: 'Disponibilité', value: '99.9%' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center card p-8"
              >
                <div className="text-4xl font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <p className="text-benin-600 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
