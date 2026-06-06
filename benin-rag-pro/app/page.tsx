'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, Mic, MessageSquare, Globe,
  Brain, Zap, Shield, History, Calendar, X, Eye
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

const HISTORY_ERAS = [
  {
    id: 'era_2026_future',
    title: '2026 et Au-delà : L\'Ère de l\'Unité et du Progrès',
    subtitle: 'Investiture de Romuald COSSI MBOEKE WADAGNI & dynamique "Plus loin, Ensemble"',
    narrative: 'Le 25 mai 2026 marque un tournant historique pour le Bénin. Le nouveau président Romuald COSSI MBOEKE WADAGNI entre en fonction, succédant à Patrice Talon. Porté par la vision directrice "Plus loin, Ensemble", son gouvernement s\'engage à consolider les acquis de la Rupture tout en inaugurant une ère de développement inclusif, de concertation nationale et de progrès partagé. C\'est l\'aube d\'un avenir collectif renforcé, où la jeunesse, l\'innovation technologique et l\'unité sociale sont au cœur des ambitions étatiques.',
    events: [
      '25 Mai 2026 : Prestation de serment solennelle du Président Romuald COSSI MBOEKE WADAGNI',
      'Formation du gouvernement de transition et d\'unité nationale sous le crédo "Plus loin, Ensemble"',
      'Lancement de chantiers axés sur l\'inclusion sociale, l\'économie numérique et la durabilité',
      'Consolidation du leadership du Bénin au sein des instances ouest-africaines et internationales'
    ],
    images: [
      { src: '/images/Romuald-Wadagni.webp', title: 'Président Romuald Wadagni', desc: 'Portrait officiel du Président Romuald COSSI MBOEKE WADAGNI, incarnant le renouveau générationnel, la rigueur technique et la vision d\'un Bénin prospère et uni.' },
      { src: '/images/Wadagni-1.webp', title: 'Plus Loin, Ensemble', desc: 'Le Président lors de sa présentation de politique générale, axée sur la cohésion nationale, la modernisation des services publics et l\'éducation.' },
      { src: '/images/en-2026-non-retour.jpeg', title: '2026 : Ancrage & Ouverture', desc: 'Inauguration des aménagements touristiques modernisés de la Porte du Non-Retour, alliant mémoire historique et attractivité internationale.' }
    ]
  },
  {
    id: 'era_2016_2026',
    title: '2016 - 2026 : Le Régime de la Rupture',
    subtitle: 'Patrice Talon et la refondation structurelle de la Nation',
    narrative: 'Sous la présidence de Patrice Talon, le Bénin amorce une refondation sans précédent. Le régime de "La Rupture" restructure en profondeur les institutions, assainit l\'économie et lance le Programme d\'Action du Gouvernement (PAG). Cette décennie est caractérisée par une métamorphose urbaine fulgurante (projet Asphaltage), l\'essor du secteur agricole, et une renaissance culturelle mondiale. La construction de monuments mémoriels et la restitution par la France des 26 trésors royaux d\'Abomey en 2021 redonnent au peuple sa pleine dignité historique.',
    events: [
      '2016 : Élection de Patrice Talon et mise en place de la Rupture',
      'Restitution historique par la France de 26 œuvres d\'art royal d\'Abomey en novembre 2021',
      'Érection de monuments majeurs à Cotonou : L\'Amazone, Bio Guéra, et le monument des Dévoués',
      'Lancement des chantiers muséaux d\'envergure : Musée International du Vodoun à Porto-Novo et musées d\'Abomey'
    ],
    images: [
      { src: '/images/talon_2016_2026.avif', title: 'Président Patrice Talon', desc: 'Le Président Patrice Talon, initiateur des réformes institutionnelles et de la transformation des infrastructures urbaines.' },
      { src: '/images/amazone_2024.jpg', title: 'Monument de l\'Amazone', desc: 'La statue de l\'Amazone à Cotonou, symbole de la bravoure des femmes béninoises et hommage aux mythiques guerrières Agodjié.' },
      { src: '/images/monuments.jpg', title: 'Cotonou Moderne', desc: 'Modernisation des places publiques et des boulevards urbains à Cotonou, illustrant le visage contemporain du Bénin.' },
      { src: '/images/ouidah.jpg', title: 'Mémoire de Ouidah', desc: 'Travaux de restauration d\'envergure dans la cité historique de Ouidah pour préserver le patrimoine mémoriel de la traite.' },
      { src: '/images/musee-vodoun.jpg', title: 'Patrimoine Vodoun', desc: 'Projet de construction du Musée International du Vodoun, célébrant les arts et la philosophie spirituelle endogène.' },
      { src: '/images/porte-non-retour-avant-2026.jpg', title: 'La Porte avant sa Modernisation', desc: 'Le monument historique de la Porte du Non-Retour à Ouidah tel qu\'il se présentait avant sa réhabilitation d\'envergure achevée en 2026.' }
    ]
  },
  {
    id: 'era_1960_2016',
    title: '1960 - 2016 : Souveraineté & Démocratie',
    subtitle: 'De l\'indépendance du Dahomey au modèle démocratique de la Conférence nationale',
    narrative: 'Le 1er août 1960, le Dahomey accède à l\'indépendance. Les premières années sont marquées par l\'instabilité politique jusqu\'en 1972, date à laquelle le Général Mathieu Kérékou prend le pouvoir et instaure un régime marxiste-léniniste sous le nom de République Populaire du Bénin en 1975. Face à la crise, le Bénin organise en février 1990 la Conférence des Forces Vives de la Nation, un coup de génie politique pacifique qui instaure le multipartisme. Les alternances démocratiques exemplaires sous Nicéphore Soglo, Mathieu Kérékou et Yayi Boni consacrent le Bénin comme laboratoire de la démocratie en Afrique.',
    events: [
      '1er Août 1960 : Proclamation de l\'indépendance nationale par le président Hubert Maga',
      '30 Novembre 1975 : Proclamation de la République Populaire du Bénin sous le régime de Mathieu Kérékou',
      'Février 1990 : Conférence des Forces Vives de la Nation, transition pacifique historique',
      'Alternances démocratiques régulières et consolidation des libertés publiques de 1991 à 2016'
    ],
    images: [
      { src: '/images/independance_benin.jpeg', title: '1er Août 1960', desc: 'Célébrations officielles et joie populaire lors de la proclamation d\'indépendance de la République du Dahomey.' },
      { src: '/images/congres.jpg', title: 'Palais des Congrès', desc: 'Le Palais des Congrès de Cotonou, théâtre des débats démocratiques et des assemblées constituantes de la période post-1990.' },
      { src: '/images/images.jpeg', title: 'Transition Pacifique', desc: 'Archives historiques illustrant la cohabitation pacifique et la réconciliation politique nationale des années 1990.' }
    ]
  },
  {
    id: 'era_before_1960',
    title: 'Avant 1960 : Royaumes, Gloire & Résistance',
    subtitle: 'Le temps des grands empires et des héros nationaux contre l\'impérialisme',
    narrative: 'Avant la colonisation française, le Dahomey était une mosaïque de royaumes puissants et florissants, notamment les royaumes d\'Abomey, de Nikki, de Hogbonou (Porto-Novo) et d\'Allada. Ces entités possédaient une organisation sociale, militaire et artistique sophistiquée. Face à la pénétration coloniale à la fin du XIXe siècle, la résistance s\'organise. Le Roi Béhanzin d\'Abomey livre des batailles héroïques, tandis que dans le nord, le prince wassangari Bio Guéra s\'oppose farouchement à l\'oppresseur colonial lors des révoltes de 1915-1917, inscrivant leurs noms au panthéon de la liberté.',
    events: [
      'Royaumes souverains d\'Abomey, de Nikki et d\'Allada dotés d\'armées hautement structurées',
      'Guerres de résistance menées par le Roi Béhanzin d\'Abomey contre les troupes du Général Dodds',
      'Soulèvement héroïque de Bio Guéra (1915-1917) contre le recrutement forcé dans le Nord',
      'Rôle déterminant des Agodjié (les Amazones de Dahomey) dans la préservation du territoire'
    ],
    images: [
      { src: '/images/before_1960.jpg', title: 'Résistance de Béhanzin', desc: 'Représentation picturale de la résistance des armées d\'Abomey face à la supériorité technique des forces coloniales.' },
      { src: '/images/guerra_bio.jpg', title: 'Statue de Bio Guéra', desc: 'Monument érigé en hommage à Bio Guéra, symbole intemporel de la résistance nationale à l\'occupation étrangère.' },
      { src: '/images/bio_guerra.jpeg', title: 'Le Prince Guerrier Bio Guéra', desc: 'Illustration du chef de guerre Bio Guéra à cheval, menant ses cavaliers lors des soulèvements de Nikki.' },
      { src: '/images/royal-palace-of-allada.jpg', title: 'Palais d\'Allada', desc: 'Vue du palais royal d\'Allada, berceau dynastique des fondateurs des royaumes du Sud-Bénin.' }
    ]
  }
];

export default function HomePage() {
  const [wordIdx, setWordIdx] = useState(0);
  const [selectedEra, setSelectedEra] = useState('era_2026_future');
  const [activeImage, setActiveImage] = useState<{ src: string; title: string; desc: string } | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIdx((i) => (i + 1) % ROTATING_WORDS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-surface-950 relative overflow-x-hidden">
      <Header />

      <div className="relative z-10">
        {/* ═══ HERO ═══ */}
        <section className="min-h-[calc(100vh-4rem)] flex items-center">
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-16 sm:py-24">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-gold-500/10 border border-gold-500/20 text-yellow-300 mb-6 sm:mb-8"
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
                <span className="bg-gradient-to-r from-gold-500 via-gold-300 to-gold-500 bg-clip-text text-transparent" key={wordIdx}>
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
                <Link href="/chat" className="inline-flex items-center gap-2 px-8 py-3.5 font-semibold text-base rounded-xl transition-all duration-300 ease-out active:scale-[0.97] bg-gradient-to-br from-gold-500 to-gold-400 text-surface-950 shadow-[0_4px_16px_rgba(212,160,23,0.3)] hover:shadow-[0_6px_28px_rgba(212,160,23,0.5)] hover:-translate-y-[1px] justify-center">
                  <MessageSquare size={18} />
                  Commencer le chat
                  <ArrowRight size={18} />
                </Link>
                <Link href="/audio" className="inline-flex items-center gap-2 px-8 py-3.5 font-semibold text-base rounded-xl transition-all duration-300 ease-out active:scale-[0.97] bg-white/5 text-yellow-300 border-[1.5px] border-gold-500/30 backdrop-blur-[8px] hover:bg-gold-500/10 hover:border-gold-500/50 justify-center">
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
                    className="p-5 sm:p-6 block group cursor-pointer rounded-2xl transition-all duration-300 bg-white/[0.04] border border-white/[0.08] backdrop-blur-[16px] hover:bg-white/[0.06] hover:border-white/[0.12] hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)]"
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

        {/* ═══ BENIN HISTORICAL TIMELINE ═══ */}
        <section className="py-16 sm:py-24 border-t border-b border-white/[0.04] bg-white/[0.01] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            
            {/* Header */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-gold-500/10 border border-gold-500/20 text-yellow-300 mb-4 mx-auto">
                <History className="w-3.5 h-3.5 mr-1 text-gold-400" />
                L'Épopée Béninoise
              </div>
              <h2 className="text-3xl sm:text-5xl font-display font-bold text-surface-100 mb-3">
                Notre Histoire en Images
              </h2>
              <p className="text-surface-400 text-base sm:text-lg max-w-2xl mx-auto">
                Explorez le cheminement de notre nation à rebours, de l'ère actuelle de progrès jusqu'à ses racines et royaumes fondateurs.
              </p>
            </motion.div>

            {/* Exploration Guideline Indicator */}
            <div className="hidden md:flex justify-center items-center gap-4 text-xs font-semibold text-surface-400 mb-8 border-b border-white/[0.04] pb-6 max-w-4xl mx-auto">
              <span className="text-gold-400 flex items-center gap-1.5 shrink-0">
                <History className="w-3.5 h-3.5" />
                Exploration Rétrospective :
              </span>
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`px-2.5 py-1 rounded-full transition-all duration-300 ${selectedEra === 'era_2026_future' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shadow-glow-emerald' : 'text-surface-500 border border-transparent'}`}>
                  Aujourd'hui & Futur (2026+)
                </span>
                <ArrowRight className="w-3 h-3 text-surface-600" />
                <span className={`px-2.5 py-1 rounded-full transition-all duration-300 ${selectedEra === 'era_2016_2026' ? 'bg-gold-500/10 text-gold-400 border border-gold-500/30 shadow-glow-gold' : 'text-surface-500 border border-transparent'}`}>
                  La Rupture & Renaissance (2016-2026)
                </span>
                <ArrowRight className="w-3 h-3 text-surface-600" />
                <span className={`px-2.5 py-1 rounded-full transition-all duration-300 ${selectedEra === 'era_1960_2016' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/30 shadow-glow-yellow' : 'text-surface-500 border border-transparent'}`}>
                  Souveraineté & Démocratie (1960-2016)
                </span>
                <ArrowRight className="w-3 h-3 text-surface-600" />
                <span className={`px-2.5 py-1 rounded-full transition-all duration-300 ${selectedEra === 'era_before_1960' ? 'bg-red-500/10 text-red-400 border border-red-500/30 shadow-glow-red' : 'text-surface-500 border border-transparent'}`}>
                  Les Origines (Avant 1960)
                </span>
              </div>
            </div>

            {/* Era Tabs Selector */}
            <div className="flex overflow-x-auto pb-4 mb-12 justify-start md:justify-center gap-3 scrollbar-none snap-x px-2">
              {HISTORY_ERAS.map((era) => {
                const isActive = selectedEra === era.id;
                return (
                  <button
                    key={era.id}
                    onClick={() => setSelectedEra(era.id)}
                    className={`px-5 py-3 rounded-xl text-sm font-semibold whitespace-nowrap snap-align-start transition-all duration-300 border flex items-center gap-2 ${
                      isActive
                        ? 'bg-gold-500 text-surface-950 border-gold-400 shadow-glow-gold'
                        : 'bg-surface-900/40 text-surface-400 border-white/[0.08] hover:text-surface-200 hover:border-white/[0.15]'
                    }`}
                  >
                    <Calendar className={`w-4 h-4 ${isActive ? 'text-surface-950' : 'text-gold-400'}`} />
                    {era.id === 'era_2026_future' && '2026 et au-delà'}
                    {era.id === 'era_2016_2026' && '2016 - 2026'}
                    {era.id === 'era_1960_2016' && '1960 - 2016'}
                    {era.id === 'era_before_1960' && 'Avant 1960'}
                  </button>
                );
              })}
            </div>

            {/* Era Details Content */}
            <AnimatePresence mode="wait">
              {HISTORY_ERAS.map((era) => {
                if (era.id !== selectedEra) return null;
                return (
                  <motion.div
                    key={era.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start"
                  >
                    
                    {/* Left Column: Narrative */}
                    <div className="lg:col-span-5 space-y-6">
                      <div className="space-y-3">
                        <span className={`text-xs font-bold uppercase tracking-wider block ${
                          era.id === 'era_2026_future' ? 'text-emerald-400' :
                          era.id === 'era_2016_2026' ? 'text-gold-400' :
                          era.id === 'era_1960_2016' ? 'text-yellow-400' : 'text-red-400'
                        }`}>
                          {era.id === 'era_2026_future' && 'L\'Ère Actuelle & Le Futur'}
                          {era.id === 'era_2016_2026' && 'La Rupture & Renaissance'}
                          {era.id === 'era_1960_2016' && 'Souveraineté & Démocratie'}
                          {era.id === 'era_before_1960' && 'Les Royaumes & La Résistance'}
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-display font-bold text-surface-100">
                          {era.title}
                        </h3>
                        <p className="text-sm text-surface-500 italic">
                          {era.subtitle}
                        </p>
                      </div>

                      <p className="text-surface-300 text-sm sm:text-base leading-relaxed">
                        {era.narrative}
                      </p>

                      <div className="space-y-3 pt-2">
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-gold-400/90 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                          Faits marquants :
                        </h4>
                        <ul className="space-y-2.5">
                          {era.events.map((event, idx) => (
                            <li key={idx} className="flex gap-2.5 text-xs sm:text-sm text-surface-400">
                              <span className="text-emerald-500 font-bold">•</span>
                              <span>{event}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-4">
                        <Link
                          href={`/chat?q=${encodeURIComponent(`Donne-moi plus de détails historiques sur cette période : ${era.title}`)}`}
                          className="inline-flex items-center gap-2 px-5 py-2.5 font-semibold text-xs rounded-xl transition-all duration-300 ease-out active:scale-[0.97] bg-white/5 text-yellow-300 border-[1.5px] border-gold-500/30 backdrop-blur-[8px] hover:bg-gold-500/10 hover:border-gold-500/50 inline-flex items-center gap-2"
                        >
                          Demander à l'assistant sur cette époque
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>

                    {/* Right Column: Bento Images Grid */}
                    <div className="lg:col-span-7">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {era.images.map((img, idx) => {
                          const isLarge = idx === 0;
                          return (
                            <motion.div
                              key={img.src}
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.4, delay: idx * 0.08 }}
                              className={`relative group rounded-2xl overflow-hidden border border-gold-500/15 bg-white/[0.03] cursor-zoom-in hover:border-gold-500/35 transition-all duration-300 shadow-md hover:shadow-[0_0_30px_rgba(212,160,23,0.08)] ${
                                isLarge ? 'sm:col-span-2 aspect-[16/9]' : 'aspect-[4/3]'
                              }`}
                              onClick={() => setActiveImage(img)}
                            >
                              {/* Image element */}
                              <img
                                src={img.src}
                                alt={img.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                loading="lazy"
                              />
                              
                              {/* Glassmorphic overlay */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent opacity-70 group-hover:opacity-95 transition-all duration-300 flex flex-col justify-end p-5">
                                <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-300 space-y-1">
                                  <h4 className="font-display font-bold text-sm sm:text-base text-surface-100 flex items-center gap-2">
                                    {img.title}
                                    <Eye className="w-3.5 h-3.5 text-gold-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                  </h4>
                                  <p className="text-xs text-surface-400 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    {img.desc}
                                  </p>
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </section>

        {/* ═══ LIGHTBOX IMAGE MODAL ═══ */}
        <AnimatePresence>
          {activeImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
              onClick={() => setActiveImage(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="relative max-w-4xl w-full bg-surface-900 border border-white/[0.08] rounded-3xl overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Decorative border matching flag colors */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-500 via-yellow-500 to-red-500 z-30" />

                {/* Close Button */}
                <button
                  onClick={() => setActiveImage(null)}
                  className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-surface-300 hover:text-white transition-colors flex items-center justify-center border border-white/10"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Aspect-ratio layout */}
                <div className="flex flex-col md:flex-row h-full max-h-[85vh]">
                  {/* Left Side: Large Image */}
                  <div className="w-full md:w-[60%] bg-black flex items-center justify-center relative min-h-[300px] md:min-h-0">
                    <img
                      src={activeImage.src}
                      alt={activeImage.title}
                      className="w-full h-full object-contain max-h-[50vh] md:max-h-[85vh]"
                    />
                  </div>

                  {/* Right Side: Historical Info Panel */}
                  <div className="w-full md:w-[40%] p-6 sm:p-8 flex flex-col justify-between border-t md:border-t-0 md:border-l border-white/[0.08] bg-surface-950/80">
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-gold-400">
                          Zoom Historique
                        </span>
                        <h3 className="text-xl sm:text-2xl font-display font-bold text-surface-100 leading-tight">
                          {activeImage.title}
                        </h3>
                      </div>
                      <p className="text-sm text-surface-300 leading-relaxed">
                        {activeImage.desc}
                      </p>
                    </div>

                    <div className="pt-6 border-t border-white/[0.04] mt-6 flex flex-col gap-3">
                      <Link
                        href={`/chat?q=${encodeURIComponent(`Donne-moi plus d'informations détaillées sur le sujet : ${activeImage.title}`)}`}
                        onClick={() => setActiveImage(null)}
                        className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-xs rounded-xl transition-all duration-300 ease-out active:scale-[0.97] bg-gradient-to-br from-gold-500 to-gold-400 text-surface-950 shadow-[0_4px_16px_rgba(212,160,23,0.3)] hover:shadow-[0_6px_28px_rgba(212,160,23,0.5)] hover:-translate-y-[1px] !w-full justify-center py-2.5"
                      >
                        Poser des questions sur ce sujet
                        <MessageSquare className="w-3.5 h-3.5 ml-1" />
                      </Link>
                      <button
                        onClick={() => setActiveImage(null)}
                        className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-xs rounded-xl transition-all duration-300 ease-out active:scale-[0.97] bg-white/5 text-yellow-300 border-[1.5px] border-gold-500/30 backdrop-blur-[8px] hover:bg-gold-500/10 hover:border-gold-500/50 !w-full justify-center py-2.5"
                      >
                        Fermer la vue
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

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
                  className="p-6 sm:p-7 group rounded-2xl transition-all duration-300 relative overflow-hidden bg-white/[0.03] border border-gold-500/15 hover:border-gold-500/35 hover:shadow-[0_0_30px_rgba(212,160,23,0.08)]"
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
                  <Link href="/chat" className="inline-flex items-center gap-2 px-8 py-3.5 font-semibold text-base rounded-xl transition-all duration-300 ease-out active:scale-[0.97] bg-gradient-to-br from-gold-500 to-gold-400 text-surface-950 shadow-[0_4px_16px_rgba(212,160,23,0.3)] hover:shadow-[0_6px_28px_rgba(212,160,23,0.5)] hover:-translate-y-[1px] justify-center text-base !px-8 !py-3.5">
                    Commencer maintenant
                    <ArrowRight size={18} />
                  </Link>
                  <Link href="/docs" className="inline-flex items-center gap-2 px-8 py-3.5 font-semibold text-base rounded-xl transition-all duration-300 ease-out active:scale-[0.97] bg-white/5 text-emerald-100 border-[1.5px] border-emerald-300/30 backdrop-blur-[8px] hover:bg-white/10 justify-center text-base !px-8 !py-3.5">
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
                  className="p-6 sm:p-8 text-center rounded-2xl transition-all duration-300 bg-white/[0.04] border border-white/[0.08] backdrop-blur-[16px] hover:bg-white/[0.06] hover:border-white/[0.12] hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)]"
                >
                  <div className="text-2xl sm:text-4xl font-display font-extrabold bg-gradient-to-r from-gold-500 via-gold-300 to-gold-500 bg-clip-text text-transparent mb-1.5">
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
