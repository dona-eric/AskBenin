'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Code, FileText, Users } from 'lucide-react';
import Link from 'next/link';

const DOCUMENTATION_SECTIONS = [
  {
    title: 'Guide de Démarrage',
    icon: BookOpen,
    description: 'Apprenez les bases et lancez-vous rapidement',
    topics: [
      'Installation et configuration',
      'Premiers pas',
      'Interface utilisateur',
      'Raccourcis clavier',
    ],
  },
  {
    title: 'Documentation API',
    icon: Code,
    description: 'Intégrez AskBenin dans vos applications',
    topics: [
      'Endpoints REST',
      'Authentification',
      'Webhooks',
      'Rate Limiting',
    ],
  },
  {
    title: 'Tutoriels',
    icon: FileText,
    description: 'Guides pratiques étape par étape',
    topics: [
      'Utiliser le chat',
      'Enregistrement audio',
      'Historique et recherche',
      'Exportation de résultats',
    ],
  },
  {
    title: 'Communauté',
    icon: Users,
    description: 'Connectez-vous avec d\'autres utilisateurs',
    topics: [
      'Forum de discussion',
      'Contribuer au projet',
      'Signaler un bug',
      'Demander une fonctionnalité',
    ],
  },
];

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-benin-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-benin text-white py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center space-y-6"
        >
          <h1 className="text-5xl font-bold">Documentation</h1>
          <p className="text-xl text-benin-100">
            Tout ce que vous devez savoir pour maîtriser AskBenin
          </p>
        </motion.div>
      </section>

      {/* Documentation Sections */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12">
          {DOCUMENTATION_SECTIONS.map((section, i) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-8 border border-benin-200 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-gradient-benin p-3 rounded-lg">
                  <section.icon className="text-gold-300" size={28} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-benin-900">
                    {section.title}
                  </h3>
                  <p className="text-benin-600">{section.description}</p>
                </div>
              </div>

              <ul className="space-y-3">
                {section.topics.map((topic) => (
                  <li key={topic}>
                    <a
                      href="#"
                      className="text-benin-700 hover:text-gold-600 hover:translate-x-2 transition-all flex items-center gap-2"
                    >
                      <span className="text-gold-500">→</span>
                      {topic}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-benin-900 mb-4">Questions Fréquentes</h2>
          <p className="text-xl text-benin-600">
            Trouvez les réponses aux questions les plus communes
          </p>
        </motion.div>

        <div className="space-y-6">
          {[
            {
              q: 'Comment puis-je contribuer à la base de connaissance?',
              a: 'Vous pouvez soumettre des corrections et des ajouts via notre plateforme GitHub. Consultez la section Contribuer pour plus de détails.',
            },
            {
              q: 'AskBenin fonctionne-t-il hors ligne?',
              a: 'Non, AskBenin nécessite une connexion Internet pour accéder à la base de données et aux modèles d\'IA.',
            },
            {
              q: 'Mes données sont-elles sécurisées?',
              a: 'Oui, nous utilisons le chiffrement SSL/TLS et conforme à la RGPD. Consultez notre politique de confidentialité.',
            },
            {
              q: 'Puis-je utiliser AskBenin commercialement?',
              a: 'Oui, via notre plan Enterprise. Contactez-nous pour plus d\'informations.',
            },
          ].map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg border border-benin-200"
            >
              <h3 className="text-lg font-bold text-benin-900 mb-3">{faq.q}</h3>
              <p className="text-benin-600">{faq.a}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
