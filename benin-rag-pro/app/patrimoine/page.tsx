'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Compass, Search, MessageSquare, ArrowRight, X, Maximize2, RotateCw, Calendar, Layers, Scale } from 'lucide-react';
import { Header } from '@components/Header';
import { Footer } from '@components/Footer';
import Link from 'next/link';

/* ─── Types ─── */
interface HeritageItem {
  id: string;
  name: string;
  category: 'tresor' | 'monument';
  origin: string;
  material: string;
  dimensions: string;
  epoch: string;
  description: string;
  history: string;
  image: string;
  fallbackImage: string;
  prompt: string;
}

/* ─── Data ─── */
const HERITAGE_ITEMS: HeritageItem[] = [
  {
    id: 'trone-glele',
    name: 'Trône du Roi Glélé (Kataclè)',
    category: 'tresor',
    origin: "Palais Royal d'Abomey (Restitué par la France en 2021)",
    material: 'Bois, pigments, cuivre, clous en laiton',
    dimensions: '102 x 84 x 63 cm',
    epoch: 'Règne du Roi Glélé (1858 - 1889)',
    description: "Trône royal majestueux à piétement sculpté, orné de motifs zoomorphes représentant le lion, symbole du souverain.",
    history: "Ce trône, symbole du pouvoir absolu du Dahomey, a été emporté lors de la mise à sac du palais d'Abomey par le général Dodds en 1892. Il a fait partie des 26 œuvres restituées au Bénin en novembre 2021, réveillant la ferveur patriotique et culturelle de la nation.",
    image: '/images/trone_glele.jpg',
    fallbackImage: '/images/before_1960.jpg',
    prompt: "Raconte-moi l'histoire du Trône du Roi Glélé restitué en 2021."
  },
  {
    id: 'trone-behanzin',
    name: 'Trône du Roi Béhanzin',
    category: 'tresor',
    origin: "Palais Royal d'Abomey (Restitué par la France en 2021)",
    material: 'Bois sculpté monoxyle (un seul tronc)',
    dimensions: '98 x 79 x 55 cm',
    epoch: 'Règne du Roi Béhanzin (1889 - 1894)',
    description: "Siège de dignité royale sculpté dans un bloc de bois unique, orné de gravures géométriques et héraldiques.",
    history: "Emblème de la résistance acharnée contre la pénétration coloniale, ce trône accompagnait le Roi Béhanzin sur les champs de bataille. Confisqué par les troupes françaises, sa restitution incarne le retour de la souveraineté spirituelle et physique du peuple dahoméen.",
    image: '/images/trone_behanzin.jpg',
    fallbackImage: '/images/bio_guerra.jpeg',
    prompt: "Quels sont les symboles représentés sur le trône de combat du Roi Béhanzin ?"
  },
  {
    id: 'statue-lion-glele',
    name: 'Statue Anthropomorphe du Roi Glélé',
    category: 'tresor',
    origin: "Abomey (Restituée par la France en 2021)",
    material: 'Bois sculpté polychrome, fer, laiton',
    dimensions: '160 x 68 x 72 cm',
    epoch: 'XIXe siècle',
    description: "Sculpture imposante représentant le Roi Glélé sous la forme d'un homme-lion rugissant, symbole de puissance.",
    history: "Cette œuvre spectaculaire illustre la croyance royale béninoise où le roi possède le pouvoir de se métamorphoser en animal totem. Le lion incarne ici la force brute, la justice et la souveraineté protectrice sur les tribus alliées du royaume.",
    image: '/images/statue_lion_glele.jpg',
    fallbackImage: '/images/before_1960.jpg',
    prompt: "Explique l'importance spirituelle et artistique de la statue homme-lion du Roi Glélé."
  },
  {
    id: 'statue-requin-behanzin',
    name: 'Statue Anthropomorphe du Roi Béhanzin',
    category: 'tresor',
    origin: "Abomey (Restituée par la France en 2021)",
    material: 'Bois peint, métal',
    dimensions: '155 x 62 x 65 cm',
    epoch: 'Fin du XIXe siècle',
    description: "Statue hybride d'homme-requin aux bras levés, symbolisant le courage invincible face à l'envahisseur.",
    history: "Le requin est le symbole fort choisi par Béhanzin, tiré de la devise : 'Le requin en colère qui sème la terreur à la côte'. La statue représente le monarque prêt à repousser les navires coloniaux français tentant d'accoster sur les côtes de Ouidah et Cotonou.",
    image: '/images/statue_requin_behanzin.jpg',
    fallbackImage: '/images/bio_guerra.jpeg',
    prompt: "Quelle est l'origine historique et spirituelle de la statue de l'homme-requin représentant le Roi Béhanzin ?"
  },
  {
    id: 'statue-oiseau-ghezo',
    name: 'Statue Anthropomorphe du Roi Ghézo',
    category: 'tresor',
    origin: "Abomey (Restituée par la France en 2021)",
    material: 'Bois sculpté, plaques de fer assemblées',
    dimensions: '165 x 70 x 60 cm',
    epoch: 'Milieu du XIXe siècle',
    description: "Statue anthropomorphe représentant le Roi Ghézo sous les traits d'un oiseau de proie cardinal puissant.",
    history: "Le Roi Ghézo (1818-1858) a pacifié le royaume et développé son économie. L'oiseau cardinal symbolise l'élévation spirituelle, la vigilance et la capacité de voir les menaces lointaines. Cette œuvre témoigne de la maîtrise artistique dahoméenne du travail des métaux et du bois.",
    image: '/images/statue_oiseau_ghezo.jpg',
    fallbackImage: '/images/royal-palace-of-allada.jpg',
    prompt: "Parle-moi de la statue anthropomorphe oiseau et du règne du Roi Ghézo."
  },
  {
    id: 'recade-royale',
    name: 'Récade Royale (Makpo du commandement)',
    category: 'tresor',
    origin: "Cour royale d'Abomey (Restituée en 2021)",
    material: 'Bois, cuivre argenté, fer sculpté',
    dimensions: '62 x 18 x 5 cm',
    epoch: 'XIXe siècle',
    description: "Sceptre cérémoniel de commandement en forme de crosse de guerre, orné de motifs symboliques.",
    history: "Le Makpo n'était pas seulement une arme, mais la prolongation physique de la parole royale. Un messager portant la récade du roi transmettait un ordre indiscutable. La sculpture en bout de crosse représente généralement le nom fort ou le symbole du souverain régnant.",
    image: '/images/recade_royale.jpg',
    fallbackImage: '/images/drapeau_officielle_page.webp',
    prompt: "Comment la récade (Makpo) servait-elle de symbole de pouvoir et de communication sous le Dahomey ?"
  },
  {
    id: 'monument-amazone',
    name: "Le Monument de l'Amazone",
    category: 'monument',
    origin: "Cotonou (Bénin)",
    material: 'Bronze avec structure interne renforcée',
    dimensions: 'Hauteur totale : 30 mètres',
    epoch: 'Inauguré en 2022',
    description: "Statue colossale érigée en hommage aux guerrières Agodjié, symbolisant le courage et le rôle historique de la femme béninoise.",
    history: "Dressée fièrement au cœur de Cotonou, cette statue de 30 mètres de haut incarne la fierté nationale. Les Agodjié étaient un régiment militaire entièrement féminin protégeant le royaume de Dahomey, réputé pour son intrépidité et sa discipline de fer face aux puissances rivales et coloniales.",
    image: '/images/amazone_2024.jpg',
    fallbackImage: '/images/monuments.jpg',
    prompt: "Quelle est l'histoire des Amazones de Dahomey (Agodjié) et la signification du monument à Cotonou ?"
  },
  {
    id: 'statue-bio-guera',
    name: 'La Statue de Bio Guéra',
    category: 'monument',
    origin: "Cotonou (Bénin) / Nikki (Nord)",
    material: 'Bronze massif',
    dimensions: 'Hauteur : 10 mètres',
    epoch: 'Inaugurée en 2022',
    description: "Statue équestre représentant le héros national Bio Guéra, immortalisant la résistance armée du Grand Nord.",
    history: "Bio Guéra, prince guerrier wassangari de Nikki, a mené les populations du Nord à la révolte contre les impôts coloniaux forcés et les recrutements militaires durant la Première Guerre mondiale. Il a combattu héroïquement jusqu'à sa mort en 1916, devenant le visage indomptable de la résistance béninoise.",
    image: '/images/guerra_bio.jpg',
    fallbackImage: '/images/bio_guerra.jpeg',
    prompt: "Qui était Bio Guéra et comment a-t-il mené la résistance dans le nord du Bénin ?"
  },
  {
    id: 'porte-non-retour',
    name: 'La Porte du Non-Retour',
    category: 'monument',
    origin: "Plage de Ouidah (Bénin)",
    material: 'Béton armé, bronze, bas-reliefs',
    dimensions: 'Hauteur : 15 mètres',
    epoch: 'Érigée en 1992 - Rénovée en 2026',
    description: "Arche commémorative historique érigée sur la plage de Ouidah, point de départ de millions d'esclaves.",
    history: "Construite en bordure de mer à l'extrémité de la route des esclaves, cette porte est un mémorial poignant de la traite négrière transatlantique. Entièrement restaurée et embellie dans le cadre de grands projets touristiques en 2026, elle invite au recueillement et à la mémoire mondiale de la déportation.",
    image: '/images/porte-non-retour-avant-2026.jpg',
    fallbackImage: '/images/ouidah.jpg',
    prompt: "Raconte-moi l'importance mémorielle de la Porte du Non-Retour à Ouidah."
  }
];

/* ─── Heritage Card Component (3D Tilt Effect) ─── */
const HeritageCard = ({ item, onClick }: { item: HeritageItem; onClick: () => void }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [imgSrc, setImgSrc] = useState(item.image);

  // Motion values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Map values to tilt rotation angles
  const rotateX = useTransform(y, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-15, 15]);

  // Spring animations for smooth tilt transitions
  const springConfig = { damping: 22, stiffness: 220, mass: 0.6 };
  const smoothRotateX = useSpring(rotateX, springConfig);
  const smoothRotateY = useSpring(rotateY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const relativeX = (e.clientX - rect.left) / rect.width - 0.5;
    const relativeY = (e.clientY - rect.top) / rect.height - 0.5;

    x.set(relativeX);
    y.set(relativeY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transformStyle: 'preserve-3d',
        rotateX: smoothRotateX,
        rotateY: smoothRotateY,
      }}
      className="relative group rounded-3xl overflow-hidden border border-gold-500/15 bg-surface-900/40 backdrop-blur-md cursor-pointer hover:border-gold-500/40 transition-colors duration-300 shadow-lg hover:shadow-[0_12px_48px_rgba(212,160,23,0.1)] flex flex-col h-[420px]"
    >
      {/* Dynamic light glare shine overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-30 transition-opacity duration-300 z-10"
        style={{
          background: 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.15) 0%, transparent 60%)'
        }}
      />

      {/* Decorative category badge */}
      <div className="absolute top-4 left-4 z-20">
        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border backdrop-blur-md ${
          item.category === 'tresor' 
            ? 'bg-gold-500/10 border-gold-500/30 text-yellow-300 shadow-[0_0_15px_rgba(212,160,23,0.1)]' 
            : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300 shadow-[0_0_15px_rgba(5,150,105,0.1)]'
        }`}>
          {item.category === 'tresor' ? 'Trésor Royal' : 'Monument National'}
        </span>
      </div>

      {/* Image container */}
      <div className="relative w-full h-[60%] bg-black/45 overflow-hidden flex items-center justify-center">
        <img
          src={imgSrc}
          alt={item.name}
          onError={() => setImgSrc(item.fallbackImage)}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-900 via-transparent to-transparent opacity-80" />
        
        {/* Interactive indicator overlay on hover */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileHover={{ scale: 1, opacity: 1 }}
            className="w-12 h-12 rounded-full bg-gold-500 text-surface-950 flex items-center justify-center shadow-lg border border-gold-400"
          >
            <Maximize2 className="w-5 h-5" />
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between" style={{ transform: 'translateZ(30px)' }}>
        <div>
          <span className="text-[10px] uppercase font-semibold text-surface-500 block mb-1">
            {item.epoch}
          </span>
          <h3 className="font-display font-extrabold text-base sm:text-lg text-surface-100 leading-tight group-hover:text-gold-400 transition-colors duration-300 line-clamp-1">
            {item.name}
          </h3>
          <p className="text-xs text-surface-400 mt-2 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        </div>

        <div className="pt-4 border-t border-white/[0.04] flex items-center justify-between text-xs">
          <span className="text-surface-500 italic truncate max-w-[70%]">{item.origin}</span>
          <span className="font-bold text-gold-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            Explorer <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </motion.div>
  );
};

/* ─── Main Page Component ─── */
export default function PatrimoinePage() {
  const [filter, setFilter] = useState<'all' | 'tresors' | 'monuments'>('all');
  const [search, setSearch] = useState('');
  const [selectedItem, setSelectedItem] = useState<HeritageItem | null>(null);
  
  // 3D Orbital rotation simulations states for the inspection modal
  const [rotationY, setRotationY] = useState(0);
  const [rotationX, setRotationX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });

  const filteredItems = HERITAGE_ITEMS.filter((item) => {
    const matchesFilter = 
      filter === 'all' || 
      (filter === 'tresors' && item.category === 'tresor') ||
      (filter === 'monuments' && item.category === 'monument');
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) || 
                          item.description.toLowerCase().includes(search.toLowerCase()) ||
                          item.material.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Modal drag-to-rotate events
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    dragStartRef.current = { x: clientX, y: clientY };
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    const deltaX = clientX - dragStartRef.current.x;
    const deltaY = clientY - dragStartRef.current.y;
    
    setRotationY((prev) => (prev + deltaX * 0.8) % 360);
    setRotationX((prev) => Math.max(-45, Math.min(45, prev - deltaY * 0.8)));
    
    dragStartRef.current = { x: clientX, y: clientY };
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  // Reset rotations on modal change
  useEffect(() => {
    if (selectedItem) {
      setRotationY(0);
      setRotationX(0);
    }
  }, [selectedItem]);

  return (
    <div className="min-h-screen bg-transparent relative overflow-x-hidden flex flex-col justify-between">
      <Header />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 flex-1 w-full">
        
        {/* ═══ HERO HEADER ═══ */}
        <section className="text-center mb-12 sm:mb-16 mt-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-gold-500/10 border border-gold-500/20 text-yellow-300 mb-6"
          >
            <Compass className="w-3.5 h-3.5 mr-1 text-gold-400 animate-spin-slow" />
            Galerie Musée Interactive
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl xs:text-5xl sm:text-6xl font-display font-extrabold leading-[1.08] text-surface-100 mb-6"
          >
            Le Patrimoine & <br />
            <span className="bg-gradient-to-r from-gold-500 via-gold-300 to-gold-500 bg-clip-text text-transparent">Les Trésors du Bénin</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-surface-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-8"
          >
            Explorez virtuellement l'épopée culturelle béninoise. Manipulez les 26 œuvres d'art royal 
            restituées et les monuments majeurs de la Rupture grâce à notre visualiseur 3D.
          </motion.p>
        </section>

        {/* ═══ FILTER & SEARCH BAR ═══ */}
        <section className="mb-12 max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-4 p-4 rounded-3xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl shadow-lg">
          {/* Category Tabs */}
          <div className="flex bg-surface-950/60 p-1.5 rounded-2xl w-full sm:w-auto border border-white/[0.04]">
            <button
              onClick={() => setFilter('all')}
              className={`flex-1 sm:flex-none px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                filter === 'all' 
                  ? 'bg-gold-500 text-surface-950 shadow-glow-gold' 
                  : 'text-surface-400 hover:text-surface-200'
              }`}
            >
              Tous
            </button>
            <button
              onClick={() => setFilter('tresors')}
              className={`flex-1 sm:flex-none px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                filter === 'tresors' 
                  ? 'bg-gold-500 text-surface-950 shadow-glow-gold' 
                  : 'text-surface-400 hover:text-surface-200'
              }`}
            >
              Trésors
            </button>
            <button
              onClick={() => setFilter('monuments')}
              className={`flex-1 sm:flex-none px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                filter === 'monuments' 
                  ? 'bg-gold-500 text-surface-950 shadow-glow-gold' 
                  : 'text-surface-400 hover:text-surface-200'
              }`}
            >
              Monuments
            </button>
          </div>

          {/* Search box */}
          <div className="flex-1 w-full relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-surface-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher un trésor, roi, matière (bronze, bois)..."
              className="w-full bg-surface-950/50 hover:bg-surface-950/70 focus:bg-surface-950/90 text-sm rounded-2xl py-3 pl-12 pr-4 border border-white/[0.05] focus:border-gold-500/40 text-surface-200 placeholder-surface-600 outline-none transition-all"
            />
          </div>
        </section>

        {/* ═══ 3D GALLERY GRID ═══ */}
        <section className="mb-16">
          <AnimatePresence mode="popLayout">
            {filteredItems.length > 0 ? (
              <motion.div 
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
              >
                {filteredItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <HeritageCard item={item} onClick={() => setSelectedItem(item)} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16 p-8 rounded-3xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-md max-w-md mx-auto"
              >
                <div className="text-3xl mb-3">🏺</div>
                <h3 className="font-display font-bold text-surface-200 mb-1">Aucune œuvre trouvée</h3>
                <p className="text-xs text-surface-500">
                  Ajustez vos filtres ou termes de recherche pour explorer d'autres aspects de notre patrimoine.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </main>

      {/* ═══ INTERACTIVE 360° INSPECTION LIGHTBOX MODAL ═══ */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/92 backdrop-blur-xl"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 15, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative max-w-5xl w-full bg-surface-900 border border-white/[0.08] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row h-full max-h-[85vh] md:max-h-[75vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Decorative border matching flag colors */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-500 via-yellow-500 to-red-500 z-30" />

              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-surface-300 hover:text-white transition-colors flex items-center justify-center border border-white/10"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Left Side: 360° Drag Interactive Viewport */}
              <div 
                className="w-full md:w-[55%] bg-gradient-to-b from-black/80 to-surface-950 flex flex-col items-center justify-center relative min-h-[320px] md:min-h-0 p-6 select-none cursor-grab active:cursor-grabbing border-b md:border-b-0 md:border-r border-white/[0.08]"
                onMouseDown={handleDragStart}
                onMouseMove={handleDragMove}
                onMouseUp={handleDragEnd}
                onMouseLeave={handleDragEnd}
                onTouchStart={handleDragStart}
                onTouchMove={handleDragMove}
                onTouchEnd={handleDragEnd}
              >
                {/* 3D background grid */}
                <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" />

                {/* Rotating Glare Overlay */}
                <div 
                  className="absolute inset-0 pointer-events-none z-10 mix-blend-overlay opacity-30 transition-all"
                  style={{
                    background: `linear-gradient(${rotationY + 135}deg, transparent 40%, rgba(255,255,255,0.4) 50%, transparent 60%)`
                  }}
                />

                {/* Simulated 3D layer stack */}
                <div 
                  className="relative w-56 h-56 sm:w-72 sm:h-72 transition-transform duration-100 ease-out"
                  style={{
                    transform: `perspective(1000px) rotateY(${rotationY}deg) rotateX(${rotationX}deg)`,
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Shadow layer */}
                  <div 
                    className="absolute inset-x-8 bottom-0 h-4 bg-black/60 blur-md rounded-full transform translate-z-[-30px] scale-y-50 scale-x-90"
                    style={{
                      transform: `translateZ(-30px) rotateX(${90 - rotationX}deg)`
                    }}
                  />

                  {/* Base Glow aura */}
                  <div 
                    className={`absolute inset-0 rounded-full blur-[100px] opacity-20 pointer-events-none ${
                      selectedItem.category === 'tresor' ? 'bg-gold-500' : 'bg-emerald-500'
                    }`} 
                    style={{ transform: 'translateZ(-50px)' }}
                  />

                  {/* Main object image container */}
                  <div 
                    className="w-full h-full rounded-2xl overflow-hidden flex items-center justify-center p-2 transform translate-z-[10px]"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <img
                      src={selectedItem.image}
                      alt={selectedItem.name}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = selectedItem.fallbackImage;
                      }}
                      className="w-full h-full object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)] select-none pointer-events-none"
                    />
                  </div>

                  {/* Interactive 3D Depth Card Borders (Layered Box) */}
                  <div 
                    className="absolute inset-0 rounded-2xl border border-white/5 pointer-events-none transform translate-z-[20px]" 
                  />
                  <div 
                    className="absolute inset-4 rounded-2xl border border-gold-500/10 pointer-events-none transform translate-z-[30px]" 
                  />
                </div>

                {/* 360° drag instruction badge */}
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-black/60 border border-white/10 px-4 py-1.5 rounded-full flex items-center gap-2 text-[10px] text-surface-300 font-semibold tracking-wide backdrop-blur-md z-20">
                  <RotateCw className="w-3.5 h-3.5 text-gold-400 animate-spin-slow" />
                  <span>Faites glisser pour tourner en 3D</span>
                </div>
              </div>

              {/* Right Side: Information Panel */}
              <div className="w-full md:w-[45%] p-6 sm:p-8 flex flex-col justify-between overflow-y-auto bg-surface-950/90 backdrop-blur-2xl">
                
                {/* Scrollable details */}
                <div className="space-y-6">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-gold-400 block mb-1">
                      {selectedItem.category === 'tresor' ? 'Trésor Royal Restitué' : 'Patrimoine Public'}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-display font-extrabold text-surface-100 leading-tight">
                      {selectedItem.name}
                    </h3>
                  </div>

                  {/* Metadata grid */}
                  <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04]">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[9px] uppercase font-bold text-surface-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-gold-500/70" /> Époque
                      </span>
                      <span className="text-xs font-semibold text-surface-200">{selectedItem.epoch}</span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[9px] uppercase font-bold text-surface-500 flex items-center gap-1">
                        <Layers className="w-3 h-3 text-gold-500/70" /> Matière
                      </span>
                      <span className="text-xs font-semibold text-surface-200">{selectedItem.material}</span>
                    </div>
                    <div className="flex flex-col gap-0.5 col-span-2 pt-2 border-t border-white/[0.04]">
                      <span className="text-[9px] uppercase font-bold text-surface-500 flex items-center gap-1">
                        <Scale className="w-3 h-3 text-gold-500/70" /> Dimensions
                      </span>
                      <span className="text-xs font-semibold text-surface-200">{selectedItem.dimensions}</span>
                    </div>
                  </div>

                  {/* Description & Narrative */}
                  <div className="space-y-3">
                    <h4 className="text-[10px] uppercase font-bold text-surface-400 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                      Récit Historique :
                    </h4>
                    <p className="text-xs sm:text-sm text-surface-300 leading-relaxed font-normal">
                      {selectedItem.history}
                    </p>
                  </div>
                </div>

                {/* Call-to-actions */}
                <div className="pt-6 border-t border-white/[0.06] mt-6 flex flex-col gap-3">
                  <Link
                    href={`/chat?q=${encodeURIComponent(selectedItem.prompt)}`}
                    onClick={() => setSelectedItem(null)}
                    className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-xs rounded-xl transition-all duration-300 ease-out active:scale-[0.97] bg-gradient-to-br from-gold-500 to-gold-400 text-surface-950 shadow-[0_4px_16px_rgba(212,160,23,0.3)] hover:shadow-[0_6px_28px_rgba(212,160,23,0.5)] hover:-translate-y-[1px] w-full justify-center py-2.5"
                  >
                    Interroger l'IA sur cette œuvre
                    <MessageSquare className="w-3.5 h-3.5 ml-1" />
                  </Link>
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-xs rounded-xl transition-all duration-300 ease-out active:scale-[0.97] bg-white/5 text-yellow-300 border-[1.5px] border-gold-500/30 backdrop-blur-[8px] hover:bg-gold-500/10 hover:border-gold-500/50 w-full justify-center py-2.5"
                  >
                    Fermer l'inspection
                  </button>
                </div>

              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
