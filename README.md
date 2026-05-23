# Documentation du Projet AskBenin : L'IA au Service du Patrimoine et de la Population Béninoise

## 1. Introduction et Vision du Projet

**AskBenin** est une plateforme d'Intelligence Artificielle de type **RAG (Retrieval-Augmented Generation) Agentic**, conçue spécifiquement pour répondre aux besoins uniques de la communauté béninoise. Dans un monde où les technologies numériques sont souvent déconnectées des réalités locales, AskBenin se positionne comme un pont entre l'innovation technologique de pointe et l'héritage culturel profond du Bénin.

Le projet ne se limite pas à une simple interface de chat ; il incarne une volonté de **souveraineté numérique** en permettant aux citoyens de dialoguer avec une IA qui comprend non seulement leur langue, mais aussi les nuances de leur culture, de leurs traditions et de leur histoire.

---

## 2. Analyse du Contexte Béninois

Pour comprendre la pertinence d'AskBenin, il est essentiel d'évaluer le paysage socio-numérique actuel du Bénin en 2025-2026.

### 2.1. Le Défi de l'Alphabétisation et de l'Accès à l'Information
Malgré des progrès significatifs, le taux d'alphabétisation au Bénin stagne autour de **47,1%** en 2025. Cela signifie que près de la moitié de la population rencontre des difficultés avec l'écrit, particulièrement en français, la langue administrative. 
> **L'opportunité AskBenin :** En intégrant des fonctionnalités audio avancées et une IA capable de traiter les langues nationales (comme le Fongbé, le Yoruba ou le Baatonu), AskBenin brise la barrière de l'écrit et rend l'information accessible à tous, indépendamment du niveau d'instruction formelle.

### 2.2. La Révolution Mobile et la Fracture Numérique
Avec plus de **10,6 millions d'utilisateurs mobiles actifs**, le téléphone est le principal outil d'accès au numérique au Bénin. Cependant, une fracture subsiste entre les zones urbaines (Cotonou, Porto-Novo) et les zones rurales.
> **La réponse technique :** AskBenin adopte un design **100% Responsive** et **Mobile-First**, optimisé pour les connexions parfois instables, garantissant une expérience fluide même sur des smartphones d'entrée de gamme.

### 2.3. Préservation du Patrimoine et Langues Nationales
Le gouvernement béninois a lancé des initiatives majeures comme le projet **"JaimeMaLangue"** pour numériser le patrimoine linguistique. AskBenin s'inscrit dans cette dynamique en servant de réceptacle et de diffuseur de cette connaissance.
*   **Patrimoine immatériel :** Contes, proverbes, histoire des royaumes (Dahomey, Nikki, etc.).
*   **Langues :** Transition vers une IA capable de comprendre et de répondre dans les langues du terroir.

---

## 3. Fonctionnalités Clés

| Fonctionnalité | Description | Bénéfice pour l'utilisateur béninois |
| :--- | :--- | :--- |
| **Chat Intelligent** | Conversation texte avec une IA préformée sur la culture locale. | Réponses précises sur l'histoire, le droit ou la culture béninoise. |
| **Audio Avancé** | Interface vocale avec visualisation d'ondes en temps réel. | Accessibilité pour les populations non-alphabétisées ou préférant l'oralité. |
| **IA Agentic** | Agents capables de décomposer des requêtes complexes. | Assistance pour des démarches administratives ou des recherches approfondies. |
| **Base de Connaissance** | RAG focalisé sur le patrimoine et les traditions. | Garantie de fiabilité des informations sur le Bénin (évite les hallucinations). |
| **Design "Or et Violet"** | Identité visuelle inspirée des couleurs royales et modernes. | Sentiment d'appartenance et fierté culturelle. |

---

## 4. Architecture Technique

Le projet repose sur une stack technologique moderne assurant performance et scalabilité.

### 4.1. Frontend (Next.js 15)
*   **Framework :** Next.js 15.1.3 pour un rendu hybride (SSR/Static) optimal.
*   **Styling :** Tailwind CSS pour une interface légère et personnalisable.
*   **Animations :** Framer Motion pour une expérience utilisateur fluide et premium.
*   **Gestion d'état :** Zustand pour une réactivité instantanée de l'interface.

### 4.2. Backend et IA (FastAPI)
L'application communique avec une API robuste :
*   **FastAPI :** Pour des performances élevées et une gestion asynchrone des requêtes.
*   **RAG (Retrieval-Augmented Generation) :** Injection de documents sourcés sur le Bénin dans le contexte de l'IA.
*   **Endpoints :**
    *   `POST /chat` : Traitement des messages texte.
    *   `POST /chat/audio` : Transcription et réponse vocale.

---

## 5. Structure du Projet

```text
benin-rag-pro/
├── app/                    # Structure de navigation Next.js
│   ├── chat/               # Interface de discussion texte
│   ├── audio/              # Interface vocale avec visualiseur
│   ├── docs/               # Centre d'aide et documentation
│   └── privacy/            # Protection des données (Code du Numérique)
├── components/             # Éléments UI (AudioRecorder, ChatWindow, etc.)
├── lib/                    # Logique API et gestion d'état
├── public/                 # Assets culturels et icônes
└── tailwind.config.js      # Thème personnalisé (Or & Violet)
```

---

## 6. Installation et Déploiement

### Prérequis
*   Node.js 18+
*   Compte API pour le modèle de langage (LLM)

### Étapes rapides
1.  **Installation :** `npm install`
2.  **Configuration :** Créer un fichier `.env.local` avec `NEXT_PUBLIC_API_URL`.
3.  **Lancement :** `npm run dev` pour le développement ou `npm run build` pour la production.

---

## 7. Engagement et Éthique

AskBenin s'engage à respecter le **Code du Numérique du Bénin** concernant la protection des données à caractère personnel. Les interactions sont sécurisées et la base de connaissances est régulièrement auditée par des experts culturels pour éviter toute déformation de l'histoire nationale.

---

## 8. À propos de l'Auteur

**Dona Eric KOULODJI**
*   **Vision :** Démocratiser l'accès à l'IA pour chaque Béninois.
*   **Contact :** [contact@askbenin.com](mailto:donaerickoulodji@gmail.com)
*   **GitHub :** [@donerick](https://github.com/dona-eric)

---
*Réalisé avec ❤️ pour le rayonnement numérique du Bénin.*
