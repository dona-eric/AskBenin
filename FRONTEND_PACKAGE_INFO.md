# 📦 AskBenin RAG Frontend v2.0.0 - Package Complet

**Refonte totale et complète du frontend pour la plateforme AskBenin**

---

## 📋 Contenu du Package

### ✨ Nouveau dans v2.0.0

✅ **Refonte complète du design**
✅ **Interface audio avec visualisation d'ondes avancée**
✅ **Page d'accueil dédiée au Bénin**
✅ **Composants 100% modernes et réactifs**
✅ **Footer complet avec informations de contact**
✅ **Structure scalable et maintenable**
✅ **Documentation complète**
✅ **Scripts de déploiement intégrés**
✅ **Support Docker et docker-compose**

---

## 🚀 Démarrage Rapide

### 1️⃣ Installation

```bash
# Extraire l'archive
tar -xzf benin-rag-pro-v2.0.0.tar.gz
cd benin-rag-pro

# Lancer l'installation
bash install.sh
```

### 2️⃣ Configuration

```bash
# Éditez votre configuration
nano .env.local
# Définissez: NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 3️⃣ Lancer le serveur

```bash
npm run dev
```

Ouvrez: **http://localhost:3000**

---

## 📁 Structure du Projet

```
benin-rag-pro/
│
├── 📂 app/                          # Pages Next.js App Router
│   ├── 📄 page.tsx                  # 🏠 Accueil (Hero, Catégories, Features)
│   ├── 📄 layout.tsx                # Layout principal avec Header & Footer
│   ├── 📄 globals.css               # 🎨 Styles globaux Tailwind + Animations
│   ├── 📄 not-found.tsx             # Page 404 personnalisée
│   ├── chat/
│   │   └── 📄 page.tsx              # 💬 Interface Chat en texte
│   ├── audio/
│   │   └── 📄 page.tsx              # 🎤 Interface Audio avec Visualiseur
│   ├── docs/
│   │   └── 📄 page.tsx              # 📚 Documentation & FAQ
│   └── privacy/
│       └── 📄 page.tsx              # 🔒 Politique de Confidentialité
│
├── 📂 components/                   # Composants Réutilisables
│   ├── 📄 Header.tsx                # Navigation en-tête responsive
│   ├── 📄 Footer.tsx                # Pied de page complet (contacts, liens)
│   ├── 📄 Sidebar.tsx               # Barre latérale de navigation
│   ├── 📄 ChatWindow.tsx            # 💬 Interface chat complète
│   ├── 📄 AudioRecorder.tsx         # 🎤 Enregistreur audio avec contrôles
│   ├── 📄 AudioVisualizer.tsx       # 📊 Visualiseur d'ondes en temps réel
│   ├── 📄 MessageBubble.tsx         # Bulles de message (User/Assistant)
│   └── 📄 Notification.tsx          # Notifications (Success, Error, Info)
│
├── 📂 lib/                          # Utilitaires & Logique
│   ├── 📄 api.ts                    # 🔗 Client API (Chat, Audio)
│   └── 📄 store.ts                  # 📦 État Zustand (Chat, Audio, UI)
│
├── 📂 types/                        # Types TypeScript
│   └── 📄 index.ts                  # 🏷️  Interfaces (Message, State, etc)
│
├── 📂 public/                       # Ressources Statiques
│   └── (Icônes, images)
│
├── 📄 package.json                  # Dépendances & Scripts
├── 📄 tsconfig.json                 # Configuration TypeScript
├── 📄 tailwind.config.js            # 🎨 Thème Tailwind (Couleurs Benin)
├── 📄 next.config.ts                # Configuration Next.js
├── 📄 postcss.config.mjs            # PostCSS Config
├── 📄 eslint.config.mjs             # Linting
│
├── 🐳 Dockerfile                    # Build Docker
├── 🐳 docker-compose.yml            # Orchestration (Frontend + API)
│
├── 📄 install.sh                    # Script Installation automatique
├── 📄 deploy.sh                     # Script Déploiement (Vercel/Docker/etc)
│
├── 📄 README.md                     # 📖 Documentation complète
├── 📄 QUICKSTART.md                 # ⚡ Guide démarrage rapide
├── 📄 .env.example                  # Exemple variables d'environnement
├── 📄 .gitignore                    # Fichiers ignés par Git
└── 📄 .projectrc                    # Métadonnées du projet
```

---

## 🎯 Pages Principales

| Page | URL | Fonction |
|------|-----|----------|
| **Accueil** | `/` | Hero, catégories, features, stats |
| **Chat** | `/chat` | Interface texte avec l'IA |
| **Audio** | `/audio` | Enregistrement audio + visualiseur d'ondes |
| **Documentation** | `/docs` | Guides, API, FAQ |
| **Confidentialité** | `/privacy` | Politique de confidentialité RGPD |
| **404** | Automatique | Page d'erreur personnalisée |

---

## 💻 Composants Clés

### 🎤 AudioRecorder
- Enregistrement microphone
- Lecture avec pause/play
- Transcription audio (intégration API)
- Suppression avec contrôles

### 📊 AudioVisualizer
- Affichage en temps réel des ondes
- Dégradé de couleur Bénin/Or
- Responsive et scalable
- Animation fluide

### 💬 ChatWindow
- Affichage des messages
- Support Markdown
- État de chargement
- Gestion erreurs

### 🎨 Design System
- **Couleurs** : Violet Bénin (#5c4e84) + Or (#ffd700)
- **Fonts** : Inter (Google Fonts)
- **Animations** : Framer Motion
- **Icons** : Lucide React

---

## 🔧 Stack Technologique

```
Frontend:
├── Next.js 15.1.3          # Framework React optimisé
├── React 19.0.0            # UI Library
├── TypeScript 5.7.2        # Type Safety
├── Tailwind CSS 3.4.1      # Styling Utility
├── Framer Motion 11.0.5    # Animations
├── Zustand 4.5.2           # State Management
├── Axios 1.7.2             # HTTP Client
├── Lucide React 0.376      # Icons System
└── React Markdown 9.0.1    # Markdown Rendering

Backend (API):
├── FastAPI                 # Framework Python
├── Groq API               # LLM provider
├── Whisper Model          # Speech-to-Text
└── RAG Chain              # Knowledge Retrieval
```

---

## 🚀 Commandes Disponibles

```bash
# Développement
npm run dev                 # Démarrer serveur dev

# Production
npm run build              # Compiler l'application
npm run start              # Démarrer en mode prod

# Linting
npm run lint               # Vérifier la qualité du code

# Scripts Personnalisés
bash install.sh            # Installation complète
bash deploy.sh             # Déploiement interactif

# Docker
docker build -t askbenin . # Builder l'image
docker-compose up          # Démarrer avec Backend
```

---

## 🌐 Intégration API

L'application communique avec une API FastAPI:

```json
Endpoints:
{
  "POST /chat": {
    "description": "Chat texte avec RAG",
    "body": {
      "messages": "Votre question",
      "provider": "groq",
      "model_name": "mixtral-8x7b-32768"
    }
  },
  
  "POST /chat/audio": {
    "description": "Transcrire audio et répondre",
    "body": "FormData avec fichier audio"
  },
  
  "GET /": {
    "description": "Health check"
  }
}
```

Configuration dans `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## 🎨 Personnalisation

### Changer les Couleurs

Éditez `tailwind.config.js`:
```javascript
colors: {
  benin: {
    50: "#f5f7fa",
    // ... couleurs personnalisées
    900: "#2f2751",
  },
  gold: {
    // ... range d'or
  }
}
```

### Ajouter une Page

```bash
mkdir -p app/ma-page
# Créez app/ma-page/page.tsx
```

### Ajouter un Composant

```bash
touch components/MonComposant.tsx
# Exportez le composant
```

---

## 🐳 Déploiement

### Option 1: Vercel (Recommandé)
```bash
bash deploy.sh
# Choisir option 1
```

### Option 2: Docker
```bash
docker build -t askbenin-frontend .
docker run -p 3000:3000 askbenin-frontend
```

### Option 3: Serveur Personnel
```bash
npm run build
npm start
# Ou configurez un reverse proxy (Nginx)
```

---

## 🐛 Dépannage

| Problème | Solution |
|----------|----------|
| Port 3000 occupé | `PORT=3001 npm run dev` |
| API non accessible | Vérifier `NEXT_PUBLIC_API_URL` |
| Erreurs Cache | `rm -rf .next && npm run build` |
| Modules manquants | `npm install` |

---

## 📚 Documentation Officielle

- [Next.js](https://nextjs.org/docs)
- [React](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion)
- [Zustand](https://github.com/pmndrs/zustand)

---

## 🤝 Support & Contribution

- **Email**: support@askbenin.com
- **Discord**: [Rejoindre le serveur](https://discord.gg/askbenin)
- **GitHub Issues**: Signaler un bug
- **Contributing**: Fork → Branch → PR

---

## 📄 License

MIT - Libre d'utilisation personnelle et commerciale

---

## 🎊 Résumé des Nouveautés v2.0.0

### Frontend
✅ Design moderne épuré
✅ Animations fluides Framer Motion
✅ Interface audio professionnel
✅ Footer avec contact complet
✅ Navigation responsive
✅ Support dark mode (prêt)
✅ Accessibilité améliorée
✅ Performance optimisée

### Développement
✅ TypeScript strictement typé
✅ Zustand pour l'état
✅ Structure modulaire
✅ Documentation complète
✅ Scripts d'automatisation
✅ Support Docker
✅ Configuration ESLint
✅ Git ready

### Déploiement
✅ Vercel ready
✅ Docker containerisé
✅ Scripts déploiement
✅ CI/CD friendly
✅ Production build optimisé
✅ Static export possible
✅ Reverse proxy ready

---

## 🙏 Remerciements

Merci à la communauté béninoise pour l'inspiration et le soutien!

**🇧🇯 Fait avec ❤️ pour le Bénin**

---

**Version**: 2.0.0  
**Dernière mise à jour**: 2 Avril 2026  
**Auteur**: Donerick Wadagni
