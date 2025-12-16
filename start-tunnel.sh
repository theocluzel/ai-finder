#!/bin/bash

# Arrêter les tunnels existants
pkill -f cloudflared 2>/dev/null
pkill -f localtunnel 2>/dev/null
sleep 1

echo "🚀 Démarrage du tunnel public..."
echo ""
echo "⏳ Génération de l'URL publique (cela peut prendre quelques secondes)..."
echo ""

# Lancer cloudflared et capturer l'URL
cloudflared tunnel --url http://localhost:3000 2>&1 | while IFS= read -r line; do
  echo "$line"
  if echo "$line" | grep -qE 'https://[a-z0-9-]+\.trycloudflare\.com'; then
    URL=$(echo "$line" | grep -oE 'https://[a-z0-9-]+\.trycloudflare\.com' | head -1)
    echo ""
    echo "✅ ========================================="
    echo "✅ URL PUBLIQUE DISPONIBLE :"
    echo "✅ $URL"
    echo "✅ ========================================="
    echo ""
    echo "📱 Vous pouvez maintenant :"
    echo "   - Ouvrir cette URL sur votre téléphone"
    echo "   - Partager le lien avec vos amis"
    echo "   - Y accéder depuis n'importe où !"
    echo ""
  fi
done




