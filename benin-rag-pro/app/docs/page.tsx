'use client';

import { motion } from 'framer-motion';
import { BookOpen, Code, FileText, Users } from 'lucide-react';
import { Header } from '@components/Header';
import { Footer } from '@components/Footer';

const SECTIONS = [
  {
    title: 'Guide de Démarrage',
    icon: BookOpen,
    description: 'Apprenez les bases et lancez-vous rapidement',
    topics: ['Installation et configuration', 'Premiers pas', 'Interface utilisateur', 'Raccourcis clavier'],
  },
  {
    title: 'Documentation API',
    icon: Code,
    description: 'Intégrez AskBenin dans vos applications',
    topics: ['Endpoints REST', 'Authentification', 'Webhooks', 'Rate Limiting'],
  },
  {
    title: 'Tutoriels',
    icon: FileText,
    description: 'Guides pratiques étape par étape',
    topics: ['Utiliser le chat', 'Enregistrement audio', 'Historique et recherche', 'Exportation'],
  },
  {
    title: 'Communauté',
    icon: Users,
    description: "Connectez-vous avec d'autres utilisateurs",
    topics: ['Forum de discussion', 'Contribuer au projet', 'Signaler un bug', 'Demander une fonctionnalité'],
  },
];

const FAQS = [
  { q: 'Comment contribuer à la base de connaissance ?', a: 'Vous pouvez soumettre des corrections et des ajouts via notre plateforme GitHub.' },
  { q: 'AskBenin fonctionne-t-il hors ligne ?', a: "Non, AskBenin nécessite une connexion Internet pour accéder à la base de données et aux modèles d'IA." },
  { q: 'Mes données sont-elles sécurisées ?', a: 'Oui, nous utilisons le chiffrement SSL/TLS et sommes conformes au RGPD.' },
  { q: 'Puis-je utiliser AskBenin commercialement ?', a: "Oui, via notre plan Enterprise. Contactez-nous pour plus d'informations." },
];

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-transparent">
      <Header />

      <div className="relative z-10">
        {/* Hero */}
        <section className="pt-16 sm:pt-24 pb-12 px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center space-y-4"
          >
            <h1 className="text-4xl sm:text-6xl font-display font-bold text-surface-100">
              Documentation
            </h1>
            <p className="text-surface-400 text-base sm:text-xl max-w-xl mx-auto">
              Tout ce que vous devez savoir pour maîtriser AskBenin
            </p>
          </motion.div>
        </section>

        {/* Sections */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24">
          <div className="grid md:grid-cols-2 gap-5">
            {SECTIONS.map((section, i) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                viewport={{ once: true }}
                className="p-6 sm:p-8 rounded-2xl transition-all duration-300 relative overflow-hidden bg-white/[0.03] border border-gold-500/15 hover:border-gold-500/35 hover:shadow-[0_0_30px_rgba(212,160,23,0.08)]"
              >
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-gold-500 to-gold-700">
                    <section.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-display font-bold text-surface-100">{section.title}</h3>
                    <p className="text-sm text-surface-500">{section.description}</p>
                  </div>
                </div>
                <ul className="space-y-2.5">
                  {section.topics.map((topic) => (
                    <li key={topic}>
                      <a href="#" className="text-surface-400 hover:text-gold-400 transition-colors text-sm flex items-center gap-2 group">
                        <span className="text-gold-500/50 group-hover:text-gold-400 transition-colors">→</span>
                        {topic}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-surface-100 mb-3">FAQ</h2>
            <p className="text-surface-400">Réponses aux questions les plus fréquentes</p>
          </motion.div>

          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                viewport={{ once: true }}
                className="p-5 sm:p-6 rounded-2xl transition-all duration-300 bg-white/[0.04] border border-white/[0.08] backdrop-blur-[16px] hover:bg-white/[0.06] hover:border-white/[0.12] hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)]"
              >
                <h3 className="text-base font-semibold text-surface-200 mb-2">{faq.q}</h3>
                <p className="text-sm text-surface-400 leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
