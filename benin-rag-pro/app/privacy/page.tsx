'use client';

import { motion } from 'framer-motion';
import { Shield, Eye, Lock, Database } from 'lucide-react';
import { Header } from '@components/Header';
import { Footer } from '@components/Footer';

const SECTIONS = [
  {
    icon: Eye,
    title: 'Collecte de Données',
    content: "Nous collectons uniquement les données nécessaires pour améliorer votre expérience : requêtes, préférences et données d'utilisation. Aucune donnée personnelle identifiante n'est vendue à des tiers.",
  },
  {
    icon: Lock,
    title: 'Sécurité des Données',
    content: 'Vos données sont chiffrées en transit (SSL/TLS) et au repos. Nous utilisons une infrastructure sécurisée conforme aux normes internationales.',
  },
  {
    icon: Database,
    title: 'Stockage',
    content: "Les données sont stockées sur des serveurs sécurisés situés en Afrique de l'Ouest. Nous maintenons des sauvegardes régulières pour prévenir la perte de données.",
  },
  {
    icon: Shield,
    title: "Droits de l'Utilisateur",
    content: "Vous avez le droit d'accès, de rectification et de suppression de vos données. Contactez-nous pour exercer ces droits conformément au RGPD.",
  },
];

const DETAILS = [
  {
    title: '1. Types de Données Collectées',
    items: ["Informations de connexion (email, nom d'utilisateur)", 'Requêtes et questions posées', "Données d'utilisation et accès", 'Données de localisation (optionnel)', 'Cookies et identifiants de session'],
  },
  {
    title: '2. Utilisation des Données',
    items: ['Fournir et améliorer nos services', 'Personnaliser votre expérience', "Analyser l'utilisation et l'engagement", 'Détecter et prévenir la fraude', 'Vous contacter avec des mises à jour'],
  },
  {
    title: '3. Partage des Données',
    intro: 'Nous ne partageons vos données que :',
    items: ['Avec votre consentement explicite', 'Aux prestataires de service (hébergement, analyses)', 'Lorsque requis par la loi', 'En cas de fusion ou acquisition'],
  },
  {
    title: '4. Rétention des Données',
    text: 'Nous conservons vos données aussi longtemps que nécessaire pour fournir nos services et respecter les obligations légales. Vous pouvez demander la suppression de vos données à tout moment.',
  },
  {
    title: '5. Vos Droits',
    intro: 'Conformément au RGPD, vous avez le droit de :',
    items: ['Accéder à vos données personnelles', 'Corriger les informations inexactes', "Demander la suppression (droit à l'oubli)", 'Obtenir une copie de vos données', 'Retirer votre consentement'],
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-surface-950">
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
              Confidentialité
            </h1>
            <p className="text-surface-400 text-base sm:text-xl max-w-xl mx-auto">
              Votre vie privée est notre priorité
            </p>
          </motion.div>
        </section>

        <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24 space-y-10">
          {/* Intro */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-surface-400 text-base sm:text-lg leading-relaxed"
          >
            Cette Politique de Confidentialité explique comment AskBenin collecte, utilise,
            divulgue et protège vos informations. Elle s'applique à notre site Web et à
            nos applications.
          </motion.p>

          {/* Key sections */}
          <div className="grid md:grid-cols-2 gap-4 sm:gap-5">
            {SECTIONS.map((section, i) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl transition-all duration-300 relative overflow-hidden bg-white/[0.03] border border-gold-500/15 hover:border-gold-500/35 hover:shadow-[0_0_30px_rgba(212,160,23,0.08)]"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gold-500/10 border border-gold-500/20">
                    <section.icon className="w-5 h-5 text-gold-400" />
                  </div>
                  <h3 className="text-base font-display font-bold text-surface-100">{section.title}</h3>
                </div>
                <p className="text-sm text-surface-400 leading-relaxed">{section.content}</p>
              </motion.div>
            ))}
          </div>

          {/* Detailed sections */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-6 pt-4"
          >
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-surface-100">Détails Complets</h2>

            {DETAILS.map((detail, i) => (
              <motion.div
                key={detail.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                viewport={{ once: true }}
                className="p-5 sm:p-6 rounded-2xl transition-all duration-300 bg-white/[0.04] border border-white/[0.08] backdrop-blur-[16px] hover:bg-white/[0.06] hover:border-white/[0.12] hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)]"
              >
                <h3 className="text-lg font-display font-bold text-surface-200 mb-3">{detail.title}</h3>
                {detail.intro && <p className="text-sm text-surface-400 mb-2">{detail.intro}</p>}
                {detail.text && <p className="text-sm text-surface-400 leading-relaxed">{detail.text}</p>}
                {detail.items && (
                  <ul className="space-y-1.5">
                    {detail.items.map((item) => (
                      <li key={item} className="text-sm text-surface-400 flex items-start gap-2">
                        <span className="text-gold-500/50 mt-1">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}

            {/* Contact */}
            <div className="p-5 sm:p-6 rounded-2xl transition-all duration-300 bg-white/[0.04] border border-white/[0.08] backdrop-blur-[16px] hover:bg-white/[0.06] hover:border-white/[0.12] hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)]">
              <h3 className="text-lg font-display font-bold text-surface-200 mb-3">6. Contact</h3>
              <p className="text-sm text-surface-400">
                Pour toute question concernant cette politique, contactez-nous à{' '}
                <a href="mailto:privacy@askbenin.com" className="text-gold-400 hover:text-gold-300 underline underline-offset-2 transition-colors">
                  privacy@askbenin.com
                </a>
              </p>
            </div>
          </motion.div>

          {/* Last updated */}
          <div className="h-[1px] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
          <p className="text-center text-surface-600 text-xs">
            Dernière mise à jour : 2 avril 2026
          </p>
        </section>
      </div>

      <Footer />
    </div>
  );
}
