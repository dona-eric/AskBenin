# AskBenin Frontend - Quick Start Guide

## 🚀 Démarrage Rapide (5 minutes)

### Étape 1: Installation
```bash
bash install.sh
```

### Étape 2: Configuration
```bash
# Mettez à jour .env.local
nano .env.local
```

### Étape 3: Lancer le serveur
```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000)

---

## 🐳 Avec Docker

```bash
# Construire l'image
docker build -t askbenin-frontend .

# Lancer le conteneur
docker run -p 3000:3000 askbenin-frontend

# Ou avec docker-compose
docker-compose up
```

---

## 📦 Structure de Fichiers

```
benin-rag-pro/
├── app/                  # Pages (Next.js App Router)
├── components/          # Composants réutilisables
├── lib/                 # Utilitaires (API, Store)
├── public/              # Fichiers statiques
├── types/               # Types TypeScript
├── Dockerfile           # Configuration Docker
├── docker-compose.yml   # Orchestration services
├── install.sh          # Script installation
├── deploy.sh           # Script déploiement
└── README.md           # Documentation
```

---

## 🎨 Personnalisation

### Ajouter une nouvelle page

1. Créez un dossier dans `app/` (ex: `app/about/`)
2. Créez `page.tsx` dedans
3. Exportez un composant React par défaut

```typescript
// app/about/page.tsx
export default function AboutPage() {
  return <div>À propos</div>
}
```

### Ajouter un composant

1. Créez le fichier dans `components/`
2. Exportez comme composant React

```typescript
// components/MyComponent.tsx
export const MyComponent = () => {
  return <div>Mon composant</div>
}
```

---

## 🔗 Intégration API

L'API est configurée dans `lib/api.ts`. Pour changer l'URL:

```typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
```

---

## 🚀 Déploiement

### Vercel (Recommandé)
```bash
bash deploy.sh
# Choisir option 1
```

### Docker
```bash
bash deploy.sh
# Choisir option 2
```

### Serveur Personnel
```bash
npm run build
npm start
```

---

## 🐛 Dépannage

**Port 3000 déjà utilisé?**
```bash
PORT=3001 npm run dev
```

**Erreurs CSS/Styling?**
```bash
npm run build
# Le Tailwind se régénère durante la build
```

**API non trouvée?**
Vérifiez `NEXT_PUBLIC_API_URL` dans `.env.local`

---

## 📚 Ressources

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)

---

## 💡 Tips

- Utilisez `npm run dev` en développement
- Activez la reload à chaud dans vos fichiers
- Inspectez avec Chrome DevTools (F12)
- Prévisualisez la prod: `npm run build && npm run start`

---

✨ **Bon codage!**
