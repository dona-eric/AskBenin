'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Eye, Lock, Database } from 'lucide-react';

export default function PrivacyPage() {
  const sections = [
    {
      icon: Eye,
      title: 'Collecte de Données',
      content:
        'Nous collectons uniquement les données nécessaires pour améliorer votre expérience: requêtes, préférences, et données d\'utilisation. Aucune donnée personnelle identifiante n\'est vendues à des tiers.',
    },
    {
      icon: Lock,
      title: 'Sécurité des Données',
      content:
        'Vos données sont chiffrées en transit (SSL/TLS) et au repos. Nous utilisons une infrastructure sécurisée et conformes aux normes internationales.',
    },
    {
      icon: Database,
      title: 'Stockage',
      content:
        'Les données sont stockées sur des serveurs sécurisés situés en Afrique de l\'Ouest. Nous maintenons des sauvegardes régulières pour prévenir la perte de données.',
    },
    {
      icon: Shield,
      title: 'Droits de l\'Utilisateur',
      content:
        'Vous avez le droit d\'accès, de rectification et de suppression de vos données. Contactez-nous pour exercer ces droits conformément au RGPD.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-benin-50 to-white">
      {/* Hero */}
      <section className="bg-gradient-benin text-white py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center space-y-6"
        >
          <h1 className="text-5xl font-bold">Politique de Confidentialité</h1>
          <p className="text-xl text-benin-100">
            Votre vie privée est notre priorité
          </p>
        </motion.div>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-4 py-20 space-y-12">
        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="prose max-w-none"
        >
          <p className="text-lg text-benin-700 leading-relaxed">
            Cette Politique de Confidentialité explique comment AskBenin collecte, utilise,
            divulgue et protège vos informations. Elle s\'applique à notre site Web et à
            nos applications mobiles. Nous vous encourageons à lire cette politique
            attentivement.
          </p>
        </motion.div>

        {/* Key Sections */}
        <div className="grid md:grid-cols-2 gap-8">
          {sections.map((section, i) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-lg border border-benin-200"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-gold-100 p-3 rounded-lg">
                  <section.icon className="text-gold-600" size={24} />
                </div>
                <h3 className="text-xl font-bold text-benin-900">{section.title}</h3>
              </div>
              <p className="text-benin-600">{section.content}</p>
            </motion.div>
          ))}
        </div>

        {/* Detailed Policy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div>
            <h2 className="text-3xl font-bold text-benin-900 mb-4">Détails Complets</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-benin-800 mb-3">
                  1. Types de Données Collectées
                </h3>
                <ul className="space-y-2 text-benin-700 ml-4">
                  <li>• Informations de connexion (email, nom d\'utilisateur)</li>
                  <li>• Requêtes et questions posées</li>
                  <li>• Données d\'utilisation et accès</li>
                  <li>• Données de localisation (optionnel)</li>
                  <li>• Cookies et identifiants de session</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-benin-800 mb-3">
                  2. Utilisation des Données
                </h3>
                <ul className="space-y-2 text-benin-700 ml-4">
                  <li>• Fournir et améliorer nos services</li>
                  <li>• Personnaliser votre expérience</li>
                  <li>• Analyser l\'utilisation et l\'engagement</li>
                  <li>• Détecter et prévenir la fraude</li>
                  <li>• Vous contacter avec des mises à jour</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-benin-800 mb-3">
                  3. Partage des Données
                </h3>
                <p className="text-benin-700 mb-2">
                  Nous ne partageons vos données que:
                </p>
                <ul className="space-y-2 text-benin-700 ml-4">
                  <li>• Avec votre consentement explicite</li>
                  <li>• Aux prestataires de service (hébergement, analyses)</li>
                  <li>• Lorsque requis par la loi</li>
                  <li>• En cas de fusion ou acquisition</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-benin-800 mb-3">
                  4. Rétention des Données
                </h3>
                <p className="text-benin-700">
                  Nous conservons vos données aussi longtemps que nécessaire pour fournir
                  nos services et respecter les obligations légales. Vous pouvez demander
                  la suppression de vos données à tout moment.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-benin-800 mb-3">
                  5. Vos Droits
                </h3>
                <p className="text-benin-700 mb-2">Conformément au RGPD, vous avez le droit de:</p>
                <ul className="space-y-2 text-benin-700 ml-4">
                  <li>• Accéder à vos données personnelles</li>
                  <li>• Corriger les informations inexactes</li>
                  <li>• Demander la suppression (droit à l\'oubli)</li>
                  <li>• Obtenir une copie de vos données</li>
                  <li>• Retirer votre consentement</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-benin-800 mb-3">
                  6. Contact
                </h3>
                <p className="text-benin-700">
                  Pour toute question concernant cette politique, veuillez nous contacter à:{' '}
                  <a href="mailto:privacy@askbenin.com" className="text-gold-600 hover:text-gold-700">
                    privacy@askbenin.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Last Updated */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center pt-12 border-t border-benin-200"
        >
          <p className="text-benin-500 text-sm">
            Dernière mise à jour: 2 avril 2026
          </p>
        </motion.div>
      </section>
    </div>
  );
}
