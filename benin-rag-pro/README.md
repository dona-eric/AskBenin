# AskBenin - Frontend Pro

Plateforme d'IA RAG Agentic dédiée à la communauté béninoise. Interface moderne et responsive à 100% pour le chat, l'audio avec visualisation d'ondes, et l'exploration du patrimoine béninois.

## 🚀 Fonctionnalités

✨ **Chat Intelligent** - Conversation texte avec IA préformée sur la culture béninoise
🎤 **Audio Avancé** - Interface audio avec visualisation d'ondes en temps réel
🧠 **IA Agentic** - Agents intelligents pour répondre aux questions complexes
🌍 **Base Connaissance Bénin** - Patrimoine, traditions, culture complète
📱 **100% Responsive** - Design mobile-first et adaptable toutes les résolutions
⚡ **Performance** - Next.js 15 avec optimisations de build
🎨 **Design Élégant** - Couleurs béninoise (Or et Violet), animations fluides

## 📋 Structure du Projet

```
benin-rag-pro/
├── app/                    # Pages et layouts Next.js
│   ├── chat/              # Page chat
│   ├── audio/             # Page audio avec visualiseur
│   ├── docs/              # Documentation
│   ├── privacy/           # Politique de confidentialité
│   ├── page.tsx           # Accueil
│   ├── layout.tsx         # Layout principal
│   └── globals.css        # Styles globaux
├── components/            # Composants réutilisables
│   ├── Header.tsx         # Navigation en-tête
│   ├── Footer.tsx         # Pied de page
│   ├── Sidebar.tsx        # Barre latérale
│   ├── ChatWindow.tsx     # Interface chat
│   ├── AudioRecorder.tsx  # Enregistreur audio
│   ├── AudioVisualizer.tsx# Visualiseur d'ondes
│   ├── MessageBubble.tsx  # Bulle de message
│   └── Notification.tsx   # Notifications
├── lib/
│   ├── api.ts            # Client API
│   └── store.ts          # État Zustand
├── types/
│   └── index.ts          # Types TypeScript
├── public/               # Ressources statiques
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── next.config.ts
└── postcss.config.mjs
```

## 🛠️ Technologies

- **Framework**: Next.js 15.1.3
- **React**: 19.0.0
- **Styling**: Tailwind CSS 3.4.1
- **Animation**: Framer Motion 11.0.5
- **State Management**: Zustand 4.5.2
- **HTTP Client**: Axios 1.7.2
- **Icons**: Lucide React 0.376.0
- **Markdown**: React Markdown 9.0.1

## 🚀 Installation & Démarrage

### 1. Dépendances

```bash
npm install
```

### 2. Configuration

Créez `.env.local`:

```bash
cp .env.example .env.local
```

Mettez à jour les variables:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 3. Développement

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000)

### 4. Production

```bash
npm run build
npm run start
```

## 📱 Pages

- **`/`** - Accueil avec présentation et catégories
- **`/chat`** - Interface chat texte
- **`/audio`** - Interface audio avec visualiseur d'ondes
- **`/docs`** - Documentation et FAQ
- **`/privacy`** - Politique de confidentialité

## 🎨 Personnalisation

### Couleurs Béninoise

Modifiez `tailwind.config.js`:

```javascript
colors: {
  benin: { /* Violet */ },
  gold: { /* Or */ },
}
```

### Animations

Ajoutez vos animations dans `globals.css`:

```css
@keyframes yourAnimation {
  from { ... }
  to { ... }
}
```

## 🔗 Intégration API

L'application se connecte à une API FastAPI. Assurez-vous que:

- L'API tourne sur `http://localhost:8000`
- Endpoints disponibles:
  - `POST /chat` - Chat texte
  - `POST /chat/audio` - Audio to text
  - `GET /` - Vérification de santé

## 📦 Build & Déploiement

### Vercel

```bash
vercel deploy
```

### Docker

```bash
docker build -t askbenin-frontend .
docker run -p 3000:3000 askbenin-frontend
```

### Upload Statique

```bash
npm run build
# Uploadez le dossier `.next` et les dépendances vers votre serveur
```

## 🎯 Variables d'Environnement

| Variable | Description | Défaut |
|----------|-------------|--------|
| `NEXT_PUBLIC_API_URL` | Base URL de l'API | http://localhost:8000 |
| `NEXT_BUILD_OUTPUT` | Mode build (standalone/default) | standalone |

## 🤝 Contribution

1. Fork le projet
2. Créez une branche (`git checkout -b feature/AmazingFeature`)
3. Commit (` git commit -m 'Add some AmazingFeature'`)
4. Push (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📝 License

MIT - Libre d'utilisation

## 👤 Auteur

**Donerick Wadagni**

- Email: contact@askbenin.com
- GitHub: @donerick

## 📧 Support

Pour des questions ou problèmes:
- Email: support@askbenin.com
- Discord: [Rejoignez notre serveur](https://discord.gg/askbenin)
- Issues GitHub: [Créer une issue](https://github.com/donerick/askbenin/issues)

---

**🇧🇯 Fait avec ❤️ pour la communauté béninoise**
