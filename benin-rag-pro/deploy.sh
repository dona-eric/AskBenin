#!/bin/bash

# Deployment script for AskBenin Frontend

set -e

echo "🚀 Déploiement d'AskBenin Frontend..."

# Build
echo "📦 Construction..."
npm run build

# Check for build success
if [ ! -d ".next" ]; then
    echo "❌ Erreur de build"
    exit 1
fi

echo "✅ Build réussi"

# Options de déploiement
echo ""
echo "🎯 Où voulez-vous déployer?"
echo "1) Vercel"
echo "2) Docker"
echo "3) Static (FTP/S3/etc)"
echo "4) Quitter"
echo ""
read -p "Choisissez (1-4): " choice

case $choice in
    1)
        echo "🌐 Déploiement sur Vercel..."
        if ! command -v vercel &> /dev/null; then
            npm install -g vercel
        fi
        vercel deploy --prod
        ;;
    2)
        echo "🐳 Préparation Docker..."
        docker build -t askbenin-frontend:latest .
        echo "✓ Image construite: askbenin-frontend:latest"
        echo ""
        echo "Pour déployer, exécutez:"
        echo "  docker run -p 3000:3000 askbenin-frontend:latest"
        ;;
    3)
        echo "📦 Dossier de sortie: .next et public/"
        echo ""
        echo "Pour déployer:"
        echo "  1. Uploadez le dossier .next/"
        echo "  2. Uploadez le dossier public/"
        echo "  3. Assurez-vous que Node.js est installé sur votre serveur"
        echo "  4. Installez les dépendances: npm install --production"
        echo "  5. Démarrez: npm start"
        ;;
    4)
        echo "Annulé"
        exit 0
        ;;
    *)
        echo "Option invalide"
        exit 1
        ;;
esac

echo ""
echo "✅ Déploiement terminé!"
