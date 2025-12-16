#!/bin/bash

# Arrêter les tunnels existants
pkill -f cloudflared 2>/dev/null
pkill -f localtunnel 2>/dev/null
sleep 1

echo "🚀 Démarrage du tunnel public Cloudflare..."
echo ""
echo "⏳ Génération de l'URL publique..."
echo ""

# Créer un fichier temporaire pour capturer l'URL
TEMP_FILE=$(mktemp)

# Lancer cloudflared en arrière-plan et capturer la sortie
cloudflared tunnel --url http://localhost:3000 > "$TEMP_FILE" 2>&1 &
CLOUDFLARED_PID=$!

# Attendre que l'URL soit générée (maximum 15 secondes)
TIMEOUT=15
ELAPSED=0
URL=""

while [ $ELAPSED -lt $TIMEOUT ]; do
  sleep 1
  ELAPSED=$((ELAPSED + 1))
  
  # Chercher l'URL dans le fichier
  URL=$(grep -oE 'https://[a-z0-9-]+\.trycloudflare\.com' "$TEMP_FILE" 2>/dev/null | head -1)
  
  if [ ! -z "$URL" ]; then
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
    echo "🔄 Le tunnel reste actif. Appuyez sur Ctrl+C pour l'arrêter."
    echo ""
    
    # Garder le processus en cours pour maintenir le tunnel
    wait $CLOUDFLARED_PID
    break
  fi
  
  # Afficher un point de progression
  echo -n "."
done

# Nettoyer si timeout
if [ -z "$URL" ]; then
  echo ""
  echo "❌ Timeout : L'URL n'a pas été générée à temps."
  echo "   Vérifiez que le serveur tourne sur http://localhost:3000"
  kill $CLOUDFLARED_PID 2>/dev/null
  rm -f "$TEMP_FILE"
  exit 1
fi

rm -f "$TEMP_FILE"




