'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe, ShieldCheck, Briefcase, FileText,
  CreditCard, MapPin, Phone, Mail, ArrowRight,
  MessageSquare, ExternalLink, ChevronDown, ChevronUp, Info
} from 'lucide-react';
import { Header } from '@components/Header';
import { Footer } from '@components/Footer';
import Link from 'next/link';

// === Administrative/Consular Guides Data ===
const CONSULAR_GUIDES = [
  {
    id: 'passport',
    title: 'Passeport Électronique Biométrique',
    description: 'Demande initiale ou renouvellement de passeport biométrique béninois depuis l\'étranger.',
    steps: [
      'Créer un compte sur le portail national des services publics (service-public.bj).',
      'Remplir en ligne le formulaire de demande de passeport en choisissant le mode de dépôt "Consulat/Ambassade".',
      'Payer les frais de dossier officiels de 30 000 FCFA (environ 46 €) par les moyens de paiement en ligne autorisés.',
      'Prendre rendez-vous auprès de la représentation consulaire béninoise la plus proche pour l\'enrôlement biométrique (empreintes et photo).',
      'Suivre l\'avancement de la production et retirer le passeport physique au consulat ou à l\'ambassade (délai moyen de 3 à 6 semaines).'
    ],
    documents: [
      'Acte de naissance sécurisé ou copie de l\'acte de naissance sécurisé délivré par l\'ANIP.',
      'Certificat d\'Identification Personnelle (CIP) ou carte d\'identité nationale biométrique.',
      'Copie de l\'ancien passeport (en cas de renouvellement).',
      'Justificatif de séjour régulier dans le pays d\'accueil (titre de séjour ou visa).',
      'Justificatif de domicile récent à l\'étranger (facture d\'électricité, quittance de loyer).',
      'Preuve d\'activité professionnelle (fiche de paie, attestation de travail) ou certificat de scolarité.'
    ],
    officialLink: 'https://epasseport.service-public.bj/'
  },
  {
    id: 'consular-card',
    title: 'Carte Consulaire Électronique',
    description: 'Enregistrement obligatoire auprès de votre ambassade pour l\'assistance administrative, la protection consulaire et le vote.',
    steps: [
      'Se connecter au portail consulaire officiel en ligne ou se rendre physiquement à l\'ambassade.',
      'Remplir le formulaire complet de recensement de la diaspora béninoise avec vos coordonnées locales.',
      'Téléverser les justificatifs d\'identité et de séjour requis.',
      'Après validation par les services consulaires, la carte consulaire est délivrée sous format physique ou numérique (validité de 3 ans).'
    ],
    documents: [
      'Passeport béninois en cours de validité ou Carte Nationale d\'Identité Biométrique.',
      'Titre de séjour en cours de validité dans le pays de résidence ou passeport du pays d\'accueil.',
      'Justificatif de domicile récent dans la circonscription consulaire.',
      'Deux photos d\'identité récentes aux normes consulaires.'
    ],
    officialLink: 'https://service-public.bj/'
  },
  {
    id: 'civil-status',
    title: 'Actes d\'État Civil & Transcription',
    description: 'Transcription d\'actes transfrontaliers (mariage, naissance à l\'étranger) et mise en conformité à l\'état civil béninois.',
    steps: [
      'Soumettre le dossier de demande de transcription à la section consulaire de l\'Ambassade couvrant votre lieu de résidence.',
      'L\'Ambassade transmet l\'acte transcrit à la mairie de naissance au Bénin ou au registre central.',
      'Demander parallèlement le rattachement de l\'acte au registre d\'identification de l\'ANIP pour sécuriser le statut de l\'enfant ou du conjoint.'
    ],
    documents: [
      'Copie intégrale originale de l\'acte d\'état civil étranger, dûment légalisé ou apostillé.',
      'Preuve de la nationalité béninoise des parents (passeport, certificat de nationalité ou carte nationale).',
      'Actes de naissance béninois sécurisés des parents (ANIP).',
      'Formulaire de demande de transcription dûment rempli et signé.'
    ],
    officialLink: 'https://service-public.bj/'
  },
  {
    id: 'evisa',
    title: 'E-Visa (Visa Électronique d\'Entrée)',
    description: 'Demande en ligne simplifiée de visa pour les proches, collaborateurs ou investisseurs étrangers devant se rendre au Bénin.',
    steps: [
      'Accéder au portail officiel des demandes de visa électronique du gouvernement (evisa.gouv.bj).',
      'Sélectionner le type de visa requis (court séjour 30 jours, long séjour 90 jours, entrée unique ou entrées multiples).',
      'Saisir les informations d\'identité, de voyage et téléverser la page d\'identité de votre passeport.',
      'Effectuer le paiement sécurisé des frais consulaires en ligne par carte bancaire.',
      'Recevoir le document d\'autorisation e-Visa par courriel sous un délai garanti de 24 à 48 heures.'
    ],
    documents: [
      'Passeport valide au moins 6 mois après la date de retour prévue.',
      'Page d\'information du passeport contenant la photo et les données d\'identité scannée de façon lisible.',
      'Billet d\'avion aller-retour confirmé.',
      'Adresse de résidence ou d\'hébergement prévue au Bénin.'
    ],
    officialLink: 'https://evisa.gouv.bj/'
  },
  {
    id: 'cip-anip',
    title: 'Certificat d\'Identification Personnelle (CIP) / Actes ANIP',
    description: 'Obtention du CIP et d\'actes de naissance sécurisés en ligne via la plateforme d\'identification biométrique nationale (RAVIP).',
    steps: [
      'Se rendre sur le portail e-services officiel de l\'ANIP (eservices.anip.bj).',
      'Créer ou se connecter à votre espace citoyen sécurisé.',
      'Introduire votre numéro RAVIP (Reçu d\'enrôlement au Recensement Administratif à Vocation d\'Identification de la Population).',
      'Remplir la demande pour l\'acte désigné (CIP, Acte de Naissance Sécurisé, Certificat de Célibat).',
      'Payer les frais administratifs en ligne et télécharger l\'acte officiel signé électroniquement avec QR Code.'
    ],
    documents: [
      'Récépissé d\'enrôlement RAVIP ou ancien numéro d\'acte de naissance non sécurisé.',
      'Copie d\'une pièce d\'identité valide pour la vérification.',
      'Numéro de téléphone portable configuré pour recevoir le code de validation OTP.'
    ],
    officialLink: 'https://eservices.anip.bj/'
  }
];

// === Investment & Real Estate Opportunities Data ===
const INVESTMENT_OPPORTUNITIES = [
  {
    icon: ShieldCheck,
    title: 'Achat de Terrains & Immobilier',
    badge: 'Sécurisé par l\'État',
    description: 'Sécurisez vos investissements fonciers au Bénin et évitez les litiges grâce aux outils de l\'ANDF.',
    details: [
      'Vérification cadastrale obligatoire auprès de l\'ANDF (cadastre.bj).',
      'Signature obligatoire de l\'acte devant un Notaire béninois agréé.',
      'Obtention facilitée du Titre Foncier (TF) ou de l\'Attestation de Détention Coutumière (ADC).',
      'Enregistrement centralisé sur le Guichet Unique de l\'ANDF.'
    ],
    link: '/chat?q=Comment%20acheter%20un%20terrain%20au%20B%C3%A9nin%20en%20toute%20s%C3%A9curit%C3%A9%20?'
  },
  {
    icon: Briefcase,
    title: 'Création d\'Entreprise (Guichet Unique APIEx)',
    badge: 'Création en 2h',
    description: 'Lancez votre startup, filiale ou entreprise au Bénin à distance en ligne en un temps record.',
    details: [
      'Création 100% en ligne via le guichet unique monentreprise.bj.',
      'Exonérations fiscales significatives et régimes douaniers préférentiels.',
      'Accès direct aux services de promotion des investissements (APIEx).',
      'Option de rédaction de statuts types sans frais de notaire obligatoires.'
    ],
    link: '/chat?q=Quelles%20sont%20les%20d%C3%A9marches%20pour%20cr%C3%A9er%20une%20entreprise%20au%20B%C3%A9nin%20?'
  },
  {
    icon: CreditCard,
    title: 'Comptes Bancaires & Financement',
    badge: 'Services Dédiés',
    description: 'Accédez à des solutions de transfert, d\'épargne et de crédit immobilier adaptées à la diaspora.',
    details: [
      'Comptes en devises (Euro/Dollar) non soumis au contrôle des changes local.',
      'Crédit immobilier diaspora pour financer vos constructions au pays.',
      'Solutions de transfert de fonds sécurisées en partenariat avec les banques locales.',
      'Placement de bons du Trésor public avec des rendements attractifs.'
    ],
    link: '/chat?q=Quelles%20banques%20proposent%20des%20comptes%20d%C3%A9di%C3%A9s%20%C3%A0%20la%20diaspora%20b%C3%A9ninoise%20?'
  },
  {
    icon: Globe,
    title: 'Innovation & Hub Sèmè City',
    badge: 'Hub Technologique',
    description: 'Saisissez les opportunités offertes par la Cité Internationale de l\'Innovation et du Savoir.',
    details: [
      'Incubateurs et accélérateurs de start-ups innovantes (Sèmè City).',
      'Appels à projets thématiques ("Made in Africa", technologies vertes).',
      'Programmes de recherche scientifique et de bourses de co-développement.',
      'Espaces de co-working et FabLabs équipés pour les entrepreneurs.'
    ],
    link: '/chat?q=Quels%20sont%20les%20programmes%20et%20opportunit%C3%A9s%20offerts%20par%20S%C3%A8m%C3%A8%20City%20%C3%A0%20la%20diaspora%20?'
  },
  {
    icon: Briefcase,
    title: 'Emploi & Dispositifs ANPE',
    badge: 'Insertion Talents',
    description: 'Programmes d\'insertion des compétences de la diaspora dans l\'écosystème économique béninois.',
    details: [
      'Accès au portail national de l\'emploi (anpe.bj) pour recruter ou postuler.',
      'Programme d\'Appui à l\'Emploi Indépendant (PAEI) pour l\'entrepreneuriat.',
      'Accompagnement à la réinstallation professionnelle au Bénin.',
      'Cartographie des besoins en compétences dans les secteurs prioritaires.'
    ],
    link: '/chat?q=Comment%20l\'ANPE%20accompagne-t-elle%20les%20talents%20de%20la%20diaspora%20pour%20travailler%20au%20B%C3%A9nin%20?'
  },
  {
    icon: ShieldCheck,
    title: 'Programmes PME & Mentorat (MPME)',
    badge: 'Appui Fiscal',
    description: 'Bénéficiez du soutien du Ministère des Petites et Moyennes Entreprises pour co-investir au Bénin.',
    details: [
      'Incitations fiscales spéciales pour les PME créées par les Béninois de l\'extérieur.',
      'Lignes de garantie et co-financements pour projets industriels et agricoles.',
      'Réseaux de mentorat d\'affaires en liaison avec la Chambre de Commerce (CCI Bénin).',
      'Participation prioritaire aux forums économiques d\'investissement nationaux.'
    ],
    link: '/chat?q=Quelles%20sont%20les%20aides%20et%20programmes%20du%20minist%C3%A8re%20des%20PME%20pour%20les%20investisseurs%20de%20la%20diaspora%20?'
  }
];

interface EmbassyInfo {
  name: string;
  address: string;
  phone: string;
  email: string;
  web?: string;
}

// === Consulate & Embassy Directory ===
const EMBASSIES: Record<'europe' | 'america' | 'africa', EmbassyInfo[]> = {
  europe: [
    { name: 'Ambassade du Bénin en France & Consulat Général (Paris)', address: '87 Avenue Victor Hugo, 75116 Paris', phone: '+33 1 45 00 98 82', email: 'ambassade.paris@gouv.bj', web: 'https://ambassade-benin.org' },
    { name: 'Ambassade du Bénin en Belgique (Bruxelles)', address: 'Avenue de l\'Observatoire 3, 1180 Uccle', phone: '+32 2 374 91 92', email: 'ambassade.bruxelles@gouv.bj', web: 'https://ambassadebenin.be' },
    { name: 'Ambassade du Bénin en Allemagne (Berlin)', address: 'Englerallee 23, 14195 Berlin', phone: '+49 30 236 08 30', email: 'ambassade.berlin@gouv.bj', web: 'https://ambassade-benin.de' }
  ],
  america: [
    { name: 'Ambassade du Bénin aux États-Unis (Washington D.C.)', address: '2124 Kalorama Rd NW, Washington, DC 20008', phone: '+1 202-232-6655', email: 'ambassade.washington@gouv.bj', web: 'https://www.beninembassy.us' },
    { name: 'Ambassade du Bénin au Canada (Ottawa)', address: '215 McLeod St, Ottawa, ON K2P 0Z8', phone: '+1 613-233-4429', email: 'ambassade.ottawa@gouv.bj', web: 'https://ambassadebenin.ca' }
  ],
  africa: [
    { name: 'Consulat Général du Bénin au Nigéria (Lagos)', address: '4 Adetokunbo Ademola St, Victoria Island, Lagos', phone: '+234 1 270 2486', email: 'consulat.lagos@gouv.bj' },
    { name: 'Ambassade du Bénin au Sénégal (Dakar)', address: 'Fann Résidence, Rue F, Dakar', phone: '+221 33 825 58 25', email: 'ambassade.dakar@gouv.bj' },
    { name: 'Ambassade du Bénin en Côte d\'Ivoire (Abidjan)', address: 'Cocody Ambassades, Rue des Ambassadeurs, Abidjan', phone: '+225 27 22 44 20 30', email: 'ambassade.abidjan@gouv.bj' }
  ]
};

// === Quick Chat Prompts ===
const QUICK_PROMPTS = [
  { text: 'Comment renouveler mon passeport depuis la France ?', url: '/chat?q=Comment%20renouveler%20mon%20passeport%20b%C3%A9ninois%20depuis%20la%20France%20?' },
  { text: 'Quelles sont les démarches pour sécuriser l\'achat d\'un terrain au Bénin ?', url: '/chat?q=Quelles%20sont%20les%20d%C3%A9marches%20pour%20s%C3%A9curiser%20l\'achat%20d\'un%20terrain%20au%20B%C3%A9nin%20?' },
  { text: 'Puis-je voter aux élections béninoises depuis l\'étranger ?', url: '/chat?q=Comment%20la%20diaspora%20peut-elle%20voter%20aux%20%C3%A9lections%20b%C3%A9ninoises%20depuis%20l\'%C3%A9tranger%20?' },
  { text: 'Quels projets agricoles sont soutenus par l\'État pour la diaspora ?', url: '/chat?q=Quels%20projets%20agricoles%20sont%20soutenus%20par%20l\'%C3%89tat%20pour%20la%20diaspora%20b%C3%A9ninoise%20?' }
];

// === Government Services & Departments Data ===
const GOV_SERVICES = [
  {
    name: 'Portail National des Services Publics',
    url: 'https://service-public.bj/',
    desc: 'Guichet unique d\'accès à plus de 250 services administratifs dématérialisés béninois (Casier judiciaire, actes, attestations).',
    badge: 'Centralisé'
  },
  {
    name: 'Direction Générale des Impôts (DGI)',
    url: 'https://e-services.impots.bj/',
    desc: 'Plateforme e-Services de télédéclaration et télépaiement de vos taxes foncières, impôts professionnels et taxes sur salaire.',
    badge: 'Fiscalité'
  },
  {
    name: 'Agence Nationale du Domaine et du Foncier (ANDF)',
    url: 'https://www.cadastre.bj/',
    desc: 'Consultation du cadastre national en ligne pour vérifier la situation géographique et juridique des parcelles foncières.',
    badge: 'Foncier'
  },
  {
    name: 'Caisse Nationale de Sécurité Sociale (CNSS)',
    url: 'http://cnss.bj/',
    desc: 'Suivi de vos déclarations nominatives de cotisations sociales et démarches d\'affiliation de vos salariés locaux.',
    badge: 'Sécurité Sociale'
  },
  {
    name: 'Guichet Unique de Création d\'Entreprise',
    url: 'https://www.monentreprise.bj/',
    desc: 'Formalités complètes de création d\'entreprise (RCCM, IFU, déclaration d\'établissement) en moins de 2 heures.',
    badge: 'Entreprendre'
  },
  {
    name: 'Ministère des Affaires Étrangères et de la Coopération',
    url: 'https://diplomatie.gouv.bj/',
    desc: 'Informations consulaires officielles, voyages, visas, accréditations diplomatiques et liens avec la diaspora.',
    badge: 'Diplomatie'
  }
];

export default function DiasporaPage() {
  const [activeTab, setActiveTab] = useState<'europe' | 'america' | 'africa'>('europe');
  const [openGuideId, setOpenGuideId] = useState<string | null>(null);

  const toggleGuide = (id: string) => {
    setOpenGuideId(openGuideId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-surface-950 relative overflow-hidden">
      <Header />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        
        {/* ═══ HERO HEADER ═══ */}
        <section className="text-center mb-16 sm:mb-24 mt-4 sm:mt-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-gold-500/10 border border-gold-500/20 text-yellow-300 mb-6"
          >
            <Globe className="w-3.5 h-3.5 mr-1 text-gold-400" />
            Espace Citoyens du Monde
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl xs:text-5xl sm:text-6xl lg:text-7xl font-display font-extrabold leading-[1.08] text-surface-100 mb-6"
          >
            Portail de la <br />
            <span className="bg-gradient-to-r from-gold-500 via-gold-300 to-gold-500 bg-clip-text text-transparent">Diaspora Béninoise</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-surface-400 text-base sm:text-xl max-w-3xl mx-auto leading-relaxed mb-8"
          >
            Conservez un lien fort avec la patrie. Accédez à vos démarches consulaires, 
            explorez les investissements sécurisés par l'État, et obtenez de l'aide en temps réel.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <a href="#consular" className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-sm rounded-xl transition-all duration-300 ease-out active:scale-[0.97] bg-gradient-to-br from-gold-500 to-gold-400 text-surface-950 shadow-[0_4px_16px_rgba(212,160,23,0.3)] hover:shadow-[0_6px_28px_rgba(212,160,23,0.5)] hover:-translate-y-[1px]">
              Démarches Administratives
              <ArrowRight className="w-4.5 h-4.5" />
            </a>
            <Link href="/chat?q=Comment%20la%20diaspora%20peut-elle%20investir%20au%20B%C3%A9nin%20?" className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-sm rounded-xl transition-all duration-300 ease-out active:scale-[0.97] bg-white/5 text-yellow-300 border-[1.5px] border-gold-500/30 backdrop-blur-[8px] hover:bg-gold-500/10 hover:border-gold-500/50">
              Poser une question diaspora
              <MessageSquare className="w-4.5 h-4.5" />
            </Link>
          </motion.div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-16 p-6 sm:p-8 rounded-2xl transition-all duration-300 bg-white/[0.04] border border-white/[0.08] backdrop-blur-[16px] hover:bg-white/[0.06] hover:border-white/[0.12] hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)]"
          >
            <div>
              <p className="text-2xl sm:text-3xl font-display font-bold text-gold-400">1.5M +</p>
              <p className="text-xs sm:text-sm text-surface-500 font-medium">Béninois à l'étranger</p>
            </div>
            <div className="border-l border-white/[0.06] pl-4">
              <p className="text-2xl sm:text-3xl font-display font-bold text-emerald-400">100%</p>
              <p className="text-xs sm:text-sm text-surface-500 font-medium">Démarches en ligne</p>
            </div>
            <div className="border-l border-white/[0.06] pl-4">
              <p className="text-2xl sm:text-3xl font-display font-bold text-gold-400">2h</p>
              <p className="text-xs sm:text-sm text-surface-500 font-medium">Création d'entreprise</p>
            </div>
            <div className="border-l border-white/[0.06] pl-4">
              <p className="text-2xl sm:text-3xl font-display font-bold text-emerald-400">20+</p>
              <p className="text-xs sm:text-sm text-surface-500 font-medium">Consulats & Ambassades</p>
            </div>
          </motion.div>
        </section>

        {/* ═══ INTERACTIVE CONSULAR GUIDES ═══ */}
        <section id="consular" className="py-12 border-t border-white/[0.04]">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-surface-100 mb-3">
              Guides Consulaires & Démarches
            </h2>
            <p className="text-surface-400 text-sm sm:text-base max-w-xl mx-auto">
              Retrouvez les instructions détaillées pour vos pièces d'identité et statuts officiels.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {CONSULAR_GUIDES.map((guide) => {
              const isOpen = openGuideId === guide.id;
              return (
                <div
                  key={guide.id}
                  className="overflow-hidden border border-white/[0.08] hover:border-gold-500/20 transition-all duration-300 rounded-2xl bg-white/[0.04] backdrop-blur-[16px] hover:bg-white/[0.06] hover:border-white/[0.12] hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)]"
                >
                  <button
                    onClick={() => toggleGuide(guide.id)}
                    className="w-full flex items-center justify-between p-5 sm:p-6 text-left focus:outline-none"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center flex-shrink-0 border border-gold-500/20">
                        <FileText className="w-5 h-5 text-gold-400" />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-base sm:text-lg text-surface-200">
                          {guide.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-surface-400 mt-1">
                          {guide.description}
                        </p>
                      </div>
                    </div>
                    <div className="text-surface-400 ml-4">
                      {isOpen ? <ChevronUp className="w-5 h-5 text-gold-400" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-5 pb-6 sm:px-6 border-t border-white/[0.04] pt-5 space-y-5 bg-white/[0.01]">
                          
                          {/* Steps */}
                          <div>
                            <h4 className="text-xs font-semibold uppercase tracking-wider text-gold-400/90 mb-3 flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                              Étapes de Demande
                            </h4>
                            <ol className="space-y-2.5">
                              {guide.steps.map((step, index) => (
                                <li key={index} className="flex gap-3 text-sm text-surface-300">
                                  <span className="font-bold text-gold-500/80 flex-shrink-0 w-5">
                                    0{index + 1}.
                                  </span>
                                  <span>{step}</span>
                                </li>
                              ))}
                            </ol>
                          </div>

                          {/* Documents */}
                          <div className="p-4 rounded-xl bg-surface-900/60 border border-white/[0.04]">
                            <h4 className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-3 flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                              Documents Requis
                            </h4>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                              {guide.documents.map((doc, index) => (
                                <li key={index} className="flex items-start gap-2 text-xs text-surface-400">
                                  <span className="text-emerald-500/70 mt-0.5">•</span>
                                  <span>{doc}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Action links */}
                          <div className="flex flex-col sm:flex-row gap-3 pt-2">
                            <a
                              href={guide.officialLink}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-2 px-5 py-2.5 font-semibold text-xs rounded-xl transition-all duration-300 ease-out active:scale-[0.97] bg-gradient-to-br from-gold-500 to-gold-400 text-surface-950 shadow-[0_4px_16px_rgba(212,160,23,0.3)] hover:shadow-[0_6px_28px_rgba(212,160,23,0.5)] hover:-translate-y-[1px] justify-center"
                            >
                              Accéder au Portail Officiel
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                            <Link
                              href={`/chat?q=D%C3%A9taille-moi%20la%20proc%C3%A9dure%20pour%20la%20demande%20de%20:${encodeURIComponent(guide.title)}`}
                              className="inline-flex items-center gap-2 px-5 py-2.5 font-semibold text-xs rounded-xl transition-all duration-300 ease-out active:scale-[0.97] bg-white/5 text-yellow-300 border-[1.5px] border-gold-500/30 backdrop-blur-[8px] hover:bg-gold-500/10 hover:border-gold-500/50 justify-center"
                            >
                              Poser des questions sur cette démarche
                              <MessageSquare className="w-3.5 h-3.5" />
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

        {/* ═══ INVESTMENT & SECURED REAL ESTATE ═══ */}
        <section className="py-16 border-t border-white/[0.04]">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-surface-100 mb-3">
              Investissement & Foncier Sécurisé
            </h2>
            <p className="text-surface-400 text-sm sm:text-base max-w-xl mx-auto">
              Le Bénin se transforme. Investissez en toute sérénité avec des procédures transparentes.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {INVESTMENT_OPPORTUNITIES.map((opp, idx) => {
              const Icon = opp.icon;
              return (
                <motion.div
                  key={opp.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="p-6 sm:p-8 flex flex-col justify-between hover:border-gold-500/40 group rounded-2xl transition-all duration-300 relative overflow-hidden bg-white/[0.03] border border-gold-500/15 hover:border-gold-500/35 hover:shadow-[0_0_30px_rgba(212,160,23,0.08)]"
                >
                  <div>
                    <div className="flex justify-between items-start mb-5">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold-500 to-gold-700 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[10px] uppercase font-semibold tracking-wider">
                        {opp.badge}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-lg text-surface-100 mb-3">
                      {opp.title}
                    </h3>
                    <p className="text-sm text-surface-400 mb-6 leading-relaxed">
                      {opp.description}
                    </p>

                    <h4 className="text-xs font-semibold uppercase tracking-wider text-gold-400/80 mb-3">
                      Points Clés :
                    </h4>
                    <ul className="space-y-2 mb-8">
                      {opp.details.map((detail, dIdx) => (
                        <li key={dIdx} className="flex gap-2 text-xs text-surface-300">
                          <span className="text-gold-500/70 font-semibold">•</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link href={opp.link} className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-xs rounded-xl transition-all duration-300 ease-out active:scale-[0.97] bg-white/5 text-yellow-300 border-[1.5px] border-gold-500/30 backdrop-blur-[8px] hover:bg-gold-500/10 hover:border-gold-500/50 !w-full justify-center">
                    Consulter l'assistant RAG
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ═══ GOVERNMENT SERVICES & PORTALS ═══ */}
        <section className="py-16 border-t border-white/[0.04]">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-surface-100 mb-3">
              Portails & Services Officiels de l'État
            </h2>
            <p className="text-surface-400 text-sm sm:text-base max-w-xl mx-auto">
              Accédez directement aux plateformes gouvernementales dématérialisées pour toutes vos démarches citoyennes et professionnelles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {GOV_SERVICES.map((srv, idx) => (
              <motion.div
                key={srv.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                viewport={{ once: true }}
                className="p-6 flex flex-col justify-between hover:border-gold-500/40 rounded-2xl transition-all duration-300 bg-white/[0.03] border border-white/[0.08] backdrop-blur-[16px] hover:bg-white/[0.06] hover:border-white/[0.12] hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)]"
              >
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-gold-500/10 border border-gold-500/20 text-yellow-300">
                      {srv.badge}
                    </span>
                    <span className="text-[10px] text-surface-500 font-mono">OFFICIEL .BJ</span>
                  </div>
                  <h3 className="font-display font-bold text-base sm:text-lg text-surface-100 mb-2.5">
                    {srv.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-surface-400 mb-6 leading-relaxed">
                    {srv.desc}
                  </p>
                </div>

                <a
                  href={srv.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 font-semibold text-xs rounded-xl transition-all duration-300 ease-out active:scale-[0.97] bg-white/5 text-yellow-300 border-[1.5px] border-gold-500/30 backdrop-blur-[8px] hover:bg-gold-500/10 hover:border-gold-500/50 w-full justify-center"
                >
                  Visiter la plateforme
                  <ExternalLink className="w-3.5 h-3.5 ml-1" />
                </a>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ═══ CONSULAR & EMBASSY DIRECTORY ═══ */}
        <section className="py-16 border-t border-white/[0.04]">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-4xl font-display font-bold text-surface-100 mb-3">
                Annuaire Consulaire
              </h2>
              <p className="text-surface-400 text-sm sm:text-base">
                Trouvez les coordonnées de la représentation béninoise la plus proche de chez vous.
              </p>
            </div>

            {/* Tab buttons */}
            <div className="flex border-b border-white/[0.08] mb-8 p-1 bg-surface-900/60 rounded-xl max-w-md mx-auto">
              <button
                onClick={() => setActiveTab('europe')}
                className={`flex-1 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                  activeTab === 'europe'
                    ? 'bg-gold-500 text-surface-950 shadow-glow-gold'
                    : 'text-surface-400 hover:text-surface-200'
                }`}
              >
                Europe
              </button>
              <button
                onClick={() => setActiveTab('america')}
                className={`flex-1 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                  activeTab === 'america'
                    ? 'bg-gold-500 text-surface-950 shadow-glow-gold'
                    : 'text-surface-400 hover:text-surface-200'
                }`}
              >
                Amériques
              </button>
              <button
                onClick={() => setActiveTab('africa')}
                className={`flex-1 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                  activeTab === 'africa'
                    ? 'bg-gold-500 text-surface-950 shadow-glow-gold'
                    : 'text-surface-400 hover:text-surface-200'
                }`}
              >
                Afrique
              </button>
            </div>

            {/* Tab content */}
            <div className="space-y-4">
              {EMBASSIES[activeTab].map((emb, index) => (
                <motion.div
                  key={emb.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="p-5 sm:p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 rounded-2xl transition-all duration-300 bg-white/[0.04] border border-white/[0.08] backdrop-blur-[16px] hover:bg-white/[0.06] hover:border-white/[0.12] hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)]"
                >
                  <div className="space-y-2">
                    <h3 className="font-display font-bold text-base sm:text-lg text-surface-200">
                      {emb.name}
                    </h3>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-surface-400">
                      <MapPin className="w-3.5 h-3.5 text-gold-500/70 flex-shrink-0" />
                      <span>{emb.address}</span>
                    </div>
                    <div className="flex flex-wrap gap-4 pt-1">
                      <div className="flex items-center gap-1.5 text-xs text-surface-400">
                        <Phone className="w-3.5 h-3.5 text-gold-500/70" />
                        <a href={`tel:${emb.phone}`} className="hover:text-gold-400 transition-colors">
                          {emb.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-surface-400">
                        <Mail className="w-3.5 h-3.5 text-gold-500/70" />
                        <a href={`mailto:${emb.email}`} className="hover:text-gold-400 transition-colors">
                          {emb.email}
                        </a>
                      </div>
                    </div>
                  </div>
                  {emb.web && (
                    <a
                      href={emb.web}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 font-semibold text-xs rounded-xl transition-all duration-300 ease-out active:scale-[0.97] bg-white/5 text-yellow-300 border-[1.5px] border-gold-500/30 backdrop-blur-[8px] hover:bg-gold-500/10 hover:border-gold-500/50 whitespace-nowrap self-stretch md:self-auto text-center justify-center"
                    >
                      Visiter le Site Web
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ QUICK CHAT / PROMPTS ═══ */}
        <section className="py-12 border-t border-white/[0.04]">
          <div className="rounded-3xl p-8 sm:p-12 md:p-16 text-center relative overflow-hidden transition-all duration-300 bg-white/[0.04] border border-white/[0.08] backdrop-blur-[16px] hover:bg-white/[0.06] hover:border-white/[0.12] hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)]"
            style={{ background: 'linear-gradient(135deg, #064e3b 0%, #047857 50%, #D4A017 100%)' }}
          >
            {/* Decorative blurs */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-gold-400 blur-[120px]" />
              <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-emerald-300 blur-[100px]" />
            </div>

            <div className="relative z-10 max-w-3xl mx-auto">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-6">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl sm:text-4xl font-display font-bold text-white mb-4">
                Posez vos questions à l'Assistant AskBenin
              </h2>
              <p className="text-emerald-100/90 text-sm sm:text-base max-w-xl mx-auto leading-relaxed mb-8">
                L'IA RAG intègre les documents officiels pour vous fournir des réponses instantanées et fiables.
              </p>

              {/* Predefined prompt buttons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-left mb-8">
                {QUICK_PROMPTS.map((prompt) => (
                  <Link
                    key={prompt.text}
                    href={prompt.url}
                    className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-sm text-emerald-50 leading-snug flex justify-between items-center group"
                  >
                    <span>{prompt.text}</span>
                    <ArrowRight className="w-4 h-4 text-gold-300 opacity-55 group-hover:opacity-100 group-hover:translate-x-1 transition-all flex-shrink-0 ml-3" />
                  </Link>
                ))}
              </div>

              <div className="inline-flex items-center gap-2.5 p-3 rounded-2xl bg-black/20 border border-white/10 text-emerald-100/80 text-xs text-left max-w-md mx-auto">
                <Info className="w-4 h-4 text-gold-300 flex-shrink-0" />
                <span>L'assistant RAG répond aux questions administratives, d'investissement, géopolitiques et culturelles.</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
