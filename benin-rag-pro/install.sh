#!/bin/bash

# Installation script for AskBenin Frontend

set -e

echo "🚀 Installation d'AskBenin Frontend..."

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé. Veuillez l'installer d'abord."
    exit 1
fi

echo "✓ Node.js $(node --version) trouvé"

# Check npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm n'est pas installé."
    exit 1
fi

echo "✓ npm $(npm --version) trouvé"

# Install dependencies
echo ""
echo "📦 Installation des dépendances..."
npm install

# Create .env.local if it doesn't exist
if [ ! -f .env.local ]; then
    echo ""
    echo "📝 Création de .env.local..."
    cp .env.example .env.local
    echo "✓ Fichier .env.local créé"
    echo "⚠️  Veuillez mettre à jour vos variables d'environnement dans .env.local"
fi

echo ""
echo "✅ Installation réussie!"
echo ""
echo "🎯 Prochaines étapes:"
echo "  1. Mettez à jour .env.local avec vos variables"
echo "  2. Lancez l'API backend"
echo "  3. Démarrez le serveur: npm run dev"
echo ""
echo "📚 Plus d'infos: https://github.com/donerick/askbenin"
