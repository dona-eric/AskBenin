# 📱 Responsive Design Guide

Ce document détaille la configuration responsive de **AskBenin** pour tous les appareils (mobile, tablette, desktop).

## 🎯 Stratégie Mobile-First

L'application utilise une **approche mobile-first** avec Tailwind CSS pour garantir une excellente expérience utilisateur sur tous les appareils.

### Breakpoints Tailwind

| Breakpoint | Écran | Utilisation |
|-----------|-------|------------|
| **xs** | 320px | Téléphones ultra-petits |
| **base** | → | Téléphones standard (par défaut) |
| **sm** | 640px | Tablettes petites & grands téléphones |
| **md** | 768px | Tablettes |
| **lg** | 1024px | Grandes tablettes & petits desktops |
| **xl** | 1280px | Desktops |
| **2xl** | 1536px | Grands desktops |

### Exemple de code responsive

```jsx
// Mobile-first: Styles appliqués par défaut aux petits écrans
<div className="p-3 xs:p-4 sm:p-6 md:p-8 lg:p-12">
  {/* 
    p-3: 12px padding sur mobile
    xs:p-4: 16px padding sur 320px+
    sm:p-6: 24px padding sur 640px+
    md:p-8: 32px padding sur 768px+
    lg:p-12: 48px padding sur 1024px+
  */}
</div>

// Texte responsive
<h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
  Titre principal
</h1>
```

## 📐 Viewport Configuration

```html
<!-- Automatiquement dans Layout.tsx -->
<meta 
  name="viewport" 
  content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=true"
>
```

**Points clés:**
- ✅ `width=device-width`: Utilise la largeur réelle de l'appareil
- ✅ `initial-scale=1`: Pas de zoom initial
- ✅ `maximum-scale=5`: Permet le zoom pour l'accessibilité
- ✅ `user-scalable=true`: Les utilisateurs peuvent zoomer

## 🎨 Composants Responsive

### Header
- **Mobile**: Hamburger menu + logo compact
- **Desktop**: Navigation complète horizontale

```jsx
<header className="sticky top-0 z-50">
  <div className="px-3 xs:px-4 sm:px-6">
    {/* Mobile menu toggle on md: hidden */}
    <nav className="hidden md:flex">
</header>
```

### Chat Page
- **Max-width messages**: `max-w-[90%] xs:max-w-[85%] md:max-w-md`
- **Padding**: `p-2 sm:p-3 md:p-4`
- **Font**: `text-sm sm:text-base`

### Audio Page
- **Responsive padding**: `p-3 xs:p-4 sm:p-6 md:p-12`
- **Card layout**: Stacked on mobile, side-by-side on tablet+

### Categories Grid
```jsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 xs:gap-4 sm:gap-6">
  {/* 1 colonne sur mobile, 2 sur sm, 3 sur lg */}
</div>
```

## 🎯 Accessibilité Mobile

### Touch Targets
Tous les boutons ont une taille minimale de **44x44px** pour les appareils tactiles:

```css
.btn-mobile {
  @apply min-h-[44px] min-w-[44px];
}
```

### Notched Devices (iPhone, Android)
L'app supporte les encoches avec `safe-area-inset`:

```css
body {
  padding-bottom: env(safe-area-inset-bottom);
}
```

### Zoom Prevention on Input
Tous les inputs ont `text-base` pour éviter le zoom automatique iOS:

```jsx
<input className="text-base xs:text-base md:text-lg" />
```

## 🚀 Performance Mobile

### Optimisations appliquées
- ✅ Lazy loading des images (Next.js Image)
- ✅ Lazy loading du composant Markdown
- ✅ CSS minifié en production
- ✅ Désactivation des console.logs en prod

### Configuration Next.js
```ts
// next.config.ts
{
  experimental: {
    optimizePackageImports: ["lucide-react", "react-markdown"],
  },
  onDemandEntries: {
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 5,
  },
  productionBrowserSourceMaps: false,
}
```

## 📲 Orientations

### Portrait (par défaut)
- Full width: 100vw
- Height: 100vh

### Landscape
- Padding réduit automatiquement
- Fonts ajustées avec `sm:` breakpoints

## 🔍 Tester la Responsivité

### Chrome DevTools
1. Press `F12`
2. Click le bouton device toggle (📱)
3. Sélectionnez les appareils pré-définis ou personnalisés

### Appareils typiques à tester
| Device | Résolution | Notes |
|--------|-----------|-------|
| iPhone 12 mini | 375×667 | Petit téléphone |
| iPhone 14 | 390×844 | Standard |
| Samsung S21 | 360×800 | Android |
| iPad Air | 768×1024 | Tablette |
| iPad Pro 11" | 834×1194 | Grande tablette |

### Test sur appareil réel
```bash
# Terminal 1: Build the app
npm run dev

# Terminal 2: Tunnel local
# Utilisez ngrok ou Vercel Preview
ngrok http 3000
# Ouvrez http://[ngrok-url] sur votre téléphone
```

## 🎨 Breakpoint Patterns

### Espacement responsive
```jsx
{/* padding responsive */}
<div className="p-3 xs:p-4 sm:p-6">

{/* margin responsive */}
<div className="mb-2 xs:mb-3 sm:mb-4 md:mb-6">

{/* gap responsive */}
<div className="flex gap-2 sm:gap-4 lg:gap-6">
```

### Text responsive
```jsx
{/* font size responsive */}
<h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">

{/* Mettre du texte en mobile, le montrer en desktop */}
<span className="inline sm:hidden">Mobile text</span>
<span className="hidden sm:inline">Desktop text</span>
```

### Grid responsive
```jsx
{/* Auto-responsive grid */}
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

{/* Flex responsive */}
<div className="flex flex-col sm:flex-row gap-4">
```

## 🐛 Debugging

### Appliquer styles au breakpoint spécifique
```css
@media (min-width: 640px) {
  /* Styles only on sm and above */
}
```

### Voir quel breakpoint est actif
```jsx
<div className="text-xs">
  <span className="inline xs:hidden">XS</span>
  <span className="hidden xs:inline sm:hidden">SM</span>
  <span className="hidden sm:inline md:hidden">MD</span>
  {/* ... etc */}
</div>
```

## 📝 Best Practices

✅ **Faire:**
- Commencer par le style mobile, puis ajouter breakpoints
- Utiliser les espaces librement (`px-3 xs:px-4 sm:px-6`)
- Tester sur plusieurs appareils réels
- Utiliser les utilities Tailwind (pas de CSS custom si possible)

❌ **Éviter:**
- Utiliser `max-width` sans responsive (`max-w-md` au lieu de `max-w-xs sm:max-w-md`)
- Oublier les petits écrans (tester xs: 320px)
- Fixer les hauteurs (préférer min-height)
- Hardcoder les valeurs au lieu des utilities

## 🔗 Ressources

- [Tailwind Responsive Design](https://tailwindcss.com/docs/responsive-design)
- [MDN: Responsive Design](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)
- [Apple: Safe Area](https://developer.apple.com/design/human-interface-guidelines/layouts/iphone/)

---

**Dernière mise à jour**: 2 avril 2026
**Version**: 2.0.0
