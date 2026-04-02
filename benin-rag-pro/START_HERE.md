# 🎯 GUIDE DE DÉMARRAGE - AskBenin Frontend v2.0.0

Ce fichier contient tout ce que vous devez savoir pour commencer.

## ⚡ 30 Secondes pour Démarrer

```bash
cd benin-rag-pro
bash install.sh
nano .env.local              # Changez NEXT_PUBLIC_API_URL
npm run dev
# Ouvrez http://localhost:3000
```

## 📦 Qu'est-ce que vous obtenez?

Une **plateforme complète d'IA chat & audio** dédiée au Bénin:

- 🏠 **Accueil** - Page d'accueil séduisante avec animations
- 💬 **Chat** - Interface chat intelligence avec IA
- 🎤 **Audio** - Enregistreur audio + visualiseur d'ondes
- 📚 **Docs** - Guides et FAQ complètes
- 🔒 **Privacy** - Politique de confidentialité RGPD
- 🎨 **Design** - Couleurs béninoise (Violet + Or)
- 📱 **Responsive** - 100% mobile-friendly
- ⚡ **Fast** - Next.js optimisé

## 🚀 Prochaines Étapes

### 1. Configuration
```bash
# Éditez .env.local
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 2. Lancer Backend
Dans un autre terminal:
```bash
# Assurez-vous que l'API FastAPI tourne
cd ../app
python -m uvicorn main:app --reload
```

### 3. Frontend
```bash
npm run dev
```

### 4. Explorer
Ouvrez http://localhost:3000 et:
- Testez le chat
- Essayez l'audio
- Explorez la documentation

## 🎯 Structure Rapide

```
app/              - Pages (Accueil, Chat, Audio, etc)
components/       - Composants réutilisables
lib/              - API, Store (Zustand)
public/           - Images, assets
```

## 🔐 Variables d'Environnement

```env
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:8000
# C'est tout ce que vous devez configurer!
```

## 🐳 Avec Docker (Alternative)

```bash
docker-compose up
# Frontend: http://localhost:3000
# API: http://localhost:8000
```

## 📚 Pages Disponibles

| URL | Description |
|-----|-------------|
| `/` | Accueil |
| `/chat` | Chat texte |
| `/audio` | Audio + Visualiseur |
| `/docs` | Documentation |
| `/privacy` | Confidentialité |

## 🎨 Personnaliser

### Changer le titre
Éditez `app/layout.tsx`:
```typescript
export const metadata = {
  title: "Mon Titre",
  // ...
}
```

### Changer les couleurs
Éditez `tailwind.config.js`:
```javascript
benin: {
  // Votre violet personnalisé
}
gold: {
  // Votre or personnalisé
}
```

## 🚢 Déployer

```bash
# Vercel
bash deploy.sh
# Choisir option 1

# Docker
docker build -t askbenin .
docker run -p 3000:3000 askbenin

# Ou uploader .next sur votre serveur
npm run build
# Uploadez le dossier .next/
```

## 🆘 Problèmes Courants

**"❌ API not found"**
→ Vérifiez que NEXT_PUBLIC_API_URL est correct dans .env.local

**"Port 3000 already in use"**
→ `PORT=3001 npm run dev`

**"Les styles ne s'affichent pas"**
→ `npm run build` (Tailwind se régénère)

## 📞 Support

- Email: support@askbenin.com
- Discord: https://discord.gg/askbenin
- GitHub: https://github.com/donerick/askbenin

## 📖 Ressources

- Next.js: https://nextjs.org/docs
- React: https://react.dev
- Tailwind: https://tailwindcss.com
- Zustand: https://github.com/pmndrs/zustand

---

**Besoin d'aide?** Consultez les fichiers:
- `README.md` - Documentation détaillée
- `QUICKSTART.md` - Guide rapide
- `app/`  - Code source des pages

Bon codage! 🚀
